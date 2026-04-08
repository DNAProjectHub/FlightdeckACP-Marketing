"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

interface SubTab {
  number: string;
  name: string;
  image: string;
  alt: string;
  body: string;
}

interface SurfaceRegion {
  number: string;
  label: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  tabs: SubTab[];
}

const regions: SurfaceRegion[] = [
  {
    number: "1.0",
    label: "Plan",
    headingLine1: "Turn ideas into",
    headingLine2: "governed specs.",
    intro:
      "Every plan, specification, policy, design document, wireframe, and visual asset in the system — classified, searchable, and health-checked. Every document has a live health indicator. And when it\u2019s red, the system doesn\u2019t just show you a colored dot. It tells you what\u2019s wrong, why it happened, and gives you a button to fix it.",
    tabs: [
      {
        number: "1.1",
        name: "Document Manifest",
        image: "/images/screenshots/6_02_04_PM.webp",
        alt: "FlightDeck Document Manifest — classified documents with health checks",
        body: "Every plan, spec, wireframe, and asset — classified, health-checked, and linked to the work it drives. Green means everything matches. Yellow means something has drifted. Red means there\u2019s a problem — and the system tells you what, why, and how to fix it.",
      },
      {
        number: "1.2",
        name: "Flight Planning",
        image: "/images/screenshots/6_02_17_PM.webp",
        alt: "FlightDeck Flight Planning — specs to work items with truth chains",
        body: "Your execution board. Every flight plan organized by sprint, with completion status, effort, and lineage to the spec that created it. This is where you see the truth chain: this spec produced these flight plans, these are done, these are in progress, these are waiting.",
      },
      {
        number: "1.3",
        name: "Ingest",
        image: "/images/screenshots/6_03_01_PM.webp",
        alt: "FlightDeck Ingest modal — AI classification with health badges",
        body: "Drop in a markdown document and it gets classified, summarized by AI, and routed through the inbox. Drop in a JSX wireframe and it renders as a live, interactive preview. You don\u2019t have to tell FlightDeck what kind of file you\u2019re giving it.",
      },
    ],
  },
  {
    number: "2.0",
    label: "Execute",
    headingLine1: "Coordinate",
    headingLine2: "the crew.",
    intro:
      "You are the pilot in command. Your AI tools are your crew. Each one has a defined job, clear limits, and rules about what it can and cannot do without your sign-off. You manage a team, not a chatbox.",
    tabs: [
      {
        number: "2.1",
        name: "Cockpit",
        image: "/images/screenshots/6_01_42_PM.webp",
        alt: "FlightDeck Cockpit — command deck with ATC Readout and cautions",
        body: "Your at-a-glance command deck. Every session starts here. A full automated preflight check reads your project\u2019s health every time you start — document status, inbox items, spec coverage, flight plan status, provider connections, and agent context levels — so you always know where you stand before you touch a thing.",
      },
      {
        number: "2.2",
        name: "ATC",
        image: "/images/screenshots/6_01_33_PM.webp",
        alt: "FlightDeck ATC — portfolio command with crew fuel gauges",
        body: "Portfolio command across all projects. Session timer. Crew fuel gauges. Multi-project trajectories with current phase and destination. The full picture from one surface.",
      },
      {
        number: "2.3",
        name: "Crew Manifest",
        image: "/images/screenshots/6_01_45_PM.webp",
        alt: "FlightDeck Crew Manifest — agent roles and fuel gauges",
        body: "Your AI team roster. Which tools are connected, what each one has been asked to do, what they\u2019ve produced, and the full history of your conversations with them. Danny is Pilot. ChatGPT is Architect. Claude is Reasoner. Claude Code is Implementer.",
      },
    ],
  },
  {
    number: "3.0",
    label: "Govern",
    headingLine1: "Receipts for",
    headingLine2: "everything.",
    intro:
      "Session history, decisions, commits, and receipts. Nothing fails silently — when something goes wrong, FlightDeck tells you what happened, why it matters, and what to do about it. In plain language. With a button to fix it.",
    tabs: [
      {
        number: "3.1",
        name: "Flight Logs",
        image: "/images/screenshots/6_02_21_PM.webp",
        alt: "FlightDeck Flight Logs — session history and commit receipts",
        body: "The historical memory of the system. Session history, receipts, prior decisions, archived past work, and the history of your dispatches with your AI crew. This is where you go when you need to know what happened before now. No more \u201Cwhat was I doing last Tuesday?\u201D",
      },
      {
        number: "3.2",
        name: "Maintenance",
        image: "/images/screenshots/6_01_55_PM.webp",
        alt: "FlightDeck Maintenance — diagnostics and system health",
        body: "Your service hangar. Diagnostic tools, security settings, system preferences, provider bindings, key rotation, and the machinery you need to keep the system healthy and under control.",
      },
      {
        number: "3.3",
        name: "Schema Explorer",
        image: "/images/screenshots/6_01_59_PM.webp",
        alt: "FlightDeck Schema Explorer — schema explorer and query console",
        body: "Safe, structured visibility into your project\u2019s database schema. You can explore tables, columns, relationships, and indexes without needing raw database tooling. The system makes your data structure legible without putting you in a position to accidentally damage it.",
      },
    ],
  },
];

