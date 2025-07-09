"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataUsageCircleProps {
  used?: number;
  total?: number;
}

export default function DataUsageCircle({
  used = 60,
  total = 100,
}: DataUsageCircleProps) {
  const { theme } = useTheme();
  const t = useTranslations("DataUsage");
  const percentage = Math.round((used / total) * 100);

  const data = [
    { name: "used", value: used },
    { name: "remaining", value: total - used },
  ];

  const COLORS = {
    light: ["#10a5b1", "#e5e7eb"],
    dark: ["#10a5b1", "#374151"],
  };

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[theme === "dark" ? "dark" : "light"][index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{percentage}%</h2>
          <p className="text-sm text-muted-foreground">
            {t("usage", { used, total })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
