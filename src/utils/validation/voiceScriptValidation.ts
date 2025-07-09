import * as Yup from "yup";

export const VALIDATION_UPDATE_KEYWORD_SCHEMA = Yup.object().shape({
  question: Yup.string()
    .required("Question is required")
    .min(10, "Question must be at least 10 characters"),
  answer: Yup.string()
    .required("Answer is required")
    .min(10, "Answer must be at least 10 characters"),
  keyword: Yup.string()
    .required("Keyword is required")
    .min(2, "Keyword must be at least 2 characters"),
});
