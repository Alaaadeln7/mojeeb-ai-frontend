"use client";

import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useClient from "@/hooks/useClient";

export default function NotificationsPreference() {
  const t = useTranslations("NotificationsPreference");
  const { theme } = useTheme();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const {
    handleEmailNotification,
    emailNotificationLoading,
    handlePlanUsageAlert,
    planUsageAlertLoading,
    handlePerformanceReports,
    performanceReportsLoading,
    handleTicketEscalationAlert,
    ticketEscalationAlertLoading,
    currentClient,
  } = useClient();

  return (
    <Card className={`p-5 rounded-2xl ${theme === "dark" ? "bg-card" : ""}`}>
      <CardHeader className="p-0 pb-5">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 my-5 gap-3"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Email Notifications */}
          <div className="flex items-center gap-3">
            {emailNotificationLoading ? (
              <Skeleton className="h-6 w-11 rounded-full" />
            ) : (
              <Switch
                id="email-notifications"
                checked={currentClient?.emailNotification || false}
                onCheckedChange={handleEmailNotification}
              />
            )}
            <Label htmlFor="email-notifications" className="cursor-pointer">
              {t("emailNotifications")}
            </Label>
          </div>

          {/* Plan Usage Alert */}
          <div className="flex items-center gap-3">
            {planUsageAlertLoading ? (
              <Skeleton className="h-6 w-11 rounded-full" />
            ) : (
              <Switch
                id="plan-usage-alert"
                checked={currentClient?.planUsageAlert || false}
                onCheckedChange={handlePlanUsageAlert}
              />
            )}
            <Label htmlFor="plan-usage-alert" className="cursor-pointer">
              {t("planUsageAlert")}
            </Label>
          </div>

          {/* Ticket Escalation Alert */}
          <div className="flex items-center gap-3">
            {ticketEscalationAlertLoading ? (
              <Skeleton className="h-6 w-11 rounded-full" />
            ) : (
              <Switch
                id="ticket-escalation-alert"
                checked={currentClient?.ticketEscalationAlert || false}
                onCheckedChange={handleTicketEscalationAlert}
              />
            )}
            <Label htmlFor="ticket-escalation-alert" className="cursor-pointer">
              {t("ticketEscalationAlert")}
            </Label>
          </div>

          {/* Performance Reports */}
          <div className="flex items-center gap-3">
            {performanceReportsLoading ? (
              <Skeleton className="h-6 w-11 rounded-full" />
            ) : (
              <Switch
                id="performance-reports"
                checked={currentClient?.performanceReports || false}
                onCheckedChange={handlePerformanceReports}
              />
            )}
            <Label htmlFor="performance-reports" className="cursor-pointer">
              {t("performanceReports")}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
