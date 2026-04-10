"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScreenshotCarouselProps {
  images: string[];          // bare filenames without extension, e.g. ["Cockpit", "Cockpit-with-overlay"]
  alt?: string;
  priority?: boolean;
  autoRotateInterval?: number; // ms, default 4000, set to 0 to disable
  basePath?: string;
}

const THUMB_DIR = "thumbs";
const ORIGINAL_DIR = "originals";
const DEFAULT_INTERVAL = 4000;

export default function ScreenshotCarousel({
  images,
  alt = "",
  priority = false,
  autoRotateInterval = DEFAULT_INTERVAL,
  basePath = "/images/screenshots",
}: ScreenshotCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = images.length;
  const hasMultiple = count > 1;

  const thumb = (name: string) => `${basePath}/${THUMB_DIR}/${name}.jpg`;
  const original = (name: string) => `${basePath}/${ORIGINAL_DIR}/${name}.png`;

  const advance = useCallback((dir: number) => {
    setActive(i => (i + dir + count) % count);
  }, [count]);

  useEffect(() => {
    if (!hasMultiple || paused || !autoRotateInterval) return;
    timerRef.current = setInterval(() => advance(1), autoRotateInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hasMultiple, paused, autoRotateInterval, advance, active]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <div
        className="relative rounded-xl overflow-visible group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Stacked background layers — up to 2 visible behind front */}
        {hasMultiple && images.map((name, i) => {
          const offset = ((i - active + count) % count);
          if (offset === 0 || offset > 2) return null;
          return (
            <div
              key={name}
              className="absolute inset-0 rounded-xl overflow-hidden border border-white/10"
              style={{
                transform: `translateY(${offset * -6}px) scale(${1 - offset * 0.03})`,
                opacity: 1 - offset * 0.25,
                zIndex: count - offset,
              }}
            >
              <picture>
                <source media="(max-width: 680px)" srcSet={thumb(name)} />
                <img
                  src={original(name)}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="w-full h-auto"
                />
              </picture>
            </div>
          );
        })}

        {/* Front card */}
        <div
          className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-fd-orange/5 cursor-zoom-in"
          style={{ zIndex: count + 1 }}
          onClick={() => setLightbox(original(images[active]))}
        >
          <picture>
            <source media="(max-width: 680px)" srcSet={thumb(images[active])} />
            <img
              src={original(images[active])}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              draggable={false}
              className="w-full h-auto"
            />
          </picture>
          {/* Mask version number in top-right corner */}
          <div
            className="absolute top-0 right-0 w-24 h-8 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(13,13,15,1) 40%, rgba(13,13,15,0) 100%)" }}
          />
        </div>

        {/* Arrow controls — appear on hover, min 44px tap targets */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); advance(-1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-fd-black/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl leading-none hover:bg-fd-surface"
              aria-label="Previous screenshot"
              style={{ zIndex: count + 2 }}
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); advance(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-fd-black/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl leading-none hover:bg-fd-surface"
              aria-label="Next screenshot"
              style={{ zIndex: count + 2 }}
            >
              ›
            </button>
          </>
        )}

        {/* Counter badge */}
        {hasMultiple && (
          <div
            className="absolute top-2 left-2 bg-fd-black/70 backdrop-blur-sm rounded px-1.5 py-0.5"
            style={{ zIndex: count + 2 }}
          >
            <span className="text-[9px] font-mono text-fd-gray/70">{active + 1}/{count}</span>
          </div>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="mt-2 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-4 bg-fd-orange" : "w-1.5 bg-fd-border hover:bg-fd-gray/40"
              }`}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox — full-size original PNG */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full bg-fd-black border border-white/20 text-white text-sm flex items-center justify-center hover:bg-fd-surface transition-colors"
            >
              ✕
            </button>
            <img
              src={lightbox}
              alt={alt}
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
