"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiOutboundCallsHeader() {
  const t = useTranslations("AiOutboundCalls");

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between my-6 md:my-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          {t("header.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("header.subtitle")}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button className="gap-2 w-full sm:w-auto bg-[#10a5b1] hover:bg-[#3e8388]">
          <Plus className="h-4 w-4" />
          {t("header.addCallTask")}
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-[#3d4d58] text-white"
        >
          {t("header.importCSV")}
        </Button>
      </div>
    </header>
  );
}

export function AiOutboundCallsHeaderSkeleton() {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between my-6 md:my-10 gap-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </header>
  );
}
