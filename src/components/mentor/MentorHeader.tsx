import React from "react";
import Image from "next/image";
import { Star, CheckSquare } from "lucide-react";

export function MentorHeader() {
  return (
    <header className="bg-pure-surface border border-whisper-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rounded-xl">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-[3px] border-primary p-0.5 bg-canvas-night overflow-hidden">
            <Image 
              src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" 
              alt="Mentor Avatar" 
              width={64} 
              height={64} 
              className="w-full h-full rounded-full object-cover grayscale"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] px-1.5 py-0.5 font-mono font-bold uppercase tracking-tighter rounded-sm border-2 border-pure-surface">LEAD</div>
        </div>
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ghost-white">@mentor_lead</h1>
          <div className="flex gap-4 mt-2">
            <span className="font-mono text-[11px] font-bold text-muted-steel flex items-center gap-1 uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" /> 4,850 POINTS
            </span>
            <span className="font-mono text-[11px] font-bold text-muted-steel flex items-center gap-1 uppercase tracking-widest">
              <CheckSquare className="w-3.5 h-3.5" /> 142 REVIEWS
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <button className="flex-1 md:flex-none border border-primary text-primary px-4 py-2 rounded-md font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-primary/10 transition-all duration-300 active:translate-y-px">
          Sync Data
        </button>
        <button className="flex-1 md:flex-none bg-primary text-white px-4 py-2 rounded-md font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-primary-deep transition-all duration-300 active:translate-y-px">
          Export Stats
        </button>
      </div>
    </header>
  );
}
