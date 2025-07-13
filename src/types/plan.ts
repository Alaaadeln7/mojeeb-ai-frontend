export interface Plan {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: string;
  interval: "monthly" | "yearly";
  features: string[];
  size?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePlanData {
  title: string;
  description: string;
  price: number | string;
  interval: "monthly" | "yearly";
  features: string[];
  size?: string;
}

export interface PlanCardProps {
  plan: Plan;
  onEdit?: (plan: Plan) => void;
  onDelete?: (planId: string) => void;
  featured?: boolean;
}
