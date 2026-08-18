import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://emoon0108.github.io"),
  title: "Ethan Moon — Applied AI & Physical Systems",
  description:
    "Ethan Moon engineers intelligent products across applied AI, digital twins, simulation, sensing, and realtime systems.",
  openGraph: {
    title: "Ethan Moon — Applied AI & Physical Systems",
    description:
      "Intelligent products across applied AI, digital twins, simulation, sensing, and realtime systems.",
    url: "https://emoon0108.github.io/",
    siteName: "Ethan Moon",
    type: "website"
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
