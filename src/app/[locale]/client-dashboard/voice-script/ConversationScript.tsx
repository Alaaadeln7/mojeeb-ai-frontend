"use client";

import { Bot, User, Play, Pause, Edit3, Copy, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Inquiry } from "@/types/chatbot";

interface ConversationScriptProps {
  selectedChatbot: Inquiry | null;
  setSelectedChatbot: (inquiry: Inquiry) => void;
  chatbot: Inquiry[];
  getChatbotLoading?: boolean;
  isPlaying?: string | null;
  handlePlay?: (id: string) => void;
}

export default function ConversationScript({
  selectedChatbot,
  setSelectedChatbot,
  chatbot,
  getChatbotLoading = false,
  isPlaying,
  handlePlay,
}: ConversationScriptProps) {
  if (getChatbotLoading) {
    return <ConversationScriptSkeleton count={3} />;
  }

if (!chatbot || chatbot.length === 0) {
  return (
    <Card className="rounded-lg p-8 text-center border border-dashed">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-muted p-4">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-medium">No conversations yet</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Start by creating your first conversation script
          </p>
        </div>
        <Button variant="outline" className="mt-2">
          Create Script
        </Button>
      </div>
    </Card>
  );
}
  const isSelected = (inquiry: Inquiry) => selectedChatbot?._id === inquiry._id;

  return (
    <div className="space-y-4">
      {chatbot.map((item) => (
        <Card
          key={item._id}
          onClick={() => setSelectedChatbot(item)}
          role="button"
          tabIndex={0}
          aria-label={`Select conversation: ${item.question}`}
          className={cn(
            "cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            isSelected(item) &&
              "border-primary bg-primary/5 ring-2 ring-primary/20"
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedChatbot(item);
            }
          }}
        >
          <div className="flex flex-col gap-4">
            {/* Action Buttons */}
            <div className="flex justify-end">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay?.(item._id);
                  }}
                  className="text-violet-600 hover:text-violet-700 hover:bg-violet-100"
                >
                  {isPlaying === item._id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {/* Customer Message */}
              <div className="flex justify-end">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div className="flex flex-col items-end">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
                      <p className="text-sm leading-relaxed">{item.question}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-slate-500">Customer</span>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-violet-100 text-violet-700">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                      <p className="text-sm leading-relaxed">{item.answer}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-slate-500">
                        AI Assistant
                      </span>
                      {item.voice && (
                        <>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-400">
                            {item.voice}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

interface ConversationScriptSkeletonProps {
  count?: number;
}

function ConversationScriptSkeleton({
  count = 3,
}: ConversationScriptSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="rounded-lg p-4">
          <div className="flex flex-col gap-3">
            {/* Customer Skeleton - Right aligned */}
            <div className="flex justify-end">
              <div className="flex max-w-[90%] flex-col items-end space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-[80px] rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl rounded-tr-none" />
              </div>
            </div>

            {/* AI Skeleton - Left aligned */}
            <div className="flex justify-start">
              <div className="flex max-w-[90%] flex-col items-start space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-5 w-[80px] rounded-full" />
                </div>
                <Skeleton className="h-16 w-full rounded-xl rounded-tl-none" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
