import Image from "next/image";
import { MapPin, Building2, Users, BookOpen, ExternalLink } from "lucide-react";
import { ds, fontMono } from "@/lib/ds";
import { GitHubIcon } from "@/components/icons";
import type { GitHubUser, PRRank } from "@/types/pr-tracker";

const RANK_META: Record<PRRank, { bg: string; color: string; border: string; emoji: string }> = {
  "Beginner Contributor":  { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0", emoji: "🌱" },
  "Active Contributor":    { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe", emoji: "⚡" },
  "Advanced Contributor":  { bg: "#fdf4ff", color: "#7e22ce", border: "#e9d5ff", emoji: "🚀" },
  "Elite Contributor":     { bg: "#fffbeb", color: "#92400e", border: "#fde68a", emoji: "🏆" },
  "GSSoC Legend":          { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa", emoji: "👑" },
};

interface Props {
  user: GitHubUser;
  rank: PRRank;
  totalPoints: number;
}

export function GitHubProfileCard({ user, rank, totalPoints }: Props) {
  const rm = RANK_META[rank];

  return (
    <div style={{
      background: ds.canvas,
      border: `1px solid ${ds.hairlineCool}`,
      borderRadius: ds.rLg,
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(23,23,23,0.05)",
      display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap",
      marginBottom: 16,
    }}>
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={68}
          height={68}
          unoptimized
          style={{ borderRadius: "50%", border: `2px solid ${ds.hairline}`, display: "block" }}
        />
        <span style={{
          position: "absolute", bottom: -4, right: -4,
          fontSize: 18, lineHeight: 1, userSelect: "none",
        }}>
          {rm.emoji}
        </span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
          <span style={{ fontSize: ds.fsHeadLg, fontWeight: 700, color: ds.ink }}>
            {user.name ?? user.login}
          </span>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: ds.inkMute, textDecoration: "none" }}
          >
            <GitHubIcon width={13} height={13} />
            @{user.login}
            <ExternalLink size={10} />
          </a>
        </div>

        {/* Rank badge */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 10px", borderRadius: ds.rFull,
          fontSize: 12, fontWeight: 600,
          background: rm.bg, color: rm.color, border: `1px solid ${rm.border}`,
          marginBottom: user.bio ? 8 : 10,
        }}>
          {rm.emoji} {rank}
        </span>

        {user.bio && (
          <p style={{ margin: "0 0 10px", fontSize: 13, color: ds.inkMute, lineHeight: 1.55 }}>
            {user.bio}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {user.location && (
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: ds.inkMute2 }}>
              <MapPin size={12} /> {user.location}
            </span>
          )}
          {user.company && (
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: ds.inkMute2 }}>
              <Building2 size={12} /> {user.company.replace(/^@/, "")}
            </span>
          )}
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: ds.inkMute2 }}>
            <Users size={12} /> {user.followers.toLocaleString()} followers
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: ds.inkMute2 }}>
            <BookOpen size={12} /> {user.public_repos} repos
          </span>
        </div>
      </div>

      {/* Points box */}
      <div style={{
        flexShrink: 0,
        padding: "14px 20px",
        background: "rgba(62,207,142,0.04)",
        border: `1px solid rgba(62,207,142,0.18)`,
        borderRadius: ds.rMd,
        textAlign: "center",
        minWidth: 110,
      }}>
        <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 600, color: ds.inkMute2, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          GSSoC Points
        </p>
        <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: ds.primaryDeep, fontFamily: fontMono, lineHeight: 1.1 }}>
          {totalPoints.toLocaleString()}
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 11, color: ds.inkMute2 }}>total earned</p>
      </div>
    </div>
  );
}
