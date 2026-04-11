"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScreenshotCarouselProps {
  images: string[];          // bare filenames without extension, e.g. ["Cockpit", "Cockpit-with-overlay"]
  alt?: string;
  priority?: boolean;
  autoRotateInterval?: number; // ms, default 4000, set to 0 to disable
  basePath?: string;
  /**
   * When true, renders a single static thumbnail with no auto-rotate, no
   * stacked background layers, and no click-to-lightbox. Used for cards that
   * are mounted below the fold and should not do any work until visible.
   */
  staticMode?: boolean;
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
  staticMode = false,
}: ScreenshotCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [visible, setVisible] = useState(priority); // gate work until in viewport
  const [hydrated, setHydrated] = useState(false);  // true after first client render
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = images.length;
  const hasMultiple = count > 1 && !staticMode;

  // Flip to true after hydration so staticMode images only gain their `src`
  // on the client. This keeps the SSR HTML free of static-mode srcs (so
  // React can't flush a <link rel=preload> hint for below-the-fold cards)
  // while still handing the browser a plain <img> with a real src to lazy-
  // load normally on scroll.
  useEffect(() => { setHydrated(true); }, []);

  const thumb = (name: string) => `${basePath}/${THUMB_DIR}/${name}.jpg`;
  const original = (name: string) => `${basePath}/${ORIGINAL_DIR}/${name}.png`;

  const advance = useCallback((dir: number) => {
    setActive(i => (i + dir + count) % count);
  }, [count]);

  // Intersection observer: only start timers + stacked backgrounds when this
  // carousel actually enters the viewport. Priority carousels skip the gate.
  useEffect(() => {
    if (priority || visible) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        setVisible(true);
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [priority, visible]);

  useEffect(() => {
    if (!hasMultiple || paused || !autoRotateInterval || !visible) return;
    timerRef.current = setInterval(() => advance(1), autoRotateInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hasMultiple, paused, autoRotateInterval, advance, active, visible]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <div
        ref={rootRef}
        className="relative rounded-xl overflow-visible group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Stacked background layers — up to 2 visible behind front.
            Only rendered on larger viewports and only after the carousel has
            entered the viewport, so mobile and below-the-fold sections pay
            nothing for them. */}
        {hasMultiple && visible && images.map((name, i) => {
          const offset = ((i - active + count) % count);
          if (offset === 0 || offset > 2) return null;
          return (
            <div
              key={name}
              className="hidden md:block absolute inset-0 rounded-xl overflow-hidden border border-white/10"
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
                  decoding="async"
                  draggable={false}
                  className="w-full h-auto"
                />
              </picture>
            </div>
          );
        })}

        {/* Front card */}
        <div
          className={`relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-fd-orange/5 ${staticMode ? "" : "cursor-zoom-in"}`}
          style={{ zIndex: count + 1 }}
          onClick={staticMode ? undefined : () => setLightbox(original(images[active]))}
        >
          {staticMode ? (
            /* Static-mode preview cards are small on every viewport, so always
               use the thumb regardless of screen size. `src` is only attached
               after client hydration (`hydrated` flips in a useEffect) so the
               SSR HTML has no src → React can't flush a <link rel=preload>
               hint for below-the-fold cards. Once src appears on the client,
               `loading="lazy"` lets the browser defer fetching until the
               card scrolls into view. Explicit width/height reserve the
               correct aspect ratio so `w-full h-auto` has real height while
               the src is absent. Thumbs are generated at 1200 px long edge;
               every current static caller uses portrait Flight School
               screenshots at 748×1200. */
            <img
              src={hydrated ? thumb(images[active]) : undefined}
              alt={alt}
              width={748}
              height={1200}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full h-auto"
            />
          ) : (
            <picture>
              <source media="(max-width: 680px)" srcSet={thumb(images[active])} />
              <img
                src={original(images[active])}
                alt={alt}
                /* Eager-load the front card. The container is `w-full h-auto`
                   which collapses to zero height until the image loads, and
                   the browser's native lazy loader refuses to trigger on
                   zero-height elements — so lazy here means never. We still
                   gate stacked backgrounds and auto-rotate behind the
                   IntersectionObserver, which is where the real cost is. */
                loading="eager"
                decoding="async"
                draggable={false}
                className="w-full h-auto"
              />
            </picture>
          )}
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
