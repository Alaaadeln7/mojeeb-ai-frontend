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
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function VoiceScript() {
  const { theme } = useTheme();
  const t = useTranslations("VoiceScript");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const {
    chatbot,
    getChatbotLoading,
    handleDeleteInquiry,
    deleteInquiryLoading,
  } = useChatbot();
  const [openUpdateKeyword, setOpenUpdateKeyword] = useState(false);
  const [selectInquiry, setSelectInquiry] = useState();
  const { currentClient } = useClient();

  const handleSelectClient = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

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
          setSelectedChatbot={setSelectedChatbot}
          selectedChatbot={selectedChatbot}
          chatbot={chatbot}
          handleDeleteInquiry={handleDeleteInquiry}
          deleteInquiryLoading={deleteInquiryLoading}
          chatbotId={currentClient?.chatbotId}
        />

        <KeywordBaseReplies
          chatbot={chatbot}
          setOpenUpdateKeyword={setOpenUpdateKeyword}
          setSelectInquiry={setSelectInquiry}
        />
      </section>

      <AddConversationScriptModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <UpdateKeywordModal
        setOpenUpdateKeyword={setOpenUpdateKeyword}
        openUpdateKeyword={openUpdateKeyword}
        chatbotId={currentClient?.chatbotId}
        selectInquiry={selectInquiry}
      />
    </>
  );
}
