import React from "react";
import { CheckCheck, Edit3, TrendingUp } from "lucide-react";

const ACTIVITY_DATA = [
  {
    type: "merged",
    icon: CheckCheck,
    iconBg: "bg-primary",
    text: (
      <>
        Merged <span className="font-mono text-primary">PR #1402</span> in <span className="font-bold text-ghost-white">gssoc/web-app</span>
      </>
    ),
    time: "2H AGO",
    badge: "+10 PTS EARNED",
    badgeColor: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  {
    type: "opened",
    icon: Edit3,
    iconBg: "bg-canvas-night",
    text: (
      <>
        Opened <span className="font-mono text-primary">PR #88</span> in <span className="font-bold text-ghost-white">crimson/protocol-ui</span>
      </>
    ),
    time: "5H AGO",
    badge: "IN REVIEW",
    badgeColor: "text-muted-steel bg-canvas-night/50 border-whisper-border",
  },
  {
    type: "alert",
    icon: TrendingUp,
    iconBg: "bg-primary",
    text: <span className="font-bold text-ghost-white">Rank Up! System Alert</span>,
    time: "1D AGO",
    description: (
      <>
        You moved from <span className="font-mono text-muted-steel">#45</span> to <span className="font-mono text-primary font-bold">#42</span> after recent validations.
      </>
    ),
  },
];

export function DashboardActivity() {
  return (
    <section className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-6 border-b border-whisper-border bg-canvas-night/5">
        <h2 className="font-display text-xl font-bold text-ghost-white">Activity Feed</h2>
      </div>
      <div className="p-6 space-y-6 relative">
        <div className="absolute left-[35px] top-6 bottom-6 w-px bg-whisper-border"></div>
        
        {ACTIVITY_DATA.map((entry, index) => {
          const Icon = entry.icon;
          return (
            <div key={index} className="relative flex gap-4 items-start pl-2">
              <div className={`z-10 w-8 h-8 rounded-full ${entry.iconBg} border-[3px] border-pure-surface flex items-center justify-center shrink-0`}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <div className={`flex-1 ${index < ACTIVITY_DATA.length - 1 ? 'pb-6 border-b border-whisper-border' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <p className="font-sans text-sm text-muted-steel">{entry.text}</p>
                  <span className="font-mono text-[10px] font-bold text-muted-steel tracking-widest">{entry.time}</span>
                </div>
                {entry.badge && (
                  <div className={`inline-flex items-center mt-2 border px-2 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest ${entry.badgeColor}`}>
                    {entry.badge}
                  </div>
                )}
                {entry.description && (
                  <p className="font-sans text-sm text-muted-steel mt-1">
                    {entry.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
