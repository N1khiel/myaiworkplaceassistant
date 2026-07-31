import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
const KEY = "deskline-theme";

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

/** Inline script that applies the stored theme before first paint. */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${KEY}')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}`;
