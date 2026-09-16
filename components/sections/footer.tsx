import * as React from "react";
import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { getCategoryTree } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { InstagramIcon, XIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/brand-icons";

const socialLinks = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Hire a Designer", href: "/hire-a-designer" },
  { label: "Contact", href: "#" },
];

const supportLinks = [
  { label: "Shipping & Delivery", href: "#" },
  { label: "Returns & Reprints", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

function getWhatsAppHref(): string | null {
  try {
    return buildWhatsAppLink({ type: "general-inquiry" });
  } catch {
    return null;
  }
}

export function Footer() {
  const topLevelCategories = getCategoryTree();
  const whatsappHref = getWhatsAppHref();

  return (
    <footer className="border-t border-[#E5E5E5] bg-[#FAFAF9]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-logo font-bold text-4xl leading-none text-black">
              Outprint
            </span>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-neutral-500">
              Bespoke print & packaging, engineered for the modern digital era.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] text-neutral-600 transition-colors hover:border-black hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              {topLevelCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-neutral-600 hover:text-black transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <span>Mumbai, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                <span>hello@outprint.co</span>
              </li>
            </ul>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-black px-4 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E5E5E5] pt-8 text-xs text-neutral-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Outprint Studio Inc. All rights reserved.</span>
          <span>FSC® C104284 · ISO 12647-2</span>
        </div>
      </div>
    </footer>
  );
}
