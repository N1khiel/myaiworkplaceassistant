export type QuickPick = { label: string; query: string };

export const MATERIAL_CATEGORIES: { name: string; picks: QuickPick[] }[] = [
  {
    name: "Stainless steel",
    picks: [
      { label: "304 / 1.4301", query: "304 stainless steel (1.4301) sheet" },
      { label: "316L marine", query: "316L stainless steel for marine environments" },
      { label: "17-4 PH", query: "17-4 PH precipitation hardening stainless steel" },
      { label: "Duplex 2205", query: "Duplex 2205 stainless steel" },
    ],
  },
  {
    name: "Carbon & tool steel",
    picks: [
      { label: "EN8 / 1045", query: "EN8 medium carbon steel (AISI 1045) bar" },
      { label: "4140 chromoly", query: "AISI 4140 chromoly alloy steel" },
      { label: "D2 tool steel", query: "D2 cold work tool steel" },
      { label: "S355 structural", query: "S355JR structural steel section" },
    ],
  },
  {
    name: "Light alloys",
    picks: [
      { label: "6061-T6 alu", query: "6061-T6 aluminium extrusion" },
      { label: "7075-T651", query: "7075-T651 aerospace aluminium plate" },
      { label: "Ti-6Al-4V", query: "Ti-6Al-4V grade 5 titanium" },
      { label: "AZ31B mag", query: "AZ31B magnesium alloy sheet" },
    ],
  },
  {
    name: "Polymers & composites",
    picks: [
      { label: "PEEK", query: "PEEK engineering polymer for machined parts" },
      { label: "Nylon 66 GF30", query: "Nylon 66 with 30% glass fibre" },
      { label: "Carbon fibre prepreg", query: "carbon fibre epoxy prepreg laminate" },
      { label: "UHMWPE", query: "UHMWPE wear strip material" },
    ],
  },
];

export type MaterialProperty = { label: string; value: string };

export type MaterialResult = {
  name: string;
  category: string;
  summary: string;
  equivalents: string[];
  composition: MaterialProperty[];
  properties: MaterialProperty[];
  standards: string[];
  forms: string[];
  applications: string[];
  fabrication: string[];
  alternatives: { name: string; why: string }[];
  sourcing: string[];
  cautions: string;
};

export const MATERIAL_SYSTEM = `You are a materials engineer helping an industrial buyer source a material.
Given a material query (a grade, spec, or a description of a requirement), respond with STRICT JSON only, no markdown fences, matching:
{
  "name": string,                         // best-matching material/grade name
  "category": string,                     // e.g. "Austenitic stainless steel"
  "summary": string,                      // 2-3 sentence plain-English overview
  "equivalents": string[],                // cross-standard designations (UNS, EN, DIN, JIS, etc.), 3-6 items
  "composition": [{"label": string, "value": string}],   // key elements with typical wt% ranges, 4-8 items
  "properties": [{"label": string, "value": string}],    // e.g. tensile strength, yield, hardness, density, max service temp, 5-8 items
  "standards": string[],                  // relevant specifications/standards, 2-5 items
  "forms": string[],                      // commonly stocked forms and sizes, 3-6 items
  "applications": string[],               // typical uses, 4-6 items
  "fabrication": string[],                // machinability, weldability, heat treatment notes, 3-5 items
  "alternatives": [{"name": string, "why": string}],     // 2-4 substitute materials
  "sourcing": string[],                   // practical buying notes: typical suppliers types, lead time, cost band, MOQ, 3-5 items
  "cautions": string                      // one paragraph on corrosion/limits/verification
}
Use typical published values and clearly say "typical" where relevant. Never invent a grade that does not exist — if the query is vague, pick the closest common grade and say so in the summary.`;
