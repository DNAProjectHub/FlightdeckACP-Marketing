"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ScreenshotCarousel from "./ScreenshotCarousel";

export default function SolutionTwo() {
  return (
    <section
      id="solution-two"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — copy */}
        <ScrollReveal direction="left">
          <div>
            <SectionLabel number="04" label="Project Creation" />

            {/* Bridge line — subordinate */}
            <p className="mt-4 text-base font-semibold text-fd-orange">
              FlightDeck builds the foundation before the building starts.
            </p>

            <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
              Your project gets a real structure
              <br />
              <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">
                before you write a line of code.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                Project creation is not a form you fill out and forget. It is
                the structural record that everything else in the system builds
                on top of.
              </p>
              <p>
                You describe what you are building. FlightDeck asks about your
                target surface, your data model, your infrastructure needs,
                your integrations, and the AI tools in your stack. The output
                is not a vague description. It is a structured project record
                — with governed setup, captured decisions, and a foundation
                the rest of the pipeline can actually use.
              </p>
              <p className="text-white font-medium">
                This is where the facade problem gets intercepted. Before you
                write a spec. Before you open a terminal. Before the AI
                generates a single line of code that might look right and be
                structurally wrong.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Mission Control screenshots */}
        <ScrollReveal direction="right" delay={0.15}>
          <ScreenshotCarousel
            images={[
              "Mission-Control-Create-New-Project",
              "Mission-Control-Project-Description",
              "Mission-Control-Whats-Already-In-Place",
              "Mission-Control-New-or-Existing",
              "Mission-Control-Project-Role",
            ]}
            alt="FlightDeck Mission Control — project creation flow"
          />
        </ScrollReveal>

      </div>
    </section>
  );
}
