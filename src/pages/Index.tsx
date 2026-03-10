import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandSlider from "@/components/BrandSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TakeChargeSection from "@/components/TakeChargeSection";
import EmpoweringSection from "@/components/EmpoweringSection";
import PortfolioSection from "@/components/PortfolioSection";
import FullWidthImage from "@/components/FullWidthImage";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BrandSlider />
      <AboutSection />
      <TakeChargeSection />
      <EmpoweringSection />
      <PortfolioSection />
      <FullWidthImage />
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
