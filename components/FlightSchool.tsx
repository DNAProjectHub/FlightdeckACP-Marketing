"use client";

import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

const phases = [
  {
    number: "4.1",
    flightName: "Co-Pilot Briefing",
    devName: "Governance",
    tagline: "How your co-pilot communicates, decides, and operates.",
    desc: "Complete the intake to configure your governance doctrine, set your experience level, and unlock the full FlightDeck workflow.",
    image: "/images/screenshots/6_03_17_PM.webp",
    alt: "Co-Pilot Briefing — Welcome to Flight School with three configuration phases",
  },
  {
    number: "4.2",
    flightName: "Mission Control",
    devName: "Projects",
    tagline: "Define your project, configure infrastructure, and bind services.",
    desc: "Create a new project with governance settings, provider bindings, and crew assignments pre-configured from your profile.",
    image: "/images/screenshots/6_03_31_PM.webp",
    alt: "Mission Control — Create a New Project with 6-step governance flow",
  },
  {
    number: "4.3",
    flightName: "Tactical Ops",
    devName: "Skills",
    tagline: "Create reusable skills and workflow patterns.",
    desc: "Build reusable skills that automate common workflows and execution patterns across your projects.",
    image: "/images/screenshots/6_04_04_PM.webp",
    alt: "Tactical Ops — Skill Building + Setup with AI-proposed structure",
  },
];

export default function FlightSchool() {
  return (
    <section
      id="flightschool"
      className="snap-section py-12 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading + three-pills intro visual side by side */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel number="4.0" label="Onboard" />
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.1] whitespace-nowrap">
                Start with{" "}
                <span className="text-fd-gray/60">Flight School.</span>
              </h2>
              <p className="mt-4 text-sm text-fd-gray leading-relaxed max-w-lg">
                Before you touch a codebase, FlightDeck configures your AI
                copilot. Tell it how you work, what your product is, and how
                your crew should behave. Three modules. Nothing is saved until
                you review and approve.
              </p>
            </div>
            <div>
              <ScreenshotFrame
                src="/images/screenshots/threepills.webp"
                alt="Three Flight School modules — Co-Pilot Briefing, Mission Control, Tactical Ops"
              />
              <div className="mt-2">
                <FigLabel number="4.0" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Three equal phase cards */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 grid md:grid-cols-3 gap-4 items-stretch">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="rounded-xl border border-fd-border bg-fd-surface p-4 flex flex-col"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-xs text-fd-orange">
                    {phase.number}
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {phase.flightName}
                  </h3>
                  <span className="text-[9px] font-mono text-fd-purple/60 uppercase tracking-wider ml-auto">
                    {phase.devName}
                  </span>
                </div>
                <p className="text-[11px] text-fd-gray/70 mb-3">
                  {phase.tagline}
                </p>
                <ScreenshotFrame src={phase.image} alt={phase.alt} />
                <div className="mt-2">
                  <FigLabel number={phase.number} />
                </div>
                <p className="mt-3 text-xs text-fd-gray leading-relaxed">
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
