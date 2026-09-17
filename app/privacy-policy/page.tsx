import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalH2,
  LegalP,
  LegalList,
  LegalDisclaimer,
} from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | Outprint",
  description: "How Outprint collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="17 September 2026">
      <LegalDisclaimer />

      <LegalP>
        Outprint (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what information we
        collect when you use outprint.co, why we collect it, and how it&apos;s handled. We don&apos;t run
        accounts or a checkout on this site — every order is confirmed with a real person over WhatsApp, so
        we collect far less than a typical online store.
      </LegalP>

      <LegalH2>Information we collect</LegalH2>
      <LegalList>
        <li>
          <strong>Configuration &amp; cart data</strong> — the product options, quantities and prices you
          select. This is stored only in your browser&apos;s local storage on your own device, not on our
          servers.
        </li>
        <li>
          <strong>Uploaded artwork &amp; references</strong> — images, logos or reference files you upload
          through the configurator, design studio, or hire-a-designer form. These are stored with our
          image hosting provider, Cloudinary, and linked to from your device.
        </li>
        <li>
          <strong>Contact details</strong> — name and phone number or email, only when you choose to submit
          an order or request via WhatsApp, or fill in the hire-a-designer form.
        </li>
        <li>
          <strong>Basic usage data</strong> — standard server logs (page requests, browser type, approximate
          location from IP) collected by our hosting provider for security and reliability.
        </li>
      </LegalList>

      <LegalH2>How we use it</LegalH2>
      <LegalP>
        We use this information solely to quote, produce, proof, and ship your order, to respond to design
        requests, and to keep the site working correctly. We do not sell your information, and we do not run
        third-party advertising trackers on this site.
      </LegalP>

      <LegalH2>Cookies &amp; local storage</LegalH2>
      <LegalP>
        We use your browser&apos;s local storage to remember your cart and any design you&apos;ve attached, so
        it survives a page refresh — this data stays on your device and is never synced to an account. We
        don&apos;t use third-party advertising or analytics cookies.
      </LegalP>

      <LegalH2>Third-party services</LegalH2>
      <LegalList>
        <li>
          <strong>WhatsApp Business</strong> — order details and messages you choose to send are handled
          according to WhatsApp&apos;s own privacy policy once they leave our site.
        </li>
        <li>
          <strong>Cloudinary</strong> — hosts uploaded artwork and reference files.
        </li>
      </LegalList>

      <LegalH2>Data retention</LegalH2>
      <LegalP>
        Cart and design-attachment data lives in your browser until you clear it or your browser does.
        Uploaded files and order conversations are retained only as long as needed to fulfill your order and
        meet our accounting and legal obligations.
      </LegalP>

      <LegalH2>Your rights</LegalH2>
      <LegalP>
        You can clear your cart and browser storage at any time from your browser settings. To request a copy
        or deletion of any information you&apos;ve shared with us directly (e.g. over WhatsApp), contact us
        using the details below.
      </LegalP>

      <LegalH2>Contact us</LegalH2>
      <LegalP>Questions about this policy? Reach us at hello@outprint.co or via the WhatsApp button on this site.</LegalP>
    </LegalPageLayout>
  );
}
