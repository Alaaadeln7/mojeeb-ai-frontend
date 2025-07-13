import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface PlanCardProps {
  title: string;
  price: number;
  currency?: string;
  billingCycle?: string;
  features: string[];
  featured?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

export default function PlanCard({
  title,
  price,
  currency = "$",
  billingCycle = "/month",
  features,
  featured = false,
  buttonText = "Get Started",
  onClick = () => {},
}: PlanCardProps) {
  const t = useTranslations("Plans");

  return (
    <Card
      className={`relative w-full max-w-sm transition-all hover:shadow-xl border-border ${
        featured ? "border-2 border-primary shadow-lg" : ""
      }`}
    >
      {featured && (
        <Badge
          variant="default"
          className="absolute -right-[1px] -top-[1px] rounded-bl-lg rounded-tr-lg font-bold bg-primary"
        >
          {t("popular")}
        </Badge>
      )}

      <CardHeader className="text-center pb-4 space-y-2">
        <CardTitle
          className={`text-2xl ${
            featured ? "text-primary" : "text-foreground"
          }`}
        >
          {title}
        </CardTitle>

        <div className="mt-2">
          <span
            className={`text-4xl font-bold ${
              featured ? "text-primary" : "text-foreground"
            }`}
          >
            {currency}
            {price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            {billingCycle}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check
                className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                  featured ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onClick}
          size="lg"
          className="w-full mt-6"
          variant={featured ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
