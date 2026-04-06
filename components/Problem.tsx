"use client";

import ScrollReveal from "./ScrollReveal";
import ScreenshotFrame from "./ScreenshotFrame";

export default function Problem() {
  return (
    <section id="problem" className="py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-[680px] px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI can build anything. The problem is controlling it.
          </h2>

          <div className="mt-10 space-y-6 text-base text-fd-gray leading-relaxed">
            <p>
              Every session starts cold. Your AI crew forgets what you decided,
              what you built, and why you built it.
            </p>
            <p>
              Your tools don&apos;t talk to each other. GitHub is over here. Your
              specs are somewhere else. Your work items are in a third place.
              Nothing connects.
            </p>
            <p>
              When something breaks, you find out when it&apos;s too late. No
              warning. No context. No clear path forward.
            </p>
          </div>

          <p className="mt-10 text-lg font-medium text-fd-gray-light">
            FlightDeck is the layer that fixes this.
          </p>
        </div>
      </ScrollReveal>

      {/* Caution Callout — single column, inline with the flow */}
      <ScrollReveal delay={0.15}>
        <div className="mx-auto max-w-[680px] px-6 mt-16">
          <div className="rounded-xl border border-fd-yellow/20 bg-fd-surface p-6">
            <span className="inline-block text-xs font-semibold tracking-widest text-fd-yellow uppercase mb-3">
              No Silent Failures
            </span>
            <ScreenshotFrame
              src="/images/screenshots/6_01_42_PM.webp"
              alt="FlightDeck Cockpit showing warning caution row"
            />
            <blockquote className="mt-4 text-base text-fd-gray-light italic border-l-2 border-fd-yellow/40 pl-4">
              &ldquo;Claude Code context at 88% — recommend refuel.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-fd-gray leading-relaxed">
              Not a cryptic error. Not a silent failure. A specific caution in
              plain language, surfaced where you&apos;re working — with a clear
              next step.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
