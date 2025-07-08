"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast } from "sonner";
import type { ToastT } from "sonner";

// Extend CSSProperties to include custom variables
declare module "react" {
  interface CSSProperties {
    "--toast-bg"?: string;
    "--toast-text"?: string;
    "--toast-border"?: string;
    "--normal-bg"?: string;
    "--normal-text"?: string;
    "--normal-border"?: string;
  }
}

type ToastStatus = "success" | "error" | "info" | "warning" | "loading";
type ToastVariant = "default" | "description" | "action";

interface ExtendedToastProps extends ToastT {
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const statusStyles: Record<ToastStatus, React.CSSProperties> = {
  success: {
    "--toast-bg": "var(--success)",
    "--toast-text": "var(--success-foreground)",
    "--toast-border": "var(--success-border)",
  },
  error: {
    "--toast-bg": "var(--destructive)",
    "--toast-text": "var(--destructive-foreground)",
    "--toast-border": "var(--destructive-border)",
  },
  info: {
    "--toast-bg": "var(--info)",
    "--toast-text": "var(--info-foreground)",
    "--toast-border": "var(--info-border)",
  },
  warning: {
    "--toast-bg": "var(--warning)",
    "--toast-text": "var(--warning-foreground)",
    "--toast-border": "var(--warning-border)",
  },
  loading: {
    "--toast-bg": "var(--muted)",
    "--toast-text": "var(--muted-foreground)",
    "--toast-border": "var(--border)",
  },
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          success:
            "group-[.toast-success]:bg-success group-[.toast-success]:text-success-foreground group-[.toast-success]:border-success-border",
          error:
            "group-[.toast-error]:bg-destructive group-[.toast-error]:text-destructive-foreground group-[.toast-error]:border-destructive-border",
          info: "group-[.toast-info]:bg-info group-[.toast-info]:text-info-foreground group-[.toast-info]:border-info-border",
          warning:
            "group-[.toast-warning]:bg-warning group-[.toast-warning]:text-warning-foreground group-[.toast-warning]:border-warning-border",
          loading:
            "group-[.toast-loading]:bg-muted group-[.toast-loading]:text-muted-foreground group-[.toast-loading]:border-border",
        },
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        ...statusStyles.success,
      }}
      {...props}
    />
  );
};

// Utility function to show toast with status
const showToast = (
  message: string,
  status: ToastStatus = "info",
  options?: ExtendedToastProps
) => {
  const baseOptions = {
    style: statusStyles[status],
    ...options,
  };

  switch (status) {
    case "success":
      return toast.success(message, baseOptions);
    case "error":
      return toast.error(message, baseOptions);
    case "info":
      return toast(message, { ...baseOptions, icon: "ℹ️" });
    case "warning":
      return toast.warning(message, baseOptions);
    case "loading":
      return toast.loading(message, baseOptions);
    default:
      return toast(message, baseOptions);
  }
};

export { Toaster, showToast, toast };
export type { ToastStatus, ToastVariant, ExtendedToastProps };
