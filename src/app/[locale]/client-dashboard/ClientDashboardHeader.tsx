"use client";

import { Bell, PanelRightClose, User, Moon, Sun } from "lucide-react";
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
import { useRouter, usePathname } from "next-intl/navigation";

interface ClientDashboardHeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isOpenProfile: boolean;
  setIsOpenProfile: (open: boolean) => void;
}

export default function ClientDashboardHeader({
  isOpen,
  setIsOpen,
  isOpenProfile,
  setIsOpenProfile,
}: ClientDashboardHeaderProps) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("Dashboard.Header");
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (locale: string) => {
    router.push(pathname, { locale });
  };

  return (
    <header className="flex items-center justify-between p-4 px-6 border-b">
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <PanelRightClose className="size-5" />
        </Button>
      )}

      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-sm font-normal">
              {t("language")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeLocale("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLocale("ar")}>
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
        >
          <User className="size-5" />
          <span className="sr-only">{t("userProfile")}</span>
        </Button>
      </div>
    </header>
  );
}
