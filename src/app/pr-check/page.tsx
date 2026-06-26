import React from "react";
import type { Metadata } from "next";
import { ValidatorNavbar } from "@/components/pr-check/ValidatorNavbar";
import { ValidatorHistory } from "@/components/pr-check/ValidatorHistory";
import { ValidatorSpecs } from "@/components/pr-check/ValidatorSpecs";
import { PrChecker } from "@/components/PrChecker";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "PR Validator · GSSoC Tracker",
  description: "Check if your PR qualifies for GSSoC 2026 and see the exact points breakdown.",
};

export default function PrCheckPage() {
  return (
    <div className="bg-background text-ghost-white min-h-screen font-sans flex flex-col overflow-x-hidden">
      <ValidatorNavbar />

      <main className="flex-grow pt-32 pb-16 px-8 max-w-[1200px] mx-auto w-full">
        {/* Hero Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold text-ghost-white mb-4">PR Validator Engine</h1>
          <p className="font-sans text-base text-muted-steel leading-relaxed">
            Check Pull Request eligibility for Global Summer of Code scoring. Direct API validation against repository benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Form & Results (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            <PrChecker />

            {/* Data Visualizer Placeholder */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-pure-surface border border-whisper-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] group flex flex-col items-center justify-center p-8 text-center">
              <Activity className="text-primary w-8 h-8 mb-4 opacity-50" />
              <h4 className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">Real-time scoring heuristics visualization</h4>
              <p className="font-sans text-sm text-muted-steel mt-2 max-w-md">Processing repository metadata through GSSoC validation protocols to ensure fair credit distribution.</p>
            </div>
          </div>

          {/* Right Column: Recent Checks History (4 cols) */}
          <aside className="md:col-span-4 space-y-6 flex flex-col">
            <div className="flex-1">
              <ValidatorHistory />
            </div>
            <ValidatorSpecs />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-16 border-t border-whisper-border bg-canvas-night/5">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-8 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <span className="font-mono text-[11px] font-bold text-ghost-white mb-2 uppercase tracking-widest">GSSOC TRACKER</span>
            <p className="font-sans text-xs text-muted-steel text-center md:text-left max-w-xs">© 2026 GSSoC Tracker. All rights reserved. Precision PR Validation Engine.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-sans text-xs font-bold text-muted-steel hover:text-primary transition-colors" href="#">Documentation</a>
            <a className="font-sans text-xs font-bold text-muted-steel hover:text-primary transition-colors" href="#">API Reference</a>
            <a className="font-sans text-xs font-bold text-muted-steel hover:text-primary transition-colors" href="#">System Status</a>
            <a className="font-sans text-xs font-bold text-muted-steel hover:text-primary transition-colors" href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
