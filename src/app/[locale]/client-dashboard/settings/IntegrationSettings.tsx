import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IntegrationSettings() {
  const t = useTranslations("IntegrationSettings");
  const { theme } = useTheme();

  return (
    <Card className={`my-4 md:my-6 ${theme === "dark" ? "bg-card" : ""}`}>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="border rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Google Calendar Integration */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
          <h4 className="text-sm md:text-base font-medium w-full sm:w-auto">
            {t("googleCalendar")}
          </h4>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              type="text"
              className="w-full"
              placeholder={t("googlePlaceholder")}
            />
            <Button className="w-full sm:w-auto">{t("connectButton")}</Button>
          </div>
        </div>

        {/* Slack Integration */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
          <h4 className="text-sm md:text-base font-medium w-full sm:w-auto">
            {t("slack")}
          </h4>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              type="text"
              className="w-full"
              placeholder={t("slackPlaceholder")}
            />
            <Button className="w-full sm:w-auto">{t("connectButton")}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
