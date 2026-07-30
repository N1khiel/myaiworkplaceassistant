export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function callAI(
  system: string,
  input: string | ChatMessage[],
): Promise<string> {
  const messages: ChatMessage[] = Array.isArray(input)
    ? input
    : [{ role: "user", content: input }];

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, messages }),
  });

  const data = (await res.json().catch(() => null)) as
    | { text?: string; error?: string }
    | null;

  if (!res.ok || !data?.text) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data.text;
}

export function parseJsonLoose<T>(text: string): T {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned) as T;
}

export function timeStamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
