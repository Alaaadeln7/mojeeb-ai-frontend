"use client";

import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

export default function Login() {
  const t = useTranslations("Login");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.required")),
    password: Yup.string()
      .min(6, t("validation.passwordMin"))
      .required(t("validation.required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <section className="w-full min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-background text-foreground rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">{t("title")}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full  bg-[#10a5b1] text-foreground cursor-pointer"
          >
            {t("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
