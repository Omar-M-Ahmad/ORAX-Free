/**
 * @file app/page.tsx
 * @description ORAX landing page — all 12 sections.
 * Note: CustomCursor is in root layout — no need here.
 * ScrollUI (progress bar + back-to-top) is only on landing page.
 */

import Navbar from "@/components/sections/navbar";
import ScrollUI from "@/components/shared/scroll-ui";
import HeroSection from "@/components/sections/hero";
import FeaturesBento from "@/components/sections/features-bento";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <ScrollUI />
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesBento />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
