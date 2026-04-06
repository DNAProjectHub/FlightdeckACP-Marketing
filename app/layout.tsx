import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlightDeck — The Control Plane for AI Work",
  description:
    "Coordinate agents, govern execution, and ship real software — as a system, not a series of conversations.",
  openGraph: {
    title: "FlightDeck — The Control Plane for AI Work",
    description:
      "Coordinate agents, govern execution, and ship real software — as a system, not a series of conversations.",
    type: "website",
    url: "https://flightdeckacp.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlightDeck — The Control Plane for AI Work",
    description:
      "Coordinate agents, govern execution, and ship real software — as a system, not a series of conversations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
