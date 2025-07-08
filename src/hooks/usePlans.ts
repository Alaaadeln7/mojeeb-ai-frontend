import {
  useCreatePlanMutation,
  useGetPlansQuery,
} from "@/store/api/plansApiSlice";
import { toast } from "sonner";

// Define types for your plan data and API responses
interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  features: string[];
  // Add other plan properties as needed
}

interface ApiResponse<T> {
  data?: T;
  error?: {
    status: number;
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
}

interface CreatePlanResponse {
  data: Plan;
  message: string;
}

interface PlanFormData {
  name: string;
  description?: string;
  price: number;
  features: string[];
  // Add other form fields as needed
}

export default function usePlans() {
  const [createPlan, { isLoading: createPlanLoading }] =
    useCreatePlanMutation();
  const { data: plans, isLoading: plansLoading } = useGetPlansQuery();

  const handleCreatePlan = async (planData: PlanFormData): Promise<void> => {
    try {
      const response = (await createPlan(
        planData
      ).unwrap()) as ApiResponse<CreatePlanResponse>;
      console.log(response);
      if (response?.data) {
        toast("Plan created successfully!");
      }
    } catch (error: unknown) {
      console.error("Failed to create plan:", error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast(apiError.data?.message || "Failed to create plan");
      } else {
        toast("An unexpected error occurred");
      }
      throw error;
    }
  };

  return {
    plans: plans?.data,
    plansLoading,
    handleCreatePlan,
    createPlanLoading,
  };
}
