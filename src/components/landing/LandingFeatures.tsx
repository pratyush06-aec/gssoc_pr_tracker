import React from "react";
import { LANDING_FEATURES } from "@/data/mockData";
import { RefreshCcw, ShieldCheck, Trophy, ArrowRight } from "lucide-react";

export interface LandingFeaturesProps {}

export function LandingFeatures({}: Readonly<LandingFeaturesProps>) {
  return (
    <section className="py-16 max-w-[1200px] mx-auto px-8">
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-display text-3xl font-bold mb-2 text-on-background">System Capabilities</h2>
        <p className="text-muted-steel font-sans text-base">Engineered for contributors who demand transparency.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1 (8 cols) */}
        <div className="md:col-span-8 bg-white border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group flex flex-col justify-between">
          <div>
            <RefreshCcw className="text-primary mb-4 w-8 h-8" />
            <h3 className="font-display text-[32px] font-bold mb-2 leading-[1.2]">{LANDING_FEATURES[0].title}</h3>
            <p className="text-muted-steel max-w-md font-sans leading-[1.6]">
              {LANDING_FEATURES[0].desc}
            </p>
          </div>
          <div className="mt-16 pt-4 border-t border-whisper-border flex justify-between items-center">
            <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">
              {LANDING_FEATURES[0].latency}
            </span>
            <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform w-5 h-5" />
          </div>
        </div>

        {/* Card 2 (4 cols) */}
        <div className="md:col-span-4 bg-white border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
          <ShieldCheck className="text-primary mb-4 w-8 h-8" />
          <h3 className="font-display text-[32px] font-bold mb-2 leading-[1.2]">{LANDING_FEATURES[1].title}</h3>
          <p className="text-muted-steel font-sans leading-[1.6]">
            {LANDING_FEATURES[1].desc}
          </p>
          <div className="mt-16 pt-4 border-t border-whisper-border">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-whisper-border"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-whisper-border"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-whisper-border"></div>
            </div>
          </div>
        </div>

        {/* Card 3 (full width) */}
        <div className="md:col-span-12 bg-white border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-6 group">
          <div className="flex-1">
            <Trophy className="text-primary mb-4 w-8 h-8" />
            <h3 className="font-display text-[32px] font-bold mb-2 leading-[1.2]">{LANDING_FEATURES[2].title}</h3>
            <p className="text-muted-steel max-w-xl font-sans leading-[1.6]">
              {LANDING_FEATURES[2].desc}
            </p>
          </div>
          <div className="flex-1 w-full bg-canvas-night/5 rounded-lg p-4 border border-whisper-border">
            <div className="space-y-2">
              {LANDING_FEATURES[2].leaderboard?.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between items-center p-2 bg-white border border-whisper-border ${index === 1 ? 'opacity-70' : index === 2 ? 'opacity-50' : ''}`}
                >
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">
                    0{index + 1}. {item.user}
                  </span>
                  <span className={`font-mono text-[12px] font-bold ${index === 0 ? 'text-primary' : 'text-on-surface'}`}>
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
