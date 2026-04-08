"use client";

import { useState, useEffect, useCallback } from "react";
import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

const mappings = [
  { flight: "ATC", tech: "System Overview" },
  { flight: "Cockpit", tech: "Overview & course setting" },
  { flight: "Crew Manifest", tech: "Agents, connections & status" },
  { flight: "Maintenance", tech: "Diagnostics, keys & prefs" },
  { flight: "Document Manifest", tech: "Docs, specs & governance" },
  { flight: "Flight Planification", tech: "Specs & work item creation" },
  { flight: "Flight Planning", tech: "Flights, sprints & execution" },
  { flight: "Flight Logs", tech: "Sessions, receipts & archives" },
];

export default function DevModeCallout() {
  const [devMode, setDevMode] = useState(false);
  const [paused, setPaused] = useState(false);

  const toggle = useCallback(() => setDevMode((v) => !v), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(toggle, 4500);
    return () => clearInterval(id);
  }, [paused, toggle]);

  return (
    <section id="devmode" className="snap-section py-16 border-t border-fd-border">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionLabel number="0.3" label="Two Vocabularies" />
          <div className="mt-6 grid lg:grid-cols-2 gap-12 items-end">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Aviation metaphors,
              <br />
              <span className="text-fd-gray/60">or developer naming.</span>
            </h2>
            <p className="text-base text-fd-gray leading-relaxed max-w-md">
              FlightDeck knows that not every founder needs the same level of
              guidance, and not every founder wants to navigate by metaphor. So
              the entire product has two synchronized vocabularies — not two
              different products. One toggle switches every label in the system.
              The data, the governance, the functionality — none of it changes.
              Only the labels do.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          <ScrollReveal direction="left">
            <div
              className="rounded-lg border border-fd-border bg-fd-surface overflow-hidden cursor-pointer select-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={toggle}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-fd-border">
                <div className="relative flex rounded-full bg-fd-black p-0.5">
                  <span
                    className={`absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full transition-all duration-500 ease-in-out ${
                      devMode
                        ? "left-[calc(50%+1px)] bg-fd-purple"
                        : "left-0.5 bg-fd-orange"
                    }`}
                  />
                  <span
                    className={`relative z-10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors duration-500 ${
                      !devMode ? "text-fd-black" : "text-fd-gray"
                    }`}
                  >
                    Flight
                  </span>
                  <span
                    className={`relative z-10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors duration-500 ${
                      devMode ? "text-white" : "text-fd-gray"
                    }`}
                  >
                    Dev
                  </span>
                </div>
                <span className="text-[9px] text-fd-gray/50 uppercase tracking-widest">
                  {devMode ? "Dev Mode" : "Flight Mode"}
                </span>
              </div>

              {mappings.map((m, i) => {
                const title = devMode ? m.tech : m.flight;
                const subtitle = devMode ? m.flight : m.tech;
                return (
                  <div
                    key={m.flight}
                    className="px-3 py-1.5 border-b border-fd-border/50 last:border-0"
                  >
                    <div
                      className="transition-all duration-500"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      <div className="text-xs font-semibold text-white leading-tight">
                        {title}
                      </div>
                      <div className="text-[10px] text-fd-gray/60 leading-tight mt-0.5">
                        {subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-[10px] text-fd-gray/40 text-center">
              hover to pause · click to toggle
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="relative">
              <div
                className={`transition-all duration-700 ${
                  devMode
                    ? "opacity-0 absolute inset-0 pointer-events-none"
                    : "opacity-100 relative"
                }`}
              >
                <ScreenshotFrame
                  src="/images/screenshots/6_02_04_PM.webp"
                  alt="FlightDeck Document Manifest in Flight mode — aviation naming"
                />
              </div>
              <div
                className={`transition-all duration-700 ${
                  devMode
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                <ScreenshotFrame
                  src="/images/screenshots/6_53_25_PM.webp"
                  alt="FlightDeck Documents in Developer mode — technical naming"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <FigLabel number="0.3" />
                <span className="text-xs text-fd-gray/50 uppercase tracking-widest font-mono">
                  {devMode ? "Dev Mode" : "Flight Mode"}
                </span>
              </div>
              <p className="mt-4 text-sm text-fd-gray leading-relaxed">
                It is the same system speaking two languages simultaneously: one
                for founders who want to navigate by intuition, one for
                developers who want precise technical vocabulary. You can switch
                at any time. They are two views of one product.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
