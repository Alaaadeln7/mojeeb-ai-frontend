// DataUsageRadial.tsx
"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";

interface DataUsageRadialProps {
  used?: number;
  total?: number;
  isLoading?: boolean;
}

export default function DataUsageRadial({
  used = 0,
  total = 100,
  isLoading = false,
}: DataUsageRadialProps) {
  const { theme } = useTheme();
  const t = useTranslations("DataUsage");
  const percentage = Math.round((used / total) * 100);

  const data = [
    {
      name: "used",
      value: percentage,
      fill: theme === "dark" ? "#10a5b1" : "#10a5b1",
    },
    {
      name: "remaining",
      value: 100 - percentage,
      fill: theme === "dark" ? "#1f2937" : "#f3f4f6",
    },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[120px]" />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Skeleton className="w-full h-[200px] rounded-lg" />
          <div className="text-center space-y-2">
            <Skeleton className="h-7 w-[50px] mx-auto" />
            <Skeleton className="h-4 w-[120px] mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-[500px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarGrid radialLines={false} />
              <PolarRadiusAxis angle={0} domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" cornerRadius={10} background>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RadialBar>
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t("used")}</p>
              <p className="text-2xl font-bold">{used}</p>
              <p className="text-xs text-muted-foreground">
                {t("of")} {total}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span>{t("limit")}</span>
          <span>100%</span>
        </div>
      </CardContent>
    </Card>
  );
}
