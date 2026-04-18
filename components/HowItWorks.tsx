"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ScreenshotCarousel from "./ScreenshotCarousel";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — copy */}
        <ScrollReveal direction="left">
          <div>
            <SectionLabel number="05" label="The Mechanism" />

            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
              You are never staring at a blank screen.
              <br />
              <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">
                Every step has a question, a choice, or a suggestion.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                FlightDeck&apos;s pipeline is not a series of forms that
                require expertise to complete. Every step is designed to be
                answerable by someone who has never built production software
                before.
              </p>
              <p>
                Where a decision matters, the system explains why. Where a
                choice is ambiguous, contextual AI help is available inline —
                not in a separate chat window, not in documentation, right
                there in the field. Where something is standard best practice
                for your situation, the system recommends it and explains what
                it means.
              </p>
              <p>
                The goal is not to make you an engineer. The goal is to make
                sure the decisions that matter get made correctly, by you,
                with real support, before they become irreversible problems.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — single screenshot showing inline guidance */}
        <ScrollReveal direction="right" delay={0.15}>
          <ScreenshotCarousel
            images={["Flight-School-Experience-Calibration"]}
            alt="FlightDeck guided intake — plain language questions with inline help"
          />
        </ScrollReveal>

      </div>
    </section>
  );
}
