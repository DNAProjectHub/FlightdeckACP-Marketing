"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScreenshotFrame from "./ScreenshotFrame";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-fd-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/images/logo.png"
            alt="FlightDeck"
            width={551}
            height={199}
            priority
            className="h-12 sm:h-14 w-auto mx-auto mb-10"
          />

          {/* Announcement chip */}
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-surface/60 backdrop-blur-sm px-4 py-1.5 text-xs text-fd-gray-light hover:border-fd-orange/30 hover:bg-fd-surface transition-all mb-8"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-fd-orange" />
            <span>Early access is open</span>
            <span className="text-fd-gray/50">→</span>
          </Link>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Plan the Work.
            <br />
            <span className="text-fd-gray/60">Ship the Plan.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-fd-gray max-w-2xl mx-auto leading-relaxed">
            The Control Plane for AI Work. Coordinate agents, govern execution,
            and ship real software — as a system, not a series of conversations.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-fd-orange px-7 py-3 text-base font-semibold text-fd-black transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              Get Early Access
            </Link>
          </div>
        </motion.div>

        {/* Big hero screenshot — dominant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-16 sm:mt-20"
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
