# FlightdeckACP-Marketing
Marketing site for FlightDeck — the control plane for AI work.

# FlightDeck — Marketing Site

Public marketing site and early access signup for [FlightDeck](https://flightdeckacp.com/) — the Agentic Control Plane for solo founders building software with AI.

------

## What This Is

This repo contains the marketing site only. It is separate from the product codebase and the prototype lab.

- **Product code:** `DNAProjectHub/DNA-Work-Control`
- **Prototype lab:** `DNAProjectHub/FD-Prototype-Lab`
- **This repo:** `DNAProjectHub/FlightdeckACP-Marketing`

------

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — minimal, scroll reveals only
- [Mailchimp Marketing API](https://mailchimp.com/developer/) — early access signups

------

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/).

------

## Environment Variables

Create a `.env.local` file at the repo root:

```
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_SERVER=     # e.g. us21 — the suffix on your API key
```

The site builds and runs without these set. The signup form will return an error if they are missing at runtime.

------

## Deployment

Deployed on [Vercel](https://vercel.com/). Connected to this repo. Push to `main` triggers a production deploy to [flightdeckacp.com](https://flightdeckacp.com/).

Set the three environment variables above in the Vercel project settings before enabling the signup form in production.

------

## Repo Structure

```
/
├── app/
│   ├── page.tsx              # Homepage
│   ├── signup/page.tsx       # Early access signup page
│   ├── api/subscribe/        # Mailchimp POST handler
│   └── layout.tsx
├── components/               # Section components + ScreenshotFrame
├── public/
│   └── images/
│       ├── screenshots/      # Desktop product screenshots (.webp)
│       └── mobile/           # Mobile product screenshots (.webp)
├── Docs/
│   ├── Briefs/               # Build briefs and handoff docs
│   ├── Assets/               # Source screenshots and brand assets
│   └── Copy/                 # Product overview and vision docs
└── README.md
```

------

## Content Notes

All copy, section structure, asset placement, and visual direction are documented in:

```
Docs/Briefs/FlightDeckACP_ClaudeCode_Handoff.md
```

Product copy source documents are in `Docs/Copy/`. Do not modify those files — they are reference only.

------

## What Is and Is Not Shipping

Features shown on this site reflect the current built product. The following are **not yet shipping** and should not be implied as available:

- OverWatch (execution intervention)
- Voice ATC briefing (ElevenLabs)
- Desktop execution terminals
- Dogfight mode

If these appear in future screenshots or copy, label them clearly as coming soon.

------

## Logo

The SVG logo file should be placed at `public/logo.svg`. Until it is available, the site uses a styled text wordmark. Swap the SVG in when ready — no other changes required.
