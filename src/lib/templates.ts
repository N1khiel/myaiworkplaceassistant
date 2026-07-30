export type EmailTone = "Formal" | "Friendly" | "Persuasive";

export interface EmailTemplate {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intent: string;
  category: string;
  summary: string;
  whenToUse: string;
  structure: string[];
  sample: string;
  tips: string[];
  prefill: {
    recipient: string;
    purpose: string;
    points: string;
    tone: EmailTone;
  };
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    slug: "ask-for-a-raise",
    title: "How to ask for a raise over email",
    metaTitle: "How to Ask for a Raise Email — Template & Example",
    metaDescription:
      "A proven structure for a salary increase email, a full worked example, and an AI email writer that adapts it to your role in seconds.",
    intent: "how to ask for a raise email",
    category: "Career",
    summary:
      "Make the ask specific, evidence-led and easy to say yes to — without sounding like an ultimatum.",
    whenToUse:
      "Use this when you want a documented, considered request ahead of a review conversation. Email works best as the opener: it gives your manager time to gather budget facts before you meet.",
    structure: [
      "Open with the ask in one sentence — no long wind-up.",
      "Give three pieces of evidence: scope you've grown into, results with numbers, and feedback you've received.",
      "Name a figure or a range, anchored to market data or the next band.",
      "Ask for a meeting rather than a yes/no reply by email.",
    ],
    sample: `Subject: Salary review — time to discuss?

Hi [manager],

I'd like to talk about adjusting my salary, and wanted to give you the context in writing first.

Over the past [period] my remit has grown beyond the original role: I now [scope you own], and I led [project] which delivered [measurable result]. [Stakeholder] flagged that work as [feedback].

Based on what I'm seeing for comparable roles, I'd like to discuss moving to [figure or range]. I know that depends on budget cycles, so I'm flexible on timing.

Could we find 30 minutes in the next couple of weeks to talk it through?

Best regards,`,
    tips: [
      "Quantify at least one result. \"Cut turnaround from 5 days to 2\" beats \"improved the process\".",
      "Don't apologise for asking, and don't mention a competing offer unless you'd genuinely take it.",
      "Send it early in the week and well before budget planning closes.",
    ],
    prefill: {
      recipient: "my manager",
      purpose:
        "Request a salary review. My responsibilities have grown well beyond my original role and I want to discuss moving to a higher band.",
      points:
        "Scope has grown — I now own [area]\nDelivered [project] with [measurable result]\nAsking for [figure or range]\nRequest a 30-minute meeting rather than a reply by email",
      tone: "Persuasive",
    },
  },
  {
    slug: "decline-a-meeting",
    title: "How to write an email declining a meeting",
    metaTitle: "Decline a Meeting Email — Polite Templates That Work",
    metaDescription:
      "Say no to a meeting without damaging the relationship: structure, a ready-to-send example, and an AI email writer that drafts your version instantly.",
    intent: "how to write an email to decline a meeting",
    category: "Calendar",
    summary:
      "Decline the meeting, not the person — protect the outcome they wanted while getting your time back.",
    whenToUse:
      "Use this when the meeting isn't the right use of your time, you're not the right attendee, or the topic can be resolved asynchronously.",
    structure: [
      "Thank them and acknowledge the topic in one line.",
      "Decline clearly — \"I'm going to sit this one out\" — with a brief, honest reason.",
      "Protect the outcome: offer notes, a written answer, a delegate, or a later slot.",
      "Close warmly so the no reads as a scheduling decision, not a snub.",
    ],
    sample: `Subject: Can't make [meeting] — here's my input

Hi [name],

Thanks for the invite to [meeting] on [date]. I'm going to have to pass on this one — I'm heads-down on [priority] until [date] and wouldn't be able to give it proper attention.

So it doesn't hold you up: my view on [topic] is [short position]. [Colleague] is closer to the detail and is happy to attend in my place.

Happy to pick it up afterwards if anything needs my call.

Best regards,`,
    tips: [
      "Reply before the meeting, not on the day — late declines are what actually annoy people.",
      "One reason is enough. A stack of excuses reads as defensive.",
      "Always give the organiser a path forward: notes, a stand-in, or a written answer.",
    ],
    prefill: {
      recipient: "the meeting organiser",
      purpose:
        "Politely decline a meeting invitation because of a conflicting priority, while still helping the organiser get what they need.",
      points:
        "Thank them for the invite\nDecline clearly with one honest reason\nOffer written input or a stand-in\nOffer to pick it up afterwards",
      tone: "Friendly",
    },
  },
  {
    slug: "follow-up-after-no-reply",
    title: "How to write a follow-up email after no reply",
    metaTitle: "Follow-Up Email After No Reply — Template & Example",
    metaDescription:
      "Chase a silent inbox without nagging. A short follow-up structure, a worked example, and an AI email writer that tailors it to your thread.",
    intent: "follow up email after no response",
    category: "Communication",
    summary:
      "Assume good faith, make replying a two-second job, and give a real deadline.",
    whenToUse:
      "Use this three to five working days after an unanswered request — sooner if something is blocked on their answer.",
    structure: [
      "Reference the original message and its date in one line.",
      "Restate the single thing you need, not the whole thread.",
      "Make it answerable in one word or one click.",
      "Give a date and say what you'll do if you don't hear back.",
    ],
    sample: `Subject: Following up: [topic]

Hi [name],

Following up on my note from [date] about [topic] — I know inboxes get busy.

All I need is a yes or no on [specific decision]. If it's easier, reply with just "approved" and I'll take it from there.

If I don't hear back by [date], I'll proceed with [default action] so [project] keeps moving.

Best regards,`,
    tips: [
      "Keep it under 80 words. Long follow-ups get skipped twice.",
      "Never open with \"just checking in\" — lead with the decision you need.",
      "Stating your default action is the single most effective way to get a reply.",
    ],
    prefill: {
      recipient: "a colleague who hasn't replied",
      purpose:
        "Send a short, polite follow-up to an unanswered email and get a yes/no decision so the work isn't blocked.",
      points:
        "Reference the original email and date\nRestate the one decision needed\nMake it answerable in one word\nGive a deadline and state my default action",
      tone: "Friendly",
    },
  },
  {
    slug: "apologise-for-a-mistake",
    title: "How to write an apology email at work",
    metaTitle: "Work Apology Email — How to Write One (With Example)",
    metaDescription:
      "Own a mistake at work in writing: a four-part apology structure, a full example, and an AI email writer that drafts your version.",
    intent: "how to write an apology email",
    category: "Communication",
    summary:
      "Own it early, skip the excuses, and lead with what you're doing about it.",
    whenToUse:
      "Use this when you've missed a deadline, sent something wrong, or dropped a commitment that affected someone else's work.",
    structure: [
      "Apologise in the first line — no preamble.",
      "Say what happened in one factual sentence, no blame-shifting.",
      "State the fix and when it lands.",
      "Say what prevents a repeat, then stop writing.",
    ],
    sample: `Subject: Apology — [issue]

Hi [name],

I'm sorry about [what happened]. That was my miss and I understand it [impact on them].

What happened: [one factual sentence]. I've since [immediate fix], and the corrected [deliverable] will be with you by [date].

To stop it recurring I've [concrete change]. Happy to talk it through if that would help.

Best regards,`,
    tips: [
      "\"I'm sorry that you…\" is not an apology. Say \"I'm sorry I…\".",
      "One sentence of explanation is context; three is an excuse.",
      "Send it the moment you know, not once it's fixed.",
    ],
    prefill: {
      recipient: "the colleague or client affected",
      purpose:
        "Apologise sincerely for a mistake at work, explain briefly what happened, and set out the fix and the prevention step.",
      points:
        "Apologise in the first line\nOne factual sentence on what happened\nThe fix and when it lands\nWhat prevents a repeat",
      tone: "Formal",
    },
  },
  {
    slug: "request-time-off",
    title: "How to write a time off request email",
    metaTitle: "Time Off Request Email — Template and Example",
    metaDescription:
      "Request leave in a way that gets approved quickly: exact dates, cover plan, a worked example, and an AI email writer to draft yours.",
    intent: "time off request email",
    category: "Calendar",
    summary:
      "Approval is fastest when the cover plan is already in the email.",
    whenToUse:
      "Use this for annual leave, a personal day, or any planned absence that needs a manager's sign-off.",
    structure: [
      "State the exact dates and the return date up front.",
      "Confirm what's covered and by whom while you're away.",
      "Flag anything landing in that window and how it's handled.",
      "Ask for confirmation so it's documented.",
    ],
    sample: `Subject: Leave request — [dates]

Hi [manager],

I'd like to request leave from [start date] to [end date], back at my desk on [return date].

[Project] is on track to be handed over before I go, and [colleague] has agreed to cover [responsibility]. The only thing landing in that window is [item] — I'll have that finished by [date].

Could you confirm when you get a chance so I can book?

Best regards,`,
    tips: [
      "Give the return date explicitly — it's the detail managers actually plan around.",
      "Arrange cover before you send; \"someone can cover\" invites a follow-up question.",
      "Ask early for anything near a launch, quarter end, or a colleague's booked leave.",
    ],
    prefill: {
      recipient: "my manager",
      purpose:
        "Request approval for planned time off, with clear dates and a cover plan so nothing is left hanging.",
      points:
        "Exact start, end and return dates\nWho is covering which responsibility\nWhat lands during the window and how it's handled\nAsk for written confirmation",
      tone: "Formal",
    },
  },
  {
    slug: "introduce-yourself-to-a-new-team",
    title: "How to write an introduction email to a new team",
    metaTitle: "Introduction Email to a New Team — Template & Example",
    metaDescription:
      "Introduce yourself to a new team without the cliches: a simple structure, a worked example, and an AI email writer to personalise it.",
    intent: "introduction email to new team",
    category: "Career",
    summary:
      "Say who you are, what you'll own, and how to reach you — then get out of the way.",
    whenToUse:
      "Use this in your first week in a new role, or when joining a cross-functional project team mid-flight.",
    structure: [
      "Name, role, and who you're working most closely with.",
      "One line of relevant background — not your whole CV.",
      "What you'll be picking up and by when.",
      "How and when to reach you, plus an open invitation to talk.",
    ],
    sample: `Subject: Hello from [name] — joining as [role]

Hi everyone,

I'm [name], joining as [role] and working closest with [team or people].

I've spent the last few years on [relevant background], most recently [one concrete thing]. Over my first few weeks I'll be picking up [area], starting with [first task].

I'm on [channel] most of the day and my calendar is open — if you'd like to grab 15 minutes to tell me what's working and what isn't, please do.

Looking forward to it,`,
    tips: [
      "Skip \"excited to join this amazing team\" — say something concrete instead.",
      "Naming your first task tells people when to bring you things.",
      "Explicitly invite intro calls; most people won't book without permission.",
    ],
    prefill: {
      recipient: "my new team",
      purpose:
        "Introduce myself to a new team in my first week: who I am, what I'll own, and how to reach me.",
      points:
        "Name, role and who I work most closely with\nOne line of relevant background\nWhat I'm picking up first\nInvite people to book 15 minutes with me",
      tone: "Friendly",
    },
  },
];

export function getTemplate(slug: string) {
  return EMAIL_TEMPLATES.find((t) => t.slug === slug);
}
