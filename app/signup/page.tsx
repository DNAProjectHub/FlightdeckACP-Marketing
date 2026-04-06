"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
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
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          company,
          phone,
          whatBuilding,
        }),
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

  const inputClass =
    "w-full rounded-lg border border-fd-border bg-fd-surface px-4 py-3 text-sm text-white placeholder:text-fd-gray/50 focus:outline-none focus:border-fd-orange/50 transition-colors";

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
                <div className="grid grid-cols-2 gap-4">
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
                      className={inputClass}
                      placeholder="Danny"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-fd-gray-light mb-1.5"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                      placeholder="K"
                    />
                  </div>
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
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-fd-gray-light mb-1.5"
                  >
                    Company{" "}
                    <span className="text-fd-gray text-xs">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-fd-gray-light mb-1.5"
                  >
                    Phone{" "}
                    <span className="text-fd-gray text-xs">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="+1 (555) 000-0000"
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
                    className={`${inputClass} resize-none`}
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
