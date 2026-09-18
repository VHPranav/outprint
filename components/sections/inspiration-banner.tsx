import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function InspirationBanner() {
  return (
    <section className="relative overflow-hidden bg-black">
      <Image
        src="/images/3.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

      <Reveal className="relative mx-auto w-[90%] max-w-[1400px] py-20 sm:py-28">
        <h2 className="max-w-lg text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Searching for inspiration?
        </h2>
        <p className="mt-3 max-w-md text-lg text-white/90">We&apos;ve got you covered.</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
          From branding to packaging, our design team can turn a rough idea or a logo into
          print-ready artwork.
        </p>
        <Link
          href="/hire-a-designer"
          className="mt-7 inline-flex h-11 items-center rounded-lg bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Hire a Designer
        </Link>
      </Reveal>
    </section>
  );
}
