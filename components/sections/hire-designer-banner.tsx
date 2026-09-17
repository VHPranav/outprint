import * as React from "react";
import Link from "next/link";
import { Palette, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function HireDesignerBanner() {
  return (
    <section className="bg-black py-20 text-white sm:py-28">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:px-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white">
          <Palette className="h-5 w-5" />
        </span>
        <h2 className="max-w-2xl font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Don&apos;t have artwork ready? Hire a designer.
        </h2>
        <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
          Our in-house design studio turns a rough idea, a logo, or even just a vibe into
          print-ready artwork — for stickers, packaging, cards or a full brand system.
        </p>
        <Link
          href="/hire-a-designer"
          className="group mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
        >
          Hire a Designer
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
