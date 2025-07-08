import * as Yup from "yup";
export const createClientValidation = Yup.object({
  name: Yup.string()
    .required("Client name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  website: Yup.string()
    .optional()
    .url("Invalid website URL")
    .matches(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      "Invalid website format"
    )
    .max(100, "Website URL cannot exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  size: Yup.string()
    .oneOf(["small", "medium", "large", "enterprise"], "Invalid company size")
    .notRequired(),
  industry: Yup.string().required("Industry is required"),
  commercialRegister: Yup.string().required("Commercial register is required"),
  taxId: Yup.string()
    .required("Tax ID is required")
    .matches(
      /^[A-Za-z0-9\-]+$/,
      "Tax ID can only contain letters, numbers, and hyphens"
    ),
});
