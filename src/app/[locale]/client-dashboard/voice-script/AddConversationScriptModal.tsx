"use client";

import type React from "react";
import {
  Bot,
  Plus,
  MessageSquareText,
  AlertCircle,
  Loader2,
  User,
  X,
} from "lucide-react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import * as Yup from "yup";

interface FormValues {
  question: string;
  answer: string;
  keyword: string;
}

interface AddConversationScriptModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSubmit?: (values: FormValues) => Promise<void>;
  isLoading?: boolean;
}

// Validation schema
const AddConversationValidation = Yup.object({
  question: Yup.string()
    .required("Customer message is required")
    .min(5, "Message must be at least 5 characters"),
  answer: Yup.string()
    .required("AI response is required")
    .min(10, "Response must be at least 10 characters"),
  keyword: Yup.string()
    .required("Keyword is required")
    .min(2, "Keyword must be at least 2 characters"),
});

const ChatBubble = ({
  role = "customer",
  children,
  error,
}: {
  role?: "customer" | "ai";
  children: React.ReactNode;
  error?: string;
}) => {
  const isAI = role === "ai";

  return (
    <div
      className={`flex ${isAI ? "justify-start" : "justify-end"} w-full mb-6`}
    >
      <div
        className={`flex ${
          isAI ? "flex-row" : "flex-row-reverse"
        } items-start gap-3 max-w-[85%] w-full`}
      >
        {/* Avatar */}
        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
          <AvatarFallback
            className={cn(
              "text-white text-sm font-medium",
              isAI
                ? "bg-gradient-to-r from-violet-500 to-purple-600"
                : "bg-gradient-to-r from-blue-500 to-indigo-600"
            )}
          >
            {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        {/* Message Container */}
        <div
          className={`flex flex-col ${
            isAI ? "items-start" : "items-end"
          } flex-1 min-w-0`}
        >
          {/* Sender Label */}
          <div className="mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              {isAI ? "AI Assistant" : "Customer"}
            </span>
          </div>

          {/* Message Bubble */}
          <div
            className={cn(
              "relative rounded-2xl px-4 py-3 shadow-sm max-w-full",
              isAI
                ? "bg-muted/80 text-foreground rounded-tl-md"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-md"
            )}
          >
            <div className="text-sm leading-relaxed break-words">
              {children}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FormField = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  textarea = false,
  placeholder,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  textarea?: boolean;
  placeholder?: string;
}) => (
  <div className="w-full">
    {textarea ? (
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          "min-h-[80px] resize-none bg-transparent border-0 p-0 text-sm leading-relaxed placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0",
          error && "text-destructive"
        )}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    ) : (
      <Input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          "bg-transparent border-0 p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60",
          error && "text-destructive"
        )}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    )}
  </div>
);

export default function AddConversationScriptModal({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  isLoading = false,
}: AddConversationScriptModalProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      question: "",
      answer: "",
      keyword: "",
    },
    validationSchema: AddConversationValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (onSubmit) {
          await onSubmit(values);
        }
        resetForm();
        setIsModalOpen(false);
        toast.success("Conversation script added successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add conversation script");
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                <MessageSquareText className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-800">
                  Create New Conversation
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a customer-AI conversation script
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-slate-600 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
            {/* Chat Preview */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-slate-700 mb-4">
                Conversation Preview
              </h3>

              {/* Customer Message */}
              <ChatBubble
                role="customer"
                error={
                  formik.touched.question ? formik.errors.question : undefined
                }
              >
                <FormField
                  name="question"
                  label="Customer Message"
                  value={formik.values.question}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.question ? formik.errors.question : undefined
                  }
                  textarea
                  placeholder="What would the customer say?..."
                />
              </ChatBubble>

              {/* AI Response */}
              <ChatBubble
                role="ai"
                error={formik.touched.answer ? formik.errors.answer : undefined}
              >
                <FormField
                  name="answer"
                  label="AI Response"
                  value={formik.values.answer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.answer ? formik.errors.answer : undefined
                  }
                  textarea
                  placeholder="How should the AI respond?..."
                />
              </ChatBubble>
            </div>

            {/* Keyword Field */}
            <Card className="p-4 bg-slate-50/50 border-slate-200">
              <div className="space-y-2">
                <Label
                  htmlFor="keyword"
                  className="text-sm font-medium text-slate-700"
                >
                  Trigger Keyword
                </Label>
                <Input
                  id="keyword"
                  name="keyword"
                  value={formik.values.keyword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter keyword that triggers this conversation..."
                  className={cn(
                    "bg-white border-slate-200 focus:border-violet-300 focus:ring-violet-200",
                    formik.touched.keyword &&
                      formik.errors.keyword &&
                      "border-destructive focus:border-destructive"
                  )}
                />
                {formik.touched.keyword && formik.errors.keyword && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formik.errors.keyword}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  This keyword will help match customer messages to this
                  conversation script.
                </p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="order-2 sm:order-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formik.isValid}
                className="order-1 sm:order-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Conversation
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
