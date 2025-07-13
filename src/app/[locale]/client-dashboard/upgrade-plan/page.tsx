"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

export default function UpgradePlan() {
  const t = useTranslations("UpgradePlan");
  const isLoading = false; // Replace with your actual loading state

  const plans: Plan[] = [
    {
      name: "Free",
      price: "$0",
      description: t("plans.free.description"),
      features: [
        t("plans.free.features.current"),
        t("plans.free.features.conversions"),
        t("plans.free.features.characters"),
        t("plans.free.features.support"),
      ],
      isCurrent: true,
    },
    {
      name: "Pro",
      price: "$10",
      description: t("plans.pro.description"),
      features: [
        t("plans.pro.features.billing"),
        t("plans.pro.features.conversions"),
        t("plans.pro.features.characters"),
        t("plans.pro.features.support"),
      ],
    },
    {
      name: "Premium",
      price: "$20",
      description: t("plans.premium.description"),
      features: [
        t("plans.premium.features.billing"),
        t("plans.premium.features.conversions"),
        t("plans.premium.features.characters"),
        t("plans.premium.features.support"),
      ],
      isPopular: true,
    },
  ];

  const commonFeatures = [
    t("commonFeatures.streamed"),
    t("commonFeatures.generation"),
    t("commonFeatures.explanation"),
    t("commonFeatures.guarantee"),
    t("commonFeatures.cancel"),
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 mx-10">
        <Skeleton className="h-10 w-[200px] mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-8 w-1/2 mb-6" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[300px] mx-auto">
          <TabsTrigger value="monthly">{t("billing.monthly")}</TabsTrigger>
          <TabsTrigger value="yearly">
            {t("billing.yearly")} ({t("billing.save")} 20%)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "p-6 flex flex-col",
              plan.isPopular && "border-2 border-primary"
            )}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              {plan.isPopular && (
                <Badge className="bg-primary text-primary-foreground">
                  {t("popular")}
                </Badge>
              )}
              {plan.isCurrent && (
                <Badge variant="outline">{t("current")}</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2">{plan.description}</p>
            <p className="text-3xl font-bold my-4">{plan.price}</p>

            <ul className="space-y-2 flex-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.isCurrent ? "outline" : "default"}
              className={cn(
                "mt-6",
                plan.isPopular && "bg-primary hover:bg-primary/90"
              )}
            >
              {plan.isCurrent
                ? t("currentButton")
                : t("chooseButton", { plan: plan.name })}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t("commonFeatures.title")}
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {commonFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
