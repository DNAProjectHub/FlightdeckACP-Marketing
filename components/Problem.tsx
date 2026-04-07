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
              AI can build anything.
              <br />
              <span className="text-fd-gray/60">
                The problem is controlling it.
              </span>
            </h2>

            <div className="mt-8 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                Every session starts cold. Your AI crew forgets what you
                decided, what you built, and why you built it.
              </p>
              <p>
                Your tools don&apos;t talk to each other. GitHub is over here.
                Your specs are somewhere else. Your work items are in a third
                place. Nothing connects.
              </p>
              <p>
                When something breaks, you find out when it&apos;s too late. No
                warning. No context. No clear path forward.
              </p>
            </div>

            <p className="mt-6 text-lg font-medium text-fd-gray-light">
              FlightDeck is the layer that fixes this.
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
              &ldquo;Claude Code context at 88%. Recommend refuel.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-fd-gray leading-relaxed">
              Not a cryptic error. Not a silent failure. A specific caution in
              plain language, surfaced where you&apos;re working. With a clear
              next step.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
