"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface CallData {
  id: number;
  name: string;
  job: string;
  status: "completed" | "in-progress" | "failed";
  duration: string;
  satisfaction?: number;
}

export default function AiOutboundCallsTable() {
  const t = useTranslations("AiOutboundCalls");

  // Mock data
  const callsData: CallData[] = Array.from({ length: 5 }).map((_, index) => ({
    id: index + 1,
    name: t("callName", { number: index + 1 }),
    job: t(
      "jobTitles." +
        (index % 3 === 0
          ? "specialist"
          : index % 3 === 1
          ? "manager"
          : "analyst")
    ),
    status:
      index % 3 === 0
        ? "completed"
        : index % 3 === 1
        ? "in-progress"
        : "failed",
    duration: `${Math.floor(Math.random() * 10) + 1}${t("minutesAbbr")}`,
    satisfaction: index % 3 === 0 ? Math.floor(Math.random() * 100) : undefined,
  }));

  // const statusVariantMap = {
  //   completed: "success",
  //   "in-progress": "secondary",
  //   failed: "destructive",
  // } as const;

  return (
    <div className="my-6 md:my-10">
      <Card className="border rounded-lg">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("job")}</TableHead>
                <TableHead>{t("statusTitle")}</TableHead>
                <TableHead>{t("duration")}</TableHead>
                <TableHead className="text-right">
                  {t("satisfaction")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsData.map((call) => (
                <TableRow key={call.id} className="hover:bg-secondary/50">
                  <TableCell>{call.id}</TableCell>
                  <TableCell className="font-medium">{call.name}</TableCell>
                  <TableCell>{call.job}</TableCell>
                  <TableCell>
                    <Badge>{t(`status.${call.status}`)}</Badge>
                  </TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell className="text-right">
                    {call.satisfaction ? `${call.satisfaction}%` : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2 p-4">
          {callsData.map((call) => (
            <Card
              key={call.id}
              className="hover:bg-secondary/50 transition-colors"
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{call.name}</CardTitle>
                  <Badge>{t(`status.${call.status}`)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("job")}</p>
                    <p>{call.job}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("duration")}
                    </p>
                    <p>{call.duration}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">
                      {t("satisfaction")}
                    </p>
                    <p>{call.satisfaction ? `${call.satisfaction}%` : "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            {t("showingResults", { from: 1, to: 5, total: 25 })}
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">{t("previous")}</span>
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="default" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <span className="sr-only">{t("next")}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AiOutboundCallsTableSkeleton() {
  return (
    <div className="my-6 md:my-10">
      <Card className="border rounded-lg">
        {/* Desktop Skeleton */}
        <div className="hidden md:block p-4 space-y-4">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={`header-${i}`} className="h-8" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`row-${i}`} className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={`cell-${i}-${j}`} className="h-8" />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Skeleton */}
        <div className="md:hidden space-y-2 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={`mobile-${i}`}>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between p-4 border-t">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={`page-${i}`} className="h-9 w-9" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
