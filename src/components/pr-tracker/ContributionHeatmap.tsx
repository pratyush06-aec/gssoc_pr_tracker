"use client";

import React from "react";
import type { TrackedPR } from "@/types/pr-tracker";

export function ContributionHeatmap({ prs, streak }: { prs: TrackedPR[], streak: number }) {
  // Compute weekly activity for the last 12 weeks
  const WEEKS = 12;
  const now = new Date();
  const weeksData = Array.from({ length: WEEKS }).map((_, i) => {
    const start = new Date(now.getTime() - (WEEKS - 1 - i) * 7 * 24 * 60 * 60 * 1000);
    return { start, count: 0 };
  });

  for (const pr of prs) {
    const date = pr.mergedAt ? new Date(pr.mergedAt) : new Date(pr.createdAt);
    const diffTime = now.getTime() - date.getTime();
    if (diffTime >= 0) {
      const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
      if (diffWeeks < WEEKS) {
        weeksData[WEEKS - 1 - diffWeeks].count += 1;
      }
    }
  }

  // Find max count for colors
  const maxCount = Math.max(1, ...weeksData.map(w => w.count));

  const getColor = (count: number) => {
    if (count === 0) return "bg-canvas-night border border-whisper-border";
    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-[#6ee7b7]/20 border border-[#6ee7b7]/30";
    if (ratio <= 0.5) return "bg-[#34d399] border border-[#34d399]/50";
    if (ratio <= 0.75) return "bg-[#10b981] border border-[#10b981]";
    return "bg-[#047857] border border-[#047857]";
  };

  const STREAK_WEEKS = 7;
  const streakData = Array.from({ length: STREAK_WEEKS }).map((_, i) => {
    return { label: `W${i + 1}`, active: i < streak };
  });

  return (
    <div className="bg-pure-surface border border-whisper-border rounded-xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8 font-sans">
      
      {/* Contribution Activity */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-primary rounded-full"></div>
            <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-widest">Contribution Activity</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-steel">
            <span>Less</span>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-canvas-night border border-whisper-border"></div>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#6ee7b7]/20 border border-[#6ee7b7]/30"></div>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#34d399] border border-[#34d399]/50"></div>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#10b981] border border-[#10b981]"></div>
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#047857] border border-[#047857]"></div>
            <span>More</span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-1.5 sm:gap-2 mb-3">
          {weeksData.map((w, i) => (
            <div 
              key={i} 
              className={`flex-1 aspect-square rounded sm:rounded-md transition-colors ${getColor(w.count)}`}
              title={`${w.count} PRs week of ${w.start.toLocaleDateString()}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-steel px-1">
          <span>{weeksData[0].start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <span className="hidden sm:inline">{weeksData[Math.floor(WEEKS/2)].start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          <span>{weeksData[WEEKS-1].start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="h-px bg-whisper-border w-full mb-8"></div>

      {/* Weekly Streak */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-4 h-0.5 bg-muted-steel rounded-full"></div>
          <h3 className="text-xs font-mono font-bold text-muted-steel uppercase tracking-widest">Weekly Streak</h3>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
          {streakData.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg transition-colors ${s.active ? 'bg-[#10b981]/10 border-2 border-[#10b981]' : 'bg-canvas-night border border-whisper-border'}`}
              />
              <span className={`text-[10px] font-mono font-bold ${s.active ? 'text-[#10b981]' : 'text-muted-steel'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-muted-steel">
          <span className={streak > 0 ? 'text-[#10b981] font-medium' : ''}>{streak > 0 ? `${streak} week streak` : 'No active streak'}</span>
          <span className="text-whisper-border">|</span>
          <span>{streak} / 7 weeks active</span>
          <span className="text-whisper-border">|</span>
          <span>Week 7 of 13</span>
        </div>
      </div>

    </div>
  );
}
