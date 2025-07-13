"use client";

import { Bell, User, Moon, Sun, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface ClientDashboardHeaderProps {
  isOpenProfile: boolean;
  setIsOpenProfile: (open: boolean) => void;
}

export default function ClientDashboardHeader({
  isOpenProfile,
  setIsOpenProfile,
}: ClientDashboardHeaderProps) {
  const { setTheme } = useTheme();
  const t = useTranslations("Dashboard.Header");
  const router = useRouter();
  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}/client-dashboard/settings`);
  };
  return (
    <header className="flex items-center justify-between p-4 px-6 border-b">
      <SidebarTrigger />

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              <Languages className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
              <span>🇬🇧</span>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
              <span>🇸🇦</span>
              العربية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="size-5" />
              <span className="sr-only">{t("notifications")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end">
            <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("noNotifications")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t("toggleTheme")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {t("light")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              {t("dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              {t("system")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsOpenProfile(!isOpenProfile)}
          title={t("userProfile")}
        >
          <User className="size-5" />
          <span className="sr-only">{t("userProfile")}</span>
        </Button>
      </div>
    </header>
  );
}
