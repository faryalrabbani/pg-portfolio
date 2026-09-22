"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// ChatBot
// ---------------------------------------------------------------------------
// Floating chat bubble bottom-right + expandable panel.
// Talks to /api/chat (our server route → Groq → llama model).
//
// States:
//   - closed: just the bubble
//   - open:   the panel with messages + input
//   - waiting: waiting for the AI to start replying (typing indicator)
//   - streaming: receiving chunks word by word
// ---------------------------------------------------------------------------

const STARTER_CHIPS = [
  "What are your wedding prices?",
  "Do you travel internationally?",
  "How do I book?",
];

const MAX_MESSAGES_PER_SESSION = 20;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { role: 'user'|'assistant', content: string }
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [showUnread, setShowUnread] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // -------------------------------------------------------------------------
  // Auto-scroll to bottom whenever messages change
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isWaiting]);

  // -------------------------------------------------------------------------
  // Show unread dot after 8s if user hasn't opened the chat
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      setShowUnread(false);
      return;
    }
    const t = setTimeout(() => setShowUnread(true), 8000);
    return () => clearTimeout(t);
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // Close on Escape
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // Focus textarea when panel opens
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      // Small delay so the panel's open animation finishes first
      const t = setTimeout(() => textareaRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // Auto-grow textarea
  // -------------------------------------------------------------------------
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 96) + "px"; // cap at ~4 lines
  }, [input]);

  // -------------------------------------------------------------------------
  // Send a message
  // -------------------------------------------------------------------------
  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isWaiting) return;

    // Client-side rate limit
    const userCount = messages.filter((m) => m.role === "user").length;
    if (userCount >= MAX_MESSAGES_PER_SESSION) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "We've hit the message limit for this session. For anything else, please reach out through the contact form or email hello@aperture.co — Elena replies within 48 hours.",
        },
      ]);
      return;
    }

    const userMsg = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsWaiting(true);

    try {
      // Hard timeout so we never hang
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      // Read the ENTIRE response as text. Works reliably everywhere.
      const fullText = await res.text();

      if (!fullText || fullText.trim() === "") {
        throw new Error("empty response");
      }

      // Add an empty assistant message, switch off the "waiting" dots,
      // then type the text in character by character.
      setIsWaiting(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Type-out effect
      const CHUNK = 10;        // chars per tick
      const INTERVAL = 25;     // ms per tick
      let i = 0;

      await new Promise((resolve) => {
        const tick = setInterval(() => {
          i = Math.min(i + CHUNK, fullText.length);
          const slice = fullText.slice(0, i);

          setMessages((prev) => {
            const copy = prev.slice();
            copy[copy.length - 1] = {
              role: "assistant",
              content: slice,
            };
            return copy;
          });

          if (i >= fullText.length) {
            clearInterval(tick);
            resolve();
          }
        }, INTERVAL);
      });
    } catch (err) {
      console.error("[chatbot] send error:", err);
      setIsWaiting(false);

      // Clean up any empty assistant message and show a fallback
      setMessages((prev) => {
        const cleaned = prev.filter(
          (m) => !(m.role === "assistant" && m.content === "")
        );
        return [
          ...cleaned,
          {
            role: "assistant",
            content:
              "I'm having trouble right now. Please email hello@aperture.co — Elena replies within 48 hours.",
          },
        ];
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleChipClick = (chip) => {
    sendMessage(chip);
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <>
      {/* ===================================================================
          Panel
          =================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[90] flex h-[520px] max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e]/95 shadow-2xl backdrop-blur-xl sm:right-6 md:bottom-28"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* ------- Header ------- */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/30">
                  <span className="font-display text-sm text-[var(--accent)]">
                    A
                  </span>
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0e0e0e] bg-emerald-500" />
              </div>

              <div className="flex-1">
                <p className="font-display text-sm text-white">
                  Aperture Assistant
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                  Online
                </p>
              </div>

              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors duration-300 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* ------- Messages ------- */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* Welcome message — always present */}
              <div className="mb-5 flex gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/30">
                  <span className="font-display text-[11px] text-[var(--accent)]">
                    A
                  </span>
                </div>
                <div className="rounded-2xl rounded-tl-md bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white/85">
                  Hi! I'm Elena's assistant. Ask me anything about her work,
                  pricing, or how to book.
                </div>
              </div>

              {/* Starter chips — only show if no user has sent a message yet */}
              {messages.filter((m) => m.role === "user").length === 0 && (
                <div className="mb-5 flex flex-wrap gap-2 pl-10">
                  {STARTER_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70 transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/30">
                      <span className="font-display text-[11px] text-[var(--accent)]">
                        A
                      </span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-md bg-[var(--accent)] text-black"
                        : "rounded-tl-md bg-white/[0.04] text-white/85"
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator (before stream begins) */}
              {isWaiting && messages[messages.length - 1]?.role === "user" && (
                <div className="mb-4 flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 ring-1 ring-[var(--accent)]/30">
                    <span className="font-display text-[11px] text-[var(--accent)]">
                      A
                    </span>
                  </div>
                  <div className="rounded-2xl rounded-tl-md bg-white/[0.04] px-4 py-3">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ------- Input ------- */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 px-4 py-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 transition-colors duration-300 focus-within:border-[var(--accent)]/50">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about pricing, travel, booking..."
                  className="flex-1 resize-none bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
                  style={{ maxHeight: "96px" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isWaiting}
                  aria-label="Send message"
                  className="mb-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-black transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-white/30">
                Powered by AI · For real inquiries, email hello@aperture.co
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================
          Floating bubble
          =================================================================== */}
      <motion.button
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="group fixed bottom-6 right-4 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-black shadow-[0_8px_30px_rgba(232,176,75,0.35)] transition-transform duration-300 hover:scale-105 sm:right-6"
      >
        {/* Pulsing ring */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)]/40 [animation-duration:3s]" />
        )}

        {/* Icon */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread dot */}
        {showUnread && !isOpen && (
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-[var(--bg)]" />
        )}
      </motion.button>
    </>
  );
}