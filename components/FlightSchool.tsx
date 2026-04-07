"use client";

import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

const phases = [
  {
    number: "4.1",
    name: "Style and Tone",
    desc: "How proactive or restrained your copilot should be. Empathy, pacing, explanation style.",
    image: "/images/screenshots/6_03_45_PM.webp",
    alt: "Flight School Phase 1 — role selection: Founder/CEO, CTO, Solo Developer, PM",
  },
  {
    number: "4.2",
    name: "Rules and Boundaries",
    desc: "What your AI can and can't do without your approval. Protected systems. Evidence standards.",
    image: "/images/screenshots/6_03_31_PM.webp",
    alt: "Flight School Phase 2 — Create a New Project with 6-step governance flow",
  },
  {
    number: "4.3",
    name: "Governance and Procedures",
    desc: "Tool routing, project scope, output behavior, team shape.",
    image: "/images/screenshots/6_04_04_PM.webp",
    alt: "Flight School Phase 3 — Skill Building + Setup with AI-proposed structure",
  },
];

export default function FlightSchool() {
  return (
    <section id="flightschool" className="py-24 border-t border-fd-border">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionLabel number="4.0" label="Onboard" />
          <div className="mt-6 grid lg:grid-cols-2 gap-12 items-end">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Start with
              <br />
              <span className="text-fd-gray/60">Flight School.</span>
            </h2>
            <p className="text-base text-fd-gray leading-relaxed max-w-md">
              Before you touch a codebase, FlightDeck configures your AI
              copilot. Tell it how you work, what your product is, and how your
              crew should behave. It generates CLAUDE.md, SOUL.md, and a full
              governance stack. Nothing is saved until you review and approve.
            </p>
          </div>
        </ScrollReveal>

        {/* Three equal phase cards */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="rounded-xl border border-fd-border bg-fd-surface p-5 flex flex-col"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs text-fd-orange">
                    {phase.number}
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {phase.name}
                  </h3>
                </div>
                <ScreenshotFrame src={phase.image} alt={phase.alt} />
                <div className="mt-3">
                  <FigLabel number={phase.number} />
                </div>
                <p className="mt-4 text-sm text-fd-gray leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
