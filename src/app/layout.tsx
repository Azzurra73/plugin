import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://platform.framontmanagement.com"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.shortName}`,
  },
  description:
    "MFSA-authorised AIFM platform for regulated EU investment vehicles — ETIs, Actively Managed Certificates, ready-made and bespoke funds, alternatives and venture capital. Passported across 27 EEA member states.",
  keywords: [
    "Framont",
    "MFSA",
    "AIFMD II",
    "AIFM Malta",
    "ETI",
    "AMC",
    "fund platform",
    "venture capital",
    "alternative funds",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "MFSA-authorised AIFM platform for regulated EU investment vehicles.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-navy">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
