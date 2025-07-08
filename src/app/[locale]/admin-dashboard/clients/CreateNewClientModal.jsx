"use client";

import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { createClientValidation } from "@/utils/validation/clientValidation";
import { industryOptions } from "@/constants/index";
import useClient from "@/hooks/useClient";
import usePlans from "@/hooks/usePlans";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export default function CreateNewClientModal({ setIsModalOpen }) {
  const t = useTranslations("CreateNewClientModal");
  const { handleCreateClient, createClientLoading } = useClient();
  const { plans } = usePlans();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      website: "",
      description: "",
      size: "",
      industry: "",
      commercialRegister: "",
      taxId: "",
      planId: "",
    },
    validationSchema: createClientValidation,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleCreateClient(values);
      resetForm();
      setIsModalOpen(false);
    },
  });

  return (
    <AnimatePresence>
      <Dialog open onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name.label")}*</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t("form.name.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.name}`)}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email.label")}*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("form.email.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.email}`)}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t("form.password.label")}*</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("form.password.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.password}`)}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{t("form.phone.label")}*</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("form.phone.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.phone}`)}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">{t("form.address.label")}*</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder={t("form.address.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.address}`)}
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">{t("form.website.label")}</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder={t("form.website.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.website}
                />
                {formik.touched.website && formik.errors.website && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.website}`)}
                  </p>
                )}
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <Label htmlFor="industry">{t("form.industry.label")}*</Label>
                <Select
                  name="industry"
                  onValueChange={(value) =>
                    formik.setFieldValue("industry", value)
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.industry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("form.industry.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {t(`industries.${industry}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.industry && formik.errors.industry && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.industry}`)}
                  </p>
                )}
              </div>

              {/* Plan */}
              <div className="space-y-2">
                <Label htmlFor="planId">{t("form.plan.label")}*</Label>
                <Select
                  name="planId"
                  onValueChange={(value) =>
                    formik.setFieldValue("planId", value)
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.planId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("form.plan.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {plans?.map((plan) => (
                      <SelectItem key={plan?._id} value={plan?._id}>
                        {plan?.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.planId && formik.errors.planId && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.planId}`)}
                  </p>
                )}
              </div>

              {/* Company Size */}
              <div className="space-y-2">
                <Label htmlFor="size">{t("form.size.label")}</Label>
                <Select
                  name="size"
                  onValueChange={(value) => formik.setFieldValue("size", value)}
                  onBlur={formik.handleBlur}
                  value={formik.values.size}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("form.size.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">
                      {t("form.size.options.small")}
                    </SelectItem>
                    <SelectItem value="medium">
                      {t("form.size.options.medium")}
                    </SelectItem>
                    <SelectItem value="large">
                      {t("form.size.options.large")}
                    </SelectItem>
                    <SelectItem value="enterprise">
                      {t("form.size.options.enterprise")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.size && formik.errors.size && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.size}`)}
                  </p>
                )}
              </div>

              {/* Commercial Register */}
              <div className="space-y-2">
                <Label htmlFor="commercialRegister">
                  {t("form.commercialRegister.label")}*
                </Label>
                <Input
                  id="commercialRegister"
                  name="commercialRegister"
                  placeholder={t("form.commercialRegister.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.commercialRegister}
                />
                {formik.touched.commercialRegister &&
                  formik.errors.commercialRegister && (
                    <p className="text-sm font-medium text-destructive">
                      {t(`errors.${formik.errors.commercialRegister}`)}
                    </p>
                  )}
              </div>

              {/* Tax ID */}
              <div className="space-y-2">
                <Label htmlFor="taxId">{t("form.taxId.label")}*</Label>
                <Input
                  id="taxId"
                  name="taxId"
                  placeholder={t("form.taxId.placeholder")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taxId}
                />
                {formik.touched.taxId && formik.errors.taxId && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.taxId}`)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">
                  {t("form.description.label")}*
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={t("form.description.placeholder")}
                  rows={3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-sm font-medium text-destructive">
                    {t(`errors.${formik.errors.description}`)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                {t("buttons.cancel")}
              </Button>
              <Button type="submit" disabled={createClientLoading}>
                {createClientLoading ? (
                  <span className="animate-spin">↻</span>
                ) : (
                  t("buttons.create")
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
