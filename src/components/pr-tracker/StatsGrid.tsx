import { Trophy, GitPullRequest, CheckCircle2, BookMarked, Flame } from "lucide-react";
import type { PRTrackerData } from "@/types/pr-tracker";

interface Props {
  data: PRTrackerData;
}

export function StatsGrid({ data }: Props) {
  const stats = [
    {
      title: "TOTAL POINTS",
      value: data.totalPoints.toLocaleString(),
      subtitle: data.rank,
      icon: Trophy,
      iconColor: "text-green-500",
      accentColor: "border-l-green-500",
    },
    {
      title: "MERGED PRS",
      value: data.totalMergedGSSoC,
      subtitle: "GSSoC merged",
      icon: GitPullRequest,
      iconColor: "text-purple-500",
      accentColor: "border-l-purple-500",
    },
    {
      title: "APPROVED",
      value: data.totalApproved,
      subtitle: "gssoc:approved",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      accentColor: "border-l-emerald-500",
    },
    {
      title: "REPOS",
      value: data.uniqueRepos,
      subtitle: "contributed to",
      icon: BookMarked,
      iconColor: "text-amber-500",
      accentColor: "border-l-amber-500",
    },
    {
      title: "STREAK",
      value: data.streak,
      subtitle: data.streak === 1 ? "day" : "days",
      icon: Flame,
      iconColor: "text-red-500",
      accentColor: "border-l-red-500",
    }
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx} 
            className={`bg-pure-surface border border-whisper-border border-l-[3px] ${stat.accentColor} rounded-xl p-5 flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group`}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1 rounded bg-canvas-night/50 border border-whisper-border">
                <Icon className={`w-3.5 h-3.5 ${stat.iconColor}`} />
              </div>
              <span className="font-mono text-[10px] font-bold text-muted-steel uppercase tracking-widest">{stat.title}</span>
            </div>
            <div>
              <h2 className="font-display text-4xl font-extrabold text-ghost-white mb-1.5">{stat.value}</h2>
              <span className="font-mono text-[11px] text-muted-steel block">{stat.subtitle}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
