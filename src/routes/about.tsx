import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, EyeOff, Gauge, ShieldAlert, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui-kit";
import { FEATURES } from "@/lib/features";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Deskline — How the AI assistant works" },
      {
        name: "description",
        content:
          "What Deskline does, how its four AI tools work, what it never does with your data, and the limits you should keep in mind.",
      },
      { property: "og:title", content: "About Deskline — How the AI assistant works" },
      {
        property: "og:description",
        content: "How Deskline's four AI workplace tools work, and their limits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: EyeOff,
    title: "Nothing is stored server-side",
    body: "Prompts and outputs live in the browser tab only. Refresh and it's gone. Usage counters stay on your device.",
  },
  {
    icon: ShieldAlert,
    title: "Drafts, never actions",
    body: "Deskline can't send an email, book a meeting, or publish anything. It writes; you decide.",
  },
  {
    icon: Gauge,
    title: "Tuned per task",
    body: "Each tool ships with its own instructions and output format, so you get structure instead of a wall of text.",
  },
  {
    icon: Users,
    title: "Built for everyday work",
    body: "Written for the ordinary workday: inbox, calendar, reading pile — not for legal, medical, or financial advice.",
  },
];

const FAQ = [
  {
    q: "Can I trust the output?",
    a: "Treat it as a well-informed first draft. AI models can state wrong things confidently, so verify facts, figures, names and dates before anything leaves your hands.",
  },
  {
    q: "Should I paste confidential information?",
    a: "No. Don't enter client data, credentials, personal data, or anything under NDA. Describe the situation in neutral terms instead.",
  },
  {
    q: "Why four tools instead of one chat box?",
    a: "A blank chat puts all the prompting work on you. Each Deskline tool already knows its job, its tone options, and the shape of a good answer.",
  },
  {
    q: "Does it remember previous sessions?",
    a: "Only within the current chat. Close or refresh the tab and the conversation resets — by design.",
  },
];

function AboutPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="About"
        title="A calm layer over the busywork"
        sub="Deskline bundles four focused AI tools into one dashboard so the repetitive parts of the workday — drafting, planning, summarising, asking — take minutes instead of an afternoon."
      />

      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold">What we stand by</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <div className="gradient-tint flex size-11 items-center justify-center rounded-xl border border-primary-tint-border text-primary-dark">
                <p.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-ink mt-8 rounded-3xl p-7 text-ink-foreground sm:p-9">
        <span className="mono-label text-primary">Inside the toolkit</span>
        <h2 className="mt-2 font-display text-2xl font-bold">What each tool is good at</h2>
        <div className="mt-6 divide-y divide-ink-foreground/10">
          {FEATURES.map((f) => (
            <Link
              key={f.key}
              to={f.to}
              className="group flex items-start gap-4 py-4 transition-colors hover:text-primary"
            >
              <span className="mono-label pt-1 text-ink-muted">{f.index}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-bold">{f.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.tagline}</p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold">Good to know</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {FAQ.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <h3 className="font-display text-base font-bold">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent-tint-border bg-accent-tint px-6 py-5">
        <p className="max-w-xl text-sm leading-relaxed text-accent-dark">
          <span className="font-semibold">Remember:</span> everything Deskline produces is
          AI-generated and may contain errors or omissions. You're the final reviewer.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          Back to dashboard <ArrowRight className="size-4" />
        </Link>
      </section>
    </AppShell>
  );
}
