import Image from "next/image";
import { Check } from "lucide-react";
import type { GitHubUser, PRRank } from "@/types/pr-tracker";

const RANK_META: Record<PRRank, {
  label: string;
}> = {
  "Beginner Contributor":  { label: "RANK #5 (BEGINNER)" },
  "Active Contributor":    { label: "RANK #4 (ACTIVE)" },
  "Advanced Contributor":  { label: "RANK #3 (ADVANCED)" },
  "Elite Contributor":     { label: "RANK #2 (ELITE)" },
  "GSSoC Legend":          { label: "RANK #1 (LEGEND)" },
};

interface Props {
  user: GitHubUser;
  rank: PRRank;
  totalPoints: number;
  badgeOverride?: { label: string; emoji: string; pill: string; pillText: string; pillBorder: string; glow: string };
  pointsLabel?: string;
  pointsColor?: string;
  children?: React.ReactNode;
}

export function GitHubProfileCard({ user, rank, totalPoints, badgeOverride, pointsLabel, children }: Props) {
  const rm = badgeOverride ?? RANK_META[rank];

  return (
    <section className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Image 
            className="w-20 h-20 rounded-full border-2 border-primary/20 object-cover" 
            src={user.avatar_url}
            alt={user.login}
            width={80}
            height={80}
            unoptimized
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary border-2 border-pure-surface rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h1 className="font-display text-5xl font-extrabold text-ghost-white tracking-tight">@{user.login}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-mono text-[11px] font-bold text-primary px-2 py-0.5 border border-primary/20 bg-primary/5 uppercase tracking-widest">
              {rm?.label || rank}
            </span>
            <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">
              GSSOC_ID: {user.id}
            </span>
          </div>
          {user.name && (
            <div className="mt-1 font-sans text-sm text-muted-steel">
              {user.name}
            </div>
          )}
        </div>
      </div>
      <div className="text-left md:text-right mt-4 md:mt-0">
        <p className="font-mono text-[11px] font-bold text-muted-steel mb-1 uppercase tracking-widest">
          {pointsLabel || "TOTAL_AGGREGATE_SCORE"}
        </p>
        <p className="font-display text-5xl font-extrabold text-primary flex items-baseline gap-2 md:justify-end">
          {totalPoints.toLocaleString()} <span className="text-[16px] font-mono font-bold text-muted-steel tracking-widest">PTS</span>
        </p>
      </div>
      {children}
    </section>
  );
}
