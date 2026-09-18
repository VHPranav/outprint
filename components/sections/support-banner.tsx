import * as React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function getWhatsAppHref(): string | null {
  try {
    return buildWhatsAppLink({ type: "general-inquiry" });
  } catch {
    return null;
  }
}

export function SupportBanner() {
  const whatsappHref = getWhatsAppHref();

  return (
    <section className="bg-brand-blue">
      <Reveal className="grid grid-cols-1 items-stretch md:grid-cols-2">
        <div className="relative order-2 aspect-[16/9] w-full md:order-1 md:aspect-auto md:min-h-[320px]">
          <Image
            src="/images/6.webp"
            alt="Our support team"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 flex flex-col items-start justify-center gap-3 px-[5%] py-12 md:order-2 md:px-14 md:py-16">
          <h2 className="text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            Support at your fingertips
          </h2>
          <p className="text-base font-medium text-neutral-800">
            How to contact our Customer Service team
          </p>
          <p className="max-w-md text-sm leading-relaxed text-neutral-700">
            Questions about sizing, materials or an order in progress? Our team replies on
            WhatsApp — usually within minutes.
          </p>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-11 items-center rounded-lg bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Contact Us
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
