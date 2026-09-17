import { MessageSquareText, UserCheck, MessageCircle, PackageCheck, type LucideIcon } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/data/hire-designer";
import { Reveal } from "@/components/ui/reveal";

const ICONS: Record<string, LucideIcon> = {
  MessageSquareText,
  UserCheck,
  MessageCircle,
  PackageCheck,
};

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-8">
      <Reveal className="mb-12 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0B5D3B]">How it works</span>
        <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
          From idea to print, with a real person in the loop.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = ICONS[step.icon];
          return (
            <Reveal key={step.title} delay={index * 0.08} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F9F5] text-[#0B5D3B]">
                {Icon && <Icon className="h-5 w-5" strokeWidth={1.75} />}
              </div>
              <span className="mt-4 block font-serif text-2xl text-neutral-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-base font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{step.description}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
