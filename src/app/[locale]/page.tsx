/**
 * @file app/page.tsx
 * @description ORAX landing page — all 12 sections.
 * Note: CustomCursor is in root layout — no need here.
 * ScrollUI (progress bar + back-to-top) is only on landing page.
 */

import type { Metadata } from "next";
import FAQ from "@/components/sections/faq";
import FeaturesBento from "@/components/sections/features-bento";
import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";
import HeroSection from "@/components/sections/hero";
import Navbar from "@/components/sections/navbar";
import Pricing from "@/components/sections/pricing";
import ScrollUI from "@/components/shared/scroll-ui";

export const metadata: Metadata = {
  title: "Home | ORAX",
  description:
    "ORAX is a serious SaaS starter system built for Arabic and RTL product.",
};

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
