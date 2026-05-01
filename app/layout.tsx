import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chomtana.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HBD CHOMTANA",
  description:
    "An 8-bit birthday card for Chomtana. Lv. 25 ▶ 26 — press start to open.",
  openGraph: {
    type: "website",
    title: "★ HAPPY BIRTHDAY CHOMTANA! ★",
    description:
      "An 8-bit birthday card for Chomtana. Lv. 25 ▶ 26 — press start to open.",
    siteName: "HBD CHOMTANA",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "★ HAPPY BIRTHDAY CHOMTANA! ★",
    description:
      "An 8-bit birthday card for Chomtana. Lv. 25 ▶ 26 — press start to open.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pixelFont.variable}>
      <body className="crt">
        <div className="scanline-bar" />
        {children}
      </body>
    </html>
  );
}
