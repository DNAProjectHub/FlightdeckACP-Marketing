"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ScreenshotCarousel from "./ScreenshotCarousel";

const YT_VIDEO_ID = "A_HtyXzAuPI";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function Problem() {
  const [started, setStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handlePlay = () => {
    setStarted(true);

    const initPlayer = () => {
      new window.YT.Player("problem-yt-player", {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          controls: 1,
          playsinline: 1,
        },
        events: {
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              setVideoEnded(true);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  };

  return (
    <section
      id="problem"
      className="snap-section py-16 border-t border-fd-border"
    >
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="left">
          <div>
            <SectionLabel number="0.1" label="The Problem" />
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              You&apos;ve been building a surface.
              <br />
              <span className="text-fd-gray/60">Not a system.</span>
            </h2>

            <div className="mt-8 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                Most founders who build with AI hit the same wall. What they
                built looks real. It has screens. It has buttons. It has an AI
                that responds. And when they demo it, everything works.
              </p>
              <p className="text-fd-gray-light font-medium">
                Until it doesn&apos;t.
              </p>
              <p>
                Because underneath the impressive interface, there&apos;s
                nothing there. The data is stored as sentences in a text column.
                The &ldquo;calculation&rdquo; is the AI guessing. The
                &ldquo;login&rdquo; is a screen with no real authentication
                behind it. The &ldquo;database&rdquo; is a hardcoded list in
                the source code. The AI helped build it quickly, so it feels
                real.
              </p>
              <p className="text-white font-semibold">
                It isn&apos;t.
              </p>
              <p>
                This is the most dangerous failure mode in AI-assisted
                development: building a surface without a system. It isn&apos;t
                just beginner naivety. It is a structural trap that the current
                generation of AI tools actively encourage — because they are
                optimized to produce plausible output fast, not correct systems
                that last.
              </p>
              <p>
                FlightDeck is designed to prevent this. Not by making
                development harder. By starting earlier.
              </p>
            </div>

            <p className="mt-6 text-base font-semibold text-fd-orange tracking-wide">
              FlightDeck starts before code.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
          <div className="relative">

            {/* Screenshot — fades in when video ends */}
            <div className={`transition-opacity duration-700 ${videoEnded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
              <ScreenshotCarousel
                images={["Cockpit", "Cockpit-with-overlay"]}
                alt="FlightDeck Cockpit showing system health and cautions"
              />
            </div>

            {/* Video slot */}
            <div className={`transition-opacity duration-700 ${videoEnded ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100 relative"}`}>
              <div
                id="problem-yt-player"
                className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-fd-orange/5"
                style={{ aspectRatio: "16/9", display: started ? "block" : "none" }}
              />

              {!started && (
                <button
                  onClick={handlePlay}
                  className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-fd-orange/5 group cursor-pointer block"
                  aria-label="Play video"
                >
                  <img
                    src={`https://img.youtube.com/vi/${YT_VIDEO_ID}/maxresdefault.jpg`}
                    alt="The Anatomy of an Illusion — Why AI Apps Break"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-fd-orange flex items-center justify-center shadow-lg shadow-fd-orange/40 group-hover:scale-105 transition-transform">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <p className="text-xs text-fd-gray-light font-medium">
                      The Anatomy of an Illusion — Why AI Apps Break
                    </p>
                  </div>
                </button>
              )}
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
