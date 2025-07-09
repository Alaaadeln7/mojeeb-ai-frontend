"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import useChatbot from "@/hooks/useChatbot";
import { useTranslations } from "next-intl";
import { VALIDATION_UPDATE_KEYWORD_SCHEMA } from "@/utils/validation/voiceScriptValidation";
import { Inquiry } from "@/types/chatbot";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

interface UpdateKeywordModalProps {
  openUpdateKeyword: boolean;
  setOpenUpdateKeyword: (open: boolean) => void;
  chatbotId: string;
  selectInquiry?: Inquiry;
}

export default function UpdateKeywordModal({
  openUpdateKeyword,
  setOpenUpdateKeyword,
  chatbotId,
  selectInquiry,
}: UpdateKeywordModalProps) {
  const { theme } = useTheme();
  const t = useTranslations("KeywordModal");
  const { handleUpdateInquiry, updateInquiryLoading } = useChatbot();

  const formik = useFormik({
    initialValues: {
      question: selectInquiry?.question || "",
      answer: selectInquiry?.answer || "",
      keyword: selectInquiry?.keyword || "",
    },
    validationSchema: VALIDATION_UPDATE_KEYWORD_SCHEMA,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        if (!selectInquiry?._id) return;

        await handleUpdateInquiry({
          chatbotId,
          inquiryId: selectInquiry._id,
          question: values.question,
          answer: values.answer,
          keyword: values.keyword,
        });
        resetForm();
        setOpenUpdateKeyword(false);
      } catch (error) {
        console.error("Error updating keyword:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={openUpdateKeyword} onOpenChange={setOpenUpdateKeyword}>
      <AnimatePresence>
        {openUpdateKeyword && (
          <DialogContent
            asChild
            className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto"
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              data-theme={theme}
            >
              <DialogHeader>
                <DialogTitle>{t("updateTitle")}</DialogTitle>
                <DialogDescription>{t("updateDescription")}</DialogDescription>
              </DialogHeader>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">{t("questionLabel")}</Label>
                  <Textarea
                    id="question"
                    name="question"
                    value={formik.values.question}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("questionPlaceholder")}
                    className="min-h-[100px]"
                  />
                  {formik.touched.question && formik.errors.question && (
                    <p className="text-sm text-destructive">
                      {formik.errors.question}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">{t("answerLabel")}</Label>
                  <Textarea
                    id="answer"
                    name="answer"
                    value={formik.values.answer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("answerPlaceholder")}
                    className="min-h-[100px]"
                  />
                  {formik.touched.answer && formik.errors.answer && (
                    <p className="text-sm text-destructive">
                      {formik.errors.answer}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyword">{t("keywordLabel")}</Label>
                  <Input
                    id="keyword"
                    name="keyword"
                    value={formik.values.keyword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("keywordPlaceholder")}
                  />
                  {formik.touched.keyword && formik.errors.keyword && (
                    <p className="text-sm text-destructive">
                      {formik.errors.keyword}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenUpdateKeyword(false)}
                    disabled={formik.isSubmitting}
                  >
                    {t("cancelButton")}
                  </Button>
                  <Button type="submit" disabled={formik.isSubmitting}>
                    {updateInquiryLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("updatingButton")}
                      </>
                    ) : (
                      t("updateButton")
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
