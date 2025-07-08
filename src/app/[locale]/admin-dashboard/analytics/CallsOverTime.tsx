"use client";

import { CallsOverTimeData } from "@/data/AnalyticsData";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

// Function to format numbers like 1000 -> 1K
const formatYAxis = (tick: number) => {
  if (tick >= 1000000) return `${(tick / 1000000).toFixed(1)}M`;
  if (tick >= 1000) return `${(tick / 1000).toFixed(1)}K`;
  return tick.toString();
};

export default function CallsOverTime() {
  const t = useTranslations("Analytics.CallsOverTime");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Colors that adapt to theme
  const textColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const lineColor = isDark ? "#8884d8" : "#4f46e5";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={CallsOverTimeData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                stroke={gridColor}
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
                tickFormatter={formatYAxis}
                width={40}
              />
              <Tooltip
                formatter={(value) => [
                  formatYAxis(Number(value)),
                  t("tooltipLabel"),
                ]}
                labelFormatter={(label) => t("days." + label)}
                contentStyle={{
                  background: isDark ? "#1f2937" : "#ffffff",
                  borderColor: isDark ? "#374151" : "#e5e7eb",
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  color: textColor,
                }}
              />
              <Line
                type="monotone"
                dataKey="number"
                stroke={lineColor}
                strokeWidth={2}
                dot={{ r: 3, fill: lineColor }}
                activeDot={{
                  r: 5,
                  stroke: lineColor,
                  strokeWidth: 2,
                  fill: isDark ? "#1f2937" : "#ffffff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
