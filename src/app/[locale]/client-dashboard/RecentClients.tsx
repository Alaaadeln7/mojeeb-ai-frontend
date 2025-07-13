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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function RecentClients() {
  const t = useTranslations("RecentClients");

  const clients = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    name: "Toni Kroos",
    date: "12/05/2025",
    duration: "15 mins",
    status: "active", // or 'inactive', 'pending', etc.
  }));

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{t("title")}</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          {t("viewAll")}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t("columns.name")}</TableHead>
                <TableHead>{t("columns.date")}</TableHead>
                <TableHead className="text-right">
                  {t("columns.duration")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.date}</TableCell>
                  <TableCell className="text-right">
                    {client.duration}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("showing")} 1-5 {t("of")} 20 {t("clients")}
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3, 4].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
