"use client";

import { useTranslations } from "next-intl";
import AnalystCard from "./AnalystCard";
import ConversionsRate from "./ConversionsRate";
import DailyAiCalls from "./DailyAiCalls";
import IntentDetection from "./IntentDetection";
import KeywordInsights from "./KeywordInsights";
import PreviousDays from "./PreviousDays";
import ScenarioPerformance from "./ScenarioPerformance";

export default function PerformanceAnalyst() {
  const t = useTranslations("PerformanceAnalyst");

  return (
    <div className={`min-h-screen w-full transition-colors duration-300`}>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Main grid container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {/* KPI Cards - Always full width on mobile, then responsive */}
          <div className="sm:col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <AnalystCard title={t("totalCalls")} number={1250} />
            <AnalystCard title={t("answeredCalls")} number={92} />
            <AnalystCard title={t("ticketsCreated")} number={123} />
            <AnalystCard title={t("averageCallDuration")} number={23} />
            <AnalystCard title={t("customerSatisfaction")} number={34} />
          </div>

          {/* First row - Daily AI Calls and Intent Detection */}
          <div className="sm:col-span-2 lg:col-span-3">
            <DailyAiCalls />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <IntentDetection />
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <ScenarioPerformance />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <KeywordInsights />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <KeywordInsights />
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <ConversionsRate />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <PreviousDays />
          </div>
        </div>
      </div>
    </div>
  );
}
