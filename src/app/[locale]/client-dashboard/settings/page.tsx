"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
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
        <AccountSettings setOpenEditProfile={setOpenEditProfile} />

        <ThemeSettings />

        <LanguageSettings />

        <IntegrationSettings />

        <NotificationsPreference />

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
