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
  heading: string;
  intro: string;
  tabs: SubTab[];
}

const regions: SurfaceRegion[] = [
  {
    number: "1.0",
    label: "Plan",
    heading: "Turn ideas into governed specs.",
    intro:
      "Every plan, spec, wireframe, and asset — classified, health-checked, and linked to the work it drives. Specs become work items through a structured process. Truth chains: every task traces to its source.",
    tabs: [
      {
        number: "1.1",
        name: "Document Manifest",
        image: "/images/screenshots/6_02_04_PM.webp",
        alt: "FlightDeck Document Manifest — classified documents with health checks",
        body: "Every document classified, health-checked, and linked to the work it drives.",
      },
      {
        number: "1.2",
        name: "Flight Planning",
        image: "/images/screenshots/6_02_17_PM.webp",
        alt: "FlightDeck Flight Planning — specs to work items with truth chains",
        body: "Specs become work items through a governed process. Every task traces to its source spec.",
      },
      {
        number: "1.3",
        name: "Ingest",
        image: "/images/screenshots/6_03_01_PM.webp",
        alt: "FlightDeck Ingest modal — AI classification with health badges",
        body: "AI classifies new documents on intake. Confidence badges. Always reviewable.",
      },
    ],
  },
  {
    number: "2.0",
    label: "Execute",
    heading: "Coordinate the crew.",
    intro:
      "Your command deck. ATC narrates current state. The crew has defined roles, fuel gauges, and full comms logs. You manage a team, not a chatbox.",
    tabs: [
      {
        number: "2.1",
        name: "Cockpit",
        image: "/images/screenshots/6_01_42_PM.webp",
        alt: "FlightDeck Cockpit — command deck with ATC Readout and cautions",
        body: "Your command deck. ATC Readout narrates project state. Cautions surface in plain language when your system needs a decision.",
      },
      {
        number: "2.2",
        name: "ATC",
        image: "/images/screenshots/6_01_33_PM.webp",
        alt: "FlightDeck ATC — portfolio command with crew fuel gauges",
        body: "Portfolio command. Session timer. Crew fuel gauges. Multi-project trajectories with real ETAs. The full picture from one surface.",
      },
      {
        number: "2.3",
        name: "Crew Manifest",
        image: "/images/screenshots/6_01_45_PM.webp",
        alt: "FlightDeck Crew Manifest — agent roles and fuel gauges",
        body: "Danny is Pilot. ChatGPT is Architect. Claude is Reasoner. Claude Code is Implementer. Defined roles. Full comms logs.",
      },
    ],
  },
  {
    number: "3.0",
    label: "Govern",
    heading: "Receipts for everything.",
    intro:
      "Session history, decisions, commits, and receipts. Diagnostics, secrets, and system health. Schema explorer for the data structures underneath.",
    tabs: [
      {
        number: "3.1",
        name: "Flight Logs",
        image: "/images/screenshots/6_02_21_PM.webp",
        alt: "FlightDeck Flight Logs — session history and commit receipts",
        body: 'Session history, decisions, commits, and receipts. You never ask "what happened last Tuesday?" again.',
      },
      {
        number: "3.2",
        name: "Maintenance",
        image: "/images/screenshots/6_01_55_PM.webp",
        alt: "FlightDeck Maintenance — diagnostics and system health",
        body: "Diagnostics, provider bindings, secrets, system health. The hangar where the system services itself.",
      },
      {
        number: "3.3",
        name: "Schema Explorer",
        image: "/images/screenshots/6_01_59_PM.webp",
        alt: "FlightDeck Schema Explorer — schema explorer and query console",
        body: "Schema explorer and query console. Your system's data structure — visible and inspectable.",
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.1]">
              {region.heading}
            </h2>
            <p className="text-sm text-fd-gray leading-relaxed max-w-md">
              {region.intro}
            </p>
          </div>

          {/* Screenshots — fade between tabs, constrained */}
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

          {/* Body copy — fade with tab */}
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

          {/* Pills with progress bar */}
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
