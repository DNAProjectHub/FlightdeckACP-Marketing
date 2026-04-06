"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyFooterCTA() {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus("done");
    } catch {
      setStatus("idle");
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Desktop bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 border-t border-fd-border bg-fd-black/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-fd-gray-light">
            Get early access to FlightDeck.
          </p>
          <Link
            href="/signup"
            className="rounded-lg bg-fd-orange px-5 py-2 text-sm font-medium text-fd-black transition-all hover:brightness-110"
          >
            Join the Beta &rarr;
          </Link>
        </div>
      </div>

      {/* Mobile tab / drawer */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40">
        {drawerOpen ? (
          <div className="border-t border-fd-border bg-fd-black/95 backdrop-blur-xl rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">
                Get early access to FlightDeck.
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-fd-gray hover:text-white text-lg"
              >
                &times;
              </button>
            </div>
            {status === "done" ? (
              <p className="text-sm text-fd-green">You&apos;re in. Check your email.</p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-fd-border bg-fd-surface px-4 py-2.5 text-sm text-white placeholder:text-fd-gray/50 focus:outline-none focus:border-fd-orange/50"
                />
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="rounded-lg bg-fd-orange px-5 py-2.5 text-sm font-medium text-fd-black transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Join"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full border-t border-fd-border bg-fd-black/90 backdrop-blur-xl px-6 py-3 text-center"
          >
            <span className="text-sm text-fd-gray-light">
              Get early access to FlightDeck.
            </span>
            <span className="ml-2 text-sm font-medium text-fd-orange">
              Join the Beta &rarr;
            </span>
          </button>
        )}
      </div>
    </>
  );
}
