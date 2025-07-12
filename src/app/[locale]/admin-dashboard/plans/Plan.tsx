import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
  return (
    <Card
      className={`relative w-80 transition-all hover:shadow-xl ${
        featured ? "border-2 border-primary scale-[1.03] shadow-lg" : "border"
      }`}
    >
      {featured && (
        <Badge
          variant="secondary"
          className="absolute -right-[1px] -top-[1px] rounded-bl-lg rounded-tr-lg font-bold"
        >
          POPULAR
        </Badge>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className={`text-xl ${featured ? "text-primary" : ""}`}>
          {title}
        </CardTitle>

        <div className="mt-2">
          <span
            className={`text-4xl font-bold ${featured ? "text-primary" : ""}`}
          >
            {currency}
            {price}
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            {billingCycle}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check
                className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                  featured ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button onClick={onClick} size="lg" className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
