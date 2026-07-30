import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Mail, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui-kit";
import { EMAIL_TEMPLATES } from "@/lib/templates";

const TITLE = "Workplace Email Templates — How to Write Any Work Email";
const DESCRIPTION =
  "Free templates and worked examples for the work emails people dread — asking for a raise, declining a meeting, apologising, following up. Plus an AI email writer that drafts yours.";

export const Route = createFileRoute("/templates/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplatesIndex,
});

function TemplatesIndex() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Guides · Email templates"
        title="How to write the emails nobody enjoys writing"
        sub="Six of the hardest work emails, broken down: when to send them, the structure that works, and a full example you can lift. Each guide hands off to Deskline's AI email writer with the scenario already filled in."
      />

      <section className="mt-7 grid gap-5 sm:grid-cols-2">
        {EMAIL_TEMPLATES.map((t) => (
          <Link
            key={t.slug}
            to="/templates/$slug"
            params={{ slug: t.slug }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
          >
            <span className="mono-label text-muted-foreground">{t.category}</span>
            <h2 className="mt-2 font-display text-lg font-bold">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.summary}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              Read the guide
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9">
        <span className="mono-label text-accent">The short version</span>
        <h2 className="mt-2 font-display text-2xl font-bold">
          How to write an email that actually gets a reply
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="border-t-2 border-primary pt-4">
            <div className="mono-label text-primary">01</div>
            <h3 className="mt-2 font-display text-base font-bold">One email, one ask</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Put the request in the first two lines. Anything the reader has to hunt for
              gets postponed, and postponed means forgotten.
            </p>
          </div>
          <div className="border-t-2 border-primary pt-4">
            <div className="mono-label text-primary">02</div>
            <h3 className="mt-2 font-display text-base font-bold">
              Write a subject line that decides
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              "Approval needed: Q3 budget (by Friday)" earns a reply. "Quick question"
              earns a scroll past.
            </p>
          </div>
          <div className="border-t-2 border-primary pt-4">
            <div className="mono-label text-primary">03</div>
            <h3 className="mt-2 font-display text-base font-bold">Make replying cheap</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Offer a yes/no, two dates, or a default action you'll take if you hear
              nothing. Reduce the reply to a single decision.
            </p>
          </div>
        </div>
      </section>

      <section className="gradient-ink mt-8 rounded-3xl p-7 text-ink-foreground sm:p-9">
        <span className="mono-label text-primary">AI email writer</span>
        <h2 className="mt-2 font-display text-2xl font-bold">
          Or skip the blank page entirely
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Deskline's AI email writer takes a couple of bullet points and a tone — formal,
          friendly or persuasive — and returns a complete draft with a subject line,
          greeting and sign-off. Nothing is sent automatically: every result is a draft you
          review and edit before it leaves your hands.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            <Sparkles className="size-4" /> Open the email writer
          </Link>
          <Link
            to="/templates/$slug"
            params={{ slug: EMAIL_TEMPLATES[0].slug }}
            className="inline-flex items-center gap-2 rounded-lg border border-ink-foreground/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <BookOpen className="size-4" /> Start with a template
          </Link>
        </div>
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent-tint-border bg-accent-tint px-6 py-5">
        <p className="max-w-xl text-sm leading-relaxed text-accent-dark">
          <span className="font-semibold">A note on the examples:</span> every sample here
          uses neutral placeholders. Swap in real names, dates and figures before sending,
          and never paste confidential details into an AI tool.
        </p>
        <Mail className="size-6 shrink-0 text-accent-dark" />
      </section>
    </AppShell>
  );
}
