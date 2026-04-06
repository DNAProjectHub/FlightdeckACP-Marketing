"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScreenshotFrame from "./ScreenshotFrame";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-fd-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-fd-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/logo.png"
            alt="FlightDeck"
            width={551}
            height={199}
            priority
            className="h-14 sm:h-16 w-auto mb-8"
          />

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Plan the Work.
            <br />
            Ship the Plan.
          </h1>

          <p className="mt-6 text-xl text-fd-gray-light font-medium leading-snug max-w-lg">
            The Control Plane for AI Work
          </p>

          <p className="mt-3 text-base text-fd-gray leading-relaxed max-w-lg">
            Coordinate agents, govern execution, and ship real software — as a
            system, not a series of conversations.
          </p>

          <p className="mt-4 text-sm text-fd-gray font-medium">
            Built for the solo founder who refuses to lose the plot.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-fd-orange px-7 py-3 text-base font-semibold text-fd-black transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
            >
              Get Early Access
            </Link>

            <a
              href="#system"
              className="text-sm text-fd-gray hover:text-fd-gray-light transition-colors"
            >
              See how it works ↓
            </a>
          </div>
        </motion.div>

        {/* ATC Screenshot — hero visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ScreenshotFrame
            src="/images/screenshots/6_01_33_PM.webp"
            alt="FlightDeck ATC — Air Traffic Control view showing crew status, session timer, and multi-project flight trajectories"
            priority
            tilt
          />
        </motion.div>
      </div>
    </section>
  );
}
