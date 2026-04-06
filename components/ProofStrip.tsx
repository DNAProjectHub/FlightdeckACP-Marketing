const logos = [
  {
    name: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M13.7 21.8c-.4.5-1.3.2-1.3-.5V13h8.3c.7 0 1.1.9.6 1.4l-7.6 7.4zM10.3 2.2c.4-.5 1.3-.2 1.3.5V11H3.3c-.7 0-1.1-.9-.6-1.4L10.3 2.2z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm4 0h-2v-2h2v2zm-2-4H9V7h4v6z" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M22.28 9.37a5.93 5.93 0 00-.51-4.87A6.01 6.01 0 0015.3 1.16a5.97 5.97 0 00-4.52-2 6.01 6.01 0 00-5.72 4.15 5.94 5.94 0 00-3.97 2.88 6.02 6.02 0 00.74 7.05 5.93 5.93 0 00.51 4.87 6.01 6.01 0 006.47 3.34A5.97 5.97 0 0013.33 23.45a6.01 6.01 0 005.72-4.15 5.94 5.94 0 003.97-2.88 6.02 6.02 0 00-.74-7.05zM13.33 21.92a4.47 4.47 0 01-2.87-1.04l.14-.08 4.77-2.76c.24-.14.39-.4.39-.68V11.1l2.02 1.16v5.66a4.49 4.49 0 01-4.45 4z" />
      </svg>
    ),
  },
];

export default function ProofStrip() {
  return (
    <section className="border-y border-fd-border py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-lg font-medium text-fd-gray-light">
          Works with the stack you already use
        </h2>
        <p className="mt-2 text-sm text-fd-gray">
          FlightDeck coordinates across your tools. You stay in command.
        </p>

        <div className="mt-10 flex items-center justify-center gap-12 flex-wrap">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="text-fd-gray/40 hover:text-fd-gray-light transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.2)]"
              title={logo.name}
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
