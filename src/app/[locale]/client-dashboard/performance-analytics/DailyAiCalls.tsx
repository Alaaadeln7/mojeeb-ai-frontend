"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Define types for chart data
interface ChartData {
  number: number;
  day: string;
}

const DailyAiCallsData: ChartData[] = [
  { number: 20, day: "7 Apr" },
  { number: 30, day: "8 Apr" },
  { number: 40, day: "9 Apr" },
  { number: 50, day: "10 Apr" },
  { number: 60, day: "11 Apr" },
  { number: 50, day: "12 Apr" },
];

export default function DailyAiCalls() {
  const t = useTranslations("DailyAiCalls");
  const { theme, systemTheme } = useTheme();

  // Determine effective theme (accounting for system preference)
  const effectiveTheme = theme === "system" ? systemTheme : theme;

  // Adjust colors based on theme
  const chartBackground = effectiveTheme === "dark" ? "#1f2937" : "#ffffff";
  const textColor = effectiveTheme === "dark" ? "#e5e7eb" : "#111827";
  const gridColor = effectiveTheme === "dark" ? "#374151" : "#e5e7eb";
  const axisColor = effectiveTheme === "dark" ? "#4b5563" : "#9ca3af";
  const lineColor = effectiveTheme === "dark" ? "#818cf8" : "#6366f1";
  const tooltipBorderColor = effectiveTheme === "dark" ? "#4b5563" : "#d1d5db";

  // Format numbers based on locale
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(navigator.language).format(value);
  };

  return (
    <Card className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-primary">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={DailyAiCallsData}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="number"
                stroke={lineColor}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: lineColor,
                  stroke: chartBackground,
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: lineColor,
                  stroke: chartBackground,
                  strokeWidth: 2,
                }}
              />
              <CartesianGrid
                stroke={gridColor}
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{
                  fill: textColor,
                  fontSize: 12,
                }}
                axisLine={{ stroke: axisColor }}
                tickLine={{ stroke: axisColor }}
              />
              <YAxis
                tick={{
                  fill: textColor,
                  fontSize: 12,
                }}
                axisLine={{ stroke: axisColor }}
                tickLine={{ stroke: axisColor }}
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartBackground,
                  border: `1px solid ${tooltipBorderColor}`,
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  color: textColor,
                }}
                formatter={(value) => [formatNumber(Number(value)), t("calls")]}
                labelStyle={{
                  color: textColor,
                  fontWeight: 600,
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function DailyAiCallsSkeleton() {
  return (
    <Card className="w-full border rounded-lg">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="w-full h-[300px]">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
