import React from "react";
import type { MentorPR } from "@/lib/mentor-tracker";

export function MentorPRTable({ prs }: { prs: MentorPR[] }) {
  // Helper to determine status and colors
  const getStatus = (pr: MentorPR) => {
    if (pr.labels.includes("gssoc:approved")) {
      return { label: "Approved", bg: "bg-green-500/10 text-green-500" };
    }
    const hasInvalid = pr.labels.some(l => ["spam", "invalid", "out-of-context"].includes(l));
    if (hasInvalid) {
      return { label: "Changes Requested", bg: "bg-red-500/10 text-red-500" };
    }
    return { label: "Pending", bg: "bg-canvas-night/10 text-muted-steel" };
  };

  return (
    <section className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-8 py-6 border-b border-whisper-border flex justify-between items-center bg-canvas-night/5">
        <h3 className="font-display text-xl font-bold text-ghost-white">Active Review Registry</h3>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-steel font-bold">Real-time Feed</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-canvas-night/5 border-b border-whisper-border">
            <tr>
              <th className="px-8 py-4 font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">PR Title & Repository</th>
              <th className="px-8 py-4 font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">Date</th>
              <th className="px-8 py-4 font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-4 font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest text-center">Level</th>
              <th className="px-8 py-4 font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-whisper-border">
            {prs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-muted-steel font-mono text-sm">
                  No PRs found
                </td>
              </tr>
            ) : prs.map((pr) => {
              const status = getStatus(pr);
              const pointsColor = pr.points > 0 ? "text-primary" : "text-muted-steel";
              const levelStr = pr.levelLabel ? pr.levelLabel.replace("level:", "").substring(0, 3).toUpperCase() : "L--";
              const dateStr = new Date(pr.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
              
              return (
                <tr key={pr.id} className="hover:bg-canvas-night/5 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <a href={pr.url} target="_blank" rel="noopener noreferrer" className="font-sans text-sm font-bold text-ghost-white group-hover:text-primary transition-colors max-w-sm truncate block">
                        {pr.title}
                      </a>
                      <a href={pr.repoUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] font-bold text-muted-steel hover:text-primary uppercase tracking-widest mt-1 block">
                        {pr.repo}
                      </a>
                    </div>
                  </td>
                  <td className="px-8 py-4 font-mono text-xs font-bold text-ghost-white tracking-widest">{dateStr}</td>
                  <td className="px-8 py-4 text-center">
                    <span className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase rounded-sm tracking-widest ${status.bg}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">{levelStr}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span className={`font-mono text-xs font-bold tracking-widest ${pointsColor}`}>+{pr.points} PTS</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
