"use client";

import { useState, useEffect, useCallback } from "react";
import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";

const mappings = [
  { flight: "Cockpit", dev: "System Overview" },
  { flight: "ATC", dev: "Overview & Course Setting" },
  { flight: "Crew Manifest", dev: "Agents, Connections & Status" },
  { flight: "Maintenance", dev: "Diagnostics, Keys & Config" },
  { flight: "Flight Planning", dev: "Specs & Work Item Creation" },
  { flight: "Flight Logs", dev: "Sessions, Receipts & Archives" },
];

export default function DevModeCallout() {
  const [devMode, setDevMode] = useState(false);
  const [paused, setPaused] = useState(false);

  const toggle = useCallback(() => setDevMode((v) => !v), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(toggle, 3500);
    return () => clearInterval(id);
  }, [paused, toggle]);

  return (
    <section id="devmode" className="py-20 border-b border-fd-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-fd-purple uppercase">
                Two modes. Same system.
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white tracking-tight">
                Not into aviation metaphors?
                <br />
                Developer Mode speaks your language.
              </h2>
              <p className="mt-4 text-base text-fd-gray leading-relaxed">
                One toggle switches every label in the system. Same data, same
                governance, same surfaces — just the naming you&apos;d expect
                from a dev tool.
              </p>

              <div
                className="mt-8 rounded-lg border border-fd-border bg-fd-surface overflow-hidden cursor-pointer select-none"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onClick={toggle}
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-fd-border">
                  <div className="flex items-center gap-3">
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
                  </div>
                  <span className="text-[10px] text-fd-gray/50 uppercase tracking-widest">
                    {devMode ? "Developer Mode" : "Flight Mode"}
                  </span>
                </div>

                {mappings.map((m, i) => (
                  <div
                    key={m.flight}
                    className="relative px-4 py-2.5 border-b border-fd-border/50 last:border-0 overflow-hidden"
                  >
                    <div className="relative h-5">
                      <span
                        className={`absolute inset-0 flex items-center text-sm font-medium transition-all duration-500 ${
                          devMode
                            ? "opacity-0 -translate-y-2 blur-[2px]"
                            : "opacity-100 translate-y-0 blur-0"
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <span className="text-fd-orange/60 mr-2">▸</span>
                        <span className="text-fd-gray-light">{m.flight}</span>
                      </span>
                      <span
                        className={`absolute inset-0 flex items-center text-sm font-medium transition-all duration-500 ${
                          devMode
                            ? "opacity-100 translate-y-0 blur-0"
                            : "opacity-0 translate-y-2 blur-[2px]"
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <span className="text-fd-purple/60 mr-2">▸</span>
                        <span className="text-fd-gray-light">{m.dev}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-fd-gray/50 text-center">
                hover to pause · click to toggle
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <ScreenshotFrame
              src="/images/screenshots/6_53_25_PM.webp"
              alt="FlightDeck in Developer Mode — sidebar showing dev-native naming"
              caption="Developer Mode — every label maps to what you'd expect"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
