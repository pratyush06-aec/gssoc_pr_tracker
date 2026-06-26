import React from "react";
import { LANDING_SCORING } from "@/data/mockData";

export interface LandingScoringProps {}

export function LandingScoring({}: Readonly<LandingScoringProps>) {
  return (
    <section className="py-16 max-w-[1200px] mx-auto px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-[32px] font-bold mb-2 text-on-background leading-[1.2]">
          Point Allocation Matrix
        </h2>
        <p className="text-muted-steel font-sans text-base">Standardized scoring across all technical repositories.</p>
      </div>
      <div className="overflow-hidden border border-whisper-border rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-canvas-night/5 border-b border-whisper-border">
              <th className="px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">LEVEL</th>
              <th className="px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">PR STATUS</th>
              <th className="px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel text-right">POINTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-whisper-border">
            {LANDING_SCORING.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-white transition-transform duration-200 ease-out hover:translate-x-1"
              >
                <td className="px-8 py-4 font-display text-[16px] font-bold text-on-background">
                  {item.level}
                </td>
                <td className="px-8 py-4 text-muted-steel font-sans text-base">
                  {item.status}
                </td>
                <td className="px-8 py-4 text-right font-mono text-[16px] font-bold tracking-widest text-primary">
                  {item.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
