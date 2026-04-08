"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="snap-section py-16 border-t border-fd-border">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            One founder.{" "}
            <span className="text-fd-gray/60">The right structure. A real product.</span>
          </h2>

          <p className="mt-6 text-base text-fd-gray leading-relaxed">
            The bet behind FlightDeck is simple: one founder, with the right
            structure and the right AI tools working inside a governed system,
            can build and ship a real software product with the speed and
            discipline of a small company. Not by replacing human judgment with
            AI, but by giving that founder a system where their thinking is
            captured, their decisions are organized, their concepts are
            validated before they are built, and their execution is tracked —
            instead of scattered across a dozen disconnected tools and forgotten
            chat windows.
          </p>

          <p className="mt-4 text-base text-fd-gray leading-relaxed">
            FlightDeck is for founders who don&apos;t just want help writing
            code. It&apos;s for founders who want help building a product,
            running a company, and keeping the whole thing together as it grows.
          </p>

          <p className="mt-4 text-base font-semibold text-white">
            FlightDeck is the governed control plane for solo founders building
            real software with AI. That is the category. That is the bet. And
            that is why the pipeline is the product.
          </p>

          <Link
            href="/signup"
            className="mt-10 inline-flex items-center rounded-lg bg-fd-orange px-8 py-3.5 text-base font-semibold text-fd-black transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
          >
            Get Early Access
          </Link>

          <p className="mt-6 text-sm text-fd-gray">
            No credit card. No setup. Early access to the beta.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
