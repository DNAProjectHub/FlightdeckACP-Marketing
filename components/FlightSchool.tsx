"use client";

import ScreenshotFrame from "./ScreenshotFrame";
import ScrollReveal from "./ScrollReveal";

const phases = [
  {
    number: "1",
    name: "Style and Tone",
    desc: "How proactive or restrained your copilot should be. Empathy, pacing, explanation style.",
    image: "/images/screenshots/6_03_45_PM.webp",
    alt: "Flight School Phase 1 — role selection: Founder/CEO, CTO, Solo Developer, PM",
    caption: "Define your role and communication style",
  },
  {
    number: "2",
    name: "Rules and Boundaries",
    desc: "What your AI can and can't do without your approval. Protected systems. Evidence standards.",
    image: "/images/screenshots/6_03_31_PM.webp",
    alt: "Flight School Phase 2 — Create a New Project with 6-step governance flow",
    caption: "Structured setup: Basics, Intent, Location, Features, Review, Governance",
  },
  {
    number: "3",
    name: "Governance and Procedures",
    desc: "Tool routing, project scope, output behavior, team shape.",
    image: "/images/screenshots/6_04_04_PM.webp",
    alt: "Flight School Phase 3 — Skill Building + Setup with AI-proposed structure",
    caption: "Describe your skill in plain language. AI proposes the structure.",
  },
];

export default function FlightSchool() {
  return (
    <section className="py-24 border-t border-fd-border">
      <div className="mx-auto max-w-6xl px-6">
        {/* Intro with welcome screenshot */}
        <ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest text-fd-orange uppercase">
              Onboarding
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Start with Flight School.
            </h2>
            <p className="mt-4 text-base text-fd-gray leading-relaxed">
              Before you touch a codebase, FlightDeck configures your AI
              copilot. Structured onboarding in minutes.
            </p>
            <p className="mt-4 text-base text-fd-gray leading-relaxed">
              Tell FlightDeck how you work, how you think, what your product is,
              and how you want your AI crew to behave. It generates CLAUDE.md,
              SOUL.md, and a full governance stack — formal documents that define
              how your AI assistant should operate inside your project. The more
              specific you are, the better your entire build experience becomes.
            </p>
            <blockquote className="mt-6 border-l-2 border-fd-orange/40 pl-4 text-sm text-fd-gray-light italic">
              Nothing is saved until you review and approve at the end.
            </blockquote>
          </div>
          <ScreenshotFrame
            src="/images/screenshots/6_03_17_PM.webp"
            alt="Welcome to Flight School — overview showing three phases: Style and Tone, Rules and Boundaries, Governance and Procedures"
            caption="Flight School walks you through three phases"
          />
        </div>
        </ScrollReveal>

        {/* Three equal phase cards */}
        <ScrollReveal delay={0.1}>
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="rounded-xl border border-fd-border bg-fd-surface p-5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-fd-orange/10 text-fd-orange text-sm font-bold">
                  {phase.number}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {phase.name}
                </h3>
              </div>
              <ScreenshotFrame
                src={phase.image}
                alt={phase.alt}
                caption={phase.caption}
              />
              <p className="mt-4 text-sm text-fd-gray leading-relaxed">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
        </ScrollReveal>

        {/* Flight Mode / Dev Mode callout */}
        <ScrollReveal delay={0.1}>
        <div className="mt-24 rounded-xl border border-fd-border bg-fd-surface p-8 sm:p-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Flight Mode or Developer Mode — one toggle.
              </h3>
              <p className="mt-4 text-base text-fd-gray leading-relaxed">
                New to building software? Everything speaks plain language.
                Aviation metaphors, guided onboarding, tooltips on everything.
                Already technical? Flip to Developer Mode. Labels go technical,
                scaffolding disappears, you work at full speed. Same system. Same
                data. Same governance.
              </p>
            </div>
            <ScreenshotFrame
              src="/images/screenshots/6_01_38_PM.webp"
              alt="FlightDeck Home Terminal — Flight Mode and Developer Mode toggle"
            />
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
