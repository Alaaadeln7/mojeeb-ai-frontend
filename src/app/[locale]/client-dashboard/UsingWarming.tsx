// UsageWarning.tsx
"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataUsageCircle from "./DataUsageCircle";
import Link from "next/link";

export default function UsageWarning() {
  const t = useTranslations("UsageWarning");

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-center">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <DataUsageCircle used={30} total={100} />
        <Link href={"client-dashboard/upgrade-plan"} className="w-full">
          <Button variant="default" className="w-full">
            {t("upgradeButton")}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
