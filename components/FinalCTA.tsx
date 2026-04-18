"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="snap-section py-16 border-t border-fd-border">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
            The pipeline is the product.
            <br />
            <span className="text-fd-gray/60">The product is real.</span>
          </h2>

          <p className="mt-6 text-base text-fd-gray leading-relaxed">
            Most AI-built products fail at one of four moments: when the
            founder can&apos;t begin safely, when what looked real turns out
            to be a facade, not a building, when the hard work at the end
            arrives without warning, or when the AI has been flattering the
            founder the whole time instead of telling the truth.
          </p>

          <p className="mt-4 text-base text-fd-gray leading-relaxed">
            FlightDeck solves all four. Not by making development simple. By
            making the decisions that matter happen at the right time, in the
            right order, with the right support — so the thing you build is
            actually real when you&apos;re done.
          </p>

          <p className="mt-4 text-base text-fd-gray leading-relaxed">
            One founder. A governed system. No blank screens. No facades.
            No surprises at the end.
          </p>

          <p className="mt-4 text-base font-semibold text-white">
            FlightDeck is the governed control plane for solo founders
            building real software with AI. That is the category. That is
            the bet. And that is why the pipeline is the product.
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
