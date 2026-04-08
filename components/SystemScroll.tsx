"use client";

import { useRef, useState, useEffect } from "react";
import ScreenshotFrame from "./ScreenshotFrame";

const beats = [
  {
    copy: "Ideas become governed artifacts.",
    sub: "A 3\u00A0AM idea saved from your phone. Sitting in the inbox until you review it and decide whether it becomes something real.",
    image: "/images/screenshots/6_02_04_PM.webp",
    alt: "Document Manifest — Manifest tab, Planning domain",
  },
  {
    copy: "Artifacts become specifications.",
    sub: "A specification is a commitment: if it exists, it will be decomposed into executable work.",
    image: "/images/screenshots/6_02_15_PM.webp",
    alt: "Flight Planification — 37 planified, 172 flight plans",
  },
  {
    copy: "Specifications become flight plans.",
    sub: "Every flight plan permanently linked back to the spec that created it. The truth chain is never broken.",
    image: "/images/screenshots/6_02_17_PM.webp",
    alt: "Flights — 1 active, 2 in progress, 11 queued",
  },
  {
    copy: "Flight plans become sprints. Sprints become shipped work.",
    sub: "These are three separate things. Conflating them is how projects lose their thread. FlightDeck keeps them separate.",
    image: "/images/screenshots/6_02_21_PM.webp",
    alt: "Flight Logs — session receipts, commit counts",
  },
  {
    copy: "Nothing floats loose. Nothing gets lost. Nothing fails silently.",
    sub: "Every piece of work traces back to the specification that created it. Every specification traces back to the plan that shaped it.",
    image: "/images/screenshots/6_03_01_PM.webp",
    alt: "Ingest modal — AI classification, high confidence badge",
  },
];

export default function SystemScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const index = Math.min(
        beats.length - 1,
        Math.floor(progress * beats.length)
      );
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="relative"
      style={{ height: `${(beats.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full">
          {/* Mobile: stacked */}
          <div className="block lg:hidden space-y-16 py-12">
            {beats.map((beat, i) => (
              <div key={i}>
                <ScreenshotFrame src={beat.image} alt={beat.alt} />
                <p className="mt-6 text-xl font-semibold text-white">
                  {beat.copy}
                </p>
                <p className="mt-2 text-sm text-fd-gray">{beat.sub}</p>
              </div>
            ))}
          </div>

          {/* Desktop: sticky left, scroll right */}
          <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-fd-orange uppercase">
                The Pipeline
              </span>
              <p className="mt-4 text-3xl font-bold text-white leading-snug transition-all duration-500">
                {beats[activeIndex].copy}
              </p>
              <p className="mt-4 text-sm text-fd-gray leading-relaxed transition-all duration-500">
                {beats[activeIndex].sub}
              </p>

              <div className="mt-8 flex gap-2">
                {beats.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-fd-orange"
                        : "w-2 bg-fd-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              {beats.map((beat, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-500 ${
                    i === activeIndex
                      ? "opacity-100 translate-y-0"
                      : i < activeIndex
                        ? "opacity-0 -translate-y-4"
                        : "opacity-0 translate-y-4"
                  }`}
                >
                  <ScreenshotFrame src={beat.image} alt={beat.alt} />
                </div>
              ))}
              <div className="invisible">
                <ScreenshotFrame src={beats[0].image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-24">
        <p className="mx-auto max-w-2xl px-6 text-center text-lg text-fd-gray-light leading-relaxed">
          FlightDeck does not help you with one part of building software. It
          connects every part — inside a single governed system, where each
          stage flows naturally into the next, and every piece of work traces
          permanently to the decision that created it. The pipeline is the
          product.
        </p>
      </div>
    </section>
  );
}
