import { TrendingUp, GitPullRequest, Flame } from "lucide-react";
import type { PRTrackerData } from "@/types/pr-tracker";

interface Props {
  data: PRTrackerData;
}

export function StatsGrid({ data }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
      {/* Box 1: PRs Merged */}
      <div className="md:col-span-5 bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
        <div>
          <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">
            PRs_MERGED
          </span>
          <h2 className="font-display text-5xl font-extrabold mt-4 text-ghost-white">
            {data.totalMergedGSSoC}
          </h2>
        </div>
        <div className="mt-8 pt-4 border-t border-whisper-border flex justify-between items-center">
          <span className="font-mono text-[12px] font-bold text-primary uppercase tracking-widest">
            {data.totalApproved} APPROVED
          </span>
          <GitPullRequest className="text-muted-steel w-5 h-5" />
        </div>
      </div>

      {/* Box 2: Repositories */}
      <div className="md:col-span-4 bg-primary text-white rounded-xl p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(225,29,72,0.2)]">
        <div>
          <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-widest">
            REPOSITORIES
          </span>
          <h2 className="font-display text-5xl font-extrabold mt-4 text-white">
            {data.uniqueRepos}
          </h2>
        </div>
        <div className="mt-8 pt-4 border-t border-white/20 flex justify-between items-center">
          <span className="font-mono text-[12px] font-bold text-white uppercase tracking-widest">
            UNIQUE PROJECTS
          </span>
          <TrendingUp className="text-white w-5 h-5" />
        </div>
      </div>

      {/* Box 3: Streak / Progress */}
      <div className="md:col-span-3 bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between border-l-4 border-l-primary">
        <div>
          <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">
            CONTRIBUTION STREAK
          </span>
          <h2 className="font-display text-5xl font-extrabold mt-4 text-ghost-white">
            {data.streak}
          </h2>
        </div>
        <div className="mt-8 pt-4 border-t border-whisper-border flex justify-between items-center">
          <span className="font-mono text-[12px] font-bold text-muted-steel uppercase tracking-widest">
            ACTIVE DAYS
          </span>
          <Flame className="text-primary w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
