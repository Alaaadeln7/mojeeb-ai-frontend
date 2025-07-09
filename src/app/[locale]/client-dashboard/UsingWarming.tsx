import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataUsageCircle from "./DataUsageCircle";

export default function UsingWarning() {
  const t = useTranslations("UsageWarning");

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl text-center">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <DataUsageCircle used={30} total={100} />
        <Button className="w-full">{t("upgradeButton")}</Button>
      </CardContent>
    </Card>
  );
}
