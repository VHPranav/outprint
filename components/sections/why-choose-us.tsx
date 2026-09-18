import * as React from "react";
import { Timer, MessageCircle, ShieldCheck, Headset } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const FEATURES = [
  { icon: Timer, title: "Fast Turnaround", description: "Print. Pack. Done." },
  { icon: MessageCircle, title: "WhatsApp Quotes", description: "Fast, personal quotes." },
  { icon: ShieldCheck, title: "Superb Quality", description: "Quality you can trust." },
  { icon: Headset, title: "Best Support", description: "Always here to help." },
];

export function WhyChooseUs() {
  return (
    <section className="border-y border-[#E5E5E5] bg-white py-10">
      <div className="mx-auto grid w-[90%] max-w-[1600px] grid-cols-2 gap-6 sm:grid-cols-4">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={i * 0.05} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-900">{feature.title}</p>
                <p className="text-xs text-neutral-500">{feature.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
