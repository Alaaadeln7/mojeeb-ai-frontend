import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminDashboardSidebar from "@/components/organisms/AdminDashboardSidebar";
import AdminSiteHeader from "@/components/organisms/AdminSiteHeader";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          dir: "ltr",
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminDashboardSidebar variant="inset" />
      <SidebarInset>
        <AdminSiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
