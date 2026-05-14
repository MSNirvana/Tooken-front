import { CtaBanner } from "@/components/home/CtaBanner";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ModelsMarquee } from "@/components/home/ModelsMarquee";
import { RoutingDemo } from "@/components/home/RoutingDemo";
import { TickerBar } from "@/components/home/TickerBar";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TickerBar />
      <RoutingDemo />
      <ModelsMarquee />
      <FeaturesSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
