"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";
import ScreenshotCarousel from "./ScreenshotCarousel";

const cards = [
  {
    label: "Governance",
    title: "Co-Pilot Briefing",
    tagline: "How should your AI behave?",
    body: "You set the tone, the authority limits, the communication style, and the quality rules. Your AI stops guessing and starts following a doctrine you actually wrote.",
    images: [
      "Flight-School-Welcome",
      "Flight-School-Phase1-Intro",
      "Flight-School-Phase1-Communication-Style",
      "Flight-School-Phase1-Mood-Tone",
      "CoPilot-Briefing-Card-Closeup",
    ],
    alt: "Co-Pilot Briefing — governance setup",
  },
  {
    label: "Project Creation",
    title: "Mission Control",
    tagline: "What are you building?",
    body: "Describe the product. FlightDeck maps the stack, recommends the setup, identifies what infrastructure you need, and records every decision. You stop carrying it all in your head.",
    images: [
      "Mission-Control-Create-New-Project",
      "Mission-Control-Project-Description",
      "Mission-Control-Whats-Already-In-Place",
      "Mission-Control-Card-Closeup",
    ],
    alt: "Mission Control — project creation",
  },
];

export default function SolutionOne() {
  return (
    <section
      id="solution-one"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — copy */}
          <ScrollReveal direction="left">
            <div>
              <SectionLabel number="02" label="Governance Creation" />

              {/* Bridge line — subordinate, not a competing headline */}
              <p className="mt-4 text-base font-semibold text-fd-orange">
                FlightDeck gives you a safe way in.
              </p>

              <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
                You answer questions.
                <br />
                <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">
                  FlightDeck figures out the rest.
                </span>
              </h2>

              <div className="mt-6 space-y-4 text-base text-fd-gray leading-relaxed">
                <p>
                  Instead of a terminal and a list of tools you have never
                  heard of, FlightDeck starts with a guided intake. Plain
                  language questions. Multiple choice where possible.
                  Contextual AI help on every page.
                </p>
                <p>
                  You describe how you work, what you are building, and what
                  kind of help you want. The system uses your answers to
                  configure your AI co-pilot, generate your operating
                  doctrine, and produce the governance documents that travel
                  with every future session.
                </p>
                <p>
                  You are not learning infrastructure. You are not making
                  irreversible decisions in the dark. You are answering
                  questions that FlightDeck already knows how to translate
                  into a real, governed setup.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — two cards only */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-6">
              {cards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg border border-fd-border bg-fd-surface overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-[10px] text-fd-orange uppercase tracking-wider">
                        {card.label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-fd-gray/70 italic mb-3">
                      {card.tagline}
                    </p>
                    <ScreenshotCarousel
                      images={card.images}
                      alt={card.alt}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <FigLabel number={card.label.toLowerCase().replace(" ", "-")} />
                    </div>
                    <p className="mt-2 text-xs text-fd-gray leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
