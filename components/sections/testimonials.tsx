import * as React from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    name: "Ananya Rao",
    role: "Founder, Loop Coffee Co.",
    quote:
      "The digital proof caught a bleed issue before it ever hit press. Our labels arrived exactly as designed — first try, no reprints.",
  },
  {
    name: "Vikram Shah",
    role: "Ops Lead, Fernweh Apparel",
    quote:
      "We reorder mailer boxes every six weeks now. Same box, same quality, and WhatsApp support answers faster than most of our vendors' email.",
  },
  {
    name: "Meera Iyer",
    role: "Studio Manager, Ink & Iris",
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
    <section className="bg-[#FAFAF9] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="mb-10 max-w-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111]">
            What customers say
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-2xl border border-[#E5E5E5] bg-white p-6"
            >
              <div className="mb-3 flex gap-0.5 text-black">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-neutral-700">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  {initials(testimonial.name)}
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{testimonial.name}</p>
                  <p className="text-xs text-neutral-500">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
