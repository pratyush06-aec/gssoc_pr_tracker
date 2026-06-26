import React from "react";

export function ValidatorSpecs() {
  return (
    <div className="bg-canvas-night border border-whisper-border p-6 rounded-xl text-ghost-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest mb-6 text-primary">SYSTEM STATUS</h4>
      <div className="space-y-4">
        <div className="flex justify-between font-mono text-xs font-bold tracking-widest">
          <span className="text-muted-steel">API LATENCY</span>
          <span className="text-primary">42ms</span>
        </div>
        <div className="flex justify-between font-mono text-xs font-bold tracking-widest">
          <span className="text-muted-steel">AUTH TOKEN</span>
          <span className="text-primary">ACTIVE</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-primary w-3/4"></div>
        </div>
        <p className="text-[10px] text-muted-steel font-mono font-bold tracking-widest mt-6 pt-4 border-t border-white/10">VALIDATOR CORE V4.2.1-STABLE</p>
      </div>
    </div>
  );
}
