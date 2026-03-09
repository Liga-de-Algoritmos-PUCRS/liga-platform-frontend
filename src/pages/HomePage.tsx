import { HeroSection } from "@/components/home/HeroSection";
import { PurposeSection } from "@/components/home/PurposeSection";
import { TeamSection } from "@/components/home/TeamSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-svh bg-background">
      <HeroSection />
      <PurposeSection />
      <TeamSection />
      <FooterSection />
    </main>
  );
}