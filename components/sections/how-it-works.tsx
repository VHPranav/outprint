import { PackageSearch, PenTool, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    icon: PackageSearch,
    title: "Select Your Product",
    description: "Pick a product and configure shape, size, quantity and material — pricing updates live.",
  },
  {
    icon: PenTool,
    title: "Create Your Design",
    description: "Upload your own artwork, pick a template, design it yourself, or hire our design team.",
  },
  {
    icon: MessageCircle,
    title: "Send Your Order",
    description: "One tap sends your configuration and artwork to our team on WhatsApp — no checkout forms.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1600px]">
        <Reveal className="mb-12 flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Our Process
          </span>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111111]">
            Simple 3-Step Process
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          <div
            aria-hidden
            className="absolute left-[16.5%] right-[16.5%] top-6 hidden border-t border-dashed border-neutral-300 sm:block"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.08} className="relative">
                <div className="flex flex-col items-center rounded-[28px] border-none bg-white p-7 text-center shadow-card">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black font-serif text-lg text-white ring-4 ring-[#FAFAF9]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
