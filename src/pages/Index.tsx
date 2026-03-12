import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandSlider from "@/components/BrandSlider";
import TechExpertiseSection from "@/components/TechExpertiseSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TakeChargeSection from "@/components/TakeChargeSection";
import EmpoweringSection from "@/components/EmpoweringSection";
import PortfolioSection from "@/components/PortfolioSection";
import FullWidthImage from "@/components/FullWidthImage";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ExperienceCTA from "@/components/ExperienceCTA";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GiftBoxPopup from "@/components/GiftBoxPopup";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BrandSlider />
      <AboutSection />
      <TakeChargeSection />
      <EmpoweringSection />
      <TechExpertiseSection />
      <PortfolioSection />
      <ServicesSection />
      <FullWidthImage />
      <TestimonialsSection />
      <LeadCaptureForm />
      <FAQSection />
      <ExperienceCTA />
      <BlogSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
