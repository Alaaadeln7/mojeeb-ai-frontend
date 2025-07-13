"use client";

import { useState } from "react";

import AccountSettings from "./AccountSettings";
import IntegrationSettings from "./IntegrationSettings";
import LanguageSettings from "./LanguageSettings";
import NotificationsPreference from "./NotificationsPreference";
import ThemeSettings from "./ThemeSettings";
import EditProfileDialog from "./EditProfileDialog";

export default function Settings() {
  const [openEditProfile, setOpenEditProfile] = useState(false);

  return (
    <>
      <div className="p-5 sm:p-10">
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
