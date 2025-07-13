import {
  useCreatePlanMutation,
  useGetPlansQuery,
} from "@/store/api/plansApiSlice";
import { toast } from "sonner";
import { Plan, CreatePlanData } from "./plan";

export default function usePlans() {
  const [createPlan, { isLoading: createPlanLoading }] =
    useCreatePlanMutation();
  const { data: plans, isLoading: plansLoading } = useGetPlansQuery();

  const handleCreatePlan = async (planData: CreatePlanData): Promise<void> => {
    try {
      // Convert price to number if it's a string
      const payload = {
        ...planData,
        price:
          typeof planData.price === "string"
            ? parseFloat(planData.price)
            : planData.price,
      };

      await createPlan(payload).unwrap();
      toast.success("Plan created successfully!");
    } catch (error: any) {
      console.error("Failed to create plan:", error);
      toast.error(error.data?.message || "Failed to create plan");
      throw error;
    }
  };

  return {
    plans: plans?.data as Plan[] | undefined,
    plansLoading,
    handleCreatePlan,
    createPlanLoading,
  };
}
