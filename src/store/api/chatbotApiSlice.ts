import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ChatbotData {
  id: string;
  // Add other chatbot fields as needed
}

interface InquiryData {
  // Define the structure of inquiry data
  id?: string;
  question: string;
  answer: string;
  // Add other inquiry fields as needed
}

interface SpeakData {
  text: string;
  // Add other speak fields as needed
}

export const chatbotApiSlice = createApi({
  reducerPath: "chatbotApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    }chatbot`,
    credentials: "include",
  }),
  tagTypes: ["Chatbot"],
  endpoints: (builder) => ({
    getChatbot: builder.query<ChatbotData, { chatbotId: string }>({
      query: ({ chatbotId }) => `/${chatbotId}`,
      providesTags: ["Chatbot"],
    }),
    updateChatbot: builder.mutation<
      ChatbotData,
      { id: string; [key: string]: string }
    >({
      query: ({ id, ...chatbotData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: chatbotData,
      }),
      invalidatesTags: ["Chatbot"],
    }),
    deleteChatbot: builder.mutation<{ message: string }, { id: string }>({
      query: (data) => ({
        url: "/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Chatbot"],
    }),
    addInquiry: builder.mutation<
      { message: string; inquiry: InquiryData },
      InquiryData
    >({
      query: (inquiryData) => ({
        url: `/create`,
        method: "POST",
        body: inquiryData,
      }),
      invalidatesTags: ["Chatbot"],
    }),
    updateInquiry: builder.mutation<
      { message: string; inquiry: InquiryData },
      InquiryData
    >({
      query: (inquiryData) => ({
        url: `/update`,
        method: "PUT",
        body: inquiryData,
      }),
      invalidatesTags: ["Chatbot"],
    }),
    deleteInquiry: builder.mutation<{ message: string }, { id: string }>({
      query: (data) => ({
        url: `/delete`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Chatbot"],
    }),
    speak: builder.mutation<Blob, SpeakData>({
      query: (body) => ({
        url: "/speak",
        method: "POST",
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();
          return blob;
        },
      }),
    }),
  }),
});

export const {
  useGetChatbotQuery,
  useUpdateChatbotMutation,
  useDeleteChatbotMutation,
  useAddInquiryMutation,
  useSpeakMutation,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
} = chatbotApiSlice;
