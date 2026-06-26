"use client";
import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";

export function ScoringGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-pure-surface border border-whisper-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden mb-16">
      <button 
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-canvas-night/5 transition-all group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <Info className="text-primary group-hover:rotate-12 transition-transform" />
          <h3 className="font-display text-lg font-bold text-ghost-white">Crimson Scoring Protocol</h3>
        </div>
        <ChevronDown className={`text-muted-steel transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      <div 
        className={`border-t border-whisper-border bg-canvas-night/5 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[800px]" : "max-h-0 border-t-0"}`}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 border-l-2 border-primary/20 bg-pure-surface rounded-r-lg">
              <h4 className="font-mono text-[11px] font-bold text-primary mb-2 uppercase tracking-widest">Level 1 (Basic)</h4>
              <p className="font-sans text-sm text-muted-steel">Simple bug fixes, documentation updates, or minor UI tweaks.</p>
              <p className="font-mono font-bold mt-4 text-ghost-white text-xs">Value: 20 PTS</p>
            </div>
            <div className="p-4 border-l-2 border-primary/60 bg-pure-surface rounded-r-lg">
              <h4 className="font-mono text-[11px] font-bold text-primary mb-2 uppercase tracking-widest">Level 2 (Intermediate)</h4>
              <p className="font-sans text-sm text-muted-steel">Feature enhancements, significant refactors, or new component creation.</p>
              <p className="font-mono font-bold mt-4 text-ghost-white text-xs">Value: 35 PTS</p>
            </div>
            <div className="p-4 border-l-2 border-primary bg-pure-surface rounded-r-lg">
              <h4 className="font-mono text-[11px] font-bold text-primary mb-2 uppercase tracking-widest">Level 3 (Advanced)</h4>
              <p className="font-sans text-sm text-muted-steel">Core architecture changes, new integration, or solving critical bottlenecks.</p>
              <p className="font-mono font-bold mt-4 text-ghost-white text-xs">Value: 55 PTS</p>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
             <p className="font-mono text-[11px] font-bold text-primary uppercase tracking-widest mb-2">SCORING FORMULA</p>
             <p className="font-mono text-xs text-muted-steel mb-2">50 (Base for approved) + (Difficulty × Quality Multiplier) + Type Bonus</p>
             <div className="flex flex-col gap-1 mt-4 border-t border-primary/10 pt-4">
                <span className="font-mono text-xs text-ghost-white">Quality Multipliers: Clean (×1.2), Exceptional (×1.5)</span>
                <span className="font-mono text-xs text-ghost-white">Type Bonuses: Docs (+5), Testing (+10), Feature (+10), DevOps (+15), Security (+20)</span>
                <span className="font-mono text-xs text-red-400 mt-2">Blocking: gssoc:invalid, gssoc:spam, gssoc:ai-slop (0 PTS)</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
