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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            First, you&apos;re afraid to start.
            <span className="text-white text-xl sm:text-2xl md:text-3xl font-semibold leading-snug mt-2 block">
              Then, halfway through, you discover you built a surface, not a system,
              and you were right to be afraid in the first place.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-fd-gray max-w-2xl mx-auto leading-[1.75]">
            Most solo founders hit one of these two walls (and usually, both).
            FlightDeck is the governed, AI-aided development pipeline for
            building software that helps you begin safely and prevents false
            progress before it becomes expensive.
          </p>

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
