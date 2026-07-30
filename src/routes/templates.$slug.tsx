import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Lightbulb, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui-kit";
import { EMAIL_TEMPLATES, getTemplate } from "@/lib/templates";

export const Route = createFileRoute("/templates/$slug")({
  loader: ({ params }) => {
    const template = getTemplate(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Template not found — Deskline" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { template } = loaderData;
    return {
      meta: [
        { title: template.metaTitle },
        { name: "description", content: template.metaDescription },
        { property: "og:title", content: template.metaTitle },
        { property: "og:description", content: template.metaDescription },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: template.title,
            description: template.metaDescription,
            step: template.structure.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text: s,
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: TemplateNotFound,
  component: TemplateDetail,
});

function TemplateNotFound() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Guides · Email templates"
        title="That template doesn't exist"
        sub="The guide you're looking for isn't in the library — here's everything that is."
      />
      <Link
        to="/templates"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
      >
        <ArrowLeft className="size-4" /> Back to the template library
      </Link>
    </AppShell>
  );
}

function TemplateDetail() {
  const { template } = Route.useLoaderData();
  const related = EMAIL_TEMPLATES.filter((t) => t.slug !== template.slug).slice(0, 3);

  return (
    <AppShell>
      <Link
        to="/templates"
        className="mono-label inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5" /> All email templates
      </Link>

      <div className="mt-4">
        <PageHeader
          eyebrow={`Guide · ${template.category}`}
          title={template.title}
          sub={template.summary}
        />
      </div>

      <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">When to send this email</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {template.whenToUse}
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold">The structure that works</h2>
            <ol className="mt-4 space-y-3">
              {template.structure.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mono-label mt-0.5 shrink-0 text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <Lightbulb className="size-4 text-accent" /> Things that make it land
            </h2>
            <ul className="mt-4 space-y-3">
              {template.tips.map((tip) => (
                <li key={tip} className="flex gap-2.5 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
            <div className="gradient-ink flex items-center justify-between px-5 py-3 font-mono text-[11px] text-ink-foreground">
              <span className="font-semibold text-primary">// EXAMPLE DRAFT</span>
              <span>{template.prefill.tone.toUpperCase()}</span>
            </div>
            <div className="mx-5 border-t border-dashed border-border" />
            <div className="px-6 py-6">
              <h2 className="sr-only">Example email</h2>
              <pre className="m-0 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {template.sample}
              </pre>
            </div>
            <div className="border-t border-border bg-secondary px-4 py-2.5 font-mono text-[10.5px] text-muted-foreground">
              Sample output — replace every placeholder before sending
            </div>
          </section>

          <section className="gradient-ink rounded-2xl p-6 text-ink-foreground">
            <h2 className="font-display text-lg font-bold">Write your version</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Open the AI email writer with this scenario already filled in — then adjust
              the details, pick a tone, and generate a draft in seconds.
            </p>
            <Link
              to="/email"
              search={{
                recipient: template.prefill.recipient,
                purpose: template.prefill.purpose,
                points: template.prefill.points,
                tone: template.prefill.tone,
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <Sparkles className="size-4" /> Use this template in the AI email writer
            </Link>
          </section>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">More email guides</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {related.map((t) => (
            <Link
              key={t.slug}
              to="/templates/$slug"
              params={{ slug: t.slug }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
            >
              <span className="mono-label text-muted-foreground">{t.category}</span>
              <h3 className="mt-2 font-display text-base font-bold">{t.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                Read
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
