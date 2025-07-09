"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CallsAndTickets() {
  const t = useTranslations("CallsAndTickets");
  const { theme } = useTheme();
  const isRTL = theme === "ar";

  return (
    <section className="p-5 sm:p-10" dir={isRTL ? "rtl" : "ltr"}>
      <header>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex flex-col sm:flex-row gap-3 my-5">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t("filter1Placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="han">{t("filter1Option1")}</SelectItem>
              <SelectItem value="greedo">{t("filter1Option2")}</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t("filter2Placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="han">{t("filter2Option1")}</SelectItem>
              <SelectItem value="greedo">{t("filter2Option2")}</SelectItem>
            </SelectContent>
          </Select>
          <Button className="whitespace-nowrap">{t("filterButton")}</Button>
        </div>
      </header>

      <Card className="border-border">
        <CardContent className="p-2">
          {/* Large screens (default table) */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead>{t("customer")}</TableHead>
                  <TableHead>{t("phone")}</TableHead>
                  <TableHead>{t("duration")}</TableHead>
                  <TableHead>{t("scenario")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead>{t("receipt")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>John Doe</TableCell>
                    <TableCell>3:34</TableCell>
                    <TableCell>5:34</TableCell>
                    <TableCell>{t("appointmentBooking")}</TableCell>
                    <TableCell>{t("sampleDate")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4 text-primary" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" className="text-blue-600">
                        {t("view")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Medium screens (simplified table) */}
          <div className="hidden sm:block md:hidden overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead>{t("customer")}</TableHead>
                  <TableHead>{t("duration")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>John Doe</TableCell>
                    <TableCell>5:34</TableCell>
                    <TableCell>{t("sampleDate")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Small screens (stacked cards) */}
          <div className="sm:hidden space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <span className="font-bold">John Doe</span>
                    <span className="text-sm text-muted-foreground">
                      {t("sampleDate")}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>
                      {t("duration")}: <strong>5:34</strong>
                    </span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="link" className="text-blue-600">
                        {t("view")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2 mt-5">
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          1
        </Button>
        <Button size="sm" className="h-8 w-8 p-0">
          2
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          3
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          4
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
