"use client";

import ScrollReveal from "./ScrollReveal";
import ScreenshotFrame from "./ScreenshotFrame";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

export default function Problem() {
  return (
    <section
      id="problem"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="left">
          <div>
            <SectionLabel number="0.1" label="The Problem" />
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              You&apos;ve been building a surface.
              <br />
              <span className="text-fd-gray/60">Not a system.</span>
            </h2>

            <div className="mt-8 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                Most founders who build with AI hit the same wall. What they
                built looks real. It has screens. It has buttons. It has an AI
                that responds. And when they demo it, everything works.
              </p>
              <p className="text-fd-gray-light font-medium">
                Until it doesn&apos;t.
              </p>
              <p>
                Because underneath the impressive interface, there&apos;s
                nothing there. The data is stored as sentences in a text column.
                The &ldquo;calculation&rdquo; is the AI guessing. The
                &ldquo;login&rdquo; is a screen with no real authentication
                behind it. The &ldquo;database&rdquo; is a hardcoded list in
                the source code. The AI helped build it quickly, so it feels
                real.
              </p>
              <p className="text-white font-semibold">
                It isn&apos;t.
              </p>
              <p>
                This is the most dangerous failure mode in AI-assisted
                development: building a surface without a system. It isn&apos;t
                just beginner naivety. It is a structural trap that the current
                generation of AI tools actively encourage — because they are
                optimized to produce plausible output fast, not correct systems
                that last.
              </p>
              <p>
                FlightDeck is designed to prevent this. Not by making
                development harder. By starting earlier.
              </p>
            </div>

            <p className="mt-6 text-base font-semibold text-fd-orange tracking-wide">
              FlightDeck starts before code.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
          <div className="rounded-xl border border-fd-yellow/20 bg-fd-surface p-6">
            <SectionLabel
              number="0.2"
              label="No Silent Failures"
              className="mb-4"
            />
            <ScreenshotFrame
              src="/images/screenshots/6_01_42_PM.webp"
              alt="FlightDeck Cockpit showing warning caution row"
            />
            <div className="mt-3">
              <FigLabel number="0.2" />
            </div>
            <blockquote className="mt-5 text-base text-fd-gray-light italic border-l-2 border-fd-yellow/40 pl-4">
              &ldquo;Claude Code context at 88%. Recommend refuel before heavy
              implementation work.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-fd-gray leading-relaxed">
              A warning without an explanation is a product failure. The system
              must never report a problem without a solution — telling you what
              is wrong, why it matters, and what to do about it, in plain
              language, with a button to fix it whenever possible.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
