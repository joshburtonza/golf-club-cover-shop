import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGallery from "@/components/ProductGallery";
import BrandStory from "@/components/BrandStory";
import Pricing from "@/components/Pricing";
import ComparisonTable from "@/components/ComparisonTable";
import TrustBadges from "@/components/TrustBadges";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen pt-16">
      <Header />
      <Hero />
      <ProductGallery />
      <BrandStory />
      <Pricing />
      <ComparisonTable />
      <TrustBadges />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
