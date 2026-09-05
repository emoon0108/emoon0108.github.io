import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque.ttf",
  variable: "--font-bricolage",
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
    "https://www.linkedin.com/in/ethan-moon0108/"
  ],
  affiliation: {
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
  title: "Ethan Moon — Software Engineer & Researcher",
  description:
    "Ethan Moon’s portfolio. Computer science at Michigan, lead full-stack engineer at Ody, and robotics researcher. Explore software and research projects in a 3D soccer stadium.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Ethan Moon — Software Engineer & Researcher",
    description:
      "An interactive collection of software and research projects, from movie discovery to bioprinting and robot autonomy.",
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
    title: "Ethan Moon — Software Engineer & Researcher",
    description:
      "Software engineer and researcher at Michigan. Explore projects in an interactive 3D soccer stadium.",
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
      <body className={bricolage.variable}>
        {children}
      </body>
    </html>
  );
}
