export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type PlanInput = Omit<Plan, "id" | "createdAt" | "updatedAt">;
