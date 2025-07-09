"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AccountSettings from "./AccountSettings";
import IntegrationSettings from "./IntegrationSettings";
import LanguageSettings from "./LanguageSettings";
import NotificationsPreference from "./NotificationsPreference";
import ThemeSettings from "./ThemeSettings";

export default function Settings() {
  const t = useTranslations("SettingsClient");
  const { theme } = useTheme();
  const [openEditProfile, setOpenEditProfile] = useState(false);

  return (
    <div className="p-5 sm:p-10" dir={theme === "ar" ? "rtl" : "ltr"}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("accountSettings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountSettings setOpenEditProfile={setOpenEditProfile} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("themeSettings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSettings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("languageSettings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageSettings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("integrationSettings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <IntegrationSettings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("notificationPreferences")}</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationsPreference />
          </CardContent>
        </Card>

        <Button className="my-5">{t("saveChanges")}</Button>
      </div>

      <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("editProfile")}</DialogTitle>
          </DialogHeader>
          {/* Profile form content would go here */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
