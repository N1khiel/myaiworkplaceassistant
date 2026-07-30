import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles } from "lucide-react";
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
import { callAI } from "@/lib/ai";
import { bumpUsage } from "@/lib/usage";

type Tone = "Formal" | "Friendly" | "Persuasive";

type EmailSearch = {
  recipient?: string;
  purpose?: string;
  points?: string;
  tone?: Tone;
};

export const Route = createFileRoute("/email")({
  validateSearch: (search: Record<string, unknown>): EmailSearch => {
    const tone = search.tone;
    return {
      recipient: typeof search.recipient === "string" ? search.recipient : undefined,
      purpose: typeof search.purpose === "string" ? search.purpose : undefined,
      points: typeof search.points === "string" ? search.points : undefined,
      tone:
        tone === "Formal" || tone === "Friendly" || tone === "Persuasive"
          ? tone
          : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Deskline" },
      {
        name: "description",
        content:
          "Turn a few bullet points into a polished, ready-to-send work email in a formal, friendly or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator — Deskline" },
      {
        property: "og:description",
        content: "Turn bullet points into a polished work email in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";

const toneGuides: Record<Tone, string> = {
  Formal:
    "Formal: professional register, no contractions, precise and courteous, suitable for senior stakeholders or external contacts.",
  Friendly:
    "Friendly: warm and conversational, contractions okay, still professional, suitable for close colleagues.",
  Persuasive:
    "Persuasive: confident and benefit-led, makes a clear ask, anticipates one objection, ends with a direct call to action — without being pushy.",
};

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ text: string; tone: Tone } | null>(null);

  const generate = async () => {
    setError("");
    if (!purpose.trim()) {
      setError("Add a short description of what the email is about first.");
      return;
    }
    setLoading(true);
    try {
      const system = `You are a workplace email-writing assistant. Write a complete, ready-to-send email based on the user's brief.
Tone required: ${tone}. ${toneGuides[tone]}
Rules:
- Include a short subject line on the first line as "Subject: ..."
- Then a blank line, then the email body with a greeting and sign-off ("Best regards," with no name filled in, or similar).
- Keep it concise: 80-160 words in the body unless the brief clearly needs more.
- Do not invent specific facts, numbers, or names the user didn't give you — use neutral placeholders like [name] or [date] if something is missing.
- Output only the email itself, no preamble or commentary.`;
      const text = await callAI(
        system,
        `Recipient/audience: ${recipient || "not specified"}
What this email needs to say: ${purpose}
Key points to include: ${points || "none given, use judgement based on the purpose above"}`,
      );
      setResult({ text, tone });
      bumpUsage("email");
    } catch (e) {
      setError("Couldn't generate the email right now. " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feature 02 · Communication"
        title="Smart Email Generator"
        sub="Describe who it's for and what you need to say. Pick a tone, and get a ready-to-edit draft."
      />
      <div className={twoColClass}>
        <Panel
          title="Draft details"
          hint="The more context you give, the less editing you'll need to do after."
        >
          <Field label="Recipient / audience">
            <input
              className={fieldClass}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. my manager, Priya"
            />
          </Field>
          <Field label="What is this email about?">
            <textarea
              className={`${fieldClass} min-h-24 resize-y`}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Ask for a 2-day extension on the Q3 report because a dependency slipped. Mention the report is 80% done."
            />
          </Field>
          <Field label="Tone">
            <OptionRow<Tone>
              options={[
                { value: "Formal", label: "Formal" },
                { value: "Friendly", label: "Friendly" },
                { value: "Persuasive", label: "Persuasive" },
              ]}
              value={tone}
              onChange={setTone}
            />
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {toneGuides[tone]}
            </p>
          </Field>
          <Field label="Key points to include (optional)">
            <textarea
              className={`${fieldClass} min-h-16 resize-y`}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="One per line…"
            />
          </Field>
          <PrimaryButton
            onClick={generate}
            loading={loading}
            label="Generate email"
            icon={Sparkles}
          />
          <ErrorNote message={error} />
        </Panel>

        <div>
          {result ? (
            <Ticket
              tag={`EMAIL DRAFT · ${result.tone.toUpperCase()}`}
              plainText={result.text}
            >
              <pre className="m-0 font-sans whitespace-pre-wrap">{result.text}</pre>
            </Ticket>
          ) : (
            <EmptyState
              icon={Mail}
              text="Your generated email will appear here as a draft ticket, ready to copy."
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
