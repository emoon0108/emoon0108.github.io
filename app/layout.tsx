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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ethan Moon",
  url: "https://emoon0108.github.io/",
  image: "https://emoon0108.github.io/ethan-moon.jpg",
  email: "mailto:ethmoon@umich.edu",
  sameAs: [
    "https://github.com/emoon0108",
    "https://www.linkedin.com/in/ethan-moon-b9a2a7314/"
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Michigan"
  },
  knowsAbout: [
    "Applied artificial intelligence",
    "Digital twins",
    "Computational simulation",
    "Realtime systems",
    "Audio signal processing"
  ]
};

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
    type: "website",
    images: [
      {
        url: "/ethan-moon.jpg",
        width: 3547,
        height: 5320,
        alt: "Portrait of Ethan Moon"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Ethan Moon — Applied AI & Physical Systems",
    description:
      "University of Michigan computer science student building intelligent products across software and the physical world.",
    images: ["/ethan-moon.jpg"]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${bricolage.variable} ${instrument.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
