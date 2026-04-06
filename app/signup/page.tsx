"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [whatBuilding, setWhatBuilding] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, whatBuilding }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="mx-auto max-w-md w-full px-6">
          {status === "done" ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">You&apos;re in.</h1>
              <p className="mt-4 text-base text-fd-gray">
                Check your email — we sent the FlightDeck product overview.
              </p>
              <Link
                href="/"
                className="mt-8 inline-block text-sm text-fd-orange hover:underline"
              >
                &larr; Back to home
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Join the Early Access List
              </h1>
              <p className="mt-3 text-base text-fd-gray">
                FlightDeck is in active development. Get notified when beta
                access opens.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-fd-gray-light mb-1.5"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-fd-border bg-fd-surface px-4 py-3 text-sm text-white placeholder:text-fd-gray/50 focus:outline-none focus:border-fd-orange/50 transition-colors"
                    placeholder="Danny"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-fd-gray-light mb-1.5"
                  >
                    Email <span className="text-fd-red">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-fd-border bg-fd-surface px-4 py-3 text-sm text-white placeholder:text-fd-gray/50 focus:outline-none focus:border-fd-orange/50 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="whatBuilding"
                    className="block text-sm font-medium text-fd-gray-light mb-1.5"
                  >
                    What are you building?{" "}
                    <span className="text-fd-gray text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="whatBuilding"
                    value={whatBuilding}
                    onChange={(e) => setWhatBuilding(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-fd-border bg-fd-surface px-4 py-3 text-sm text-white placeholder:text-fd-gray/50 focus:outline-none focus:border-fd-orange/50 transition-colors resize-none"
                    placeholder="A SaaS for..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-fd-orange px-6 py-3 text-base font-semibold text-fd-black transition-all hover:brightness-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] disabled:opacity-50"
                >
                  {status === "loading"
                    ? "Submitting..."
                    : "Request Early Access"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-fd-red">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>

              <p className="mt-8 text-sm text-fd-gray text-center leading-relaxed">
                You&apos;re joining a list of founders who want to build
                software like a system. No noise. Just updates when they matter.
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}
