import React from "react";
import { BarChart, Award, Network } from "lucide-react";

export function MentorStats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
      <div className="md:col-span-5 bg-pure-surface border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between group">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">TOTAL PRS REVIEWED</span>
          <BarChart className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-4">
          <span className="font-display text-5xl font-extrabold text-ghost-white leading-none">142</span>
          <p className="font-sans text-sm text-muted-steel mt-2">+12% from last cycle</p>
        </div>
      </div>

      <div className="md:col-span-4 bg-pure-surface border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between group">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">MENTOR POINTS</span>
          <Award className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-4">
          <span className="font-display text-5xl font-extrabold text-ghost-white leading-none">4,850</span>
          <p className="font-sans text-sm text-muted-steel mt-2">Ranked #04 globally</p>
        </div>
      </div>

      <div className="md:col-span-3 bg-pure-surface border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between group">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">PROJECTS MENTORED</span>
          <Network className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        </div>
        <div className="mt-4">
          <span className="font-display text-5xl font-extrabold text-ghost-white leading-none">12</span>
          <p className="font-sans text-sm text-muted-steel mt-2">Active in 3 ecosystems</p>
        </div>
      </div>
    </section>
  );
}
