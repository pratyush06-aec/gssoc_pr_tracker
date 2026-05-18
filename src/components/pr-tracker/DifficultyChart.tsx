"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ds } from "@/lib/ds";
import type { TrackedPR } from "@/types/pr-tracker";

const DIFF_COLORS: Record<string, string> = {
  "level:beginner":      "#10b981",
  "level:intermediate":  "#f59e0b",
  "level:advanced":      "#8b5cf6",
  "level:critical":      "#ef4444",
  "unspecified":         ds.hairlineStrong,
};

const DIFF_LABELS: Record<string, string> = {
  "level:beginner":     "Beginner",
  "level:intermediate": "Intermediate",
  "level:advanced":     "Advanced",
  "level:critical":     "Critical",
  "unspecified":        "Unspecified",
};

interface Props {
  validPRs: TrackedPR[];
}

export function DifficultyChart({ validPRs }: Props) {
  const counts: Record<string, number> = {};
  const points: Record<string, number> = {};

  for (const pr of validPRs) {
    const key = pr.difficulty ?? "unspecified";
    counts[key] = (counts[key] ?? 0) + 1;
    points[key] = (points[key] ?? 0) + pr.points;
  }

  const pieData = Object.entries(counts).map(([key, value]) => ({
    name: DIFF_LABELS[key] ?? key,
    value,
    key,
  }));

  const barData = Object.entries(points)
    .map(([key, pts]) => ({ name: DIFF_LABELS[key] ?? key, pts, key }))
    .sort((a, b) => b.pts - a.pts);

  if (!validPRs.length) {
    return (
      <div style={{
        background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
        borderRadius: ds.rLg, padding: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: 180,
      }}>
        <p style={{ color: ds.inkFaint, fontSize: 13 }}>No valid PRs yet</p>
      </div>
    );
  }

  return (
    <div style={{
      background: ds.canvas,
      border: `1px solid ${ds.hairlineCool}`,
      borderRadius: ds.rLg,
      padding: "18px 20px",
      boxShadow: "0 1px 3px rgba(23,23,23,0.03)",
    }}>
      <p style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600, color: ds.ink }}>
        Difficulty Distribution
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {/* Pie */}
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry) => (
                <Cell key={entry.key} fill={DIFF_COLORS[entry.key] ?? "#aaa"} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: ds.canvas, border: `1px solid ${ds.hairline}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v) => [`${v} PRs`, ""]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, color: ds.inkMute }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Bar */}
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData} layout="vertical" margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={ds.hairlineCool} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: ds.inkMute2 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: ds.inkMute }} axisLine={false} tickLine={false} width={80} />
            <Tooltip
              contentStyle={{ background: ds.canvas, border: `1px solid ${ds.hairline}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v) => [`${v} pts`, "Points"]}
            />
            <Bar dataKey="pts" radius={[0, 4, 4, 0]}>
              {barData.map((entry) => (
                <Cell key={entry.key} fill={DIFF_COLORS[entry.key] ?? "#aaa"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
