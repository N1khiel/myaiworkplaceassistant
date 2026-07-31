import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  DisclaimerBar,
  EmptyState,
  ErrorNote,
  Field,
  PageHeader,
  Panel,
  PrimaryButton,
  Ticket,
  fieldClass,
} from "@/components/ui-kit";
import { callAI, parseJsonLoose } from "@/lib/ai";
import {
  MATERIAL_CATEGORIES,
  MATERIAL_SYSTEM,
  type MaterialResult,
} from "@/lib/materials";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Material Sourcer — Find Steel, Alloy & Polymer Grades" },
      {
        name: "description",
        content:
          "Search any material grade — 304 stainless, 4140 chromoly, Ti-6Al-4V — and get composition, mechanical properties, standards, forms and sourcing notes.",
      },
      { property: "og:title", content: "Material Sourcer — Find Steel & Alloy Grades" },
      {
        property: "og:description",
        content:
          "Search a steel, alloy or polymer grade and get composition, properties, standards and sourcing notes in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaterialsPage,
});

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="mono-label text-muted-foreground">{title}</div>
      <ul className="mt-2 space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Specs({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  if (!rows?.length) return null;
  return (
    <div>
      <div className="mono-label text-muted-foreground">{title}</div>
      <dl className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 px-3.5 py-2 text-sm">
            <dt className="text-muted-foreground">{r.label}</dt>
            <dd className="text-right font-mono text-[12.5px] font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function MaterialsPage() {
  const [query, setQuery] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<MaterialResult>();

  const run = async (q: string) => {
    if (!q.trim()) {
      setError("Enter a material, grade or requirement to search for.");
      return;
    }
    setLoading(true);
    setError(undefined);
    try {
      const text = await callAI(
        MATERIAL_SYSTEM,
        `Material query: ${q}\n${context ? `Application context: ${context}` : ""}`,
      );
      setResult(parseJsonLoose<MaterialResult>(text));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const plain = result
    ? [
        result.name,
        result.summary,
        `Equivalents: ${result.equivalents?.join(", ")}`,
        `Composition: ${result.composition?.map((c) => `${c.label} ${c.value}`).join("; ")}`,
        `Properties: ${result.properties?.map((c) => `${c.label} ${c.value}`).join("; ")}`,
        `Standards: ${result.standards?.join(", ")}`,
        `Forms: ${result.forms?.join(", ")}`,
        `Applications: ${result.applications?.join(", ")}`,
        `Sourcing: ${result.sourcing?.join(" | ")}`,
        result.cautions,
      ].join("\n\n")
    : "";

  return (
    <AppShell>
      <PageHeader
        eyebrow="05 · Material sourcer"
        title="Find the right material, fast"
        sub="Search a grade like 304 stainless or 4140 chromoly — or describe what the part has to survive — and get composition, mechanical properties, standards, stocked forms and sourcing notes."
      />
      <DisclaimerBar />

      <div className="mt-6 grid gap-6 lg:grid-cols-[400px_1fr] lg:items-start">
        <div className="space-y-5">
          <Panel title="Search" hint="Grade, spec number, or a plain-English requirement.">
            <Field label="Material or requirement">
              <input
                className={fieldClass}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") run(query);
                }}
                placeholder="e.g. 316L stainless, or a steel for salt-water bolts"
              />
            </Field>
            <Field label="Application context (optional)">
              <textarea
                className={`${fieldClass} min-h-[92px] resize-y`}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Load, temperature, environment, machining method, budget…"
              />
            </Field>
            <PrimaryButton
              onClick={() => run(query)}
              loading={loading}
              label="Source material"
              icon={Search}
            />
            <ErrorNote message={error} />
          </Panel>

          <Panel title="Quick picks" hint="Common shop-floor grades.">
            <div className="mt-4 space-y-4">
              {MATERIAL_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <div className="mono-label text-muted-foreground">{cat.name}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cat.picks.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setQuery(p.query);
                          run(p.query);
                        }}
                        className="rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {result ? (
          <Ticket
            tag={`material / ${result.name}`}
            plainText={plain}
            footerNote="AI-generated data sheet — verify against a mill certificate before purchase"
          >
            <div className="space-y-6">
              <div>
                <div className="mono-label text-primary">{result.category}</div>
                <h2 className="mt-1 font-display text-2xl font-bold">{result.name}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {result.summary}
                </p>
                {result.equivalents?.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {result.equivalents.map((e) => (
                      <span
                        key={e}
                        className="rounded-md border border-primary-tint-border bg-primary-tint px-2 py-1 font-mono text-[11px] text-primary-dark"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Specs title="Composition" rows={result.composition} />
                <Specs title="Typical properties" rows={result.properties} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <List title="Standards" items={result.standards} />
                <List title="Stocked forms" items={result.forms} />
                <List title="Applications" items={result.applications} />
                <List title="Fabrication notes" items={result.fabrication} />
              </div>

              {result.alternatives?.length ? (
                <div>
                  <div className="mono-label text-muted-foreground">Alternatives</div>
                  <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                    {result.alternatives.map((a) => (
                      <div
                        key={a.name}
                        className="rounded-xl border border-border bg-secondary p-3.5"
                      >
                        <div className="font-display text-sm font-bold">{a.name}</div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {a.why}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <List title="Sourcing notes" items={result.sourcing} />

              {result.cautions ? (
                <div className="rounded-xl border border-accent-tint-border bg-accent-tint px-4 py-3 text-xs leading-relaxed text-accent-dark">
                  {result.cautions}
                </div>
              ) : null}
            </div>
          </Ticket>
        ) : (
          <EmptyState
            icon={Boxes}
            text="Search a grade or describe your requirement — the data sheet appears here."
          />
        )}
      </div>
    </AppShell>
  );
}
