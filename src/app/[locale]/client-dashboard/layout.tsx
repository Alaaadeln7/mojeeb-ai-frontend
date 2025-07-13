"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ClientSidebar from "@/components/organisms/ClientSidebar";
import ClientDashboardHeader from "./ClientDashboardHeader";
import { useState } from "react";
import ProfileInfoDialog from "./settings/ProfileInfoDialog";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  return (
    <>
      <SidebarProvider
        style={
          {
            dir: "ltr",
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <ClientSidebar variant="inset" />
        <SidebarInset>
          <ClientDashboardHeader
            isOpenProfile={isOpenProfile}
            setIsOpenProfile={setIsOpenProfile}
          />
          {children}
        </SidebarInset>
      </SidebarProvider>
      {isOpenProfile && (
        <ProfileInfoDialog
          isOpenProfile={isOpenProfile}
          setIsOpenProfile={setIsOpenProfile}
        />
      )}
    </>
  );
}
