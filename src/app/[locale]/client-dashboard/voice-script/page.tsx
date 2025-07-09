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

export default function VoiceScript() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState([]);
  const {
    chatbot,
    getChatbotLoading,
    handleDeleteInquiry,
    deleteInquiryLoading,
  } = useChatbot();
  const [openUpdateKeyword, setOpenUpdateKeyword] = useState(false);
  const [selectInquiry, setSelectInquiry] = useState();
  const handleSelectClient = (clientId) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };
  const { currentClient } = useClient();
  return (
    <>
      <section className="p-5 sm:p-10 mb-20">
        <VoiceScriptHeader />
        <CallGreeting />
        <MainConversationScript
          setIsModalOpen={setIsModalOpen}
          setSelectedChatbot={setSelectedChatbot}
          selectedChatbot={selectedChatbot}
          chatbot={chatbot}
          getChatbotLoading={getChatbotLoading}
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
      {isModalOpen && (
        <AddConversationScriptModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {openUpdateKeyword && (
        <UpdateKeywordModal
          setOpenUpdateKeyword={setOpenUpdateKeyword}
          openUpdateKeyword={openUpdateKeyword}
          chatbotId={currentClient?.chatbotId}
          selectInquiry={selectInquiry}
        />
      )}
    </>
  );
}
