import Features from "@/components/molecules/Features";
import Footer from "@/components/molecules/Footer";
import Hero from "@/components/molecules/Hero";
import LandingPageHeader from "@/components/molecules/LandingPageHeader";

export default function HomePage() {
  return (
    <div>
      <LandingPageHeader />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
