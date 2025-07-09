"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ClientSidebar from "@/components/organisms/ClientSidebar";
import ClientDashboardHeader from "./ClientDashboardHeader";
import { useState } from "react";
import ProfileModal from "./settings/ProfileModal";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  console.log(isOpenProfile);
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
          {/* {isOpenProfile && ( */}
          <ProfileModal
            openProfile={isOpenProfile}
            setOpenProfile={setIsOpenProfile}
          />
          {/* )} */}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
