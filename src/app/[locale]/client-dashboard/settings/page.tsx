"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import AccountSettings from "./AccountSettings";
import IntegrationSettings from "./IntegrationSettings";
import LanguageSettings from "./LanguageSettings";
import NotificationsPreference from "./NotificationsPreference";
import ThemeSettings from "./ThemeSettings";
import EditProfileDialog from "./EditProfileDialog";

export default function Settings() {
  const t = useTranslations("SettingsClient");
  const { theme } = useTheme();
  const [openEditProfile, setOpenEditProfile] = useState(false);

  return (
    <>
      <div className="p-5 sm:p-10" dir={theme === "ar" ? "rtl" : "ltr"}>
        <div className="space-y-6">
          <AccountSettings setOpenEditProfile={setOpenEditProfile} />

          <ThemeSettings />

          <LanguageSettings />

          <IntegrationSettings />

          <NotificationsPreference />
        </div>
      </div>
      {openEditProfile && (
        <EditProfileDialog
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      )}
    </>
  );
}
