import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buildWhatsAppLink } from "@/lib/whatsapp";

function getWhatsAppHref(): string | null {
  try {
    return buildWhatsAppLink({ type: "general-inquiry" });
  } catch {
    return null;
  }
}

export function QuoteBanner() {
  const whatsappHref = getWhatsAppHref();

  return (
    <section className="bg-neutral-100 py-14 sm:py-16">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center sm:px-8">
        <h2 className="font-serif text-2xl font-normal tracking-tight text-[#111111] sm:text-3xl">
          Need a Customized Printing Quote?
        </h2>
        <p className="text-sm text-neutral-600">
          Tell us what you need and get a quote that fits — no account, no forms.
        </p>
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        )}
      </Reveal>
    </section>
  );
}
