import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalH2,
  LegalP,
  LegalList,
  LegalDisclaimer,
} from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service | Outprint",
  description: "The terms that govern using Outprint and ordering custom print & packaging.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="17 September 2026">
      <LegalDisclaimer />

      <LegalP>
        These terms govern your use of outprint.co and any order you place with Outprint Studio (&quot;we&quot;,
        &quot;us&quot;). By configuring a product, uploading artwork, or sending an order through this site, you
        agree to them.
      </LegalP>

      <LegalH2>What this site does</LegalH2>
      <LegalP>
        Outprint lets you configure custom print and packaging products, attach artwork, and get instant
        indicative pricing. No payment is collected on this site. Submitting a configuration opens a WhatsApp
        message to our team, who confirm final pricing, specifications and payment with you directly before
        any production begins.
      </LegalP>

      <LegalH2>Quotes &amp; pricing</LegalH2>
      <LegalP>
        Prices shown on the site are indicative, calculated from the options you select. They are not a final
        invoice. Final price, taxes, and shipping are confirmed by our team over WhatsApp before your order is
        accepted, and may vary from the on-site estimate — for example if custom sizing, uploaded artwork, or
        the resolution-enhancement service require adjustment.
      </LegalP>

      <LegalH2>Artwork &amp; intellectual property</LegalH2>
      <LegalList>
        <li>You retain ownership of any artwork, logo, or design file you upload.</li>
        <li>
          You confirm you have the right to use and reproduce any artwork you submit, and that it doesn&apos;t
          infringe a third party&apos;s trademark, copyright, or other rights.
        </li>
        <li>
          Templates, clipart, and the design studio tooling provided on this site remain the property of
          Outprint Studio and are licensed to you only for creating your own order with us.
        </li>
      </LegalList>

      <LegalH2>Order confirmation &amp; production</LegalH2>
      <LegalP>
        An order is only confirmed once our team acknowledges it on WhatsApp and you approve the digital proof
        we send back. Production begins only after that approval. We are not responsible for errors in a
        design you approved at the proofing stage.
      </LegalP>

      <LegalH2>Limitation of liability</LegalH2>
      <LegalP>
        To the maximum extent permitted by law, Outprint Studio&apos;s liability for any claim relating to an
        order is limited to the amount you paid for that order. We are not liable for indirect or
        consequential losses.
      </LegalP>

      <LegalH2>Governing law</LegalH2>
      <LegalP>
        These terms are governed by the laws of India, and disputes are subject to the courts of Mumbai,
        Maharashtra.
      </LegalP>

      <LegalH2>Changes to these terms</LegalH2>
      <LegalP>
        We may update these terms from time to time. Continued use of the site after a change means you
        accept the updated terms.
      </LegalP>

      <LegalH2>Contact us</LegalH2>
      <LegalP>Questions about these terms? Reach us at hello@outprint.co or via the WhatsApp button on this site.</LegalP>
    </LegalPageLayout>
  );
}
