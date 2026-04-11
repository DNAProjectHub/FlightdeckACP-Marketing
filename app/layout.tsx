import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
