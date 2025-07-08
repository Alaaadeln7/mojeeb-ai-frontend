// types/analytics.ts
import { LucideIcon } from "lucide-react";

export interface OverviewItem {
  id: string;
  title: string;
  value: number;
  unit?: string;
  trend: "up" | "down";
  change: number;
  icon: LucideIcon;
}

export interface AnalyticsOverviewProps {
  data: OverviewItem[];
}
