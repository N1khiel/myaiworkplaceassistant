import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui-kit";
import { callAI, type ChatMessage } from "@/lib/ai";
import { bumpUsage } from "@/lib/usage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Deskline" },
      {
        name: "description",
        content:
          "A workplace AI chatbot for quick questions, brainstorming, prioritising and second opinions.",
      },
      { property: "og:title", content: "AI Chatbot — Deskline" },
      {
        property: "og:description",
        content: "Ask work questions, brainstorm and get a practical second opinion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

const CHAT_SYSTEM = `You are Deskline, a helpful and concise AI workplace assistant embedded in a productivity dashboard.
- Help with work questions: drafting quick replies, brainstorming, prioritising, explaining concepts, thinking through decisions.
- Keep answers focused and practical; use short paragraphs or bullet points over long essays.
- If asked something outside workplace/professional context, still help, but gently note this assistant is built for workplace tasks.
- Never claim to have taken real-world actions (like sending an email) — you only draft and advise.
- If a request needs facts you can't verify, say so plainly rather than guessing confidently.`;

const SUGGESTIONS = [
  "Help me say no to a meeting politely",
  "How should I prioritise three competing deadlines?",
  "Explain OKRs to a new team member",
  "Give me a 3-line status update from these notes",
];

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm your Deskline assistant. Ask me anything work-related — drafting help, prioritisation, quick explanations, or just thinking out loud.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || loading) return;
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await callAI(CHAT_SYSTEM, next);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      bumpUsage("chat");
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I couldn't reach the assistant just now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feature 01 · Ask anything"
        title="AI Chatbot"
        sub="Your workplace assistant for quick questions, brainstorming, or a second opinion."
      />

      <div className="mt-7 flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:h-[min(660px,calc(100vh-280px))]">
        <div ref={logRef} className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                m.role === "user"
                  ? "self-end rounded-br-sm bg-primary text-primary-foreground"
                  : "self-start rounded-bl-sm border border-border bg-secondary",
              )}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 self-start rounded-2xl rounded-bl-sm border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground italic">
              <Loader2 className="size-3.5 animate-spin" /> Thinking…
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 border-t border-border px-4 pt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3 border-t border-border bg-secondary/60 p-4">
          <textarea
            className="max-h-32 min-h-11 flex-1 resize-y rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Ask about a task, draft a quick reply, or think out loud…"
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={loading}
            aria-label="Send message"
            className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary-dark disabled:bg-muted disabled:text-muted-foreground"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
