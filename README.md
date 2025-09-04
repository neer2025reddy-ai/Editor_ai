# Live Collaborative Editor with AI 🚀

A beautiful, modern collaborative editor with AI-powered suggestions and real-time features.

## ✨ Features

- **Rich Text Editor**: Built with Tiptap for powerful text editing
- **AI Assistant**: Chat with AI for writing suggestions and improvements
- **Collaborative UI**: Real-time collaboration interface (UI ready)
- **Modern Design**: Dark theme with vibrant gradients and smooth animations
- **Responsive Layout**: Works perfectly on all devices

## 🛠️ Tech Stack

- **React** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Tiptap** for rich text editing
- **Lucide Icons** for beautiful icons
- **ShadCN/UI** components

## 🎨 Design System

The app features a beautiful dark theme with:
- Electric blue primary colors (`#4F8FF7`)
- Vibrant cyan accents (`#00E5FF`)
- Smooth gradients and glowing effects
- Animated UI elements
- Custom scrollbars and hover states

## 🤖 AI Integration

### Setting up Gemini AI

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open `src/hooks/useGeminiAI.ts`
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:

```typescript
const defaultConfig = {
  apiKey: 'your-actual-api-key-here', // Replace this
  model: 'gemini-1.5-flash',
  ...config
};
```

### AI Features Available:
- **Chat Assistant**: Ask questions and get AI responses
- **Content Suggestions**: Get AI-powered writing suggestions
- **Grammar Check**: Fix grammar and spelling errors
- **Style Improvement**: Enhance writing style and tone
- **Text Summarization**: Create concise summaries
- **Content Expansion**: Add more details to your text

## 📁 Project Structure

```
src/
├── components/
│   ├── Editor/
│   │   └── CollaborativeEditor.tsx    # Main editor component
│   ├── Chat/
│   │   └── AIChatSidebar.tsx         # AI chat interface
│   ├── Layout/
│   │   └── EditorLayout.tsx          # Main app layout
│   └── ui/                           # Reusable UI components
├── hooks/
│   └── useGeminiAI.ts               # AI integration hook
├── pages/
│   └── Index.tsx                    # Main page
└── lib/
    └── utils.ts                     # Utility functions
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add your Gemini API key** (see AI Integration section above)

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Navigate to `http://localhost:8080`

## 🎯 Usage

### Basic Editing
- Use the rich text toolbar for formatting
- Create headings, lists, quotes, and more
- Undo/redo with keyboard shortcuts

### AI Assistant
- Click the "AI Suggest" button for content suggestions
- Open the chat sidebar to ask questions
- Use quick actions: Grammar Check, Improve Style, Summarize
- Select text in the editor for contextual AI help

### Collaboration (UI Ready)
- The interface shows collaboration indicators
- Real-time user avatars are displayed
- Status indicators show live editing

## 🔧 Customization

### Adding More AI Features
Extend the `useGeminiAI` hook to add new AI capabilities:

```typescript
const customSuggestion = await generateResponse(
  [{ role: 'user', content: 'Your custom prompt' }],
  'Your system prompt'
);
```

### Styling
The design system is fully customizable in:
- `src/index.css` - CSS variables and component styles
- `tailwind.config.ts` - Tailwind theme configuration

### Editor Extensions
Add more Tiptap extensions in `CollaborativeEditor.tsx`:

```typescript
import { Extension } from '@tiptap/react';

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder,
    // Add your extensions here
  ],
});
```

## 📝 Environment Variables

For production deployment, consider using environment variables:

```env
VITE_GEMINI_API_KEY=your-api-key-here
VITE_API_ENDPOINT=your-api-endpoint
```

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables in production
- Implement proper API key validation
- Consider using a backend proxy for API calls

## 🎨 Color Palette

- **Primary**: Electric Blue (`hsl(217, 91%, 60%)`)
- **Accent**: Vibrant Cyan (`hsl(180, 100%, 60%)`)
- **Success**: Emerald (`hsl(142, 76%, 36%)`)
- **Warning**: Amber (`hsl(38, 92%, 50%)`)
- **Background**: Dark Navy (`hsl(222, 20%, 8%)`)

## 📱 Responsive Design

The editor is fully responsive with:
- Mobile-first design approach
- Collapsible AI sidebar
- Touch-friendly controls
- Adaptive layouts

## 🚀 Deployment

The app is ready for deployment on any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Build for production:
```bash
npm run build
```

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using modern web technologies. Ready to create amazing content with AI assistance!