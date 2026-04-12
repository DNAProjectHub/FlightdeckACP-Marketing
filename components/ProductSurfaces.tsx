"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScreenshotCarousel from "./ScreenshotCarousel";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import FigLabel from "./FigLabel";

interface SubTab {
  number: string;
  name: string;
  images: string[];
  alt: string;
  body: string;
}

interface SurfaceRegion {
  number: string;
  label: string;
  headingLine1: string;
  headingLine2: string;
  intro: string;
  tabs: SubTab[];
  visualSide: "left" | "right";
}

const regions: SurfaceRegion[] = [
  {
    number: "1.0",
    label: "Plan",
    headingLine1: "Turn ideas",
    headingLine2: "into governed specs.",
    visualSide: "right",
    intro:
      "Every plan, specification, policy, design document, wireframe, and visual asset in the system — classified, searchable, and health-checked. Every document has a live health indicator. And when it\u2019s red, the system doesn\u2019t just show you a colored dot. It tells you what\u2019s wrong, why it happened, and gives you a button to fix it.",
    tabs: [
      {
        number: "1.1",
        name: "Document Manifest",
        images: [
          "Document-Manifest-Inbox",
          "Document-Manifest-Icon-Library",
          "Document-Manifest-Logos",
          "Document-Manifest-Logos-Ingest-Modal",
          "Document-Manifest-Logos-with-Terminal-Build",
          "Document-Manifest-Logos-with-Terminal-Agent",
        ],
        alt: "FlightDeck Document Manifest",
        body: "Every plan, spec, wireframe, and asset — classified, health-checked, and linked to the work it drives. Green means everything matches. Yellow means something has drifted. Red means there\u2019s a problem — and the system tells you what, why, and how to fix it.",
      },
      {
        number: "1.2",
        name: "Flight Planning",
        images: ["Flights-List", "Flight-Planification", "Flight-Logs"],
        alt: "FlightDeck Flight Planning",
        body: "Your execution board. Every flight plan organized by sprint, with completion status, effort, and lineage to the spec that created it. This is where you see the truth chain: this spec produced these flight plans, these are done, these are in progress, these are waiting.",
      },
      {
        number: "1.3",
        name: "Ingest",
        images: ["Document-Manifest-Logos-Ingest-Modal", "Ingest-Document-Closeup"],
        alt: "FlightDeck Ingest",
        body: "Drop in a markdown document and it gets classified, summarized by AI, and routed through the inbox. Drop in a JSX wireframe and it renders as a live, interactive preview. You don\u2019t have to tell FlightDeck what kind of file you\u2019re giving it.",
      },
    ],
  },
  {
    number: "2.0",
    label: "Execute",
    headingLine1: "Coordinate",
    headingLine2: "the crew.",
    visualSide: "left",
    intro:
      "You are the pilot in command. Your AI tools are your crew. Each one has a defined job, clear limits, and rules about what it can and cannot do without your sign-off. You manage a team, not a chatbox.",
    tabs: [
      {
        number: "2.1",
        name: "Cockpit",
        images: ["Cockpit", "Cockpit-with-overlay"],
        alt: "FlightDeck Cockpit",
        body: "Your at-a-glance command deck. Every session starts here. A full automated preflight check reads your project\u2019s health every time you start — document status, inbox items, spec coverage, flight plan status, provider connections, and agent context levels — so you always know where you stand before you touch a thing.",
      },
      {
        number: "2.2",
        name: "ATC",
        images: [
          "Home-Terminal",
          "Home-Terminal-with-Terminal-Panel",
          "Home-Terminal-with-Notification",
          "Home-Terminal-Cards-Closeup",
        ],
        alt: "FlightDeck ATC",
        body: "Portfolio command across all projects. Session timer. Crew fuel gauges. Multi-project trajectories with current phase and destination. The full picture from one surface.",
      },
      {
        number: "2.3",
        name: "Crew Manifest",
        images: ["Crew-Manifest", "Dev-Mode-Agents-and-Connections"],
        alt: "FlightDeck Crew Manifest",
        body: "Your AI team roster. Which tools are connected, what each one has been asked to do, what they\u2019ve produced, and the full history of your conversations with them. Danny is Pilot. ChatGPT is Architect. Claude is Reasoner. Claude Code is Implementer.",
      },
    ],
  },
  {
    number: "3.0",
    label: "Govern",
    headingLine1: "Receipts",
    headingLine2: "for everything.",
    visualSide: "right",
    intro:
      "Session history, decisions, commits, and receipts. Nothing fails silently — when something goes wrong, FlightDeck tells you what happened, why it matters, and what to do about it. In plain language. With a button to fix it.",
    tabs: [
      {
        number: "3.1",
        name: "Flight Logs",
        images: ["Flight-Logs", "Dev-Mode-Session-History"],
        alt: "FlightDeck Flight Logs",
        body: "The historical memory of the system. Session history, receipts, prior decisions, archived past work, and the history of your dispatches with your AI crew. This is where you go when you need to know what happened before now. No more \u201Cwhat was I doing last Tuesday?\u201D",
      },
      {
        number: "3.2",
        name: "Maintenance",
        images: ["Maintenance-System-Health", "Dev-Mode-Settings-System-Health"],
        alt: "FlightDeck Maintenance",
        body: "Your service hangar. Diagnostic tools, security settings, system preferences, provider bindings, key rotation, and the machinery you need to keep the system healthy and under control.",
      },
      {
        number: "3.3",
        name: "Schema Explorer",
        images: ["Data-Structures", "Dev-Mode-Schema-Explorer"],
        alt: "FlightDeck Schema Explorer",
        body: "Safe, structured visibility into your project\u2019s database schema. You can explore tables, columns, relationships, and indexes without needing raw database tooling. The system makes your data structure legible without putting you in a position to accidentally damage it.",
      },
    ],
  },
];

