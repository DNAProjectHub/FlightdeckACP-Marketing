"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

export default function ProblemOne() {
  return (
    <section
      id="problem-one"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <SectionLabel number="01" label="The Dangerous Beginning" />

          <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
            It feels dangerous to begin
            <br className="block sm:hidden" />
            {" "}(and for good reason).
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
              Most founders freeze here. Not because they lack ideas. Because
              the beginning is genuinely hostile to people who did not come up
              through engineering.
            </p>
          </div>

          {/* Transition sentence — bridge to SolutionOne */}
          <p className="mt-8 text-base text-white/60 leading-relaxed border-l-2 border-fd-orange/40 pl-4 italic">
            That is exactly why FlightDeck starts with governance creation —
            before a single line of code, before any infrastructure, before
            the terminal is ever opened.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
