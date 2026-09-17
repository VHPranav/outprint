import Image from "next/image";
import { DESIGNERS } from "@/data/hire-designer";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function DesignerGrid() {
  return (
    <section className="bg-[#FAFAF9] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B5D3B]">The studio</span>
          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#111111] sm:text-4xl">
            Meet a few of the people you might work with.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            We match your brief to whoever&apos;s the best fit — not whoever&apos;s next in the queue.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESIGNERS.map((designer, index) => (
            <Reveal
              key={designer.id}
              delay={index * 0.08}
              className="group overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={designer.portfolioImage}
                  alt={`Sample work by ${designer.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start gap-3 p-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image src={designer.photo} alt={designer.name} fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">{designer.name}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {designer.specialties.map((tag) => (
                      <Badge key={tag} variant="muted" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <p className="px-5 pb-5 text-xs leading-relaxed text-neutral-500">{designer.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
