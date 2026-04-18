"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
            className="h-10 sm:h-12 w-auto mb-6"
          />

          {/* MacBook terminal image — fear lands before copy */}
          <div className="w-full max-w-3xl mb-8 rounded-xl overflow-hidden border border-white/10">
            <Image
              src="/images/macbookhomebrewuse.png"
              alt="Terminal command on a MacBook — the moment most founders freeze"
              width={1320}
              height={880}
              priority
              className="w-full h-auto"
            />
          </div>

          {/* Founder statement — H1 primary tier */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            If this terrifies you, you&apos;re not alone.
            <br />
            That&apos;s why I built FlightDeck.
          </h1>

          {/* Two-wall framing — secondary tier, clearly smaller */}
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-snug max-w-3xl">
            First, you&apos;re afraid to start.
            <br />
            Then, halfway through, you discover you built a facade, not a building,
            <br className="hidden sm:block" />
            {" "}and you were right to be afraid in the first place.
          </p>

          {/* Body */}
          <p className="mt-4 text-sm sm:text-base text-fd-gray max-w-2xl mx-auto leading-[1.75]">
            Most solo founders hit one of these two walls (and usually, both).
            FlightDeck is the governed, AI-aided development pipeline for
            building software that helps you begin safely and prevents false
            progress before it becomes expensive.
          </p>
        </motion.div>
      </div>

      <div className="mt-6">
        <ProofStrip />
      </div>
    </section>
  );
}
