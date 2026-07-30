import { useEffect, useState } from "react";

export type UsageKey = "chat" | "email" | "planner" | "research";
export type Usage = Record<UsageKey, number>;

const STORAGE_KEY = "deskline.usage";
const EMPTY: Usage = { chat: 0, email: 0, planner: 0, research: 0 };

function read(): Usage {
  if (typeof window === "undefined") return EMPTY;
  try {
    return { ...EMPTY, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Usage) };
  } catch {
    return EMPTY;
  }
}

export function bumpUsage(key: UsageKey) {
  if (typeof window === "undefined") return;
  const next = read();
  next[key] += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function useUsage(): Usage {
  const [usage, setUsage] = useState<Usage>(EMPTY);
  useEffect(() => setUsage(read()), []);
  return usage;
}
