"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import pkg from "@/package.json";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-fd-black/80 backdrop-blur-xl border-b border-fd-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="FlightDeck"
            width={160}
            height={58}
            priority
            className="h-7 w-auto"
          />
          <span className="text-[10px] font-mono text-fd-gray/30 tracking-wider uppercase">
            v{pkg.version}
          </span>
        </Link>
        <Link
          href="/signup"
          className="rounded-lg bg-fd-orange px-5 py-2 text-sm font-medium text-fd-black transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          Get Early Access
        </Link>
      </div>
    </nav>
  );
}