const DURATION = 4500;

function Region({ region }: { region: SurfaceRegion }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const count = region.tabs.length;

  const advance = useCallback(() => {
    setActive(a => (a + 1) % count);
  }, [count]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, paused, advance]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isVisibleRef.current) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      if (timerRef.current) clearTimeout(timerRef.current);
      setPaused(true);
      setActive(a => e.key === "ArrowRight" ? (a + 1) % count : (a - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const handleTabClick = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(i);
  };

  const tab = region.tabs[active];

  return (
    <ScrollReveal>
      <div
        ref={sectionRef}
        className="snap-section border-t border-fd-border pt-[5.5rem] pb-14"
      >
        <div className="mx-auto max-w-6xl px-6 w-full">
          <ScrollReveal>
            <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-end">
              <div>
                <SectionLabel number={region.number} label={region.label} />
                <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.05]">
                  {region.headingLine1}
                  <br />
                  <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">{region.headingLine2}</span>
                </h2>
              </div>
              <p className="text-base text-fd-gray leading-relaxed">
                {region.intro}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div
              className="mt-8 relative max-w-4xl mx-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div key={tab.number} className="fd-fade-in">
                <ScreenshotCarousel images={tab.images} alt={tab.alt} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <FigLabel number={tab.number} />
                <span className="text-xs text-fd-gray/50">{tab.name}</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-6 relative min-h-[3rem] max-w-3xl mx-auto text-center">
            <p key={tab.number} className="text-sm text-fd-gray-light leading-relaxed fd-fade-in">
              {tab.body}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {region.tabs.map((t, i) => (
              <button
                key={t.number}
                onClick={() => handleTabClick(i)}
                className={`group relative overflow-hidden flex items-baseline gap-2 rounded-md border px-4 py-2 text-sm transition-all ${
                  i === active
                    ? "border-fd-orange/40 bg-fd-orange/5 text-white"
                    : "border-fd-border bg-fd-surface text-fd-gray hover:border-fd-orange/20 hover:text-fd-gray-light"
                }`}
              >
                {i === active && !paused && (
                  <span
                    key={active}
                    className="absolute bottom-0 left-0 h-[2px] bg-fd-orange/60 rounded-full"
                    style={{ animation: `pill-progress ${DURATION}ms linear forwards` }}
                  />
                )}
                <span className={`font-mono text-xs ${i === active ? "text-fd-orange" : "text-fd-gray/50"}`}>
                  {t.number}
                </span>
                <span className="font-medium">{t.name}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-[10px] text-fd-gray/30 tracking-widest uppercase">← → to browse</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ProductSurfaces() {
  return (
    <section id="surfaces">
      {regions.map((region) => (
        <Region key={region.number} region={region} />
      ))}
    </section>
  );
}
