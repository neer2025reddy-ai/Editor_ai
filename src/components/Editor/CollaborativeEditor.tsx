import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGeminiAI } from "@/hooks/useGeminiAI";

interface CollaborativeEditorProps {
  className?: string;
}

export const CollaborativeEditor = ({ className }: CollaborativeEditorProps) => {
  const { generateSuggestion, isLoading, error } = useGeminiAI();
  const [aiSuggestion, setAiSuggestion] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your masterpiece... ✨",
        showOnlyWhenEditable: true,
      }),
    ],
    content: `
      <h1>Welcome to Your Collaborative Editor!</h1>
      <p>This is where the magic happens. Start typing, and let the AI assist you in creating amazing content.</p>
      <p>Try selecting some text and ask the AI for suggestions, or simply start writing your ideas.</p>
    `,
    editorProps: {
      attributes: {
        class: "editor-content",
      },
    },
  });

  if (!editor) {
    return (
      <div className="editor-container animate-pulse">
        <div className="h-96 bg-muted rounded-lg"></div>
      </div>
    );
  }

  // 🔥 Handle AI Suggest button
  const handleAISuggest = async () => {
    try {
      const fullText = editor.getText(); // entire editor text
      const selection = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );

      const suggestion = await generateSuggestion(selection || fullText);
      if (suggestion) {
        setAiSuggestion(suggestion);
      }
    } catch (err) {
      console.error("AI Suggestion failed:", err);
    }
  };

  return (
    <div className={cn("editor-container animate-fade-in", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-4 border-b border-editor-border bg-card/50 rounded-t-xl">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "h-8 w-8 p-0 transition-all",
              editor.isActive("bold")
                ? "bg-primary text-primary-foreground glow-primary"
                : ""
            )}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "h-8 w-8 p-0 transition-all",
              editor.isActive("italic")
                ? "bg-primary text-primary-foreground glow-primary"
                : ""
            )}
          >
            <Italic className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "h-8 w-8 p-0 transition-all",
              editor.isActive("bulletList")
                ? "bg-primary text-primary-foreground glow-primary"
                : ""
            )}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "h-8 w-8 p-0 transition-all",
              editor.isActive("orderedList")
                ? "bg-primary text-primary-foreground glow-primary"
                : ""
            )}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(
              "h-8 w-8 p-0 transition-all",
              editor.isActive("blockquote")
                ? "bg-primary text-primary-foreground glow-primary"
                : ""
            )}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="h-8 w-8 p-0"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="h-8 w-8 p-0"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto">
          <Button
            onClick={handleAISuggest}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-white glow-primary animate-glow"
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isLoading ? "Thinking..." : "AI Suggest"}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent
          editor={editor}
          className="min-h-[400px] max-h-[600px] overflow-y-auto"
        />

        {/* AI Suggestion box */}
        {aiSuggestion && (
          <div className="m-4 p-3 border rounded-lg bg-card shadow">
            <h4 className="font-semibold mb-2">AI Suggestion</h4>
            <p className="text-sm whitespace-pre-wrap">{aiSuggestion}</p>
          </div>
        )}

        {error && <p className="text-red-500 m-4">{error}</p>}

        {/* Status indicator */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
    </div>
  );
};
