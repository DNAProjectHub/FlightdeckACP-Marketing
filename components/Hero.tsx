"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScreenshotFrame from "./ScreenshotFrame";
import ProofStrip from "./ProofStrip";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex flex-col pt-14 pb-4 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-fd-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="flex-1 mx-auto max-w-5xl px-6 w-full text-center flex flex-col items-center justify-center">
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
            className="h-8 sm:h-10 w-auto mb-5"
          />

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Plan the Work.
            <br />
            <span className="text-fd-gray/60">Ship the Plan.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-fd-gray max-w-xl mx-auto leading-relaxed">
            FlightDeck is the Control Plane for AI Work. Coordinate agents,
            govern execution, and ship real software — as a system, not a
            series of conversations.
          </p>

          {/* Hero screenshot — constrained */}
          <div className="mt-6 w-full max-w-2xl">
            <ScreenshotFrame
              src="/images/screenshots/6_01_33_PM.webp"
              alt="FlightDeck ATC — Air Traffic Control showing crew status and flight trajectories"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* ProofStrip pinned at the bottom of the hero viewport */}
      <div className="mt-4">
        <ProofStrip />
      </div>
    </section>
  );
}
