"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  // LineChart,
  // Line,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define types for chart data
interface PieData {
  name: string;
  value: number;
}

const pieData: PieData[] = [
  { name: "Accuracy", value: 83 },
  { name: "Remaining", value: 17 },
];

const COLORS = ["#10a5b1", "#3d4d58"];

export default function IntentDetection() {
  const t = useTranslations("IntentDetection");
  const { theme } = useTheme();

  // Adjust colors based on theme
  const chartBackground = theme === "dark" ? "#1f2937" : "#ffffff";
  const textColor = theme === "dark" ? "#ffffff" : "#1f2937";

  return (
    <Card className="col-span-12 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center sm:flex-wrap md:flex-nowrap gap-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartBackground,
                    color: textColor,
                    borderRadius: "8px",
                    border: "none",
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 text-center">
            <span className="font-bold text-4xl">50%</span>
            <p className="font-semibold">{t("accuracy")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
