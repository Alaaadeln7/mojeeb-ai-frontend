"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import NavMainAdminDashboard from "@/components/organisms/NavMainAdminDashboard";
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
  ChartLine,
  Database,
  LayoutDashboard,
  // LogOut,
  NotepadText,
  Settings,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

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

export function AppSidebar({ ...props }) {
  const t = useTranslations("AdminSidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { user, loading } = useAuth();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    if (loading) {
      if (user?.role === "admin") {
        setFullName(user?.fullName);
        setEmail(user?.email);
      }
    }
  }, [user, loading]);
  const navItems: NavItem[] = [
    {
      title: t("navItems.dashboard"),
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: t("navItems.clients"),
      url: "/clients",
      icon: User,
    },
    {
      title: t("navItems.analytics"),
      url: "/analytics",
      icon: ChartLine,
    },
    {
      title: t("navItems.usersRoles"),
      url: "users-roles",
      icon: Users,
    },
    {
      title: t("navItems.subscriptions"),
      url: "/subscriptions",
      icon: Database,
    },
    {
      title: t("navItems.settings"),
      url: "/settings",
      icon: Settings,
    },
    {
      title: t("navItems.plans"),
      url: "/plans",
      icon: NotepadText,
    },
  ];

  const userData: UserData = {
    name: fullName,
    email: email,
    avatar: "",
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
                <span className="text-base font-semibold">
                  {t("brandName")}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMainAdminDashboard items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
