import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormikProps, FormikValues } from "formik";

interface FormFieldProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  label: string;
  name: keyof T;
  type: string;
  placeholder?: string;
  formik: FormikProps<T>;
  className?: string;
}

export default function FormField<T extends FormikValues>({
  label,
  name,
  type,
  placeholder,
  formik,
  className,
}: FormFieldProps<T>) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      <Label htmlFor={String(name)}>{label}</Label>
      <Input
        type={type}
        id={String(name)}
        name={name as string}
        placeholder={placeholder}
        value={formik.values[name] as string}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={hasError ? "border-destructive" : ""}
      />
      {hasError && (
        <p className="text-sm font-medium text-destructive">
          {formik.errors[name] as React.ReactNode}
        </p>
      )}
    </div>
  );
}
