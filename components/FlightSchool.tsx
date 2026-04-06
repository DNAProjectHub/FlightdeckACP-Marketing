import ScreenshotFrame from "./ScreenshotFrame";

const phases = [
  {
    name: "Phase 1 — Style and Tone",
    desc: "How proactive or restrained your copilot should be. Empathy, pacing, explanation style.",
  },
  {
    name: "Phase 2 — Rules and Boundaries",
    desc: "What your AI can and can't do without your approval. Protected systems. Evidence standards.",
  },
  {
    name: "Phase 3 — Governance and Procedures",
    desc: "Tool routing, project scope, output behavior, team shape.",
  },
];

export default function FlightSchool() {
  return (
    <section className="py-24 border-t border-fd-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-fd-orange uppercase">
            Onboarding
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Start with Flight School.
          </h2>
          <p className="mt-4 text-base text-fd-gray">
            Before you touch a codebase, FlightDeck configures your AI copilot.
            Structured onboarding in minutes.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-base text-fd-gray leading-relaxed">
              Tell FlightDeck how you work, how you think, what your product is,
              and how you want your AI crew to behave. It generates CLAUDE.md,
              SOUL.md, and a full governance stack — formal documents that define
              how your AI assistant should operate inside your project. The more
              specific you are, the better your entire build experience becomes.
            </p>

            {/* Phase blocks */}
            <div className="mt-10 space-y-6">
              {phases.map((phase) => (
                <div
                  key={phase.name}
                  className="rounded-lg border border-fd-border bg-fd-surface p-5"
                >
                  <h3 className="text-sm font-semibold text-fd-gray-light">
                    {phase.name}
                  </h3>
                  <p className="mt-1 text-sm text-fd-gray">{phase.desc}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-8 border-l-2 border-fd-orange/40 pl-4 text-sm text-fd-gray-light italic">
              Nothing is saved until you review and approve at the end.
            </blockquote>
          </div>

          {/* Visuals */}
          <div className="space-y-6">
            <ScreenshotFrame
              src="/images/screenshots/6_03_31_PM.webp"
              alt="Create a New Project — 6-step structured onboarding flow"
              caption="Structured project creation flow"
            />
            <div className="grid grid-cols-2 gap-4">
              <ScreenshotFrame
                src="/images/screenshots/6_04_04_PM.webp"
                alt="Flight School welcome screen"
              />
              <ScreenshotFrame
                src="/images/screenshots/6_03_45_PM.webp"
                alt="Flight School role selection"
              />
            </div>
          </div>
        </div>

        {/* Flight Mode / Dev Mode callout */}
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
      </div>
    </section>
  );
}
