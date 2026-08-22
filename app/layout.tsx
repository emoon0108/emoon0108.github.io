import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
