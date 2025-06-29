import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  // Add other plan fields as needed
}

interface PlanInput {
  name: string;
  price: number;
  features: string[];
  // Add other plan input fields as needed
}

export const plansApiSlice = createApi({
  reducerPath: "plansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    }/api/plans`,
    credentials: "include",
  }),
  tagTypes: ["Plan"],
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], void>({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Plan" as const, id })), "Plan"]
          : ["Plan"],
    }),
    getPlanById: builder.query<Plan, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Plan", id }],
    }),
    createPlan: builder.mutation<Plan, PlanInput>({
      query: (planData) => ({
        url: "/",
        method: "POST",
        body: planData,
      }),
      invalidatesTags: ["Plan"],
    }),
    updatePlan: builder.mutation<
      Plan,
      { id: string; data: Partial<PlanInput> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Plan", id }],
    }),
    deletePlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Plan", id }],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useLazyGetPlansQuery,
  useGetPlanByIdQuery,
  useLazyGetPlanByIdQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApiSlice;
