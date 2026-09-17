import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar, Footer } from "@/components/sections";
import { RequestForm } from "@/components/hire-designer/request-form";

export const metadata: Metadata = {
  title: "Start Your Design Request | Outprint",
};

interface RequestPageProps {
  searchParams: { product?: string; productName?: string; category?: string; tier?: string };
}

export default function HireDesignerRequestPage({ searchParams }: RequestPageProps) {
  const { productName, category, tier } = searchParams;

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#111111]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-28">
        <Link
          href="/hire-a-designer"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-normal tracking-tight text-[#111111] sm:text-5xl">
            Let&apos;s get you a designer.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
            Four short steps, then we hand you straight into WhatsApp with everything your designer needs.
          </p>
        </div>

        <RequestForm initialCategory={category} initialProductName={productName} initialTier={tier} />
      </main>

      <Footer />
    </div>
  );
}
