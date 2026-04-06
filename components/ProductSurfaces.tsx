import ScreenshotFrame from "./ScreenshotFrame";

const surfaces = [
  {
    name: "Cockpit",
    image: "/images/screenshots/6_01_42_PM.webp",
    alt: "FlightDeck Cockpit — command deck with ATC Readout and cautions",
    copy: "Your command deck. ATC Readout narrates current project state. Cautions surface in plain language when your system needs a decision. Start Engines to begin preflight.",
  },
  {
    name: "ATC",
    image: "/images/screenshots/6_01_33_PM.webp",
    alt: "FlightDeck ATC — portfolio command with crew fuel gauges",
    copy: "Portfolio command. Session timer. All five crew members with fuel gauges. Multi-project flight trajectories with real ETAs. The full picture from one surface.",
  },
  {
    name: "Crew Manifest",
    image: "/images/screenshots/6_01_45_PM.webp",
    alt: "FlightDeck Crew Manifest — agent roles and fuel gauges",
    copy: "Danny is Pilot. ChatGPT is Architect. Claude is Reasoner. Claude Code is Implementer. Every agent has a defined role, a fuel gauge, and a full comms log. You manage a team, not a chatbox.",
  },
  {
    name: "Document Manifest",
    image: "/images/screenshots/6_02_04_PM.webp",
    alt: "FlightDeck Document Manifest — classified documents with health checks",
    copy: "Every plan, spec, wireframe, and asset — classified, health-checked, and linked to the work it drives.",
  },
  {
    name: "Flight Planning",
    image: "/images/screenshots/6_02_17_PM.webp",
    alt: "FlightDeck Flight Planning — specs to work items with truth chains",
    copy: "Specs become work items through a governed process. Truth chains: every task traces to its source spec.",
  },
  {
    name: "Flight Logs",
    image: "/images/screenshots/6_02_21_PM.webp",
    alt: "FlightDeck Flight Logs — session history and commit receipts",
    copy: "Session history, decisions, commits, and receipts. You never ask \"what happened last Tuesday?\" again.",
  },
  {
    name: "Maintenance",
    image: "/images/screenshots/6_01_55_PM.webp",
    alt: "FlightDeck Maintenance — diagnostics and system health",
    copy: "Diagnostics, provider bindings, secrets, system health. The hangar where the system services itself.",
  },
  {
    name: "Schema Explorer",
    image: "/images/screenshots/6_01_59_PM.webp",
    alt: "FlightDeck Schema Explorer — schema explorer and query console",
    copy: "Schema explorer and query console. Your system's data structure — visible and inspectable.",
  },
];

export default function ProductSurfaces() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Eight surfaces. One system.
          </h2>
          <p className="mt-4 text-base text-fd-gray max-w-xl mx-auto">
            Every part of FlightDeck has a specific job. Nothing overlaps.
            Nothing gets lost.
          </p>
        </div>

        {/* Surface cards grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {surfaces.map((surface) => (
            <div
              key={surface.name}
              className="group rounded-xl border border-fd-border bg-fd-surface p-6 transition-all hover:border-fd-orange/20"
            >
              <ScreenshotFrame
                src={surface.image}
                alt={surface.alt}
              />
              <h3 className="mt-5 text-lg font-semibold text-white">
                {surface.name}
              </h3>
              <p className="mt-2 text-sm text-fd-gray leading-relaxed">
                {surface.copy}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Callouts */}
        <div className="mt-24 space-y-20">
          {/* Document Health */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScreenshotFrame
              src="/images/screenshots/6_03_01_PM.webp"
              alt="FlightDeck Ingest modal — document health with AI classification"
            />
            <div>
              <h3 className="text-2xl font-bold text-white">Document Health</h3>
              <p className="mt-4 text-base text-fd-gray leading-relaxed">
                Every document has a health signal. Green = exists and matches.
                Yellow = drifted. Red = problem. When it&apos;s red, FlightDeck
                tells you what&apos;s wrong and gives you a button to fix it.
              </p>
            </div>
          </div>

          {/* Asset Library */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white">Asset Library</h3>
              <p className="mt-4 text-base text-fd-gray leading-relaxed">
                Your brand assets are governed too. 82 icons. Logo variants.
                Design tokens. Classified, versioned, and linked to the
                documents that reference them.
              </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <ScreenshotFrame
                src="/images/screenshots/6_02_07_PM.webp"
                alt="FlightDeck Icon Library — 82 classified icons"
              />
              <ScreenshotFrame
                src="/images/screenshots/6_02_10_PM.webp"
                alt="FlightDeck Logos tab — governed brand assets"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
