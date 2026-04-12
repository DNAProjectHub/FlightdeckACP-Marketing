import { useState, useEffect, useCallback, useRef } from "react";

/*─────────────────────────────────────────────────────────────
  FlightDeck Screenshot Gallery
  ─────────────────────────────────────────────────────────────
  Props:
    basePath    – path prefix for images (default: "/images/screenshots")
    thumbDir    – subfolder for thumbs  (default: "thumbs")
    originalDir – subfolder for originals (default: "originals")
    autoRotateInterval – ms between auto-advance (default: 4000, 0 = off)

  Each card shows the thumb by default.
  Clicking opens a lightbox with the full-size original.
  Cards with multiple screenshots show a layered stack with
  arrow controls and auto-rotate.
─────────────────────────────────────────────────────────────*/

// ── Gallery Data ────────────────────────────────────────────
const GALLERY_GROUPS = [
  // ─── Flight Mode ───
  {
    id: "cockpit",
    label: "Cockpit",
    mode: "flight",
    images: ["Cockpit", "Cockpit-with-overlay"],
  },
  {
    id: "home-terminal",
    label: "Home Terminal",
    mode: "flight",
    images: [
      "Home-Terminal",
      "Home-Terminal-with-Terminal-Panel",
      "Home-Terminal-with-Notification",
      "Home-Terminal-Cards-Closeup",
      "CoPilot-Briefing-Card-Closeup",
    ],
  },
  {
    id: "crew-manifest",
    label: "Crew Manifest",
    mode: "flight",
    images: ["Crew-Manifest"],
  },
  {
    id: "document-manifest",
    label: "Document Manifest",
    mode: "flight",
    images: [
      "Document-Manifest-Inbox",
      "Document-Manifest-Icon-Library",
      "Document-Manifest-Logos",
      "Document-Manifest-Logos-Ingest-Modal",
      "Ingest-Document-Closeup",
      "Document-Manifest-Logos-with-Terminal-Build",
      "Document-Manifest-Logos-with-Terminal-Agent",
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    mode: "flight",
    images: ["Maintenance-System-Health"],
  },
  {
    id: "data-structures",
    label: "Data Structures",
    mode: "flight",
    images: ["Data-Structures"],
  },
  {
    id: "flights",
    label: "Flights",
    mode: "flight",
    images: ["Flights-List", "Flight-Planification", "Flight-Logs"],
  },
  {
    id: "flight-school",
    label: "Flight School",
    mode: "flight",
    images: [
      "Flight-School-Welcome",
      "Flight-School-Experience-Calibration",
      "Flight-School-Phase1-Intro",
      "Flight-School-Phase1-Communication-Style",
      "Flight-School-Phase1-Humor",
      "Flight-School-Phase1-Mood-Tone",
    ],
  },
  {
    id: "mission-control",
    label: "Mission Control",
    mode: "flight",
    images: [
      "Mission-Control-Card-Closeup",
      "Mission-Control-Create-New-Project",
      "Mission-Control-New-or-Existing",
      "Mission-Control-Project-Role",
      "Mission-Control-Project-Name",
      "Mission-Control-Short-Code",
      "Mission-Control-Project-Description",
      "Mission-Control-Whats-Already-In-Place",
    ],
  },
  {
    id: "tactical-ops",
    label: "Tactical Ops",
    mode: "flight",
    images: [
      "Tactical-Ops-Card-Closeup",
      "Tactical-Ops-Skill-Building-Setup",
      "Tactical-Ops-Skill-Building-Setup-Expanded",
    ],
  },

  // ─── Dev Mode ───
  {
    id: "dev-system-overview",
    label: "System Overview",
    mode: "dev",
    images: ["Dev-Mode-System-Overview-All-Projects"],
  },
  {
    id: "dev-home-terminal",
    label: "Home Terminal",
    mode: "dev",
    images: ["Dev-Mode-Home-Terminal", "Dev-Mode-Project-Overview"],
  },
  {
    id: "dev-agents",
    label: "Agents & Connections",
    mode: "dev",
    images: [
      "Dev-Mode-Agents-and-Connections",
      "Dev-Mode-Settings-System-Health",
      "Dev-Mode-Schema-Explorer",
    ],
  },
  {
    id: "dev-documents",
    label: "Documents",
    mode: "dev",
    images: [
      "Dev-Mode-Documents-Inbox",
      "Dev-Mode-Documents-Planning-Tab",
      "Dev-Mode-Documents-Icon-Library",
      "Dev-Mode-Documents-Logos",
      "Dev-Mode-Documents-Logos-2",
    ],
  },
  {
    id: "dev-planification",
    label: "Flight Planification",
    mode: "dev",
    images: ["Dev-Mode-Flight-Planification"],
  },
  {
    id: "dev-sprints",
    label: "Sprints",
    mode: "dev",
    images: ["Dev-Mode-Sprints"],
  },
  {
    id: "dev-session-history",
    label: "Session History",
    mode: "dev",
    images: ["Dev-Mode-Session-History"],
  },
];

// ── Carousel Card ───────────────────────────────────────────
function CarouselCard({ group, basePath, thumbDir, originalDir, autoRotateInterval, onOpenLightbox }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const count = group.images.length;
  const hasMultiple = count > 1;

  const advance = useCallback(
    (dir) => setActiveIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Auto-rotate
  useEffect(() => {
    if (!hasMultiple || isPaused || !autoRotateInterval) return;
    timerRef.current = setInterval(() => advance(1), autoRotateInterval);
    return () => clearInterval(timerRef.current);
  }, [hasMultiple, isPaused, autoRotateInterval, advance]);

  const thumbSrc = (name) => `${basePath}/${thumbDir}/${name}.jpg`;
  const originalSrc = (name) => `${basePath}/${originalDir}/${name}.png`;

  return (
    <div
      className="fd-gallery-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Label */}
      <div className="fd-gallery-label">
        <span className="fd-gallery-label-text">{group.label}</span>
        {group.mode === "dev" && <span className="fd-gallery-badge-dev">DEV</span>}
        {hasMultiple && (
          <span className="fd-gallery-counter">
            {activeIndex + 1}/{count}
          </span>
        )}
      </div>

      {/* Stack container */}
      <div className="fd-gallery-stack">
        {/* Background layers (visible offset cards) */}
        {hasMultiple &&
          group.images.map((name, i) => {
            const offset = ((i - activeIndex + count) % count);
            if (offset === 0 || offset > 2) return null;
            return (
              <div
                key={name}
                className="fd-gallery-layer"
                style={{
                  transform: `translateY(${offset * -6}px) scale(${1 - offset * 0.03})`,
                  opacity: 1 - offset * 0.25,
                  zIndex: count - offset,
                }}
              >
                <img
                  src={thumbSrc(name)}
                  alt=""
                  draggable={false}
                  loading="lazy"
                />
              </div>
            );
          })}

        {/* Active (front) card */}
        <div
          className="fd-gallery-front"
          style={{ zIndex: count + 1 }}
          onClick={() => onOpenLightbox(originalSrc(group.images[activeIndex]), group.label)}
        >
          <img
            src={thumbSrc(group.images[activeIndex])}
            alt={`${group.label} — ${group.images[activeIndex]}`}
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Arrow controls */}
        {hasMultiple && (
          <>
            <button
              className="fd-gallery-arrow fd-gallery-arrow-left"
              style={{ zIndex: count + 2 }}
              onClick={(e) => { e.stopPropagation(); advance(-1); }}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className="fd-gallery-arrow fd-gallery-arrow-right"
              style={{ zIndex: count + 2 }}
              onClick={(e) => { e.stopPropagation(); advance(1); }}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="fd-gallery-dots">
          {group.images.map((_, i) => (
            <button
              key={i}
              className={`fd-gallery-dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Lightbox ────────────────────────────────────────────────
function Lightbox({ src, label, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!src) return null;

  return (
    <div className="fd-lightbox-overlay" onClick={onClose}>
      <div className="fd-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="fd-lightbox-close" onClick={onClose}>✕</button>
        <img src={src} alt={label} />
        <p className="fd-lightbox-caption">{label}</p>
      </div>
    </div>
  );
}

// ── Main Gallery ────────────────────────────────────────────
export default function ScreenshotGallery({
  basePath = "/images/screenshots",
  thumbDir = "thumbs",
  originalDir = "originals",
  autoRotateInterval = 4000,
}) {
  const [activeMode, setActiveMode] = useState("flight");
  const [lightbox, setLightbox] = useState({ src: null, label: "" });

  const filtered = GALLERY_GROUPS.filter((g) => g.mode === activeMode);

  return (
    <section className="fd-gallery">
      {/* Mode toggle */}
      <div className="fd-gallery-mode-toggle">
        <button
          className={`fd-gallery-mode-btn ${activeMode === "flight" ? "active" : ""}`}
          onClick={() => setActiveMode("flight")}
        >
          Flight Mode
        </button>
        <button
          className={`fd-gallery-mode-btn ${activeMode === "dev" ? "active" : ""}`}
          onClick={() => setActiveMode("dev")}
        >
          Dev Mode
        </button>
      </div>

      {/* Grid */}
      <div className="fd-gallery-grid">
        {filtered.map((group) => (
          <CarouselCard
            key={group.id}
            group={group}
            basePath={basePath}
            thumbDir={thumbDir}
            originalDir={originalDir}
            autoRotateInterval={autoRotateInterval}
            onOpenLightbox={(src, label) => setLightbox({ src, label })}
          />
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightbox.src}
        label={lightbox.label}
        onClose={() => setLightbox({ src: null, label: "" })}
      />
    </section>
  );
}
