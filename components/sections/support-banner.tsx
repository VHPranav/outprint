import * as React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] border-none bg-neutral-100 sm:grid-cols-2">
          <div className="relative order-2 aspect-[4/3] w-full sm:order-1 sm:aspect-auto sm:h-full sm:min-h-[280px]">
            <Image src="/images/6.webp" alt="Our support team" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>

          <div className="order-1 flex flex-col items-start gap-3 p-8 sm:order-2 sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h2 className="font-serif text-2xl font-normal tracking-tight text-[#111111] sm:text-3xl">
              Support at your fingertips
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Questions about sizing, materials or an order in progress? Our team replies on
              WhatsApp — usually within minutes.
            </p>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-[#111111] px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Contact Us
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
