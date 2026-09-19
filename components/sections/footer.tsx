import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { getCategoryTree } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { InstagramIcon, ThreadsIcon, FacebookIcon } from "@/components/ui/brand-icons";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/outprint.ae/", Icon: InstagramIcon },
  { label: "Threads", href: "https://www.threads.com/@outprint.ae", Icon: ThreadsIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594255807019", Icon: FacebookIcon },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Hire a Designer", href: "/hire-a-designer" },
  { label: "Contact", href: "#" },
];

const supportLinks = [
  { label: "Shipping & Delivery", href: "/shipping-delivery" },
  { label: "Returns & Reprints", href: "/returns-reprints" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
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
    <footer className="border-t border-neutral-200 bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Outprint"
                width={142}
                height={40}
                className="h-8 w-auto object-contain sm:h-9"
              />
            </Link>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-neutral-700">
              Bespoke print & packaging, engineered for the modern digital era.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-neutral-800 transition-colors hover:border-black hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-900">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              {topLevelCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-neutral-700 hover:text-black transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-900">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-700 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-xs font-medium uppercase tracking-wider text-neutral-900">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-700 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
                <span>United Arab Emirates</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
                <span>bd@outriftmedia.com</span>
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-xs text-neutral-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Outprint Studio Inc. All rights reserved.</span>
          <span>FSC® C104284 · ISO 12647-2</span>
        </div>
      </div>
    </footer>
  );
}
