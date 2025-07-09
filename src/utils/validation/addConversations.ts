import * as Yup from "yup";
export const AddConversationValidation = Yup.object({
  question: Yup.string().trim().required("Customer message is required"),
  answer: Yup.string().trim().required("AI response is required"),
  keyword: Yup.string().trim().required("Keyword is required"),
});
