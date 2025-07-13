"use client";

import { MessageSquareText, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import ConversationScript from "./ConversationScript";
import { Skeleton } from "@/components/ui/skeleton";
import type { Inquiry } from "@/types/chatbot";

interface MainConversationScriptProps {
  setIsModalOpen: (open: boolean) => void;
  setSelectedChatbot: (inquiry: Inquiry | null) => void;
  selectedChatbot: Inquiry | null;
  chatbot: Inquiry[];
  getChatbotLoading: boolean;
  handleDeleteInquiry: (params: {
    chatbotId: string;
    inquiryId: string;
  }) => Promise<void>;
  deleteInquiryLoading: boolean;
  chatbotId: string;
  title?: string;
}

export default function MainConversationScript({
  setIsModalOpen,
  setSelectedChatbot,
  selectedChatbot,
  chatbot,
  getChatbotLoading,
  handleDeleteInquiry,
  deleteInquiryLoading,
  chatbotId,
  title = "Conversation Scripts",
}: MainConversationScriptProps) {
  const { theme } = useTheme();

  const handleAddClick = () => setIsModalOpen(true);

  const handleDeleteClick = async () => {
    if (!selectedChatbot) return;

    try {
      await handleDeleteInquiry({
        chatbotId,
        inquiryId: selectedChatbot._id,
      });
      setSelectedChatbot(null);
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  return (
    <Card className="p-6 mt-6" data-theme={theme}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <MessageSquareText className="text-primary-foreground size-5" />
          </div>
          <h3 className="text-2xl font-semibold text-primary">{title}</h3>
        </div>
      </div>

      {/* Content area */}
      <Card className="p-4 mb-6">
        {getChatbotLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <ConversationScript
            setSelectedChatbot={setSelectedChatbot}
            selectedChatbot={selectedChatbot}
            chatbot={chatbot}
            getChatbotLoading={getChatbotLoading}
          />
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <Button onClick={handleAddClick} className="gap-2">
          <Plus className="size-5" />
          Add New Script
        </Button>

        {selectedChatbot && (
          <Button
            onClick={handleDeleteClick}
            disabled={deleteInquiryLoading}
            variant="destructive"
            className="gap-2"
          >
            {deleteInquiryLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Trash2 className="size-5" />
            )}
            Delete Selected
          </Button>
        )}
      </div>
    </Card>
  );
}