const DURATION = 4500;

function Region({ region }: { region: SurfaceRegion }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = region.tabs.length;

  const advance = useCallback(() => {
    setActive(a => (a + 1) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused, advance]);

  const handleTabClick = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(i);
  };

  const tab = region.tabs[active];

  return (
    <ScrollReveal>
      <div
        className="snap-section border-t border-fd-border py-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel number={region.number} label={region.label} />

          <div className="mt-4 grid lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
              {region.headingLine1}
              <br />
              <span className="text-fd-gray/60">{region.headingLine2}</span>
            </h2>
            <p className="text-sm text-fd-gray leading-relaxed max-w-md">
              {region.intro}
            </p>
          </div>

          <div className="mt-6 relative max-w-3xl mx-auto">
            {region.tabs.map((t, i) => (
              <div
                key={t.number}
                className={`transition-opacity duration-700 ${
                  i === active
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <ScreenshotFrame src={t.image} alt={t.alt} />
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between">
              <FigLabel number={tab.number} />
              <span className="text-xs text-fd-gray/50">{tab.name}</span>
            </div>
          </div>

          <div className="mt-4 max-w-2xl mx-auto text-center relative min-h-[2.5rem]">
            {region.tabs.map((t, i) => (
              <p
                key={t.number}
                className={`text-sm text-fd-gray-light leading-relaxed transition-opacity duration-500 ${
                  i === active
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                {t.body}
              </p>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
            {region.tabs.map((t, i) => (
              <button
                key={t.number}
                onClick={() => handleTabClick(i)}
                className={`shrink-0 group relative overflow-hidden flex items-baseline gap-2 rounded-md border px-4 py-2 text-sm transition-all ${
                  i === active
                    ? "border-fd-orange/40 bg-fd-orange/5 text-white"
                    : "border-fd-border bg-fd-surface text-fd-gray hover:border-fd-orange/20 hover:text-fd-gray-light"
                }`}
              >
                {i === active && !paused && (
                  <span
                    key={active}
                    className="absolute bottom-0 left-0 h-[2px] bg-fd-orange/60 rounded-full"
                    style={{
                      animation: `pill-progress ${DURATION}ms linear forwards`,
                    }}
                  />
                )}
                <span
                  className={`font-mono text-xs ${
                    i === active ? "text-fd-orange" : "text-fd-gray/50"
                  }`}
                >
                  {t.number}
                </span>
                <span className="font-medium">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ProductSurfaces() {
  return (
    <section id="surfaces">
      {regions.map((region) => (
        <Region key={region.number} region={region} />
      ))}
    </section>
  );
}
