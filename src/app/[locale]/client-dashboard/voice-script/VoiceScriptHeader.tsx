import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function VoiceScriptHeader() {
  const { theme } = useTheme();
  const t = useTranslations("VoiceScriptHeader");

  return (
    <header className="flex flex-col gap-2" data-theme={theme}>
      <TypographyH1 className="font-bold text-3xl">{t("title")}</TypographyH1>
      <TypographyP className="text-sm font-medium text-muted-foreground">
        {t("subtitle")}
      </TypographyP>
    </header>
  );
}
