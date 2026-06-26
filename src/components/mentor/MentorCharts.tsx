import React from "react";

export function MentorCharts() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Left: Chart */}
      <div className="bg-pure-surface border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <h3 className="font-display text-xl font-bold text-ghost-white mb-6 border-b border-whisper-border pb-4">Reviews by Level</h3>
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">
              <span>LEVEL 01 (BEGINNER)</span>
              <span>80 REVIEWS</span>
            </div>
            <div className="h-2 w-full bg-canvas-night/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "80%" }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">
              <span>LEVEL 02 (INTERMEDIATE)</span>
              <span>45 REVIEWS</span>
            </div>
            <div className="h-2 w-full bg-canvas-night/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel">
              <span>LEVEL 03 (ADVANCED)</span>
              <span>17 REVIEWS</span>
            </div>
            <div className="h-2 w-full bg-canvas-night/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "17%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Scoring Guide */}
      <div className="bg-pure-surface border border-whisper-border p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col">
        <h3 className="font-display text-xl font-bold text-ghost-white mb-6 border-b border-whisper-border pb-4">Mentor Scoring Guide</h3>
        <div className="flex-grow flex flex-col justify-center space-y-4">
          <div className="flex items-center justify-between border-b border-whisper-border py-2">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 flex items-center justify-center bg-canvas-night/5 rounded-md font-mono text-sm font-bold text-primary">L1</span>
              <span className="font-sans text-ghost-white">Standard Documentation & Styling</span>
            </div>
            <span className="font-mono text-xs font-bold text-primary tracking-widest">10 PTS</span>
          </div>
          <div className="flex items-center justify-between border-b border-whisper-border py-2">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 flex items-center justify-center bg-canvas-night/5 rounded-md font-mono text-sm font-bold text-primary">L2</span>
              <span className="font-sans text-ghost-white">Refactors & Logic Enhancements</span>
            </div>
            <span className="font-mono text-xs font-bold text-primary tracking-widest">25 PTS</span>
          </div>
          <div className="flex items-center justify-between border-b border-whisper-border py-2 border-transparent">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 flex items-center justify-center bg-canvas-night/5 rounded-md font-mono text-sm font-bold text-primary">L3</span>
              <span className="font-sans text-ghost-white">Complex Core Architecture</span>
            </div>
            <span className="font-mono text-xs font-bold text-primary tracking-widest">45 PTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
