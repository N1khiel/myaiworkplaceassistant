import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DisclaimerBar } from "@/components/ui-kit";
import { FEATURES } from "@/lib/features";
import { useUsage } from "@/lib/usage";
import heroImage from "@/assets/hero-abstract.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deskline — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft emails, plan your day, research topics and ask questions — four AI workplace tools in one calm dashboard.",
      },
      { property: "og:title", content: "Deskline — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Draft emails, plan your day, research topics and ask questions — four AI workplace tools in one calm dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const STEPS = [
  {
    n: "01",
    title: "Give it context",
    body: "A few bullet points, a raw task list, or a pasted article — no prompt engineering needed.",
  },
  {
    n: "02",
    title: "Pick the shape",
    body: "Tone, timeframe, or depth. Each tool is tuned for one job instead of one generic box.",
  },
  {
    n: "03",
    title: "Review and ship",
    body: "Every output lands as a copyable draft ticket. You stay the editor and the decision-maker.",
  },
];

const MARQUEE = [
  "draft the email",
  "block the calendar",
  "summarise the article",
  "prioritise the backlog",
  "second opinion",
  "clear the inbox",
];

function Dashboard() {
  const usage = useUsage();
  const cards = [
    { label: "Emails drafted", value: usage.email },
    { label: "Schedules built", value: usage.planner },
    { label: "Topics researched", value: usage.research },
    { label: "Chat replies", value: usage.chat },
  ];

  return (
    <AppShell>
      {/* Hero */}
      <section className="animate-rise gradient-ink relative overflow-hidden rounded-3xl text-ink-foreground">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <span className="mono-label inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-primary">
              <Sparkles className="size-3" /> Good to see you
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-bold sm:text-5xl">
              Your workday,{" "}
              <span className="text-gradient-brand">organised</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              One calm place to draft emails, plan your schedule, research topics and ask
              questions — four purpose-built AI tools instead of one blank chat box.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/email"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                Draft an email <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-foreground/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Browse email templates
              </Link>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Abstract black and pink sculptural shapes representing Deskline's AI tools"
            width={1280}
            height={960}
            className="h-56 w-full rounded-2xl object-cover sm:h-72 lg:h-80"
          />
        </div>

        <div className="flex gap-8 overflow-hidden border-t border-ink-foreground/10 py-3">
          <div className="animate-marquee flex shrink-0 gap-8 pr-8">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="mono-label whitespace-nowrap text-ink-muted">
                {m} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <DisclaimerBar />

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="font-display text-3xl font-bold text-primary">{c.value}</div>
            <div className="mono-label mt-1 text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold">The toolkit</h2>
          <span className="mono-label text-muted-foreground">04 tools</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Link
              key={f.key}
              to={f.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
            >
              <div className="flex items-start justify-between">
                <div className="gradient-tint flex size-11 items-center justify-center rounded-xl border border-primary-tint-border text-primary-dark">
                  <f.icon className="size-5" />
                </div>
                <span className="mono-label text-muted-foreground">{f.index}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{f.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.tagline}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                Open tool
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-12 rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9">
        <span className="mono-label text-accent">How it works</span>
        <h2 className="mt-2 font-display text-2xl font-bold">
          Three steps, no prompt wrangling
        </h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t-2 border-primary pt-4">
              <div className="mono-label text-primary">{s.n}</div>
              <h3 className="mt-2 font-display text-base font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">How Deskline behaves</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <ShieldCheck className="size-5 text-accent" />
          <h3 className="mt-3 font-display text-base font-bold">Nothing is stored</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Sessions clear on refresh. Only your usage counters stay on this device — no
            transcripts, no drafts, no history kept on a server.
          </p>
        </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <Zap className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-bold">Drafts, not decisions</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Deskline never sends, books, or publishes anything. Every output is a starting
              point you edit and approve.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
