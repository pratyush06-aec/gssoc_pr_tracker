import Image from "next/image";
import { Check, MapPin, Building2, Users, BookMarked, ExternalLink } from "lucide-react";
import type { GitHubUser, PRRank } from "@/types/pr-tracker";

// We keep rank text as it is from the original GSSoC rank names to match the screenshot
const RANK_META: Record<PRRank, { label: string }> = {
  "Beginner Contributor":  { label: "Beginner Contributor" },
  "Active Contributor":    { label: "Active Contributor" },
  "Advanced Contributor":  { label: "Advanced Contributor" },
  "Elite Contributor":     { label: "Elite Contributor" },
  "GSSoC Legend":          { label: "GSSoC Legend" },
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
    <section className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full p-6 md:p-8 bg-pure-surface border border-whisper-border rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <Image 
            className="w-24 h-24 rounded-full border border-whisper-border object-cover" 
            src={user.avatar_url}
            alt={user.login}
            width={96}
            height={96}
            unoptimized
          />
        </div>
        
        {/* User Info */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-end gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ghost-white tracking-tight">
              {user.name || `@${user.login}`}
            </h1>
            {user.name && (
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mb-1 text-muted-steel hover:text-ghost-white transition-colors">
                <span className="text-sm font-medium">@{user.login}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="inline-flex items-center self-start px-3 py-1 mt-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold">
            <span className="mr-1.5 text-sm leading-none">🌱</span>
            {rm?.label || rank}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-[13px] font-medium text-muted-steel">
            {user.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {user.location}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              {user.company || "None"}
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span className="text-ghost-white font-bold">{user.followers}</span> followers
            </div>
            <div className="flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" />
              <span className="text-ghost-white font-bold">{user.public_repos}</span> repos
            </div>
          </div>
        </div>
      </div>

      {/* Points Box */}
      <div className="bg-canvas-night border border-whisper-border rounded-xl px-8 py-5 min-w-[180px] text-center shrink-0 shadow-inner">
        <p className="font-mono text-[10px] font-bold text-muted-steel mb-1 uppercase tracking-widest">
          {pointsLabel || "GSSOC POINTS"}
        </p>
        <p className="font-display text-5xl font-black text-primary mb-1">
          {totalPoints.toLocaleString()}
        </p>
        <p className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">
          total earned
        </p>
      </div>

      {children}
    </section>
  );
}
