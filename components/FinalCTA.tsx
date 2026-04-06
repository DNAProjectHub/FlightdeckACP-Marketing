"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="py-32 border-t border-fd-border">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Run your AI like a system.
          </h2>
          <p className="mt-4 text-lg text-fd-gray">
            Not like a conversation you keep starting over.
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
