"use client";

import React from "react";
import {
  Bot,
  Plus,
  MessageSquareText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useFormik } from "formik";
import { AddConversationValidation } from "@/utils/validation/addConversations";
import useChatbot from "@/hooks/useChatbot";
import { useTranslations } from "next-intl";
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
import { toast } from "@/components/ui/sonner";

interface FormValues {
  question: string;
  answer: string;
  keyword: string;
}

interface AddConversationScriptModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function AddConversationScriptModal({
  isModalOpen,
  setIsModalOpen,
}: AddConversationScriptModalProps) {
  const t = useTranslations("AddConversationModal");
  const { handleAddInquiry, addInquiryLoading } = useChatbot();

  const formik = useFormik<FormValues>({
    initialValues: {
      question: "",
      answer: "",
      keyword: "",
    },
    validationSchema: AddConversationValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleAddInquiry(values);
        resetForm();
        setIsModalOpen(false);
        toast(t("successMessage"));
      } catch (error) {
        console.log(error);
        toast(t("errorMessage"));
      }
    },
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
      <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>
        <Card
          className={cn(
            "max-w-[85%] p-4",
            isAI
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                isAI ? "bg-secondary-foreground/20" : "bg-primary-foreground/20"
              )}
            >
              {isAI ? (
                <Bot className="size-3" />
              ) : (
                <span className="text-xs font-bold">U</span>
              )}
            </div>
            <span className="text-xs font-medium">
              {isAI ? t("aiLabel") : t("customerLabel")}
            </span>
          </div>
          {children}
          {error && (
            <div
              className={cn(
                "text-xs text-destructive mt-1",
                isAI ? "text-left" : "text-right"
              )}
              id={`${role}-error`}
            >
              {error}
            </div>
          )}
        </Card>
      </div>
    );
  };

  const FloatingInput = ({
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    textarea = false,
  }: {
    name: string;
    label: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    error?: string;
    textarea?: boolean;
  }) => (
    <div className="relative mb-4">
      <Label
        htmlFor={name}
        className="absolute left-3 -top-2 px-1 text-xs bg-background rounded"
      >
        {label}
      </Label>
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "w-full bg-background resize-none",
            error && "border-destructive"
          )}
          rows={3}
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
          className={cn("w-full bg-background", error && "border-destructive")}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <div className="absolute right-3 top-3 text-destructive">
          <AlertCircle className="size-4" />
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <MessageSquareText className="size-5" />
            </div>
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <ChatBubble
            role="customer"
            error={
              (formik.touched.question as string | undefined) &&
              (formik.errors.question as string | undefined)
            }
          >
            <FloatingInput
              name="question"
              label={t("customerMessageLabel")}
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.question as string | undefined) &&
                (formik.errors.question as string | undefined)
              }
              textarea
            />
          </ChatBubble>

          <ChatBubble
            role="ai"
            error={
              (formik.touched.answer as string | undefined) &&
              (formik.errors.answer as string | undefined)
            }
          >
            <FloatingInput
              name="answer"
              label={t("aiResponseLabel")}
              value={formik.values.answer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.answer as string | undefined) &&
                (formik.errors.answer as string | undefined)
              }
              textarea
            />
          </ChatBubble>

          <FloatingInput
            name="keyword"
            label={t("keywordLabel")}
            value={formik.values.keyword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              (formik.touched.keyword as string | undefined) &&
              (formik.errors.keyword as string | undefined)
            }
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              {t("cancelButton")}
            </Button>
            <Button type="submit" disabled={addInquiryLoading}>
              {addInquiryLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("processingButton")}
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("addButton")}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
