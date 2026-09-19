import {
  Navbar,
  HeroSection,
  ShopByCategory,
  HowItWorks,
  BusinessEssentials,
  BestSellers,
  ExploreCategories,
  Testimonials,
  InspirationBanner,
  RecentlyViewed,
  HandpickedForYou,
  FoodPackaging,
  SupportBanner,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-brand-blue selection:text-black">
      <Navbar />

      <main>
        <HeroSection />
        <ShopByCategory />
        <HowItWorks />
        <BusinessEssentials />
        <BestSellers />
        <ExploreCategories />
        <FoodPackaging />
        <Testimonials />
        <InspirationBanner />
        <RecentlyViewed />
        <HandpickedForYou />
        <SupportBanner />
      </main>

      <Footer />
    </div>
  );
}
