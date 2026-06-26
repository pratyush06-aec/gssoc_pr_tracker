import React from "react";
import Image from "next/image";

export interface LandingHeroProps {}

export function LandingHero({}: Readonly<LandingHeroProps>) {
  return (
    <section className="min-h-[80vh] flex items-center border-b border-whisper-border bg-gradient-radial from-whisper-border/20 to-transparent bg-[size:24px_24px]">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-6 w-full py-16">
        <div className="md:col-span-7 flex flex-col justify-center gap-8">
          <span className="font-mono text-[11px] text-primary tracking-widest uppercase font-bold">
            Ecosystem V4.0
          </span>
          <h1 className="font-display text-5xl md:text-[48px] text-on-background max-w-2xl font-extrabold leading-[1.1] tracking-tight">
            Track your <span className="text-primary">open-source</span> journey with surgical precision.
          </h1>
          <p className="font-sans text-base text-muted-steel max-w-xl leading-[1.6]">
            The ultimate analytical dashboard for GSSoC contributors. Monitor PRs, validate scores, and scale the leaderboard through a clinical, high-performance interface.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-primary-deep transition-colors active:translate-y-px">
              Start Tracking
            </button>
            <button className="border border-whisper-border text-on-surface px-8 py-4 rounded-lg font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-pure-surface transition-colors active:translate-y-px">
              Documentation
            </button>
          </div>
        </div>
        <div className="md:col-span-5 relative mt-12 md:mt-0">
          <div className="aspect-square w-full bg-canvas-night/5 border border-whisper-border overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <Image
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
              src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
              alt="Dashboard Preview"
              width={500}
              height={500}
              unoptimized
            />
          </div>
          {/* Decorative Element */}
          <div className="absolute -bottom-6 -left-6 bg-white border border-whisper-border p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hidden md:block rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-[11px] text-on-surface font-bold uppercase">LIVE FEED</span>
            </div>
            <div className="h-1 w-32 bg-whisper-border rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
