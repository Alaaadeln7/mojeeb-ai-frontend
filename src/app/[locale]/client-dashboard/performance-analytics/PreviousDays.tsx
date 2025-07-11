"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartData {
  name: string;
  value: number;
}

const PreviousDays = () => {
  const t = useTranslations("PreviousDays");

  const data: ChartData[] = [
    { name: t("time.8am"), value: 15 },
    { name: t("time.12pm"), value: 18 },
    { name: t("time.2pm"), value: 14 },
    { name: t("time.4pm"), value: 16 },
    { name: t("time.6pm"), value: 17 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 lg:flex-row">
      {/* First Card - Progress Bars */}
      <Card className="w-full p-4 transition-all hover:shadow-md">
        <div className="flex flex-col h-full">
          <div className="text-xl font-bold">
            +12%
            <span className="text-sm text-muted-foreground ml-2">
              {t("fromPreviousDays")}
            </span>
          </div>

          {/* Progress bars - vertical on mobile, horizontal on desktop */}
          <div className="flex items-end gap-1 mt-4 h-32 sm:h-24 md:h-20 lg:h-32 lg:flex-col lg:items-start">
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex-1 lg:w-full">
                  <Progress
                    value={(index + 1) * 10}
                    className="h-full w-full lg:h-6"
                    style={{
                      opacity: `${(index + 1) * 0.1 + 0.3}`,
                      backgroundColor: "hsl(var(--primary))",
                    }}
                  />
                </div>
              ))}
          </div>

          {/* Time labels - responsive layout */}
          <div className="grid grid-cols-4 gap-1 text-xs text-muted-foreground mt-2 sm:text-sm">
            <span className="text-center">{t("time.8am")}</span>
            <span className="text-center">{t("time.10am")}</span>
            <span className="text-center">{t("time.12pm")}</span>
            <span className="text-center">{t("time.2pm")}</span>
            <span className="hidden sm:block text-center">{t("time.4pm")}</span>
            <span className="hidden sm:block text-center">{t("time.6pm")}</span>
            <span className="hidden md:block text-center">{t("time.8pm")}</span>
            <span className="hidden md:block text-center">
              {t("time.10pm")}
            </span>
          </div>
        </div>
      </Card>

      {/* Second Card - Line Chart */}
      <Card className="w-full p-4 transition-all hover:shadow-md">
        <div className="flex flex-col h-full">
          <div className="text-xl font-bold">
            +15%
            <span className="text-sm text-muted-foreground ml-2">
              {t("escalationText")}
            </span>
          </div>

          <div className="text-sm text-muted-foreground mb-2">~ 15%</div>

          <div className="flex-1 min-h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted))"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: "0.75rem",
                  }}
                  tickMargin={10}
                />
                <YAxis hide domain={[0, "dataMax + 5"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "calc(var(--radius) - 2px)",
                    fontSize: "0.875rem",
                  }}
                  formatter={(value) => [`${value} ${t("calls")}`, t("calls")]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                    fill: "hsl(var(--background))",
                  }}
                  activeDot={{
                    r: 6,
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                    fill: "hsl(var(--background))",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

export function PreviousDaysSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:flex-row">
      <Card className="w-full p-4">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="flex items-end gap-1 mt-4 h-32">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="flex-1 h-full" />
            ))}
        </div>
      </Card>
      <Card className="w-full p-4">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="w-full h-[150px]" />
      </Card>
    </div>
  );
}

export default PreviousDays;
