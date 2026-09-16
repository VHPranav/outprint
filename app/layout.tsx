import type { Metadata } from "next";
import { Inter, Fraunces, Qwitcher_Grypen } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const qwitcherGrypen = Qwitcher_Grypen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-qwitcher-grypen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outprint — Bespoke Print & Packaging Studio",
  description:
    "Architectural-grade custom print-on-demand for modern brands: die-cut stickers, embossed packaging, tactile business cards, and marketing collateral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${qwitcherGrypen.variable}`}>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-black/10 selection:text-black">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
