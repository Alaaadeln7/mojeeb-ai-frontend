import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChatbotItem {
  _id: string;
  question: string;
  answer: string;
}

interface ConversationScriptProps {
  selectedChatbot: string | string[];
  setSelectedChatbot: (id: string) => void;
  chatbot: ChatbotItem[];
  getChatbotLoading: boolean;
}

export default function ConversationScript({
  selectedChatbot,
  setSelectedChatbot,
  chatbot,
  getChatbotLoading,
}: ConversationScriptProps) {
  const t = useTranslations("ConversationScript");

  if (getChatbotLoading) return <ConversationScriptSkeleton />;
  if (!chatbot) return null;
  if (chatbot.length === 0) {
    return (
      <Card className="text-center p-8 rounded-xl">
        <p className="text-muted-foreground">{t("noScriptsAvailable")}</p>
      </Card>
    );
  }

  const isSelected = (id: string) => {
    if (Array.isArray(selectedChatbot)) {
      return selectedChatbot.includes(id);
    }
    return selectedChatbot === id;
  };

  return (
    <div className="space-y-3">
      {chatbot.map((item) => (
        <Card
          key={item._id}
          onClick={() => setSelectedChatbot(item._id)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:border-primary/30",
            isSelected(item._id)
              ? "border-primary shadow-md bg-primary/5"
              : "border-border"
          )}
        >
          {/* Customer Message */}
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
                C
              </div>
            </div>
            <div className="chat-header text-sm font-medium">
              {t("customer")}
            </div>
            <div className="chat-bubble bg-primary text-primary-foreground">
              {item.question}
            </div>
          </div>

          {/* AI Response */}
          <div className="chat chat-start mt-3">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                <Bot className="size-5 text-secondary-foreground" />
              </div>
            </div>
            <div className="chat-header text-sm font-medium">{t("aiName")}</div>
            <div className="chat-bubble bg-secondary text-secondary-foreground">
              {item.answer}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ConversationScriptSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-4 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="flex items-center space-x-4 mt-6 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-16 w-full rounded-lg" />
        </Card>
      ))}
    </div>
  );
}
