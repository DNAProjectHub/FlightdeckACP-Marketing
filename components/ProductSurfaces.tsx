"use client";

import { useState, useEffect, useCallback } from "react";
import ScreenshotFrame from "./ScreenshotFrame";

const surfaces = [
  {
    name: "Cockpit",
    image: "/images/screenshots/6_01_42_PM.webp",
    alt: "FlightDeck Cockpit — command deck with ATC Readout and cautions",
    copy: "Your command deck. ATC Readout narrates current project state. Cautions surface in plain language when your system needs a decision. Start Engines to begin preflight.",
  },
  {
    name: "ATC",
    image: "/images/screenshots/6_01_33_PM.webp",
    alt: "FlightDeck ATC — portfolio command with crew fuel gauges",
    copy: "Portfolio command. Session timer. All five crew members with fuel gauges. Multi-project flight trajectories with real ETAs. The full picture from one surface.",
  },
  {
    name: "Crew Manifest",
    image: "/images/screenshots/6_01_45_PM.webp",
    alt: "FlightDeck Crew Manifest — agent roles and fuel gauges",
    copy: "Danny is Pilot. ChatGPT is Architect. Claude is Reasoner. Claude Code is Implementer. Every agent has a defined role, a fuel gauge, and a full comms log. You manage a team, not a chatbox.",
  },
  {
    name: "Documents",
    image: "/images/screenshots/6_02_04_PM.webp",
    alt: "FlightDeck Document Manifest — classified documents with health checks",
    copy: "Every plan, spec, wireframe, and asset — classified, health-checked, and linked to the work it drives.",
  },
  {
    name: "Flight Planning",
    image: "/images/screenshots/6_02_17_PM.webp",
    alt: "FlightDeck Flight Planning — specs to work items with truth chains",
    copy: "Specs become work items through a governed process. Truth chains: every task traces to its source spec.",
  },
  {
    name: "Flight Logs",
    image: "/images/screenshots/6_02_21_PM.webp",
    alt: "FlightDeck Flight Logs — session history and commit receipts",
    copy: 'Session history, decisions, commits, and receipts. You never ask "what happened last Tuesday?" again.',
  },
  {
    name: "Maintenance",
    image: "/images/screenshots/6_01_55_PM.webp",
    alt: "FlightDeck Maintenance — diagnostics and system health",
    copy: "Diagnostics, provider bindings, secrets, system health. The hangar where the system services itself.",
  },
  {
    name: "Schema Explorer",
    image: "/images/screenshots/6_01_59_PM.webp",
    alt: "FlightDeck Schema Explorer — schema explorer and query console",
    copy: "Schema explorer and query console. Your system's data structure — visible and inspectable.",
  },
];

export default function ProductSurfaces() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((i) => (i + 1) % surfaces.length),
    []
  );

  // Auto-cycle every 5s unless paused
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Eight surfaces. One system.
          </h2>
          <p className="mt-4 text-base text-fd-gray max-w-xl mx-auto">
            Every part of FlightDeck has a specific job. Nothing overlaps.
            Nothing gets lost.
          </p>
        </div>

        {/* Tab pills */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {surfaces.map((s, i) => (
            <button
              key={s.name}
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                i === active
                  ? "bg-fd-orange text-fd-black"
                  : "bg-fd-surface border border-fd-border text-fd-gray hover:text-fd-gray-light hover:border-fd-orange/30"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Active surface display */}
        <div
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative">
            {surfaces.map((surface, i) => (
              <div
                key={surface.name}
                className={`transition-all duration-500 ${
                  i === active
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
                  <ScreenshotFrame src={surface.image} alt={surface.alt} />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white">
                      {surface.name}
                    </h3>
                    <p className="mt-3 text-base text-fd-gray leading-relaxed">
                      {surface.copy}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-6 flex gap-1.5">
                      {surfaces.map((_, j) => (
                        <div
                          key={j}
                          className="h-0.5 flex-1 rounded-full overflow-hidden bg-fd-border cursor-pointer"
                          onClick={() => {
                            setActive(j);
                            setPaused(true);
                          }}
                        >
                          <div
                            className={`h-full rounded-full transition-all ${
                              j === active
                                ? "bg-fd-orange w-full"
                                : j < active
                                  ? "bg-fd-orange/30 w-full"
                                  : "bg-transparent w-0"
                            }`}
                            style={
                              j === active && !paused
                                ? {
                                    animation: "progress 5s linear",
                                  }
                                : undefined
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Callouts */}
        <div className="mt-24 space-y-20">
          {/* Document Health */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScreenshotFrame
              src="/images/screenshots/6_03_01_PM.webp"
              alt="FlightDeck Ingest modal — document health with AI classification"
            />
            <div>
              <h3 className="text-2xl font-bold text-white">Document Health</h3>
              <p className="mt-4 text-base text-fd-gray leading-relaxed">
                Every document has a health signal. Green = exists and matches.
                Yellow = drifted. Red = problem. When it&apos;s red, FlightDeck
                tells you what&apos;s wrong and gives you a button to fix it.
              </p>
            </div>
          </div>

          {/* Asset Library */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white">Asset Library</h3>
              <p className="mt-4 text-base text-fd-gray leading-relaxed">
                Your brand assets are governed too. 82 icons. Logo variants.
                Design tokens. Classified, versioned, and linked to the
                documents that reference them.
              </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <ScreenshotFrame
                src="/images/screenshots/6_02_07_PM.webp"
                alt="FlightDeck Icon Library — 82 classified icons"
              />
              <ScreenshotFrame
                src="/images/screenshots/6_02_10_PM.webp"
                alt="FlightDeck Logos tab — governed brand assets"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
