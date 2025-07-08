import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export default function AnalyticsHeader() {
  const t = useTranslations("Analytics");

  return (
    <header className="flex justify-between items-center my-5">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>{t("datePicker.label")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>{t("datePicker.today")}</DropdownMenuItem>
          <DropdownMenuItem>{t("datePicker.thisWeek")}</DropdownMenuItem>
          <DropdownMenuItem>{t("datePicker.thisMonth")}</DropdownMenuItem>
          <DropdownMenuItem>{t("datePicker.customRange")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
