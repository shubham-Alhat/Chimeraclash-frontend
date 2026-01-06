"use client";
import type { JSX } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
