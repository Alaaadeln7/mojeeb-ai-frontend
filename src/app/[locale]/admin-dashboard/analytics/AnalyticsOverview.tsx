import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnalyticsOverviewProps } from "@/types/analytics";

export default function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  const t = useTranslations("Analytics");

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t(`metrics.${item.id}.title`)}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value.toLocaleString()}
                {item.unit && <span className="text-sm ml-1">{item.unit}</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                {item.trend === "up" ? (
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                {item.change}% {t("changeFromLastPeriod")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
