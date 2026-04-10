"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScreenshotCarousel from "./ScreenshotCarousel";
import ProofStrip from "./ProofStrip";

export default function Hero() {
  return (
    <section className="snap-section relative pt-10 pb-4 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-fd-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full"
        >
          <Image
            src="/images/logo.png"
            alt="FlightDeck"
            width={551}
            height={199}
            priority
            className="h-10 sm:h-12 w-auto mb-2"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
            Build a real app
            <br />
            <span className="text-white/50 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mt-1 block">
              before AI convinces you that you already did.
            </span>
          </h1>

          <div className="mt-3 text-sm sm:text-base text-fd-gray max-w-3xl mx-auto leading-[1.75] space-y-3 text-left">
            <p>
              Don&apos;t lose months building an app that will never work. AI
              makes half-built things look finished and fake things look real by
              covering for broken data wiring and missing schema structure with
              hardcoded data, simulated behavior, and convincing output that is
              not coming from a real working system at all.
            </p>
            <p>
              When you replace the sample data with real data from a real
              database, that&apos;s the moment you realize what you&apos;ve{" "}
              <em>actually done</em>: you&apos;ve built a fa&ccedil;ade, not a
              real building. Walk through the doorway and you&apos;re back in
              the wilderness.
            </p>
          </div>

          <div className="mt-3 w-full max-w-3xl">
            <ScreenshotCarousel
              images={[
                "Home-Terminal",
                "Home-Terminal-with-Terminal-Panel",
                "Home-Terminal-with-Notification",
                "Cockpit",
                "Cockpit-with-overlay",
                "Crew-Manifest",
              ]}
              alt="FlightDeck — project command and overview"
              priority
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-4">
        <ProofStrip />
      </div>
    </section>
  );
}
