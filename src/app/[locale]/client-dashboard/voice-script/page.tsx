"use client";

import { useState } from "react";
import AddConversationScriptModal from "./AddConversationScriptModal";
import CallGreeting from "./CallGreeting";
import KeywordBaseReplies from "./KeywordBaseReplies";
import MainConversationScript from "./MainConversationScript";
import VoiceScriptHeader from "./VoiceScriptHeader";
import useChatbot from "@/hooks/useChatbot";
import UpdateKeywordModal from "./UpdateKeywordModal";
import useClient from "@/hooks/useClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Inquiry } from "@/types/chatbot";

export default function VoiceScript() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectInquiry, setSelectInquiry] = useState<Inquiry | null>(null);
  const [openUpdateKeyword, setOpenUpdateKeyword] = useState<boolean>(false);

  const {
    chatbot,
    getChatbotLoading,
    handleDeleteInquiry,
    deleteInquiryLoading,
  } = useChatbot();

  const { currentClient } = useClient();

  if (getChatbotLoading) {
    return (
      <div className="p-5 sm:p-10 mb-20 space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="p-5 sm:p-10 mb-20 space-y-6">
        <VoiceScriptHeader />

        <CallGreeting />

        <MainConversationScript
          setIsModalOpen={setIsModalOpen}
          setSelectedChatbot={setSelectInquiry}
          selectedChatbot={selectInquiry}
          chatbot={chatbot}
          getChatbotLoading={getChatbotLoading}
          handleDeleteInquiry={handleDeleteInquiry}
          deleteInquiryLoading={deleteInquiryLoading}
          chatbotId={currentClient?.chatbotId ?? ""}
        />

        <KeywordBaseReplies
          chatbot={chatbot}
          setOpenUpdateKeyword={setOpenUpdateKeyword}
          setSelectInquiry={(inquiry) => setSelectInquiry(inquiry as Inquiry)}
        />
      </section>

      <AddConversationScriptModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <UpdateKeywordModal
        setOpenUpdateKeyword={setOpenUpdateKeyword}
        openUpdateKeyword={openUpdateKeyword}
        chatbotId={currentClient?.chatbotId ?? ""}
        selectInquiry={selectInquiry}
      />
    </>
  );
}
