import { useState } from "react";

interface ChatHistory {
  role: "user" | "assistant"; // local type
  content: string;
}

export function useGeminiAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Chat mode (used in AIChatSidebar)
  const chatWithAI = async (message: string, history: ChatHistory[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...history.map((m) => ({
                role: m.role === "assistant" ? "model" : "user", // ✅ FIX
                parts: [{ text: m.content }],
              })),
              { role: "user", parts: [{ text: message }] }, // current user message
            ],
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to get AI response");
      }

      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from AI"
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Suggestion mode (used in CollaborativeEditor)
  const generateSuggestion = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text }] }], // ✅ must specify role
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to get AI suggestion");
      }

      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No suggestion from AI"
      );
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { chatWithAI, generateSuggestion, isLoading, error };
}
