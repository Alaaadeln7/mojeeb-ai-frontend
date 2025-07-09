import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LanguageSettings() {
  const t = useTranslations("LanguageSettingsClient");
  const { theme } = useTheme();
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <Card className={`my-4 md:my-6 ${theme === "dark" ? "bg-card" : ""}`}>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="border rounded-2xl p-4 md:p-6">
        <form className="space-y-4 md:space-y-6" dir={isRTL ? "rtl" : "ltr"}>
          {/* Application Language */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <Label className="text-sm md:text-base">
              {t("applicationLanguage")}
            </Label>
            <Select>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder={t("selectLanguage")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Voice Assistant */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <Label className="text-sm md:text-base">
              {t("voiceAssistant")}
            </Label>
            <Select>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder={t("selectVoiceAssistant")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t("maleVoice")}</SelectItem>
                <SelectItem value="female">{t("femaleVoice")}</SelectItem>
                <SelectItem value="neutral">{t("neutralVoice")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default AI Voice */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <Label className="text-sm md:text-base">
              {t("defaultAIVoice")}
            </Label>
            <Select>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder={t("selectAIVoice")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">{t("natural")}</SelectItem>
                <SelectItem value="professional">
                  {t("professional")}
                </SelectItem>
                <SelectItem value="friendly">{t("friendly")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
