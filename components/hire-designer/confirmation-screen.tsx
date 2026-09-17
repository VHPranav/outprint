import Link from "next/link";
import { MessageCircle, RotateCcw, Home } from "lucide-react";
import { RESPONSE_TIME_HOURS } from "@/data/hire-designer";

interface ConfirmationScreenProps {
  waLink: string;
  onReset: () => void;
}

export function ConfirmationScreen({ waLink, onReset }: ConfirmationScreenProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-[#E5E5E5] bg-white px-6 py-16 text-center sm:px-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2F9F5] text-[#0B5D3B]">
        <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
      </span>
      <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-[#111111]">
        We&apos;ve prepared your request
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
        Send it on WhatsApp to get matched with a designer. Our team typically responds within{" "}
        {RESPONSE_TIME_HOURS} business hours.
      </p>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        <MessageCircle className="h-4 w-4" />
        Open WhatsApp
      </a>

      <p className="mt-3 text-xs text-neutral-400">
        Didn&apos;t open automatically? The button above will launch it.
      </p>

      <div className="mt-8 flex items-center gap-5 border-t border-[#F0F0EE] pt-6 text-sm">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 font-medium text-neutral-600 transition-colors hover:text-black"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Start a new request
        </button>
        <Link
          href="/"
          className="flex items-center gap-1.5 font-medium text-neutral-600 transition-colors hover:text-black"
        >
          <Home className="h-3.5 w-3.5" />
          Back to Outprint
        </Link>
      </div>
    </div>
  );
}
