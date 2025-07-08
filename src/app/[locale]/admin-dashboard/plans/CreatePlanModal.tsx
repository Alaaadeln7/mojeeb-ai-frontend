"use client";

import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { intervalOptions } from "@/constants";
import usePlans from "@/hooks/usePlans";
import FormField from "./FormField";

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
import { useState } from "react";

interface CreatePlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const initialValues = {
  title: "",
  description: "",
  size: "",
  price: "",
  interval: "",
  features: [""],
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  size: Yup.number(),
  interval: Yup.string()
    .required("Interval is required")
    .oneOf(["monthly", "yearly"], "Interval must be either monthly or yearly"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  features: Yup.array()
    .of(Yup.string().required("Feature is required"))
    .min(1, "At least one feature is required")
    .required("Features are required"),
});

export default function CreatePlanModal({
  isOpen,
  onOpenChange,
}: CreatePlanModalProps) {
  const { handleCreatePlan, createPlanLoading } = usePlans();
  const [featureInput, setFeatureInput] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const filteredFeatures = values.features.filter((feature) =>
          feature.trim()
        );
        await handleCreatePlan({
          ...values,
          features: filteredFeatures,
        });
        resetForm();
        onOpenChange(false);
        toast.success("Plan created successfully");
      } catch (error) {
        console.error("Failed to create plan:", error);
        toast.error(error.message || "Failed to create plan");
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
          <DialogTitle>Create New Plan</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new subscription plan
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Plan Title"
              name="title"
              type="text"
              placeholder="Plan title"
              formik={formik}
            />

            <FormField
              label="Size"
              name="size"
              type="text"
              placeholder="Enter size"
              formik={formik}
            />

            <FormField
              label="Price"
              name="price"
              type="number"
              placeholder="0.00"
              formik={formik}
            />

            <div className="md:col-span-2">
              <Label htmlFor="interval">Interval</Label>
              <Select
                name="interval"
                onValueChange={(value) =>
                  formik.setFieldValue("interval", value)
                }
                value={formik.values.interval}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  {intervalOptions.map((interval) => (
                    <SelectItem key={interval} value={interval}>
                      {interval}
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Plan description"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label>Features</Label>
              <Card className="p-4 space-y-2">
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
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleRemoveFeature(index)}
                      aria-label="Remove feature"
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
                    placeholder="Add new feature"
                  />
                  <Button type="button" onClick={handleAddFeature}>
                    Add
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
              Cancel
            </Button>
            <Button type="submit" disabled={createPlanLoading}>
              {createPlanLoading ? (
                <span className="animate-spin">🌀</span>
              ) : (
                "Create Plan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
