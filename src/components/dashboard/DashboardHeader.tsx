import React from "react";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-whisper-border pb-6">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-2 border-whisper-border overflow-hidden bg-canvas-night shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" 
              alt="Avatar" 
              width={96} 
              height={96} 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border-2 border-pure-surface tracking-widest">
            ACTIVE
          </div>
        </div>
        <div>
          <h1 className="font-display text-4xl font-extrabold text-ghost-white mb-2 tracking-tight">@contributor_dev</h1>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-widest bg-ghost-white text-canvas-night px-2 py-1 rounded-sm uppercase">RANK #42</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-primary uppercase">2,450 PTS</span>
          </div>
        </div>
      </div>
      <button className="border border-whisper-border text-ghost-white px-6 py-2 rounded-md font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-canvas-night/5 transition-colors duration-200 flex items-center gap-2">
        <RefreshCcw className="w-3 h-3" />
        MANUAL SYNC
      </button>
    </header>
  );
}
