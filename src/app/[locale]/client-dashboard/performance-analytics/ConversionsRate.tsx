"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ConversionsRate() {
  const t = useTranslations("ConversionsRate");

  return (
    <Card className="sm:col-span-2 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle className={`text-lg font-semibold `}>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center">
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-medium `}>{t("conversionRate")}</h3>
            <p className={`font-bold text-3xl `}>43%</p>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-medium `}>{t("missedIntents")}</h3>
            <p className={`font-bold text-3xl `}>56</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
