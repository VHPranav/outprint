import * as React from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { HomeSectionTitle } from "./home-tiles";

const testimonials = [
  {
    name: "Ananya Rao",
    role: "Founder, Loop Coffee Co.",
    headline: "Right first time, no reprints",
    quote:
      "The digital proof caught a bleed issue before it ever hit press. Our labels arrived exactly as designed — first try, no reprints.",
  },
  {
    name: "Vikram Shah",
    role: "Ops Lead, Fernweh Apparel",
    headline: "Support that actually answers",
    quote:
      "We reorder mailer boxes every six weeks now. Same box, same quality, and WhatsApp support answers faster than most of our vendors' email.",
  },
  {
    name: "Meera Iyer",
    role: "Studio Manager, Ink & Iris",
    headline: "Better than the mockup",
    quote:
      "Hired their designer to rework our business cards from a rough sketch. Letterpress came out better than the mockup.",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function Testimonials() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <Reveal>
          <HomeSectionTitle
            title="Hear From Our Customers"
            subtitle="Real feedback from the founders and teams who print with us."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-medium text-neutral-900">
                    {initials(testimonial.name)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{testimonial.name}</p>
                    <p className="text-xs text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="mt-3 text-sm font-medium text-neutral-900">{testimonial.headline}</p>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
