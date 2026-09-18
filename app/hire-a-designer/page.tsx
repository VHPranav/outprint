import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import { Navbar, Footer } from "@/components/sections";
import { HowItWorks } from "@/components/hire-designer/how-it-works";
import { PricingTiers } from "@/components/hire-designer/pricing-tiers";
import { DesignerGrid } from "@/components/hire-designer/designer-grid";
import { RESPONSE_TIME_HOURS } from "@/data/hire-designer";

export const metadata: Metadata = {
  title: "Hire a Designer | Outprint",
  description:
    "Don't have artwork ready? Hire an Outprint designer — a real person turns your brief into print-ready art, reviewed entirely over WhatsApp.",
};

interface HireDesignerPageProps {
  searchParams: { product?: string; productName?: string; category?: string };
}

export default function HireDesignerPage({ searchParams }: HireDesignerPageProps) {
  const { product, productName, category } = searchParams;

  function requestHref(extra?: Record<string, string>): string {
    const params = new URLSearchParams();
    if (product) params.set("product", product);
    if (productName) params.set("productName", productName);
    if (category) params.set("category", category);
    if (extra) Object.entries(extra).forEach(([key, value]) => params.set(key, value));
    const query = params.toString();
    return `/hire-a-designer/request${query ? `?${query}` : ""}`;
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-[#FBF8F3] pb-20 pt-24 sm:pb-28 sm:pt-28">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
            {productName && (
              <span className="mb-5 inline-flex items-center rounded-full border border-[#E5E5E5] bg-white px-4 py-1.5 text-xs font-medium text-neutral-600">
                Designing for {productName}
              </span>
            )}
            <h1 className="font-serif text-4xl font-normal leading-[1.1] tracking-tight text-[#111111] sm:text-6xl">
              Don&apos;t have artwork ready?
              <br />
              Hire a designer.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
              Tell us what you need in a few guided steps. A real designer picks it up, shares drafts on
              WhatsApp, and once you approve, we print — no portals, no back-and-forth logins.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={requestHref()}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Start Your Request
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Responses in ~{RESPONSE_TIME_HOURS} business hours
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                Everything happens on WhatsApp
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Free digital proof before printing
              </span>
            </div>
          </div>
        </section>

        <div className="space-y-20 py-20 sm:space-y-28 sm:py-28">
          <HowItWorks />
          <PricingTiers requestHrefFor={(tierId) => requestHref({ tier: tierId })} />
        </div>

        <DesignerGrid />

        <section className="bg-black py-20 text-white sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center sm:px-8">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
              Ready to hand this off?
            </h2>
            <p className="max-w-lg text-sm text-neutral-400 sm:text-base">
              Five minutes of questions now saves days of back-and-forth later.
            </p>
            <Link
              href={requestHref()}
              className="group mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Start Your Request
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
