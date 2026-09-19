import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalH2,
  LegalP,
  LegalList,
  LegalDisclaimer,
} from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Returns & Refund Policy | Outprint",
  description: "How Outprint handles defects, damage, and reprints on custom print orders.",
};

export default function ReturnsReprintsPage() {
  return (
    <LegalPageLayout title="Returns & Refund Policy" lastUpdated="17 September 2026">
      <LegalDisclaimer />

      <LegalP>
        Every item we print is custom-made to your specifications and approved by you at the digital-proof
        stage, so — as with most made-to-order print and packaging — we generally can&apos;t accept returns
        for &quot;change of mind&quot; once production has started. This policy covers what we do instead when
        something goes wrong on our end.
      </LegalP>

      <LegalH2>The digital proof is your checkpoint</LegalH2>
      <LegalP>
        Before anything goes to press, we send a free digital proof for you to review and approve on
        WhatsApp. Please check shape, size, colors, text and image quality carefully — approving the proof
        confirms it&apos;s correct. Once approved, we&apos;re not able to make changes without a reprint charge.
      </LegalP>

      <LegalH2>What&apos;s covered</LegalH2>
      <LegalList>
        <li>The product doesn&apos;t match the artwork or specifications you approved in the proof.</li>
        <li>Manufacturing defects — print quality, material, or finishing faults.</li>
        <li>Damage that occurred in transit.</li>
      </LegalList>
      <LegalP>In any of these cases, we&apos;ll reprint your order at no cost, or refund it, at our discretion.</LegalP>

      <LegalH2>What&apos;s not covered</LegalH2>
      <LegalList>
        <li>Errors in artwork, text, or sizing that were present in the proof you approved.</li>
        <li>Color variation within normal printing tolerance across different screens and print runs.</li>
        <li>Low-resolution artwork you supplied and were warned about at upload (unless you purchased the resolution-enhancement add-on and it wasn&apos;t applied).</li>
        <li>Change of mind after approving the proof or after production has started.</li>
      </LegalList>

      <LegalH2>How to report an issue</LegalH2>
      <LegalP>
        Message us on WhatsApp within 7 days of delivery with your order details and clear photos of the
        issue. We&apos;ll review and get back to you with a resolution — reprint, partial refund, or full
        refund — usually within 2 business days.
      </LegalP>

      <LegalH2>Refund timing</LegalH2>
      <LegalP>
        Approved refunds are issued to your original payment method and typically reflect within 5–7 business
        days, depending on your bank or payment provider.
      </LegalP>

      <LegalH2>Contact us</LegalH2>
      <LegalP>To start a claim, message us on WhatsApp or email bd@outriftmedia.com with your order details.</LegalP>
    </LegalPageLayout>
  );
}
