import React from "react";
import { History } from "lucide-react";

const HISTORY = [
  { pr: "PR #1042", points: "+15 PTS", pointsColor: "text-primary", title: "fix: resolve memory leak in validator hook...", level: "level-1", time: "2 MINS AGO" },
  { pr: "PR #982", points: "INVALID", pointsColor: "text-red-500", title: "docs: update contributing guide", level: "no-points", time: "14 MINS AGO" },
  { pr: "PR #1105", points: "+40 PTS", pointsColor: "text-primary", title: "feat: core-engine rewrite v2", level: "level-3", time: "1 HOUR AGO" },
  { pr: "PR #877", points: "+25 PTS", pointsColor: "text-primary", title: "refactor: database schema...", level: "level-2", time: "3 HOURS AGO" },
];

export function ValidatorHistory() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden h-full">
      <div className="p-6 bg-canvas-night/5 border-b border-whisper-border flex items-center justify-between">
        <h3 className="font-mono text-[11px] font-bold text-ghost-white uppercase tracking-widest">RECENT CHECKS</h3>
        <History className="w-4 h-4 text-muted-steel cursor-pointer hover:text-primary transition-colors" />
      </div>
      <div className="divide-y divide-whisper-border">
        {HISTORY.map((item, i) => (
          <div key={i} className="p-6 hover:bg-canvas-night/5 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-sm font-bold text-ghost-white group-hover:text-primary transition-colors">{item.pr}</span>
              <span className={`font-mono text-sm font-bold ${item.pointsColor}`}>{item.points}</span>
            </div>
            <p className="text-sm text-muted-steel truncate font-sans">{item.title}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="px-2 py-0.5 bg-canvas-night/10 text-muted-steel border border-whisper-border text-[9px] font-mono font-bold uppercase tracking-widest rounded-sm">{item.level}</span>
              <span className="text-[10px] text-muted-steel font-mono font-bold uppercase tracking-widest">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-whisper-border bg-canvas-night/5 text-center">
        <button className="text-primary font-mono text-[11px] font-bold uppercase tracking-widest hover:underline">VIEW FULL HISTORY</button>
      </div>
    </div>
  );
}
