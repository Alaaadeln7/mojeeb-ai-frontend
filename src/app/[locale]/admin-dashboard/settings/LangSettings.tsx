import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation"; // Important: Use the custom navigation

export default function LangSettings() {
  const t = useTranslations("LanguageSettings");
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}/admin-dashboard/settings`);
  };

  return (
    <div className="px-6 pb-6 space-y-4">
      <div className="space-y-1">
        <Label className="text-lg font-semibold">{t("title")}</Label>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">{t("systemLanguage")}</p>
        <Select value={locale} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder={t("placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">{t("languages.arabic")}</SelectItem>
            <SelectItem value="en">{t("languages.english")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
