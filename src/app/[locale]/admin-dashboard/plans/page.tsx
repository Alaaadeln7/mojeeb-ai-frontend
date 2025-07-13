"use client";

import { useState } from "react";
import PlanCard from "./Plan";
import usePlans from "@/hooks/usePlans";
import { Plus } from "lucide-react";
import { PlanCardSkeletons } from "@/components/skeletons/PlansSkeleton";
import CreatePlanModal from "./CreatePlanModal";
import { useTranslations } from "next-intl";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";

export default function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { plans, plansLoading } = usePlans();
  const t = useTranslations("Plans");

  return (
    <>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <section className="container py-8 px-4">
          <Heading
            title={t("title")}
            description={t("description")}
            className="text-center mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {plansLoading ? (
              <PlanCardSkeletons count={3} />
            ) : (
              <>
                {plans?.map((plan) => (
                  <PlanCard
                    key={plan._id}
                    title={plan.title}
                    price={plan.price}
                    currency={plan.currency}
                    billingCycle={
                      plan.interval === "monthly" ? t("/month") : t("/year")
                    }
                    features={plan.features}
                    featured={plan.featured}
                  />
                ))}
                <Card className="flex items-center justify-center p-6 hover:shadow-md transition-shadow w-full max-w-sm border-dashed border-2 border-muted">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-24 w-full flex flex-col gap-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {t("addNewPlan")}
                    </span>
                  </Button>
                </Card>
              </>
            )}
          </div>
        </section>
      </ScrollArea>

      <CreatePlanModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
