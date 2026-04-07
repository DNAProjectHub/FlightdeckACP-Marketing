"use client";

import { useState, useEffect, useCallback } from "react";
import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

// Each row has a flight name and a tech (developer) name.
// In Flight mode the flight name is the title and tech is the subtitle.
// In Dev mode it inverts.
const mappings = [
  { flight: "ATC", tech: "Air traffic control" },
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
    <section id="devmode" className="py-24 border-t border-fd-border">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionLabel number="0.3" label="Two Modes" />
          <div className="mt-6 grid lg:grid-cols-2 gap-12 items-end">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Aviation metaphors,
              <br />
              <span className="text-fd-gray/60">or developer naming.</span>
            </h2>
            <p className="text-base text-fd-gray leading-relaxed max-w-md">
              One toggle switches every label in the system. Same data, same
              governance, same surfaces — pick the language you think in.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
          {/* List with title + subtitle that swap */}
          <ScrollReveal direction="left">
            <div
              className="rounded-lg border border-fd-border bg-fd-surface overflow-hidden cursor-pointer select-none"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={toggle}
            >
              {/* Toggle header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-fd-border">
                <div className="relative flex rounded-full bg-fd-black p-0.5">
                  <span
                    className={`absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full transition-all duration-500 ease-in-out ${
                      devMode
                        ? "left-[calc(50%+1px)] bg-fd-purple"
                        : "left-0.5 bg-fd-orange"
                    }`}
                  />
                  <span
                    className={`relative z-10 px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-500 ${
                      !devMode ? "text-fd-black" : "text-fd-gray"
                    }`}
                  >
                    Flight
                  </span>
                  <span
                    className={`relative z-10 px-3 py-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-500 ${
                      devMode ? "text-white" : "text-fd-gray"
                    }`}
                  >
                    Dev
                  </span>
                </div>
                <span className="text-[10px] text-fd-gray/50 uppercase tracking-widest">
                  {devMode ? "Developer Mode" : "Flight Mode"}
                </span>
              </div>

              {/* Rows with title and subtitle */}
              {mappings.map((m, i) => {
                const title = devMode ? m.tech : m.flight;
                const subtitle = devMode ? m.flight : m.tech;
                return (
                  <div
                    key={m.flight}
                    className="px-4 py-3 border-b border-fd-border/50 last:border-0"
                  >
                    <div
                      className="transition-all duration-500"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      <div className="text-sm font-semibold text-white">
                        {title}
                      </div>
                      <div className="text-xs text-fd-gray/60 mt-0.5">
                        {subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-fd-gray/50 text-center">
              hover to pause · click to toggle
            </p>
          </ScrollReveal>

          {/* Screenshot that swaps coordinated with the toggle */}
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
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
