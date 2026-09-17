import * as React from "react";
import { Navbar, Footer } from "@/components/sections";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-28">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-[#111111] sm:text-5xl">{title}</h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-neutral-400">Last updated: {lastUpdated}</p>
        <div className="mt-10 space-y-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 font-serif text-xl font-normal text-neutral-900">{children}</h2>;
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-neutral-600">{children}</p>;
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-600">{children}</ul>;
}

/** Every legal page carries this — template copy is not a substitute for review by qualified counsel. */
export function LegalDisclaimer() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
      This is template policy language, not legal advice. Have it reviewed by a lawyer familiar with UAE
      consumer protection and e-commerce rules before this business goes live.
    </div>
  );
}
