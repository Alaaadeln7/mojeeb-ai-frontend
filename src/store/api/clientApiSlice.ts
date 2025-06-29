import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Client {
  id: string;
  name: string;
  email: string;
  // Add other client fields as needed
}

interface ClientData {
  // Define the structure of client data
  name: string;
  email: string;
  // Add other client fields as needed
}

export const clientApiSlice = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    }clients`,
    credentials: "include",
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    createClient: builder.mutation<
      { message: string; client: Client },
      ClientData
    >({
      query: (clientData) => ({
        url: "/create",
        method: "POST",
        body: clientData,
      }),
      invalidatesTags: ["Client"],
    }),
    getClients: builder.query<
      { clients: Client[]; total: number },
      { page: number }
    >({
      query: ({ page }) =>
        `/?page=${page}&limit=${process.env.NEXT_PUBLIC_PAGE_LIMIT}`,
      providesTags: ["Client"],
    }),
    getClientById: builder.query<Client, string>({
      query: (id) => `/${id}`,
      providesTags: ["Client"],
    }),
    updateClient: builder.mutation<
      Client,
      { id: string; clientData: Partial<ClientData> }
    >({
      query: ({ id, clientData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: clientData,
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
    searchClient: builder.query<Client[], string>({
      query: (query) => `search/${query}`,
    }),
    emailNotification: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/email-notification`,
        method: "POST",
      }),
      invalidatesTags: ["Client"],
    }),
    planUsageAlert: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/plan-usage-alert`,
        method: "POST",
      }),
      invalidatesTags: ["Client"],
    }),
    performanceReports: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/performance-reports`,
        method: "POST",
      }),
      invalidatesTags: ["Client"],
    }),
    ticketEscalationAlert: builder.mutation<
      { message: string },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/${id}/ticket-escalation-alert`,
        method: "POST",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useSearchClientQuery,
  useEmailNotificationMutation,
  usePlanUsageAlertMutation,
  usePerformanceReportsMutation,
  useTicketEscalationAlertMutation,
} = clientApiSlice;
