import { PackageSearch, PenTool, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HomeSectionTitle } from "./home-tiles";

const STEPS = [
  {
    icon: PackageSearch,
    title: "Select Your Product",
    description: "Pick a product and configure shape, size, quantity and material.",
  },
  {
    icon: PenTool,
    title: "Create Your Design",
    description: "Upload your artwork, pick a template, design it online or hire our team.",
  },
  {
    icon: MessageCircle,
    title: "Place Your Order",
    description: "One tap sends your configuration to our team on WhatsApp — no checkout forms.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-blue py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle
            eyebrow="Our Process"
            title="Simple 3 Steps Process"
            subtitle="From idea to doorstep in three easy steps."
            align="center"
          />
        </Reveal>

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          <div
            aria-hidden
            className="absolute left-[16.5%] right-[16.5%] top-6 hidden border-t-2 border-dashed border-black/30 sm:block"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 0.08} className="relative flex flex-col items-center">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-medium text-white ring-4 ring-brand-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-5 w-full rounded-3xl bg-white p-4 text-center shadow-card">
                  <div className="flex h-28 items-center justify-center rounded-2xl bg-brand-blue text-neutral-900">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-neutral-900">{step.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-xs pb-2 text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
