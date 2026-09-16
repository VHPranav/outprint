import * as React from "react";
import { Users, FileCheck, Truck, MessageCircle } from "lucide-react";

const stats = [
  { icon: Users, label: "Trusted by 1,200+ brands" },
  { icon: FileCheck, label: "Free digital design proof" },
  { icon: Truck, label: "Pan-India delivery" },
  { icon: MessageCircle, label: "WhatsApp order support" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[#E5E5E5] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-[#E5E5E5] sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
        {stats.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 px-4 py-5 text-center sm:justify-start sm:px-6"
          >
            <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
            <span className="text-[13px] font-medium text-neutral-700">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
