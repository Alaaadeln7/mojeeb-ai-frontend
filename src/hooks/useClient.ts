"use client";

import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useEmailNotificationMutation,
  useGetClientByIdQuery,
  useGetClientsQuery,
  usePerformanceReportsMutation,
  usePlanUsageAlertMutation,
  useTicketEscalationAlertMutation,
  useUpdateClientMutation,
} from "@/store/api/clientApiSlice";
import { toast } from "@/components/ui/sonner";
import useAuth from "./useAuth";
import { useState } from "react";

interface Client {
  _id: string;
  [key: string]: any;
}

interface ApiResponse {
  data?: Client | Client[];
  message?: string;
  totalPages?: number;
}

export default function useClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useAuth();

  // RTK Query hooks
  const [createClient, { isLoading: createClientLoading }] =
    useCreateClientMutation();
  const { data: clients, isLoading: getClientsLoading } = useGetClientsQuery({
    page: currentPage,
  });
  const { data: currentClient, isLoading: getClientLoading } =
    useGetClientByIdQuery(user?._id ?? "");
  const [updateClient, { isLoading: updateClientLoading }] =
    useUpdateClientMutation();
  const [deleteClient, { isLoading: deleteClientLoading }] =
    useDeleteClientMutation();
  const [emailNotification, { isLoading: emailNotificationLoading }] =
    useEmailNotificationMutation();
  const [planUsageAlert, { isLoading: planUsageAlertLoading }] =
    usePlanUsageAlertMutation();
  const [performanceReports, { isLoading: performanceReportsLoading }] =
    usePerformanceReportsMutation();
  const [ticketEscalationAlert, { isLoading: ticketEscalationAlertLoading }] =
    useTicketEscalationAlertMutation();

  const clientId = currentClient?.data?._id ?? "";

  const showToast = (
    title: string,
    description?: string,
    variant: "default" | "destructive" = "default"
  ) => {
    toast({
      title,
      description,
      variant,
    });
  };

  const handleEmailNotification = async (): Promise<void> => {
    try {
      const response = await emailNotification({ id: clientId }).unwrap();
      showToast("Success", response?.message ?? "Email notification sent");
    } catch (error) {
      console.error("Failed to send email notification:", error);
      showToast("Error", "Failed to send email notification", "destructive");
      throw error;
    }
  };

  const handlePlanUsageAlert = async (): Promise<void> => {
    try {
      const response = await planUsageAlert({ id: clientId }).unwrap();
      showToast("Success", response?.message ?? "Plan usage alert sent");
    } catch (error) {
      console.error("Failed to send plan usage alert:", error);
      showToast("Error", "Failed to send plan usage alert", "destructive");
      throw error;
    }
  };

  const handlePerformanceReports = async (): Promise<void> => {
    try {
      const response = await performanceReports({ id: clientId }).unwrap();
      showToast("Success", response?.message ?? "Performance report sent");
    } catch (error) {
      console.error("Failed to send performance report:", error);
      showToast("Error", "Failed to send performance report", "destructive");
      throw error;
    }
  };

  const handleTicketEscalationAlert = async (): Promise<void> => {
    try {
      const response = await ticketEscalationAlert({ id: clientId }).unwrap();
      showToast("Success", response?.message ?? "Ticket escalation alert sent");
    } catch (error) {
      console.error("Failed to send ticket escalation alert:", error);
      showToast(
        "Error",
        "Failed to send ticket escalation alert",
        "destructive"
      );
      throw error;
    }
  };

  const handleCreateClient = async (
    clientData: Partial<Client>
  ): Promise<void> => {
    try {
      await createClient(clientData).unwrap();
      showToast("Success", "Client created successfully");
    } catch (error: any) {
      console.error("Failed to create client:", error);
      showToast(
        "Error",
        error?.data?.data?.message ?? "Failed to create client",
        "destructive"
      );
      throw error;
    }
  };

  const handleUpdateClient = async (
    id: string,
    clientData: Partial<Client>
  ): Promise<ApiResponse> => {
    try {
      const response = await updateClient({ id, clientData }).unwrap();
      showToast("Success", "Client updated successfully");
      return response;
    } catch (error) {
      console.error("Failed to update client:", error);
      showToast("Error", "Failed to update client", "destructive");
      throw error;
    }
  };

  const handleDeleteClient = async (id: string): Promise<ApiResponse> => {
    try {
      const response = await deleteClient(id).unwrap();
      showToast("Success", "Client deleted successfully");
      return response;
    } catch (error) {
      console.error("Failed to delete client:", error);
      showToast("Error", "Failed to delete client", "destructive");
      throw error;
    }
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  return {
    handleCreateClient,
    clients: clients?.data as Client[] | undefined,
    handleUpdateClient,
    handleDeleteClient,
    createClientLoading,
    getClientsLoading,
    updateClientLoading,
    deleteClientLoading,
    currentPage,
    handlePageChange,
    currentClient: currentClient?.data as Client | undefined,
    getClientLoading,
    totalPages: clients?.data?.totalPages as number | undefined,
    handleEmailNotification,
    emailNotificationLoading,
    handlePlanUsageAlert,
    planUsageAlertLoading,
    handlePerformanceReports,
    performanceReportsLoading,
    handleTicketEscalationAlert,
    ticketEscalationAlertLoading,
  };
}
