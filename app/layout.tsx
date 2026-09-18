import type { Metadata } from "next";
import { Poppins, Inter, Fraunces, Qwitcher_Grypen } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { organizationJsonLd } from "@/lib/structured-data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";
import "./globals.css";

// Site-wide UI font (see fontFamily in tailwind.config.ts).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

// Inter and Fraunces stay loaded only as selectable text fonts in the design studio.
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
  metadataBase: new URL(SITE_URL),
  // Every page across the site sets its own full "X | Outprint" title
  // string rather than relying on a template, so this default only ever
  // shows up for the handful of routes (like this layout's own fallback)
  // that don't set one.
  title: `${SITE_NAME} — Bespoke Print & Packaging Studio`,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Bespoke Print & Packaging Studio`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Bespoke Print & Packaging Studio`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${fraunces.variable} ${qwitcherGrypen.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/tas3jji.css" />
      </head>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-black/10 selection:text-black">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <WhatsAppFab />
        <CookieConsent />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
