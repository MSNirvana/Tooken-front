import { CtaBanner } from "@/components/home/CtaBanner";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ModelsMarquee } from "@/components/home/ModelsMarquee";
import { PricingSection } from "@/components/home/PricingSection";
import { RoutingDemo } from "@/components/home/RoutingDemo";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TickerBar } from "@/components/home/TickerBar";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TickerBar />
      <FeaturesSection />
      <ModelsMarquee />
      <RoutingDemo />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
