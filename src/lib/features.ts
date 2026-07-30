import { LayoutDashboard, MessageSquare, Mail, ListChecks, Search, Info } from "lucide-react";

export const FEATURES = [
  {
    key: "chatbot",
    to: "/chat",
    label: "AI Chatbot",
    index: "01",
    kicker: "Ask anything",
    icon: MessageSquare,
    tagline:
      "Ask quick questions, brainstorm, or think through a work problem with a conversational assistant.",
  },
  {
    key: "email",
    to: "/email",
    label: "Email Generator",
    index: "02",
    kicker: "Communication",
    icon: Mail,
    tagline:
      "Turn a few bullet points into a polished email — formal, friendly, or persuasive.",
  },
  {
    key: "planner",
    to: "/planner",
    label: "Task Planner",
    index: "03",
    kicker: "Time management",
    icon: ListChecks,
    tagline: "Drop in your task list and get a prioritised, time-blocked schedule.",
  },
  {
    key: "research",
    to: "/research",
    label: "Research Assistant",
    index: "04",
    kicker: "Knowledge",
    icon: Search,
    tagline:
      "Paste a topic or article and get a summary with insights and recommendations.",
  },
] as const;

export const NAV_OVERVIEW = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
] as const;

export const NAV_MORE = [{ to: "/about", label: "About", icon: Info }] as const;
