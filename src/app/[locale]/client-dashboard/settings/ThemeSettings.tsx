"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeSettings");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const themes = [
    { id: "light", name: t("light"), bg: "bg-gray-100" },
    { id: "dark", name: t("dark"), bg: "bg-gray-800" },
    {
      id: "system",
      name: t("system"),
      bg: "bg-gradient-to-r from-gray-100 to-gray-800",
    },
  ];

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{t("title")}</CardTitle>
        <p className="text-muted-foreground text-xs md:text-sm">
          {t("description")}
        </p>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {themes.map((mode) => (
            <Button
              key={mode.id}
              variant="outline"
              onClick={() => setTheme(mode.id)}
              className={`h-auto p-0 flex-1 min-w-[150px] transition-all ${
                theme === mode.id
                  ? "border-primary bg-primary/10"
                  : "hover:border-primary"
              }`}
            >
              <div className="w-full p-3 md:p-4 text-left relative">
                <div
                  className={`w-full h-16 sm:h-20 md:h-24 rounded mb-2 ${mode.bg}`}
                ></div>
                <p className="text-center capitalize text-sm md:text-base">
                  {mode.name}
                </p>
                {theme === mode.id && (
                  <div className="absolute bg-background p-1 rounded-full top-1.5 right-1.5 md:top-2 md:right-2 text-primary">
                    <Check className="size-4 md:size-5" />
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
