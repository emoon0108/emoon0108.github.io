import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque.ttf",
  variable: "--font-bricolage",
  display: "swap"
});

const instrument = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" }
  ],
  variable: "--font-instrument",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emoon0108.github.io"),
  title: "Ethan Moon — Applied AI & Physical Systems",
  description:
    "Ethan Moon is a University of Michigan computer science student engineering products across applied AI, digital twins, simulation, sensing, and real-time systems.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Ethan Moon — Applied AI & Physical Systems",
    description:
      "University of Michigan computer science student building intelligent products across applied AI, digital twins, simulation, sensing, and real-time systems.",
    url: "https://emoon0108.github.io/",
    siteName: "Ethan Moon",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Ethan Moon — Applied AI & Physical Systems",
    description:
      "University of Michigan computer science student building intelligent products across software and the physical world."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${instrument.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
