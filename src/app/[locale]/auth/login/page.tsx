"use client";

import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Login() {
  const t = useTranslations("Login");
  const { login, loading } = useAuth();
  const router = useRouter();

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
    onSubmit: async (values, { resetForm }) => {
      const res = await login(values);
      if (res) {
        resetForm();
        router.push("/");
      }
    },
  });

  return (
    <section className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("emailPlaceholder")}
                className={`${
                  formik.touched.email && formik.errors.email
                    ? "border-destructive"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-sm font-medium text-destructive">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("passwordPlaceholder")}
                className={`${
                  formik.touched.password && formik.errors.password
                    ? "border-destructive"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-sm font-medium text-destructive">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <Button
              type="submit"
              disabled={formik.isSubmitting || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  {t("loading")}
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                </>
              ) : (
                t("submit")
              )}
            </Button>
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/auth/forget-password"
                className="text-sm text-primary hover:underline"
              >
                {t("forgetPassword")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
