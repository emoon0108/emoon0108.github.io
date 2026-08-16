import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://emoon0108.github.io"),
  title: "Ethan Moon | Software & Applied AI Engineering",
  description:
    "Portfolio of Ethan Moon, an incoming University of Michigan engineering student building applied AI, simulation, digital twins, and realtime product systems.",
  openGraph: {
    title: "Ethan Moon | Software & Applied AI Engineering",
    description:
      "Applied AI, digital twins, simulation, and realtime product engineering.",
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
