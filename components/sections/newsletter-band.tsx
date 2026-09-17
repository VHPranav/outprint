"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { toast } from "@/components/ui/toast";

export function NewsletterBand() {
  const [email, setEmail] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're on the list", {
      description: "Your 10% off code is on its way to your inbox.",
    });
    setEmail("");
  }

  return (
    <section className="bg-black py-14 sm:py-16">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center sm:px-8">
        <h2 className="font-serif text-2xl font-normal tracking-tight text-white sm:text-3xl">
          Get 10% off your first order
        </h2>
        <p className="text-sm text-white/70">
          Join our list for early access to new products and occasional discount codes.
        </p>

        <form onSubmit={handleSubmit} className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-12 w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-white/40"
          />
          <button
            type="submit"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            Subscribe
            <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </Reveal>
    </section>
  );
}
