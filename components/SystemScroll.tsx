"use client";

import { useRef, useState, useEffect } from "react";
import ScreenshotFrame from "./ScreenshotFrame";

const beats = [
  {
    copy: "Ideas become specifications.",
    image: "/images/screenshots/6_02_04_PM.webp",
    alt: "Document Manifest — Manifest tab, Planning domain",
  },
  {
    copy: "Specifications become flight plans.",
    image: "/images/screenshots/6_02_15_PM.webp",
    alt: "Flight Planification — 37 planified, 172 flight plans",
  },
  {
    copy: "Flight plans become execution.",
    image: "/images/screenshots/6_02_17_PM.webp",
    alt: "Flights — 1 active, 2 in progress, 11 queued",
  },
  {
    copy: "Every action is governed. Every decision is recorded.",
    image: "/images/screenshots/6_02_21_PM.webp",
    alt: "Flight Logs — session receipts, commit counts",
  },
  {
    copy: "From idea to shipped feature — fully traceable. Nothing floats loose.",
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
              </div>
            ))}
          </div>

          {/* Desktop: sticky left, scroll right */}
          <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-fd-orange uppercase">
                The System
              </span>
              <p className="mt-4 text-3xl font-bold text-white leading-snug transition-all duration-500">
                {beats[activeIndex].copy}
              </p>

              {/* Progress dots */}
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
              {/* Reserve space */}
              <div className="invisible">
                <ScreenshotFrame
                  src={beats[0].image}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section tagline — after scroll */}
      <div className="absolute bottom-0 left-0 right-0 pb-24">
        <p className="mx-auto max-w-2xl px-6 text-center text-lg text-fd-gray-light leading-relaxed">
          That lineage — idea to plan to spec to work item to shipped feature —
          is not a nice-to-have. It is the product.
        </p>
      </div>
    </section>
  );
}
