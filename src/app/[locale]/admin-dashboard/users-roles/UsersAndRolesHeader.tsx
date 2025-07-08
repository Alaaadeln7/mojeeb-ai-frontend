import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function UsersAndRolesHeader({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) {
  const t = useTranslations("UsersAndRoles");

  return (
    <header className="space-y-4">
      {/* Title + Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addUserButton")}
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("search.placeholder")}
            className="pl-9 w-full"
          />
        </div>
        <Button type="submit" className="w-full md:w-auto">
          {t("search.button")}
        </Button>
      </div>
    </header>
  );
}
