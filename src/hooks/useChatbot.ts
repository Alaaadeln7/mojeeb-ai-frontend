import {
  useDeleteChatbotMutation,
  useUpdateChatbotMutation,
  useAddInquiryMutation,
  useGetChatbotQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} from "@/store/api/chatbotApiSlice";
import { toast } from "@/components/ui/sonner";
import useClient from "./useClient";

// Type definitions
interface BaseResponse {
  success: boolean;
  message?: string;
}

interface Chatbot {
  id: string;
  name: string;
  // Add other chatbot properties as needed
  inquiries: Inquiry[];
}

interface Inquiry {
  id: string;
  question: string;
  answer: string;
  keyword: string;
  chatbotId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ChatbotResponse extends BaseResponse {
  data: {
    inquiries: Inquiry[];
  };
}

interface UpdateChatbotParams {
  id: string;
  name?: string;
  // Include other updatable fields
}

interface AddInquiryParams {
  question: string;
  answer: string;
  keyword: string;
  chatbotId: string;
}

interface UpdateInquiryParams {
  id: string;
  question?: string;
  answer?: string;
  keyword?: string;
  chatbotId: string;
}

interface DeleteInquiryParams {
  id: string;
  chatbotId: string;
}

const handleError = (
  error: { data?: { message?: string } },
  action: string
): never => {
  console.error(`Failed to ${action}:`, error);
  const message = error?.data?.message || `Failed to ${action}`;
  toast(message);
  throw error;
};

const notifySuccess = (action: string): void => {
  toast(`${action} successfully!`);
};

export default function useChatbot() {
  const { currentClient } = useClient();

  // RTK Query hooks
  const { data: chatbot, isLoading: getChatbotLoading } = useGetChatbotQuery(
    { chatbotId: currentClient?.chatbotId || "" },
    { skip: !currentClient?.chatbotId }
  );

  const [updateChatbot, { isLoading: updateChatbotLoading }] =
    useUpdateChatbotMutation();
  const [deleteChatbot, { isLoading: deleteChatbotLoading }] =
    useDeleteChatbotMutation();
  const [addInquiry, { isLoading: addInquiryLoading }] =
    useAddInquiryMutation();
  const [updateInquiry, { isLoading: updateInquiryLoading }] =
    useUpdateInquiryMutation();
  const [deleteInquiry, { isLoading: deleteInquiryLoading }] =
    useDeleteInquiryMutation();

  // Chatbot operations
  const handleUpdateChatbot = async (
    id: string,
    chatbotData: UpdateChatbotParams
  ): Promise<Chatbot> => {
    try {
      const response = await updateChatbot({ id, ...chatbotData }).unwrap();
      notifySuccess("Chatbot updated");
      return response.data;
    } catch (error: unknown) {
      return handleError(
        error as { data?: { message?: string } },
        "update chatbot"
      );
    }
  };

  const handleDeleteChatbot = async (id: string): Promise<void> => {
    try {
      await deleteChatbot(id).unwrap();
      notifySuccess("Chatbot deleted");
    } catch (error: unknown) {
      handleError(error as { data?: { message?: string } }, "delete chatbot");
    }
  };

  // Inquiry operations
  const handleAddInquiry = async ({
    question,
    answer,
    keyword,
  }: Omit<AddInquiryParams, "chatbotId">): Promise<Inquiry> => {
    if (!currentClient?.chatbotId) {
      throw new Error("No chatbot ID available");
    }

    try {
      const res = await addInquiry({
        question,
        answer,
        keyword,
        chatbotId: currentClient.chatbotId,
      }).unwrap();

      if (res.data) notifySuccess("Inquiry added");
      return res.data;
    } catch (error: unknown) {
      return handleError(
        error as { data?: { message?: string } },
        "add inquiry"
      );
    }
  };

  const handleUpdateInquiry = async (
    inquiryData: UpdateInquiryParams
  ): Promise<Inquiry> => {
    try {
      const response = await updateInquiry(inquiryData).unwrap();
      notifySuccess("Inquiry updated");
      return response.data;
    } catch (error: unknown) {
      return handleError(
        error as { data?: { message?: string } },
        "update inquiry"
      );
    }
  };

  const handleDeleteInquiry = async (
    data: DeleteInquiryParams
  ): Promise<void> => {
    try {
      const res = await deleteInquiry(data).unwrap();
      if (res.data) notifySuccess("Inquiry deleted");
    } catch (error: unknown) {
      handleError(error as { data?: { message?: string } }, "delete inquiry");
    }
  };

  return {
    chatbot: chatbot?.data?.inquiries,
    handleUpdateChatbot,
    handleDeleteChatbot,
    getChatbotLoading,
    updateChatbotLoading,
    deleteChatbotLoading,
    handleAddInquiry,
    addInquiryLoading,
    handleUpdateInquiry,
    updateInquiryLoading,
    deleteInquiryLoading,
    handleDeleteInquiry,
  };
}
