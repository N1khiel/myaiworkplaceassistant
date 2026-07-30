import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { system?: string; messages?: Msg[] };
        const messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response(JSON.stringify({ error: "messages required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response(JSON.stringify({ error: "AI is not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              ...(body.system ? [{ role: "system", content: body.system }] : []),
              ...messages.map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          console.error(`AI gateway failed [${res.status}]: ${detail}`);
          const message =
            res.status === 429
              ? "Rate limit reached — try again in a moment."
              : res.status === 402
                ? "AI credits exhausted for this workspace."
                : `AI request failed (${res.status}).`;
          return new Response(JSON.stringify({ error: message }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const text = data.choices?.[0]?.message?.content?.trim() ?? "";
        if (!text) {
          return new Response(JSON.stringify({ error: "Empty response from model" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ text }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
