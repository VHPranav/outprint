import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Type, ImageIcon, Shapes, Upload, Layers } from "lucide-react";
import { getProductBySlug } from "@/lib/catalog";

const EDITOR_TOOLS = [Type, ImageIcon, Shapes, Upload, Layers];

export function HeroSection() {
  const canvasProduct = getProductBySlug("premium-suede-business-cards");
  const floatProduct = getProductBySlug("unisex-heavy-weight-t-shirt");

  return (
    <section className="relative overflow-hidden bg-brand-blue pt-16 text-neutral-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-white/30"
      />

      <div className="relative mx-auto grid w-[90%] max-w-[1400px] items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.5rem]">
            Outprint : Print &amp; Packaging, Your Way
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-700 sm:text-lg">
            130+ print products in one place — browse templates, design online or upload your
            own artwork. Every order is confirmed by a real person on WhatsApp.
          </p>
          <Link
            href="#popular-categories"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Design &amp; Print Instantly
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Design-studio preview */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="overflow-hidden rounded-2xl bg-white shadow-elevated ring-1 ring-black/5">
            <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              </span>
              <span className="text-xs font-medium text-neutral-500">Design Studio</span>
              <span className="ml-auto rounded-md bg-black px-3 py-1 text-[11px] font-medium text-white">
                Export
              </span>
            </div>

            <div className="flex">
              <div className="flex w-12 shrink-0 flex-col items-center gap-3 border-r border-neutral-200 bg-white py-4 sm:w-14">
                {EDITOR_TOOLS.map((Icon, i) => (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      i === 0 ? "bg-brand-blue text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>

              <div className="flex-1 bg-brand-blue/40 p-4 sm:p-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/5">
                  {canvasProduct && (
                    <Image
                      src={canvasProduct.images[0]}
                      alt={canvasProduct.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 80vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 sm:p-5">
                    <p className="text-right text-2xl font-medium leading-tight text-white sm:text-3xl">
                      Do it
                      <br />
                      your way
                    </p>
                  </div>
                  <span className="absolute inset-3 rounded-lg border border-dashed border-white/70" />
                </div>
              </div>
            </div>
          </div>

          {floatProduct && (
            <div className="absolute -bottom-6 -left-3 hidden h-28 w-28 -rotate-6 overflow-hidden rounded-2xl border-4 border-white shadow-elevated sm:block lg:-left-8 lg:h-36 lg:w-36">
              <Image
                src={floatProduct.images[0]}
                alt=""
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
