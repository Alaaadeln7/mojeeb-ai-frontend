"use client";

import useClient from "@/hooks/useClient";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AccountSettingsProps {
  setOpenEditProfile: (open: boolean) => void;
}

interface ClientData {
  email: string;
  address?: string;
  phone?: string;
}

export default function AccountSettings({
  setOpenEditProfile,
}: AccountSettingsProps) {
  const t = useTranslations("AccountSettings");
  const { currentClient, getClientLoading } = useClient();

  if (getClientLoading) return <AccountSettingsSkeleton />;

  const client = currentClient as ClientData;

  return (
    <Card className="p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">{t("title")}</h1>
        <Button onClick={() => setOpenEditProfile(true)}>
          {t("editButton")}
        </Button>
      </div>

      <Card className="p-6 border rounded-2xl">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{t("emailLabel")}</p>
            <p>{client?.email}</p>
          </div>

          {client?.address && (
            <div>
              <p className="text-sm text-muted-foreground">
                {t("addressLabel")}
              </p>
              <p>{client?.address}</p>
            </div>
          )}

          {client?.phone && (
            <div>
              <p className="text-sm text-muted-foreground">{t("phoneLabel")}</p>
              <p>{client?.phone}</p>
            </div>
          )}
        </div>
      </Card>
    </Card>
  );
}

// Updated skeleton component
export function AccountSettingsSkeleton() {
  return (
    <Card className="p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[80px]" />
      </div>

      <Card className="p-6 border rounded-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </Card>
    </Card>
  );
}
