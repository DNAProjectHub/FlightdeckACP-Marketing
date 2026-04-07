"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScreenshotFrame from "./ScreenshotFrame";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-center pt-16 pb-6 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-fd-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <Image
            src="/images/logo.png"
            alt="FlightDeck"
            width={551}
            height={199}
            priority
            className="h-9 sm:h-10 w-auto mb-4"
          />

          {/* Announcement chip */}
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-surface/60 backdrop-blur-sm px-3 py-1 text-[11px] text-fd-gray-light hover:border-fd-orange/30 hover:bg-fd-surface transition-all mb-5"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-fd-orange" />
            <span>Early access is open</span>
            <span className="text-fd-gray/50">→</span>
          </Link>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Plan the Work.{" "}
            <span className="text-fd-gray/60">Ship the Plan.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-fd-gray max-w-2xl mx-auto leading-relaxed">
            The Control Plane for AI Work. Coordinate agents, govern execution,
            and ship real software — as a system, not a series of conversations.
          </p>

          <Link
            href="/signup"
            className="mt-5 inline-flex items-center rounded-lg bg-fd-orange px-6 py-2.5 text-sm font-semibold text-fd-black transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
          >
            Get Early Access
          </Link>
        </motion.div>

        {/* Hero screenshot — constrained so the whole hero fits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 w-full max-w-3xl mx-auto"
        >
          <ScreenshotFrame
            src="/images/screenshots/6_01_33_PM.webp"
            alt="FlightDeck ATC — Air Traffic Control view showing crew status, session timer, and multi-project flight trajectories"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
