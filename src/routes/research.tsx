import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  EmptyState,
  ErrorNote,
  Field,
  OptionRow,
  PageHeader,
  Panel,
  PrimaryButton,
  Ticket,
  fieldClass,
  twoColClass,
} from "@/components/ui-kit";
import { callAI, parseJsonLoose } from "@/lib/ai";
import { bumpUsage } from "@/lib/usage";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Deskline" },
      {
        name: "description",
        content:
          "Paste a topic or article and get a plain-language summary with key points, insights and recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant — Deskline" },
      {
        property: "og:description",
        content: "Summaries, key points and actionable insights from any topic or article.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

type Focus = "both" | "summary";
type Brief = {
  summary: string;
  key_points?: string[];
  insights?: string[];
  recommendations?: string[];
};

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <>
      <h4 className="mt-5 mb-2 font-display text-sm font-bold">{title}</h4>
      <ul className="list-disc space-y-1.5 pl-5">
        {items.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </>
  );
}

function ResearchPage() {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState<Focus>("both");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<(Brief & { wantInsights: boolean }) | null>(null);

  const generate = async () => {
    setError("");
    if (!input.trim()) {
      setError("Enter a topic, question, or article text first.");
      return;
    }
    setLoading(true);
    const wantInsights = focus === "both";
    try {
      const system = `You are a workplace research assistant. Given a topic or pasted article text, produce a clear, neutral brief.
Respond with ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "summary": "2-4 sentence plain-language summary",
  "key_points": ["short factual point", "..."]${
    wantInsights
      ? `,
  "insights": ["a non-obvious takeaway or implication", "..."],
  "recommendations": ["a concrete, actionable suggestion", "..."]`
      : ""
  }
}
Rules:
- 3-5 items per array.
- If given raw article text, summarise and analyse it faithfully; do not add outside claims presented as fact.
- If given a topic/question with no source text, answer from general knowledge, and keep claims cautious and non-partisan.
- Keep language plain, no jargon without a one-clause explanation.`;
      const parsed = parseJsonLoose<Brief>(await callAI(system, input));
      setResult({ ...parsed, wantInsights });
      bumpUsage("research");
    } catch (e) {
      setError("Couldn't complete the research right now. " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const plainText = result
    ? `Summary: ${result.summary}\n\nKey points:\n` +
      (result.key_points || []).map((p) => "- " + p).join("\n") +
      (result.wantInsights
        ? `\n\nInsights:\n` +
          (result.insights || []).map((p) => "- " + p).join("\n") +
          `\n\nRecommendations:\n` +
          (result.recommendations || []).map((p) => "- " + p).join("\n")
        : "")
    : "";

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feature 04 · Knowledge"
        title="AI Research Assistant"
        sub="Give it a topic or paste an article. Get a plain-language summary plus insights you can act on."
      />
      <div className={twoColClass}>
        <Panel
          title="What should I look into?"
          hint="Paste a topic name, a question, or a block of article text."
        >
          <Field label="Topic or article text">
            <textarea
              className={`${fieldClass} min-h-48 resize-y`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 'Impact of a 4-day work week on employee retention', or paste an article you want summarised."
            />
          </Field>
          <Field label="Focus">
            <OptionRow<Focus>
              options={[
                { value: "both", label: "Summary + Insights" },
                { value: "summary", label: "Summary only" },
              ]}
              value={focus}
              onChange={setFocus}
            />
          </Field>
          <PrimaryButton
            onClick={generate}
            loading={loading}
            label="Research this"
            icon={Search}
          />
          <ErrorNote message={error} />
        </Panel>

        <div>
          {result ? (
            <Ticket tag="RESEARCH BRIEF" plainText={plainText}>
              <h4 className="mb-2 font-display text-sm font-bold">Summary</h4>
              <p>{result.summary}</p>
              <Section title="Key points" items={result.key_points} />
              {result.wantInsights && (
                <>
                  <Section title="Insights" items={result.insights} />
                  <Section title="Recommendations" items={result.recommendations} />
                </>
              )}
            </Ticket>
          ) : (
            <EmptyState
              icon={Search}
              text="Your summary and insights will appear here as a research brief."
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
