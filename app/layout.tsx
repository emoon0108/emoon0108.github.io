import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ethan Moon | AI Engineer",
  description:
    "Premium portfolio for Ethan Moon, an engineer building intelligent systems across AI, simulation, robotics, and computational modeling."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            window.tailwind = window.tailwind || {};
            window.tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    void: "#03050b",
                    ink: "#070a12",
                    cyan: "#39d8ff",
                    violet: "#9b5cff",
                    plasma: "#6476ff"
                  },
                  boxShadow: {
                    glow: "0 0 42px rgba(57, 216, 255, 0.22)",
                    violet: "0 0 55px rgba(155, 92, 255, 0.22)"
                  },
                  backgroundImage: {
                    "radial-grid": "radial-gradient(circle at center, rgba(57,216,255,.18) 0 1px, transparent 1px)"
                  },
                  keyframes: {
                    scan: {
                      "0%": { transform: "translateY(-100%)", opacity: "0" },
                      "25%": { opacity: ".6" },
                      "100%": { transform: "translateY(300%)", opacity: "0" }
                    },
                    shimmer: {
                      "0%": { backgroundPosition: "0% 50%" },
                      "100%": { backgroundPosition: "200% 50%" }
                    }
                  },
                  animation: {
                    scan: "scan 4s linear infinite",
                    shimmer: "shimmer 7s linear infinite"
                  }
                }
              }
            };
          `}
        </Script>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
