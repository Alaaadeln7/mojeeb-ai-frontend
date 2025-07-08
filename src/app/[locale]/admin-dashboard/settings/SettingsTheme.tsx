"use client";

import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Notifications from "./Notifications";
import LangSettings from "./LangSettings";

export default function SettingsTheme() {
  const t = useTranslations("Settings");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-start justify-center p-10">
      <Card className="w-full max-w-3xl">
        {/* Theme Selection */}
        <div className="p-6">
          <div className="space-y-1">
            <Label className="text-lg font-semibold">{t("theme.title")}</Label>
            <p className="text-sm text-muted-foreground">
              {t("theme.description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {["light", "dark", "system"].map((mode) => (
              <Card
                key={mode}
                onClick={() => setTheme(mode)}
                className={`flex-1 cursor-pointer transition-colors min-w-[200px] ${
                  theme === mode
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary"
                }`}
              >
                <div
                  className={`w-full h-20 rounded-t-lg ${
                    mode === "dark"
                      ? "bg-gray-800"
                      : mode === "light"
                      ? "bg-gray-100"
                      : "bg-gradient-to-r from-gray-100 to-gray-800"
                  }`}
                />
                <div className="p-4 relative">
                  <p className="text-center capitalize">{mode}</p>
                  {theme === mode && (
                    <div className="absolute top-2 right-2 bg-background p-1 rounded-full text-primary shadow-sm">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Language Settings */}
        <LangSettings />

        {/* Notifications */}
        <Notifications />
      </Card>
    </div>
  );
}
