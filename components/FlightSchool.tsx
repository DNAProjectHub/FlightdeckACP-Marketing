"use client";

import ScreenshotCarousel from "./ScreenshotCarousel";
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
    images: [
      "Flight-School-Welcome",
      "Flight-School-Experience-Calibration",
      "Flight-School-Phase1-Intro",
      "Flight-School-Phase1-Communication-Style",
      "Flight-School-Phase1-Humor",
      "Flight-School-Phase1-Mood-Tone",
      "CoPilot-Briefing-Card-Closeup",
    ],
    alt: "Co-Pilot Briefing — Flight School governance setup",
    comingSoon: false,
  },
  {
    number: "4.2",
    flightName: "Mission Control",
    devName: "Projects",
    tagline: "Define your project, configure infrastructure, and bind services.",
    desc: "Create a new project with governance settings, provider bindings, and crew assignments pre-configured from your profile.",
    images: [
      "Mission-Control-Create-New-Project",
      "Mission-Control-New-or-Existing",
      "Mission-Control-Project-Role",
      "Mission-Control-Project-Name",
      "Mission-Control-Short-Code",
      "Mission-Control-Project-Description",
      "Mission-Control-Whats-Already-In-Place",
      "Mission-Control-Card-Closeup",
    ],
    alt: "Mission Control — project creation flow",
    comingSoon: false,
  },
  {
    number: "4.3",
    flightName: "Tactical Ops",
    devName: "Skills",
    tagline: "Create reusable skills and workflow patterns.",
    desc: "Build reusable skills that automate common workflows and execution patterns across your projects.",
    images: [
      "Tactical-Ops-Skill-Building-Setup",
      "Tactical-Ops-Skill-Building-Setup-Expanded",
      "Tactical-Ops-Card-Closeup",
    ],
    alt: "Tactical Ops — skill building setup",
    comingSoon: false,
  },
  {
    number: "4.4",
    flightName: "Design Deck",
    devName: "Visual Foundation",
    tagline: "Establish your product\u2019s visual system before you write a spec.",
    desc: "Answer structured questions about your product\u2019s feel, layout, and visual direction. Get back a governed wireframe swatch, core screen blueprints, and design rules \u2014 linked to everything else in the system.",
    images: ["Flight-School-Welcome"],
    alt: "Design Deck — coming soon",
    comingSoon: true,
  },
];

export default function FlightSchool() {
  return (
    <section
      id="flightschool"
      className="snap-section py-8 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading + intro paragraph */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <SectionLabel number="4.0" label="Onboard" />
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight leading-[1.1] whitespace-nowrap">
              Start with{" "}
              <span className="text-fd-gray/60">Flight School.</span>
            </h2>
            <p className="mt-3 text-sm text-fd-gray leading-relaxed max-w-2xl">
              Before you touch a codebase, FlightDeck walks you through four
              structured modules that configure your AI co-pilot, define your
              project, create reusable workflows, and establish your
              product&apos;s visual foundation. The governance produced here
              travels with every session — it tells your AI how to behave, what
              it can and cannot do without your sign-off, and explicitly
              prevents the empty encouragement that makes bad builds feel like
              good progress. The encouragement stops. The governance starts.
            </p>
          </div>
        </ScrollReveal>

        {/* Four phase cards — 2x2 grid on md, single col on mobile.
            NOTE: intentionally NOT wrapped in <ScrollReveal>. The framer-motion
            reveal wrapper starts at opacity:0, which makes Chrome's native
            lazy loader refuse to trigger for any <img> beneath it until the
            animation flips opacity to 1 — so the static preview cards would
            sit blank forever on mobile. The section heading above keeps its
            reveal animation; only this grid is direct-rendered. */}
        <div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch max-w-5xl mx-auto">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className={`rounded-lg border bg-fd-surface p-3 flex flex-col relative ${
                  phase.comingSoon
                    ? "border-fd-border/40 opacity-80"
                    : "border-fd-border"
                }`}
              >
                {/* Coming soon badge */}
                {phase.comingSoon && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-fd-orange/70 border border-fd-orange/30 rounded px-1.5 py-0.5">
                      Coming soon
                    </span>
                  </div>
                )}

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-[10px] text-fd-orange">
                    {phase.number}
                  </span>
                  <h3 className="text-sm font-semibold text-white">
                    {phase.flightName}
                  </h3>
                  <span className="text-[8px] font-mono text-fd-purple/60 uppercase tracking-wider ml-auto">
                    {phase.devName}
                  </span>
                </div>
                <p className="text-[10px] text-fd-gray/70 mb-2 leading-snug">
                  {phase.tagline}
                </p>
                <ScreenshotCarousel
                  images={[phase.images[0]]}
                  alt={phase.alt}
                  staticMode
                />
                <div className="mt-2">
                  <FigLabel number={phase.number} />
                </div>
                <p className="mt-2 text-[11px] text-fd-gray leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
