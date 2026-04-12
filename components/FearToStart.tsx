"use client";

import ScreenshotCarousel from "./ScreenshotCarousel";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

const phases = [
  {
    number: "1",
    flightName: "Co-Pilot Briefing",
    devName: "Governance",
    tagline: "How your AI behaves, decides, and operates.",
    desc: "Answer structured questions about how you work. FlightDeck configures your AI's communication style, authority limits, quality gates, and operating rules. The AI stops guessing and starts following your doctrine.",
    images: [
      "Flight-School-Welcome",
      "Flight-School-Experience-Calibration",
      "Flight-School-Phase1-Intro",
      "Flight-School-Phase1-Communication-Style",
      "Flight-School-Phase1-Humor",
      "Flight-School-Phase1-Mood-Tone",
      "CoPilot-Briefing-Card-Closeup",
    ],
    alt: "Co-Pilot Briefing — governance setup",
    comingSoon: false,
  },
  {
    number: "2",
    flightName: "Mission Control",
    devName: "Projects",
    tagline: "Define your project, stack, and infrastructure.",
    desc: "Tell FlightDeck what you're building, what tools you're using, and what your app needs to do. It figures out the right setup, recommends the right configuration, and records every decision — so you don't have to.",
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
    alt: "Mission Control — project creation",
    comingSoon: false,
  },
  {
    number: "3",
    flightName: "Tactical Ops",
    devName: "Skills",
    tagline: "Package repeatable workflows so you stop re-explaining.",
    desc: "Build governed skills — reusable workflows with defined inputs, outputs, and rules. When you find a good way to do something, package it once and use it everywhere.",
    images: [
      "Tactical-Ops-Skill-Building-Setup",
      "Tactical-Ops-Skill-Building-Setup-Expanded",
      "Tactical-Ops-Card-Closeup",
    ],
    alt: "Tactical Ops — skill building",
    comingSoon: false,
  },
  {
    number: "4",
    flightName: "Design Deck",
    devName: "Visual Foundation",
    tagline: "Establish your visual system before you write a spec.",
    desc: "Answer questions about your product's feel and direction. Get back a governed wireframe swatch, core screen blueprints, and design rules — linked to your specs.",
    images: ["Flight-School-Welcome"],
    alt: "Design Deck — coming soon",
    comingSoon: true,
  },
];

export default function FearToStart() {
  return (
    <section
      id="feartostart"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6">

        <ScrollReveal>
          <div className="max-w-3xl">
            <SectionLabel number="0.2" label="Failure Mode One" />
            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
              It feels dangerous to begin (and for good reason).
              <br />
              <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">FlightDeck gives you a safe way in.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                It is not just that founders do not know where to begin. It is
                that the path in feels dangerous. What stack? What backend?
                What surface, SaaS or native? (What do those words even mean?)
                What do you install locally, and is it safe to install it? What
                do you copy into the terminal, and what happens if you get it
                wrong because you do not understand what it means or what it
                does?
              </p>
              <p>
                FlightDeck replaces that exposure with a structured intake. You
                answer questions in plain language. The system determines the
                right setup, configures your AI co-pilot, records the
                decisions, and produces the governance documents that travel
                with every session from that point forward. Instead of being
                dropped into a command line and hoping for the best, you are
                brought in through a guided front door.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch max-w-5xl mx-auto">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className={`rounded-lg border bg-fd-surface p-3 flex flex-col relative ${
                phase.comingSoon
                  ? "border-fd-border/40 opacity-80"
                  : "border-fd-border"
              }`}
            >
              {phase.comingSoon && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-fd-orange/70 border border-fd-orange/30 rounded px-1.5 py-0.5">
                    Coming soon
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-[10px] text-fd-orange">{phase.number}</span>
                <h3 className="text-sm font-semibold text-white">{phase.flightName}</h3>
                <span className="text-[8px] font-mono text-fd-purple/60 uppercase tracking-wider ml-auto">{phase.devName}</span>
              </div>
              <p className="text-[10px] text-fd-gray/70 mb-2 leading-snug">{phase.tagline}</p>
              <ScreenshotCarousel images={[phase.images[0]]} alt={phase.alt} staticMode />
              <div className="mt-2"><FigLabel number={phase.number} /></div>
              <p className="mt-2 text-[11px] text-fd-gray leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
