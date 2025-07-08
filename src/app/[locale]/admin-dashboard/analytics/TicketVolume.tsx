"use client";

import { ticketVolumeData } from "@/data/AnalyticsData";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function TicketVolume() {
  const t = useTranslations("Analytics.TicketVolume");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Theme-aware colors
  const textColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const barColor = isDark ? "#8884d8" : "#4f46e5";
  const tooltipBg = isDark ? "#1f2937" : "#ffffff";
  const tooltipBorder = isDark ? "#374151" : "#e5e7eb";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold capitalize">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ticketVolumeData}
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
              />
              <Tooltip
                contentStyle={{
                  background: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: "6px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  color: textColor,
                }}
                formatter={(value) => [value, t("tooltipLabel")]}
                labelFormatter={(label) => t(`days.${label}`)}
              />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  color: textColor,
                  paddingTop: "20px",
                }}
              />
              <Bar dataKey="tickets" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
