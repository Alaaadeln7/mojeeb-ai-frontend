"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useFormik } from "formik";
import { Loader2, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { forgetPasswordValidation } from "@/utils/validation/authValidation";

// Define form values type
interface FormValues {
  email: string;
}

export default function ForgetPassword() {
  const t = useTranslations("ForgetPassword");
  const { forgetPassword, loading } = useAuth();
  const { theme } = useTheme();

  // Adjust colors based on theme
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const placeholderColor =
    theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordValidation,
    onSubmit: (values, { resetForm }) => {
      forgetPassword(values);
      resetForm();
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${textColor}`}>
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className={`font-medium ${textColor}`}>
                {t("email")}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className={`pl-10 ${placeholderColor}`}
                  placeholder={t("emailPlaceholder")}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="text-destructive text-sm">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("loading") : t("submit")}
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
