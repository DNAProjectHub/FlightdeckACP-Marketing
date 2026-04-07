"use client";

import { useState } from "react";
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

function Region({ region }: { region: SurfaceRegion }) {
  const [active, setActive] = useState(0);
  const tab = region.tabs[active];

  return (
    <ScrollReveal>
      <div className="border-t border-fd-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel number={region.number} label={region.label} />

          <div className="mt-6 grid lg:grid-cols-2 gap-12 items-end">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              {region.heading}
            </h2>
            <p className="text-base text-fd-gray leading-relaxed max-w-md">
              {region.intro}
            </p>
          </div>

          {/* Big dominant screenshot */}
          <div className="mt-12 relative">
            {region.tabs.map((t, i) => (
              <div
                key={t.number}
                className={`transition-opacity duration-500 ${
                  i === active
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <ScreenshotFrame src={t.image} alt={t.alt} />
              </div>
            ))}
            <div className="mt-3 flex items-center justify-between">
              <FigLabel number={tab.number} />
              <span className="text-xs text-fd-gray/50">{tab.name}</span>
            </div>
          </div>

          {/* Body copy for active tab */}
          <p className="mt-8 max-w-2xl text-base text-fd-gray-light leading-relaxed">
            {tab.body}
          </p>

          {/* Sub-tabs */}
          <div className="mt-10 flex flex-wrap gap-2">
            {region.tabs.map((t, i) => (
              <button
                key={t.number}
                onClick={() => setActive(i)}
                className={`group flex items-baseline gap-2 rounded-md border px-4 py-2 text-sm transition-all ${
                  i === active
                    ? "border-fd-orange/40 bg-fd-orange/5 text-white"
                    : "border-fd-border bg-fd-surface text-fd-gray hover:border-fd-orange/20 hover:text-fd-gray-light"
                }`}
              >
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
