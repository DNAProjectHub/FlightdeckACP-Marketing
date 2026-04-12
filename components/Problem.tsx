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
            <h2 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-[1.1]">
              Build a real app
              <br />
              <span className="text-white/70 text-lg sm:text-xl md:text-2xl font-semibold">
                before AI convinces you that you already did.
              </span>
            </h2>

            <div className="mt-8 space-y-4 text-base text-fd-gray leading-relaxed">
              <p>
                The first wall is just getting started. Founders don&apos;t
                know which tools to choose, how the stack fits together, or
                what to install. And then there is the terminal — a black box
                that executes on a real filesystem with no undo, no preview,
                and no explanation for what it is about to do. FlightDeck is
                designed so founders can begin safely without being forced into
                that kind of uncertainty.
              </p>
              <p>
                The second wall is more dangerous, because it comes disguised
                as progress. Founders do get moving. The AI confirms every
                step. Screens appear. Buttons work. And then they try to make
                the thing actually do something real — store data, convert
                units, find a user&apos;s history — and it doesn&apos;t work.
                Not because the code is wrong. Because the system underneath
                was never real.
              </p>
              <p className="text-fd-gray-light font-medium">
                No data model. No persistence layer. No real schema. No wiring
                between the things that looked connected.
              </p>
              <p>
                This is the default condition of the current AI-builder market.
                AI is designed to generate plausible output fast — and it is
                designed to be encouraging, which means it will tell you
                that you&apos;re doing something extraordinary at exactly the
                moment you need to hear the truth.
              </p>
              <p className="text-white font-semibold">
                FlightDeck starts before code. It builds structural reality
                into the product before a single line is written — and it never
                substitutes praise for proof.
              </p>
            </div>

            <p className="mt-6 text-base font-semibold text-fd-orange tracking-wide">
              FlightDeck starts before code.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.15}>
          <div className="relative">
            <div className={`transition-opacity duration-700 ${videoEnded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
              <ScreenshotCarousel
                images={["Cockpit", "Cockpit-with-overlay"]}
                alt="FlightDeck Cockpit showing system health and cautions"
              />
            </div>
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
                    src={`https://img.youtube.com/vi/${YT_VIDEO_ID}/hqdefault.jpg`}
                    alt="The Anatomy of an Illusion — Why AI Apps Break"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={360}
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
