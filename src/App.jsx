import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Send, Flame, Leaf, Heart, Wand2, Bot } from "lucide-react";

/**
 * App.jsx — React + Vite + Tailwind front-end for GlowAdvisor (Skincare AI)
 * - Calls FastAPI /generate (expects { response: string } Markdown)
 * - Renders Markdown in assistant bubbles
 * - Includes quick prompts and typing indicator
 */
export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text:
        "Hello! I'm **GlowAdvisor AI**—your personal skincare assistant. Ask me for routines, ingredient breakdowns, or product tips. What would you like help with today?",
      time: ts(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef(null);

  const quickPrompts = [
    "What's my skin type?",
    "Help with acne treatment",
    "Anti-aging routine advice",
    "Sensitive skin care tips",
  ];

  useEffect(() => {
    // Auto scroll to latest message
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    // Push user message
    const userMsg = { id: Date.now(), role: "user", text: content, time: ts() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      setLoading(true);

      
      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
      const res = await fetch('/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
  body: JSON.stringify({ user_prompt: content }),
})



      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = data?.response || "Sorry, I couldn't generate a response.";

      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "assistant", text, time: ts() },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 2, role: "assistant", text: `⚠️ Error talking to server: ${String(err)}`, time: ts() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fbf2ec] text-stone-900">
      {/* Top nav */}
      <header className="sticky top-0 z-20 bg-[#fbf2ec]/80 backdrop-blur border-b border-rose-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              <span className="text-stone-800">Glow</span><span className="text-rose-400">Advisor</span>
            </span>
          </div>
          <button className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-xl border border-stone-200 hover:bg-white transition">Sign In</button>
        </div>
      </header>

      {/* Hero grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left column */}
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-stone-900">
              Your Personal <span className="text-rose-400">Skincare</span> Assistant
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl">
              Get personalized skincare advice, product recommendations, and routine guidance from our AI‑powered beauty
              expert. Transform your skin with expert knowledge tailored just for you.
            </p>

            {/* Feature tiles */}
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <FeatureCard icon={<Flame className="w-5 h-5" />} title="Skin Analysis" desc="Identify your skin type and concerns" />
              <FeatureCard icon={<Leaf className="w-5 h-5" />} title="Natural Solutions" desc="Gentle, science‑backed recommendations" />
              <FeatureCard icon={<Heart className="w-5 h-5" />} title="Custom Routines" desc="Personalized morning & evening care" />
              <FeatureCard icon={<Wand2 className="w-5 h-5" />} title="AI‑Powered" desc="Smart insights from beauty experts" />
            </div>

            {/* Cream jar image (replace with your own in /public) */}
            <div className="mt-8 rounded-3xl overflow-hidden shadow-sm">
              <img src="/skincare1.png" alt="Skincare cream jar" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Right column – Chat widget */}
          <div className="flex">
            <div className="w-full rounded-3xl bg-white/70 backdrop-blur overflow-hidden border border-rose-100 shadow-sm flex flex-col">
              {/* Chat header */}
              <div className="bg-rose-200/70 px-6 py-5 border-b border-rose-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800">GlowAdvisor AI</div>
                    <div className="text-sm text-stone-600">Your personal beauty advisor</div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollerRef} className="flex-1 p-6 lg:p-8 bg-white overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((m) => (
                    <MessageBubble key={m.id} role={m.role} time={m.time}>
                      {m.role === "assistant" ? (
                        <div className="prose prose-stone prose-sm max-w-none">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {m.text}
  </ReactMarkdown>
</div>

                      ) : (
                        <div>{m.text}</div>
                      )}
                    </MessageBubble>
                  ))}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-stone-700" />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-2xl bg-emerald-50 text-stone-800 p-4 leading-relaxed">
                          <TypingDots />
                        </div>
                        <div className="mt-2 text-xs text-stone-500">{ts()}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick prompts */}
              <div className="px-6 lg:px-8 pb-4">
                <div className="text-stone-700 font-medium mb-3">Quick questions to get started:</div>
                <div className="flex flex-wrap gap-3">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      disabled={loading}
                      onClick={() => sendMessage(q)}
                      className="px-4 py-2 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 text-sm disabled:opacity-60"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input bar */}
              <div className="p-4 lg:p-6 border-t border-stone-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex items-center gap-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your skincare question…"
                    className="flex-1 h-12 rounded-2xl bg-stone-50 border border-stone-200 px-4 outline-none focus:ring-2 focus:ring-rose-300"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-12 h-12 rounded-2xl bg-rose-300 hover:bg-rose-400 text-white flex items-center justify-center transition disabled:opacity-60"
                    aria-label="Send"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10" />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur border border-rose-100 p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-400">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-stone-800 text-lg">{title}</div>
        <div className="text-stone-600 text-sm max-w-xs">{desc}</div>
      </div>
    </div>
  );
}

function MessageBubble({ role, time, children }) {
  const isAssistant = role === "assistant";
  return (
    <div className="flex gap-3">
      <div className={`w-10 h-10 rounded-2xl ${isAssistant ? "bg-emerald-100" : "bg-rose-100"} flex items-center justify-center`}>
        <Bot className="w-5 h-5 text-stone-700" />
      </div>
      <div className="flex-1">
        <div className={`rounded-2xl p-4 leading-relaxed ${isAssistant ? "bg-emerald-50 text-stone-800" : "bg-rose-50 text-stone-900"}`}>
          {children}
        </div>
        <div className="mt-2 text-xs text-stone-500">{time}</div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-2 h-2 bg-stone-500/60 rounded-full animate-bounce [animation-delay:-0.2s]" />
      <span className="w-2 h-2 bg-stone-500/60 rounded-full animate-bounce" />
      <span className="w-2 h-2 bg-stone-500/60 rounded-full animate-bounce [animation-delay:0.2s]" />
    </span>
  );
}

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
