"use client";

import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";

const nodes = [
  {
    num: "01",
    label: "Idea",
    desc: "Capture it. It lands in the system before it can vanish into chat history.",
  },
  {
    num: "02",
    label: "Reality Check",
    desc: "Is it a real business idea, or just a feature impulse? The system presses for clarity before you commit.",
  },
  {
    num: "03",
    label: "Structure",
    desc: "Governance and project foundation. The building gets a real structure before any walls go up.",
  },
  {
    num: "04",
    label: "Plan",
    desc: "The work gets decomposed into buildable units with sequencing and acceptance criteria. Not a wish list. A plan.",
  },
  {
    num: "05",
    label: "Build",
    desc: "Only now does the execution layer open. The terminal runs inside a system that is already real.",
  },
];

export default function Pipeline() {
  return (
    <section
      id="pipeline"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionLabel number="06" label="The Pipeline" />

          <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
            Once you&apos;re in, the pipeline takes over.
            <br />
            <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">
              One obvious next step at a time.
            </span>
          </h2>

          <p className="mt-6 text-base text-fd-gray leading-relaxed max-w-2xl">
            Governance creation and project creation are not onboarding. They
            are the opening gates of a governed sequence that carries you from
            first idea to working software — without ever dropping you into a
            blank screen or an unstructured decision.
          </p>
        </ScrollReveal>

        {/* Pipeline visual — desktop: horizontal row, mobile: vertical stack */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10 relative">

            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[22px] left-[calc(10%+22px)] right-[calc(10%+22px)] h-[2px] bg-gradient-to-r from-fd-orange/60 via-fd-orange/30 to-fd-orange/60" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
              {nodes.map((node, i) => (
                <div key={node.num} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center relative">

                  {/* Mobile connecting line */}
                  {i < nodes.length - 1 && (
                    <div className="lg:hidden absolute left-[22px] top-[44px] w-[2px] h-[calc(100%+24px)] bg-fd-orange/20" />
                  )}

                  {/* Node circle */}
                  <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full bg-fd-orange flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-black">{node.num}</span>
                  </div>

                  <div className="lg:mt-4 flex-1">
                    <div className="text-sm font-bold text-white lg:mb-2">{node.label}</div>
                    <div className="mt-1 text-xs text-fd-gray leading-relaxed">{node.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Closing copy */}
        <ScrollReveal delay={0.2}>
          <p className="mt-10 text-base text-fd-gray leading-relaxed max-w-2xl">
            Every step produces something real: a document, a decision, a
            spec, a plan, or a receipt. Nothing disappears into chat history.
            Nothing requires the founder to remember what was decided. The
            system holds the state.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
