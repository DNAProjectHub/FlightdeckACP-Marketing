"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScreenshotFrame from "./ScreenshotFrame";
import ProofStrip from "./ProofStrip";

export default function Hero() {
  return (
    <section className="snap-section relative pt-20 pb-6 overflow-hidden">
      {/* Subtle ambient glow */}
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
            className="h-12 sm:h-16 w-auto mb-4"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] whitespace-nowrap">
            Plan the Work.{" "}
            <span className="text-fd-gray/60">Ship the Plan.</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-fd-gray max-w-2xl mx-auto leading-relaxed">
            FlightDeck is the Control Plane for AI software development.
            Coordinate agents, govern execution, and ship real software as a
            system, not a conversation. Turn business plans into business
            software.
          </p>

          {/* Hero screenshot — bigger to fill viewport */}
          <div className="mt-5 w-full max-w-4xl">
            <ScreenshotFrame
              src="/images/screenshots/6_01_33_PM.webp"
              alt="FlightDeck ATC — Air Traffic Control showing crew status and flight trajectories"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* ProofStrip — natural flow, right under the screenshot */}
      <div className="mt-6">
        <ProofStrip />
      </div>
    </section>
  );
}
