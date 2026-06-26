"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const POINTS_DATA = [
  { name: "WK 01", points: 200 },
  { name: "WK 02", points: 450 },
  { name: "WK 03", points: 800 },
  { name: "WK 04", points: 950 },
  { name: "WK 05", points: 1400 },
  { name: "WK 06", points: 1800 },
  { name: "WK 07", points: 2100 },
  { name: "WK 08", points: 2450 },
];

const RANK_DATA = [
  { name: "OCT 01", rank: 62, value: 38 },
  { name: "OCT 15", rank: 55, value: 45 },
  { name: "NOV 01", rank: 48, value: 52 },
  { name: "NOV 15", rank: 45, value: 55 },
  { name: "DEC 01", rank: 42, value: 58 },
];

const DIFFICULTY_DATA = [
  { name: "Level 1", value: 8, color: "#b80035" },
  { name: "Level 2", value: 6, color: "#e11d48" },
  { name: "Level 3", value: 4, color: "#71717A" },
];

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Primary Chart */}
      <section className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-whisper-border flex justify-between items-center bg-canvas-night/5">
          <h2 className="font-display text-xl font-bold text-ghost-white">Points Progression</h2>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <span className="font-mono text-xs font-bold text-muted-steel uppercase tracking-widest">Total Score</span>
          </div>
        </div>
        <div className="h-[400px] w-full relative pt-6 pr-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={POINTS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b80035" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#b80035" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "#71717A" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "#71717A" }} dx={-10} />
              <Tooltip 
                contentStyle={{ background: "#18181B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#FAFAFA", fontFamily: "JetBrains Mono" }} 
                itemStyle={{ color: "#FAFAFA" }}
              />
              <Area type="monotone" dataKey="points" stroke="#b80035" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Secondary Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rank Stability (Custom CSS Chart) */}
        <div className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full overflow-hidden">
          <div className="p-6 border-b border-whisper-border bg-canvas-night/5">
            <h3 className="font-display text-lg font-bold text-ghost-white">Rank Stability</h3>
          </div>
          <div className="p-6 h-64 flex flex-col justify-end gap-4">
            <div className="flex items-end gap-2 h-full">
              {RANK_DATA.map((d, i) => (
                <div key={i} className={`flex-1 relative group transition-colors duration-300 rounded-t-sm ${i === RANK_DATA.length - 1 ? 'bg-primary' : 'bg-canvas-night/20 hover:bg-primary/50'}`} style={{ height: `${d.value}%` }}>
                  <span className={`absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold ${i === RANK_DATA.length - 1 ? 'text-primary block' : 'text-muted-steel hidden group-hover:block'}`}>
                    #{d.rank}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-mono text-[9px] font-bold text-muted-steel uppercase tracking-widest">
              <span>{RANK_DATA[0].name}</span>
              <span>{RANK_DATA[Math.floor(RANK_DATA.length / 2)].name}</span>
              <span>{RANK_DATA[RANK_DATA.length - 1].name}</span>
            </div>
          </div>
        </div>

        {/* PR Difficulty */}
        <div className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full overflow-hidden">
          <div className="p-6 border-b border-whisper-border bg-canvas-night/5">
            <h3 className="font-display text-lg font-bold text-ghost-white">PR Difficulty Breakdown</h3>
          </div>
          <div className="p-6 flex items-center justify-between h-64">
            <div className="relative w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={DIFFICULTY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
                    {DIFFICULTY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: "#18181B", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#FAFAFA" }} 
                    itemStyle={{ color: "#FAFAFA" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-2xl font-extrabold text-ghost-white">18</span>
                <span className="font-mono text-[9px] font-bold text-muted-steel uppercase tracking-widest">TOTAL</span>
              </div>
            </div>
            <div className="flex-1 pl-8 space-y-4">
              {DIFFICULTY_DATA.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="font-sans text-sm text-muted-steel">{d.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-ghost-white">{d.value.toString().padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
