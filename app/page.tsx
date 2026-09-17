"use client";

import * as React from "react";
import {
  Navbar,
  HeroSection,
  ShopByCategory,
  SameDayPrinting,
  HowItWorks,
  BusinessEssentials,
  BestSellers,
  ExploreCategories,
  Testimonials,
  WhyChooseUs,
  QuoteBanner,
  HireDesignerBanner,
  RecentlyViewed,
  HandpickedForYou,
  SupportBanner,
  NewsletterBand,
  Footer,
  ProofModal,
} from "@/components/sections";
import { toast } from "@/components/ui/toast";

export default function Home() {
  const [isProofModalOpen, setIsProofModalOpen] = React.useState(false);

  const handleOpenProof = () => {
    setIsProofModalOpen(true);
  };

  const handleRequestSample = () => {
    toast.success("Sample Swatch Kit Dispatched", {
      description:
        "Your tactile box including 18 substrates and foil swatches is in transit.",
      action: {
        label: "Track",
        onClick: () => console.log("Tracking sample kit"),
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-black/10 selection:text-black">
      <Navbar />

      <main>
        <HeroSection onOpenProof={handleOpenProof} onRequestSample={handleRequestSample} />
        <ShopByCategory />
        <SameDayPrinting />
        <HowItWorks />
        <BusinessEssentials />
        <BestSellers />
        <ExploreCategories />
        <Testimonials />
        <WhyChooseUs />
        <QuoteBanner />
        <HireDesignerBanner />
        <RecentlyViewed />
        <HandpickedForYou />
        <SupportBanner />
        <NewsletterBand />
      </main>

      <Footer />

      <ProofModal open={isProofModalOpen} onOpenChange={setIsProofModalOpen} />
    </div>
  );
}
