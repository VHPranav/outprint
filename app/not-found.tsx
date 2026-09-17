import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Home } from "lucide-react";
import { Navbar, Footer } from "@/components/sections";

export const metadata: Metadata = {
  title: "Page Not Found | Outprint",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 pt-24 text-center sm:px-8">
        <span className="font-serif text-8xl font-normal tracking-tight text-neutral-200 sm:text-9xl">
          404
        </span>
        <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
          This page didn&apos;t make it to press.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Home className="h-4 w-4" />
            Back to Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/#categories"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[#E5E5E5] px-7 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-300"
          >
            <Search className="h-4 w-4" />
            Browse Products
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
