import { GitMerge, CheckCircle, Building2, Flame, Trophy } from "lucide-react";
import { ds, fontMono } from "@/lib/ds";
import type { PRTrackerData } from "@/types/pr-tracker";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}

function StatCard({ icon, label, value, sub, accent = ds.primary }: StatCardProps) {
  return (
    <div style={{
      background: ds.canvas,
      border: `1px solid ${ds.hairlineCool}`,
      borderRadius: ds.rLg,
      padding: "16px 18px",
      boxShadow: "0 1px 3px rgba(23,23,23,0.03)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, borderRadius: ds.rMd,
          background: `${accent}18`, color: accent,
        }}>
          {icon}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: ds.inkMute2, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: ds.ink, fontFamily: fontMono, lineHeight: 1 }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {sub && (
        <p style={{ margin: "5px 0 0", fontSize: 12, color: ds.inkMute2 }}>{sub}</p>
      )}
    </div>
  );
}

interface Props {
  data: PRTrackerData;
}

export function StatsGrid({ data }: Props) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 10,
      marginBottom: 16,
    }}>
      <StatCard
        icon={<Trophy size={15} />}
        label="Total Points"
        value={data.totalPoints}
        sub={data.rank}
        accent={ds.primaryDeep}
      />
      <StatCard
        icon={<GitMerge size={15} />}
        label="Merged PRs"
        value={data.totalMergedGSSoC}
        sub="GSSoC merged"
        accent="#8b5cf6"
      />
      <StatCard
        icon={<CheckCircle size={15} />}
        label="Approved"
        value={data.totalApproved}
        sub="gssoc:approved"
        accent="#10b981"
      />
      <StatCard
        icon={<Building2 size={15} />}
        label="Repos"
        value={data.uniqueRepos}
        sub="contributed to"
        accent="#f59e0b"
      />
      <StatCard
        icon={<Flame size={15} />}
        label="Streak"
        value={data.streak}
        sub={data.streak === 1 ? "day" : "days"}
        accent="#ef4444"
      />
    </div>
  );
}
