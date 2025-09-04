import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollaborativeEditor } from '@/components/Editor/CollaborativeEditor';
import { AIChatSidebar } from '@/components/Chat/AIChatSidebar';
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  Users, 
  Share, 
  Save,
  FileText,
  Settings,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const EditorLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAISuggest = () => {
    // This will be called when the AI Suggest button is clicked in the editor
    console.log('AI Suggest clicked');
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Collaborative Editor</h1>
              <p className="text-xs text-muted-foreground">Document • Last saved 2 min ago</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Collaboration indicators */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-card rounded-full border border-border">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">3 active</span>
            <div className="flex -space-x-1 ml-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-white">
                Y
              </div>
              <div className="w-6 h-6 bg-gradient-to-br from-success to-warning rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-white">
                A
              </div>
              <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-white">
                B
              </div>
            </div>
          </div>

          <div className="w-px h-6 bg-border" />

          <Button variant="ghost" size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="ghost"
            size="sm"
            className={cn(
              "transition-all",
              isSidebarOpen ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Editor */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="h-full max-w-4xl mx-auto">
            <CollaborativeEditor 
              onSuggestContent={handleAISuggest}
              className="h-full"
            />
          </div>
        </div>

        {/* AI Sidebar */}
        <div className={cn(
          "transition-all duration-300 ease-in-out border-l border-border",
          isSidebarOpen ? 'w-80' : 'w-0 overflow-hidden'
        )}>
          <div className="w-80 h-full p-6">
            <AIChatSidebar />
          </div>
        </div>
      </div>

      {/* Floating AI Button (when sidebar is closed) */}
      {!isSidebarOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-white shadow-xl glow-primary animate-glow"
          >
            <Sparkles className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};