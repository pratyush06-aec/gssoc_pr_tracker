"use client";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

export interface AnalyticsPR {
  levelKey: string | null;
  qualityKey: string | null;
  typeKeys: string[];
}

const LEVEL_COLORS: Record<string, string> = {
  "level:beginner":     "#b80035", // Primary
  "level:intermediate": "#e11d48", // Primary container
  "level:advanced":     "#ffb3b6", // Primary fixed dim
  "level:critical":     "#93000a", // Error container
};
const LEVEL_LABELS: Record<string, string> = {
  "level:beginner": "Beginner", "level:intermediate": "Intermediate",
  "level:advanced": "Advanced", "level:critical": "Critical",
};

const QUALITY_COLORS: Record<string, string> = {
  "quality:exceptional": "#b80035",
  "quality:clean":       "#E4E4E7",
  "none":                "#27272a",
};
const QUALITY_LABELS: Record<string, string> = {
  "quality:exceptional": "Exceptional", "quality:clean": "Clean", "none": "No label",
};

const TYPE_COLORS: Record<string, string> = {
  "type:feature":       "#b80035",
  "type:bug":           "#e11d48",
  "type:docs":          "#ffb3b6",
  "type:testing":       "#E4E4E7",
  "type:refactor":      "#a1a1aa",
  "type:design":        "#71717a",
  "type:performance":   "#52525b",
  "type:security":      "#3f3f46",
  "type:accessibility": "#27272a",
  "type:devops":        "#18181b",
};

function Empty({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center min-h-[140px]">
      <p className="text-muted-steel text-sm font-sans">{label}</p>
    </div>
  );
}

function Legend({ items }: { items: { key: string; label: string; color: string; count: number }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-4 border-t border-whisper-border">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
          <span className="text-xs text-muted-steel font-sans">{item.label}</span>
          <span className="text-xs font-mono font-bold text-ghost-white">×{item.count}</span>
        </div>
      ))}
    </div>
  );
}

function ChartCard({ title, children, metric }: { title: string; children: React.ReactNode, metric?: string }) {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-xl font-bold text-ghost-white">{title}</h3>
        {metric && <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">{metric}</span>}
      </div>
      {children}
    </div>
  );
}

function LevelChart({ prs }: { prs: AnalyticsPR[] }) {
  const counts: Record<string, number> = {};
  for (const pr of prs) {
    const k = pr.levelKey ?? "level:beginner";
    counts[k] = (counts[k] ?? 0) + 1;
  }
  const ORDER = ["level:beginner", "level:intermediate", "level:advanced", "level:critical"];
  const data = Object.entries(counts)
    .sort((a, b) => ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]))
    .map(([key, value]) => ({ key, name: LEVEL_LABELS[key] ?? key, value }));

  if (!data.length) return <Empty label="No level data" />;
  return (
    <>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
            {data.map((e) => <Cell key={e.key} fill={LEVEL_COLORS[e.key] ?? "#aaa"} />)}
          </Pie>
          <Tooltip 
            contentStyle={{ background: "#18181B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#FAFAFA" }} 
            itemStyle={{ color: "#FAFAFA" }}
            formatter={(v) => [`${v} PR${Number(v) !== 1 ? "s" : ""}`, ""]} 
          />
        </PieChart>
      </ResponsiveContainer>
      <Legend items={data.map((d) => ({ key: d.key, label: d.name, color: LEVEL_COLORS[d.key] ?? "#aaa", count: d.value }))} />
    </>
  );
}

function QualityChart({ prs }: { prs: AnalyticsPR[] }) {
  const counts: Record<string, number> = { "quality:exceptional": 0, "quality:clean": 0, "none": 0 };
  for (const pr of prs) {
    const k = pr.qualityKey ?? "none";
    counts[k] = (counts[k] ?? 0) + 1;
  }
  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({ key, name: QUALITY_LABELS[key] ?? key, value }));

  if (!data.length) return <Empty label="No quality data" />;
  return (
    <>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
            {data.map((e) => <Cell key={e.key} fill={QUALITY_COLORS[e.key] ?? "#aaa"} />)}
          </Pie>
          <Tooltip 
            contentStyle={{ background: "#18181B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#FAFAFA" }} 
            itemStyle={{ color: "#FAFAFA" }}
            formatter={(v) => [`${v} PR${Number(v) !== 1 ? "s" : ""}`, ""]} 
          />
        </PieChart>
      </ResponsiveContainer>
      <Legend items={data.map((d) => ({ key: d.key, label: d.name, color: QUALITY_COLORS[d.key] ?? "#aaa", count: d.value }))} />
    </>
  );
}

function TypeChart({ prs }: { prs: AnalyticsPR[] }) {
  const counts: Record<string, number> = {};
  for (const pr of prs) {
    for (const k of pr.typeKeys) {
      counts[k] = (counts[k] ?? 0) + 1;
    }
  }
  const data = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({ key, name: key.replace("type:", ""), count }));

  if (!data.length) return <Empty label="No type labels on these PRs" />;
  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 34 + 24)}>
      <BarChart data={data} layout="vertical" margin={{ left: -4, right: 16, top: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#A1A1AA" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: "#FAFAFA", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ background: "#18181B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#FAFAFA" }} 
          itemStyle={{ color: "#FAFAFA" }}
          formatter={(v) => [`${v} PR${Number(v) !== 1 ? "s" : ""}`, ""]} 
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((e) => <Cell key={e.key} fill={TYPE_COLORS[e.key] ?? "#b80035"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AnalyticsCharts({ prs }: { prs: AnalyticsPR[] }) {
  if (!prs.length) return null;
  return (
    <div className="flex flex-col gap-6 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="PRs by Difficulty" metric="SYSTEM_METRIC: LVL_DIST">
          <LevelChart prs={prs} />
        </ChartCard>
        <ChartCard title="Quality Distribution" metric="SYSTEM_METRIC: Q_DIST">
          <QualityChart prs={prs} />
        </ChartCard>
      </div>
      <ChartCard title="PR Type Breakdown" metric="SYSTEM_METRIC: TYPE_DIST">
        <TypeChart prs={prs} />
      </ChartCard>
    </div>
  );
}
