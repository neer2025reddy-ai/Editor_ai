import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeminiAI } from "@/hooks/useGeminiAI";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AIChatSidebarProps {
  className?: string;
}

export const AIChatSidebar = ({ className }: AIChatSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI writing assistant. Ask me anything! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const { chatWithAI, isLoading, error } = useGeminiAI();

  // ✅ Send message handler
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const aiText = await chatWithAI(
        userMessage.content,
        messages.map((m) => ({
          role: m.type === "ai" ? "assistant" : "user",
          content: m.content,
        }))
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : "Error talking to AI";
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `⚠️ ${errorText}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  // ✅ Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-b from-card to-card/80 border border-border rounded-xl animate-slide-up",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card/50 rounded-t-xl">
        <Bot className="h-6 w-6 text-primary" />
        <h3 className="font-semibold text-sm">AI Assistant</h3>
        <p className="text-xs text-muted-foreground ml-auto">
          {isLoading ? "Thinking..." : "Ready to help"}
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                message.type === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div className="flex-shrink-0">
                {message.type === "ai" ? (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center glow-primary">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center glow-accent">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-xl p-3 chat-message",
                  message.type === "user" ? "user" : "ai"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Loader while waiting for AI */}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/30">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI for help..."
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
