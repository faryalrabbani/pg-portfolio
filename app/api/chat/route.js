// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------
// Server-side API route that proxies chat messages to Groq.
//
// Why Groq:
//   - Works globally (no regional restrictions)
//   - Extremely fast inference (best for chat UX)
//   - Generous free tier: 14,400 requests/day on Llama 3.1 8B
//   - OpenAI-compatible API
//
// Request body (JSON):
//   { messages: [{ role: "user", content: "..." }] }
//
// Response:
//   Server-sent text stream of the assistant's reply.
// ---------------------------------------------------------------------------

import { systemPrompt } from "@/lib/chatPrompt";

export const runtime = "nodejs";

// Groq model — fast, free, good at following instructions.
// Alternatives:
//   "llama-3.3-70b-versatile"  (more capable, 1,000 req/day free)
//   "llama-3.1-8b-instant"     (fastest, 14,400 req/day free) ← default
const MODEL = "openai/gpt-oss-120b";

const MAX_CONTEXT_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

export async function POST(req) {
  try {
    // -----------------------------------------------------------------------
    // 1) Parse request
    // -----------------------------------------------------------------------
    const body = await req.json();
    const incomingMessages = Array.isArray(body?.messages) ? body.messages : [];

    if (incomingMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // -----------------------------------------------------------------------
    // 2) Sanitize
    // -----------------------------------------------------------------------
    const cleaned = incomingMessages
      .filter(
        (m) =>
          m &&
          typeof m.content === "string" &&
          (m.role === "user" || m.role === "assistant")
      )
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, MAX_MESSAGE_LENGTH),
      }))
      .slice(-MAX_CONTEXT_MESSAGES);

    // -----------------------------------------------------------------------
    // 3) Prepend system prompt
    // -----------------------------------------------------------------------
    const messages = [
      { role: "system", content: systemPrompt },
      ...cleaned,
    ];

    // -----------------------------------------------------------------------
    // 4) Call Groq with streaming
    // -----------------------------------------------------------------------
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("[chat] GROQ_API_KEY is missing.");
      return new Response(
        JSON.stringify({
          error: "Server misconfigured. Please email hello@aperture.co.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    if (!groqRes.ok || !groqRes.body) {
      const errText = await groqRes.text().catch(() => "");
      console.error("[chat] Groq error:", groqRes.status, errText);
      return new Response(
        JSON.stringify({
          error:
            "I'm having trouble right now. Please email hello@aperture.co and Elena will reply within 48 hours.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // -----------------------------------------------------------------------
    // 5) Re-stream: parse Groq's OpenAI-style SSE chunks, emit plain text
    // -----------------------------------------------------------------------
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = groqRes.body.getReader();
        let buffer = "";

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const parts = buffer.split("\n\n");
            buffer = parts.pop() || "";

            for (const part of parts) {
              const lines = part.split("\n");
              for (const line of lines) {
                if (!line.startsWith("data: ")) continue;
                const jsonStr = line.slice(6).trim();
                if (!jsonStr || jsonStr === "[DONE]") continue;

                try {
                  const json = JSON.parse(jsonStr);
                  const text = json?.choices?.[0]?.delta?.content || "";
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch {
                  // Ignore malformed chunks
                }
              }
            }
          }
        } catch (err) {
          console.error("[chat] Stream error:", err);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[chat] Fatal error:", err);
    return new Response(
      JSON.stringify({
        error:
          "I'm having trouble right now. Please email hello@aperture.co and Elena will reply within 48 hours.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}