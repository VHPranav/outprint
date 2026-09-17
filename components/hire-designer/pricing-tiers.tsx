import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_TIERS } from "@/data/hire-designer";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface PricingTiersProps {
  requestHrefFor: (tierId: string) => string;
}

export function PricingTiers({ requestHrefFor }: PricingTiersProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-8">
      <Reveal className="mb-12 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B5D3B]">Pricing</span>
        <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
          One flat design fee. No surprise invoices.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Every tier ends the same way — a print-ready file and a straight line into production.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PRICING_TIERS.map((tier, index) => (
          <Reveal
            key={tier.id}
            delay={index * 0.08}
            className={cn(
              "relative flex flex-col rounded-3xl border p-7",
              tier.highlighted ? "border-[#0B5D3B] bg-[#F2F9F5]" : "border-[#E5E5E5] bg-white"
            )}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-7 rounded-full bg-[#0B5D3B] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                Most popular
              </span>
            )}
            <h3 className="font-serif text-2xl text-neutral-900">{tier.name}</h3>
            <p className="mt-1 text-sm text-neutral-500">{tier.tagline}</p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-serif text-4xl text-neutral-900">{formatCurrency(tier.price)}</span>
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
              {tier.turnaround}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B5D3B]" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={requestHrefFor(tier.id)}
              className={cn(
                "mt-7 flex h-11 items-center justify-center rounded-full text-sm font-medium transition-colors",
                tier.highlighted
                  ? "bg-[#0B5D3B] text-white hover:bg-[#084C30]"
                  : "bg-black text-white hover:bg-neutral-800"
              )}
            >
              Choose {tier.name}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
