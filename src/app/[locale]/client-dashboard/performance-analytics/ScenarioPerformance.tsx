"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface Scenario {
  id: number;
  name: string;
  calls: number;
  duration: string;
  satisfaction: number;
}

export default function ScenarioPerformance() {
  const t = useTranslations("ScenarioPerformance");

  // Mock data
  const scenarios: Scenario[] = Array.from({ length: 5 }).map((_, index) => ({
    id: index + 1,
    name: `${t("scenario")} ${index + 1}`,
    calls: Math.floor(Math.random() * 100) + 50,
    duration: `${Math.floor(Math.random() * 10) + 1}${t("minutesAbbr")}`,
    satisfaction: Math.floor(Math.random() * 100),
  }));

  // Format numbers based on locale
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(navigator.language).format(value);
  };

  return (
    <Card className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
        <CardTitle className="text-lg font-semibold text-primary">
          {t("title")}
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          {t("viewAll")}
        </Button>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        {/* Desktop View (lg screens and up) */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="w-[30%]">{t("scenarioName")}</TableHead>
                <TableHead className="text-right w-[20%]">
                  {t("calls")}
                </TableHead>
                <TableHead className="w-[20%]">{t("avgDuration")}</TableHead>
                <TableHead className="w-[30%]">{t("satisfaction")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario) => (
                <TableRow key={scenario.id} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{scenario.name}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(scenario.calls)}
                  </TableCell>
                  <TableCell>{scenario.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={scenario.satisfaction}
                        className="w-full h-2"
                      />
                      <span className="text-sm w-12 text-right">
                        {scenario.satisfaction}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Tablet View (md screens) */}
        <div className="hidden md:block lg:hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="w-[40%]">{t("scenario")}</TableHead>
                <TableHead className="text-right w-[30%]">
                  {t("calls")}
                </TableHead>
                <TableHead className="w-[30%]">{t("satisfaction")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario) => (
                <TableRow key={scenario.id} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{scenario.name}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(scenario.calls)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            scenario.satisfaction > 75
                              ? "bg-green-500"
                              : scenario.satisfaction > 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        {scenario.satisfaction}%
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View (sm screens and down) */}
        <div className="md:hidden space-y-2">
          {scenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className="hover:bg-secondary/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-base">{scenario.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {formatNumber(scenario.calls)} {t("calls")}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("avgDuration")}
                    </p>
                    <p className="text-sm">{scenario.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("satisfaction")}
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={scenario.satisfaction}
                        className="w-full h-2"
                      />
                      <span className="text-xs w-8 text-right">
                        {scenario.satisfaction}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ScenarioPerformanceSkeleton() {
  return (
    <Card className="w-full border rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-20" />
      </CardHeader>
      <CardContent className="p-2 pt-0 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}
