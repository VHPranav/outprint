import * as React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Karan Mehta",
    role: "Verified Buyer",
    rating: 5,
    quote:
      "Colors matched the digital proof exactly. Ordered a second batch the following week.",
  },
  {
    name: "Sneha Kapoor",
    role: "Verified Buyer",
    rating: 5,
    quote: "Fast turnaround and the WhatsApp updates meant I always knew where my order was.",
  },
  {
    name: "Arjun Nair",
    role: "Verified Buyer",
    rating: 4,
    quote: "Good quality for the price. Would like a couple more material options next time.",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function ProductReviews() {
  const average = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h2 className="font-serif text-2xl font-normal tracking-tight text-[#111111]">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-1 text-sm text-neutral-600">
          <Star className="h-4 w-4 fill-current text-black" />
          <span className="font-medium text-neutral-900">{average}</span>
          <span className="text-neutral-400">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                  {initials(review.name)}
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{review.name}</p>
                  <p className="text-xs text-neutral-500">{review.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 text-black">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : "text-neutral-200"}`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{review.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
