import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";

interface BentoCardProps {
  href: string;
  title: string;
  subtitle?: string;
  image: string;
  /** Large hero tile vs. a smaller supporting tile in the row below. */
  large?: boolean;
  /** Card background — grey reads as a product/merch tile, white as a category tile. */
  variant?: "grey" | "white";
  delay?: number;
}

/** Shared bento tile: header text over a floating, slightly rotated photo panel. */
export function BentoCard({ href, title, subtitle, image, large, variant = "grey", delay = 0 }: BentoCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={href}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
          variant === "white" ? "border border-[#E5E5E5] bg-white" : "bg-neutral-100"
        } ${large ? "min-h-[420px]" : "min-h-[320px]"}`}
      >
        <div className={large ? "p-8 pr-16 sm:p-10 sm:pr-20" : "p-7 pr-14"}>
          <h3 className={`font-serif tracking-tight text-[#111111] ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`mt-2 text-neutral-500 ${large ? "max-w-sm text-sm" : "max-w-[16rem] text-xs"}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`relative flex w-full items-center justify-center overflow-hidden ${
            large ? "h-56 sm:h-64" : "h-40"
          }`}
        >
          <div
            className={`absolute bottom-[-14px] w-[72%] -rotate-6 rounded-2xl border border-white bg-white p-1.5 shadow-elevated transition-transform duration-300 ease-out group-hover:-rotate-2 group-hover:scale-105 ${
              large ? "max-w-[320px]" : "max-w-[200px]"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-neutral-200">
              <Image src={image} alt={title} fill sizes={large ? "320px" : "200px"} className="object-cover" />
            </div>
          </div>
        </div>

        <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-neutral-700 shadow-card transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}
