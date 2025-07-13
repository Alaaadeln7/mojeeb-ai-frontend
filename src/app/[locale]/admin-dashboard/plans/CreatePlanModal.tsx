"use client";

import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { intervalOptions } from "@/constants";
import usePlans from "@/hooks/usePlans";
import FormField from "./FormField";
import { useTranslations } from "next-intl";
import { useState } from "react";

// Shadcn components
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
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CreatePlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreatePlanModal({
  isOpen,
  onOpenChange,
}: CreatePlanModalProps) {
  const t = useTranslations("Plans");
  const { handleCreatePlan, createPlanLoading } = usePlans();
  const [featureInput, setFeatureInput] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t("titleRequired"))
      .min(2, t("titleMinLength")),
    description: Yup.string()
      .required(t("descriptionRequired"))
      .min(10, t("descriptionMinLength")),
    size: Yup.number(),
    interval: Yup.string()
      .required(t("intervalRequired"))
      .oneOf(["monthly", "yearly"], t("intervalInvalid")),
    price: Yup.number().required(t("priceRequired")).min(0, t("pricePositive")),
    features: Yup.array()
      .of(Yup.string().required(t("featureRequired")))
      .min(1, t("minFeaturesRequired"))
      .required(t("featuresRequired")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      size: "",
      price: "",
      interval: "",
      features: [""],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const filteredFeatures = values.features.filter((feature) =>
          feature.trim()
        );
        await handleCreatePlan({
          ...values,
          price: values.price,
          features: filteredFeatures,
        });
        resetForm();
        onOpenChange(false);
        toast.success(t("createSuccess"));
      } catch (error) {
        console.error("Failed to create plan:", error);
        toast.error(error.message || t("createError"));
      }
    },
  });

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      formik.setFieldValue("features", [
        ...formik.values.features,
        featureInput,
      ]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formik.values.features];
    newFeatures.splice(index, 1);
    formik.setFieldValue("features", newFeatures);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {t("createPlanTitle")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t("createPlanDescription")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label={t("planTitle")}
              name="title"
              type="text"
              placeholder={t("planTitlePlaceholder")}
              formik={formik}
            />

            <FormField
              label={t("size")}
              name="size"
              type="text"
              placeholder={t("sizePlaceholder")}
              formik={formik}
            />

            <FormField
              label={t("price")}
              name="price"
              type="number"
              placeholder="0.00"
              formik={formik}
            />

            <div className="md:col-span-2">
              <Label htmlFor="interval" className="text-muted-foreground">
                {t("interval")}
              </Label>
              <Select
                name="interval"
                onValueChange={(value) =>
                  formik.setFieldValue("interval", value)
                }
                value={formik.values.interval}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder={t("selectInterval")} />
                </SelectTrigger>
                <SelectContent>
                  {intervalOptions.map((interval) => (
                    <SelectItem key={interval} value={interval}>
                      {t(interval)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.interval && formik.errors.interval && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {formik.errors.interval}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-muted-foreground">
                {t("description")}
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t("descriptionPlaceholder")}
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="bg-background"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label className="text-muted-foreground">{t("features")}</Label>
              <Card className="p-4 space-y-2 bg-background">
                {formik.values.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...formik.values.features];
                        newFeatures[index] = e.target.value;
                        formik.setFieldValue("features", newFeatures);
                      }}
                      placeholder={`${t("feature")} ${index + 1}`}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleRemoveFeature(index)}
                      aria-label={t("removeFeature")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder={t("addFeaturePlaceholder")}
                    className="bg-background"
                  />
                  <Button
                    type="button"
                    onClick={handleAddFeature}
                    variant="outline"
                  >
                    {t("add")}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={createPlanLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {createPlanLoading ? (
                <span className="animate-spin">🌀</span>
              ) : (
                t("createPlan")
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
