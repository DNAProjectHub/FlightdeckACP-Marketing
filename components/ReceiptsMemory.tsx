"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ScreenshotCarousel from "./ScreenshotCarousel";

export default function ReceiptsMemory() {
  return (
    <section
      id="receipts-memory"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — copy */}
        <ScrollReveal direction="left">
          <div>
            <SectionLabel number="08" label="Continuity" />

            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
              Nothing disappears.
              <br />
              <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">
                Nothing fails silently.
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                Most AI-assisted builds fall apart between sessions. The chat
                window closes. The context evaporates. The founder comes back
                the next day and has to re-explain the project from scratch,
                hoping the AI reconstructs the same understanding it had
                before. It rarely does.
              </p>
              <p>
                FlightDeck&apos;s document system, manifest, and rehydration
                protocol solve this. Every decision becomes a governed
                artifact. Every session produces a receipt. Every time you
                return, the system restores from governed state — not from
                memory, not from a summary, from the actual structured record
                of what exists, what was decided, and what comes next.
              </p>
              <p>
                When something goes wrong, FlightDeck tells you what happened,
                why it matters, and what to do about it. In plain language.
                With a button to fix it.
              </p>
              <p className="text-white font-medium">
                The system does not just help you start. It keeps the whole
                thing together as it grows.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Flight Logs + Cockpit carousel */}
        <ScrollReveal direction="right" delay={0.15}>
          <ScreenshotCarousel
            images={[
              "Flight-Logs",
              "Cockpit",
              "Cockpit-with-overlay",
            ]}
            alt="FlightDeck Flight Logs and Cockpit — session receipts and continuity"
          />
        </ScrollReveal>

      </div>
    </section>
  );
}
