"use client";

import { Eye, EyeOff, Loader2, Lock, Mail, User, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { createUserSchema } from "@/utils/validation/authValidation";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface CreateUserModalProps {
  setIsModalOpen: (open: boolean) => void;
}

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export default function CreateUserModal({
  setIsModalOpen,
}: CreateUserModalProps) {
  const t = useTranslations("CreateUserModal");
  const [showPassword, setShowPassword] = useState(false);
  const { handleCreateUser, isCreateUserLoading } = useAuth();

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: createUserSchema,
    onSubmit: async (values) => {
      try {
        await handleCreateUser(values);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
  });

  return (
    <AnimatePresence>
      <Dialog open onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={isCreateUserLoading}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{t("close")}</span>
              </Button>
            </DialogClose>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("form.fullName.label")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={t("form.fullName.placeholder")}
                  className="pl-9"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  disabled={isCreateUserLoading}
                />
              </div>
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-sm text-destructive">
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("form.email.label")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("form.email.placeholder")}
                  className="pl-9"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={isCreateUserLoading}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-destructive">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <Label htmlFor="role">{t("form.role.label")}</Label>
              <Select
                name="role"
                onValueChange={(value) => formik.setFieldValue("role", value)}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                disabled={isCreateUserLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("form.role.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    {t("form.role.options.admin")}
                  </SelectItem>
                  <SelectItem value="client">
                    {t("form.role.options.client")}
                  </SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <p className="text-sm text-destructive">{formik.errors.role}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("form.password.label")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("form.password.placeholder")}
                  className="pl-9 pr-10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  disabled={isCreateUserLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isCreateUserLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? t("hidePassword") : t("showPassword")}
                  </span>
                </Button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-destructive">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isCreateUserLoading || !formik.isValid}
            >
              {isCreateUserLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("form.submit.creating")}
                </>
              ) : (
                t("form.submit.create")
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
