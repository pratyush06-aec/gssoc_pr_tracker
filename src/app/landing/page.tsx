import React from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingProtocol } from "@/components/landing/LandingProtocol";
import { LandingScoring } from "@/components/landing/LandingScoring";
import { HomeFooter } from "@/components/home/HomeFooter";

export default function LandingPage() {
  return (
    <div className="bg-[#FAFAFA] font-sans text-[#1a1c1c] min-h-screen flex flex-col">
      <LandingNavbar />
      
      <main className="pt-16 flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingProtocol />
        <LandingScoring />

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="bg-canvas-night text-white p-16 flex flex-col md:flex-row justify-between items-center gap-6 rounded-xl">
              <div className="text-center md:text-left">
                <h2 className="font-display text-[32px] font-bold mb-2">Ready to initiate?</h2>
                <p className="text-muted-steel font-sans text-base">Join 5,000+ contributors already tracking their growth.</p>
              </div>
              <Link 
                href="/"
                className="bg-primary text-white px-10 py-5 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-primary-deep active:translate-y-px transition-all"
              >
                Authenticate Registry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="bg-white">
        <HomeFooter />
      </div>
    </div>
  );
}
