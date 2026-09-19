import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalH2,
  LegalP,
  LegalList,
  LegalDisclaimer,
} from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Outprint",
  description: "Production timelines, shipping coverage and tracking for Outprint orders.",
};

export default function ShippingDeliveryPage() {
  return (
    <LegalPageLayout title="Shipping & Delivery" lastUpdated="17 September 2026">
      <LegalDisclaimer />

      <LegalH2>Coverage</LegalH2>
      <LegalP>
        We ship across the United Arab Emirates, covering all 7 Emirates: Dubai, Abu Dhabi, Sharjah, Ajman,
        Ras Al Khaimah, Fujairah, and Umm Al Quwain. For GCC or international shipments outside the UAE,
        please message our team on WhatsApp before ordering.
      </LegalP>

      <LegalH2>Production time</LegalH2>
      <LegalP>
        Most orders are produced in 2–5 business days after you approve the digital proof, depending on the
        product and quantity — the estimate for your specific product is shown on its page (see &quot;Ships
        in&quot;). Same-day and express rush production is available on selected items.
      </LegalP>

      <LegalH2>Shipping time</LegalH2>
      <LegalP>
        Once dispatched, delivery typically takes 1–2 business days across the UAE, with same-day express
        courier options available within Dubai. Total time from order confirmation to delivery is production
        time plus courier transit.
      </LegalP>

      <LegalH2>Tracking &amp; updates</LegalH2>
      <LegalP>
        We send order status updates — proof approval, production start, dispatch, and tracking details —
        directly over WhatsApp. No account or login is needed to track your order.
      </LegalP>

      <LegalH2>Delays</LegalH2>
      <LegalList>
        <li>Custom sizes, complex finishes, and large quantities can extend production time.</li>
        <li>Courier delays, weather, and regional disruptions are outside our control.</li>
        <li>We&apos;ll flag any expected delay to you on WhatsApp as soon as we know about it.</li>
      </LegalList>

      <LegalH2>Delivery address accuracy</LegalH2>
      <LegalP>
        Please double-check the shipping address you provide over WhatsApp. We aren&apos;t responsible for
        delays or non-delivery caused by an incorrect or incomplete address.
      </LegalP>

      <LegalH2>Contact us</LegalH2>
      <LegalP>
        For a shipping estimate before you order, or an update on an order in progress, message us on
        WhatsApp or email bd@outriftmedia.com.
      </LegalP>
    </LegalPageLayout>
  );
}
