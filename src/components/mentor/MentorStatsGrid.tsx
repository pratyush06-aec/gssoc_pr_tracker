import { Trophy, Users, Building2, Star } from "lucide-react";
import { ds, fontMono } from "@/lib/ds";
import type { MentorTrackerData } from "@/lib/mentor-tracker";

function StatCard({ icon, label, value, sub, accent, accentBg }: {
  icon: React.ReactNode; label: string;
  value: string | number; sub?: string;
  accent: string; accentBg: string;
}) {
  return (
    <div style={{
      background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
      borderRadius: ds.rLg, padding: "16px 18px",
      boxShadow: "0 1px 4px rgba(23,23,23,0.04)",
      borderLeft: `3px solid ${accent}`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 80, height: 80,
        background: accentBg, borderRadius: "0 0 0 80px",
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, position: "relative" }}>
        <span style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: ds.rSm,
          background: accentBg, color: accent, flexShrink: 0,
        }}>
          {icon}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: ds.inkMute2, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: ds.ink, fontFamily: fontMono, lineHeight: 1, letterSpacing: "-0.02em", position: "relative" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && (
        <p style={{ margin: "6px 0 0", fontSize: 11, color: ds.inkMute2, position: "relative" }}>{sub}</p>
      )}
    </div>
  );
}

export function MentorStatsGrid({ data }: { data: MentorTrackerData }) {
  const uniqueRepos = new Set(data.prs.map((p) => p.repo)).size;
  const avgPts = data.totalPRs > 0 ? Math.round(data.totalPoints / data.totalPRs) : 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 10, marginBottom: 16 }}>
      <StatCard icon={<Trophy size={14} />}   label="Total Points"  value={data.totalPoints}  sub="mentor points"     accent="#ca8a04" accentBg="rgba(202,138,4,0.07)"   />
      <StatCard icon={<Users size={14} />}    label="PRs Reviewed"  value={data.totalPRs}     sub="with mentor label" accent="#8b5cf6" accentBg="rgba(139,92,246,0.07)" />
      <StatCard icon={<Building2 size={14} />} label="Repos"        value={uniqueRepos}       sub="reviewed across"   accent="#10b981" accentBg="rgba(16,185,129,0.07)" />
      <StatCard icon={<Star size={14} />}     label="Avg / PR"     value={avgPts}            sub="points per review" accent="#f59e0b" accentBg="rgba(245,158,11,0.07)" />
    </div>
  );
}
