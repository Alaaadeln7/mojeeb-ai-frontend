"use client";

import { useState } from "react";
import Plan from "./Plan";
import usePlans from "@/hooks/usePlans";
import { Plus } from "lucide-react";
import { PlanCardSkeletons } from "@/components/skeletons/PlansSkeleton";
import CreatePlanModal from "./CreatePlanModal";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading"; // You may need to create this

export default function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { plans, plansLoading } = usePlans();

  const renderPlans = plans?.map((plan, index) => (
    <Plan
      key={plan._id}
      title={plan.title}
      id={plan._id}
      price={plan.price}
      currency={plan.currency}
      billingCycle={plan.billingCycle}
      features={plan.features}
    />
  ));

  return (
    <>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <section className="container py-8">
          <Heading
            title="Plans"
            description="Manage your subscription plans"
            className="text-center mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plansLoading ? (
              <PlanCardSkeletons count={3} />
            ) : (
              <>
                {renderPlans}
                <Card className="flex items-center justify-center p-6 hover:shadow-md transition-shadow">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-24 w-24 rounded-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Add new plan</span>
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
