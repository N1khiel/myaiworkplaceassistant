import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  EmptyState,
  ErrorNote,
  Field,
  PageHeader,
  Panel,
  PrimaryButton,
  PriorityBadge,
  Ticket,
  fieldClass,
  twoColClass,
} from "@/components/ui-kit";
import { callAI, parseJsonLoose } from "@/lib/ai";
import { bumpUsage } from "@/lib/usage";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Deskline" },
      {
        name: "description",
        content:
          "Drop in a raw task list and get a prioritised, time-blocked schedule for today or the week ahead.",
      },
      { property: "og:title", content: "AI Task Planner — Deskline" },
      {
        property: "og:description",
        content: "Turn a messy task list into a prioritised, time-blocked plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

type Row = { time: string; task: string; priority: string; notes?: string };
type Plan = { summary: string; schedule: Row[] };

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [timeframe, setTimeframe] = useState("today");
  const [constraints, setConstraints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Plan | null>(null);

  const generate = async () => {
    setError("");
    if (!tasks.trim()) {
      setError("List at least one task first.");
      return;
    }
    setLoading(true);
    try {
      const system = `You are an AI task-planning assistant for a busy professional. Given a raw task list, produce a prioritised, time-blocked schedule for ${timeframe}.
Respond with ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "summary": "one short sentence framing the plan",
  "schedule": [
    {"time": "9:00-9:45", "task": "short task name", "priority": "high|medium|low", "notes": "one short clause, optional, can be empty string"}
  ]
}
Rules:
- Priority: "high" = urgent/deadline-driven or high-impact; "medium" = important but flexible; "low" = nice-to-have/can slip.
- Order the schedule array chronologically.
- If constraints mention fixed meetings or hours, respect them exactly and schedule around them.
- If timeframe is "this week", use day labels instead of clock times, e.g. "Mon AM", "Wed PM".
- Keep task names close to what the user wrote, don't invent new tasks.`;
      const raw = await callAI(
        system,
        `Tasks:\n${tasks}\n\nConstraints: ${constraints || "none given, assume a standard 9am-5pm workday"}`,
      );
      setResult(parseJsonLoose<Plan>(raw));
      bumpUsage("planner");
    } catch (e) {
      setError("Couldn't build the schedule right now. " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const plainText = result
    ? `${result.summary}\n\n` +
      (result.schedule || [])
        .map(
          (r) =>
            `${r.time} — ${r.task} [${r.priority}]${r.notes ? " — " + r.notes : ""}`,
        )
        .join("\n")
    : "";

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feature 03 · Time management"
        title="AI Task Planner"
        sub="List what's on your plate. Get a prioritised, time-blocked plan back."
      />
      <div className={twoColClass}>
        <Panel
          title="Your tasks"
          hint="One task per line. Add deadlines or effort in brackets if you have them."
        >
          <Field label="Task list">
            <textarea
              className={`${fieldClass} min-h-40 resize-y`}
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              placeholder={
                "e.g.\nFinish client proposal (due tomorrow 5pm)\nReply to HR about leave request\nPrep slides for Monday standup\n30-min gym session\nReview Sarah's PR"
              }
            />
          </Field>
          <Field label="Plan for">
            <select
              className={fieldClass}
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="this week">This week</option>
            </select>
          </Field>
          <Field label="Constraints (optional)">
            <textarea
              className={`${fieldClass} min-h-16 resize-y`}
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="e.g. Working hours 9am–5pm, meeting 2–3pm, prefer deep work in the morning"
            />
          </Field>
          <PrimaryButton
            onClick={generate}
            loading={loading}
            label="Build my schedule"
            icon={Sparkles}
          />
          <ErrorNote message={error} />
        </Panel>

        <div>
          {result ? (
            <Ticket tag={`SCHEDULE · ${timeframe.toUpperCase()}`} plainText={plainText}>
              <h4 className="mb-3 font-display text-sm font-bold">{result.summary}</h4>
              {(result.schedule || []).map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[76px_1fr_auto] items-start gap-3 border-b border-border py-3 last:border-0"
                >
                  <div className="pt-0.5 font-mono text-xs font-semibold text-accent-dark">
                    {row.time}
                  </div>
                  <div>
                    <strong className="block text-sm">{row.task}</strong>
                    {row.notes && (
                      <span className="text-xs text-muted-foreground">{row.notes}</span>
                    )}
                  </div>
                  <PriorityBadge priority={row.priority} />
                </div>
              ))}
            </Ticket>
          ) : (
            <EmptyState
              icon={ListChecks}
              text="Your prioritised schedule will appear here, time-blocked and ready to follow."
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
