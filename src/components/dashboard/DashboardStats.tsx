import React from "react";
import { ArrowUp } from "lucide-react";

export function DashboardStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-pure-surface border border-whisper-border p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-muted-steel font-mono text-[10px] font-bold uppercase tracking-widest mb-2">POINTS</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold text-ghost-white">2,450</span>
          <span className="text-primary font-mono font-bold text-xs">+12%</span>
        </div>
      </div>
      
      <div className="bg-pure-surface border border-whisper-border p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-muted-steel font-mono text-[10px] font-bold uppercase tracking-widest mb-2">GLOBAL RANK</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold text-ghost-white">#42</span>
          <span className="text-green-500 font-mono font-bold text-xs flex items-center"><ArrowUp className="w-3 h-3" /> 3</span>
        </div>
      </div>

      <div className="bg-pure-surface border border-whisper-border p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-muted-steel font-mono text-[10px] font-bold uppercase tracking-widest mb-2">MERGED PRS</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold text-ghost-white">18</span>
          <span className="text-muted-steel font-mono font-bold text-xs">OF 22</span>
        </div>
      </div>

      <div className="bg-pure-surface border border-whisper-border p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] group hover:-translate-y-1 transition-transform duration-300">
        <div className="text-muted-steel font-mono text-[10px] font-bold uppercase tracking-widest mb-2">OPEN PRS</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold text-ghost-white">4</span>
          <div className="flex gap-1 items-center pb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
