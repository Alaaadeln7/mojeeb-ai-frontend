"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { NavUser } from "@/components/organisms/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Database,
  LayoutDashboard,
  MessageSquareMore,
  Settings,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import NavMainClientDashboard from "./NavMainClientDashboard";
import Image from "next/image";
import logoImage from "../../../public/mojeb-ai-logo.png";
// Define interfaces for type safety
interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface UserData {
  name: string;
  email: string;
  avatar: string;
  logoutText: string;
}

export default function ClientSidebar({ ...props }) {
  const t = useTranslations("clientSidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const navItems: NavItem[] = [
    {
      title: t("navItems.dashboard"),
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: t("navItems.callsAndTickets"),
      url: "/calls-tickets",
      icon: User,
    },
    {
      title: t("navItems.voiceScript"),
      url: "/voice-script",
      icon: MessageSquareMore,
    },
    {
      title: t("navItems.performanceAnalytics"),
      url: "/performance-analytics",
      icon: Users,
    },
    {
      title: t("navItems.aiOutbound"),
      url: "/ai-outbound-calls",
      icon: Database,
    },
    {
      title: t("navItems.settings"),
      url: "/settings",
      icon: Settings,
    },
  ];

  const userData: UserData = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    logoutText: t("user.logout"),
  };

  return (
    <Sidebar collapsible="offcanvas" {...props} side={isRTL ? "right" : "left"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image
                  src={logoImage}
                  alt={"logo image"}
                  className="w-14 object-cover"
                />
                <span className="text-base font-semibold">
                  {t("brandName")}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainClientDashboard items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
