"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Link as LinkIcon, ArrowRight } from "lucide-react";
import { ds } from "@/lib/ds";
import { motion } from "framer-motion";

export default function PRValidatorPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    // TODO: implement validation logic
    setTimeout(() => {
      setLoading(false);
      alert("Validation logic not implemented yet.");
    }, 1000);
  };

  return (
    <div className="bg-canvas-night min-h-screen text-ghost-white font-sans flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto p-6 md:p-8 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-steel hover:text-ghost-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
      </header>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-24 flex flex-col"
      >
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 border border-primary/20 p-2 rounded-lg text-primary">
              <ShieldCheck size={24} />
            </div>
            <span className="text-primary font-mono font-bold tracking-widest text-xs uppercase">
              PR Validator
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-ghost-white mb-6">
            Does this PR count for GSSoC?
          </h1>
          <p className="text-muted-steel text-base md:text-lg max-w-2xl leading-relaxed">
            Paste any GitHub PR link. We check every condition — approval label, merge
            status, official project list — and show the exact points breakdown.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-pure-surface border border-whisper-border rounded-2xl p-6 md:p-8 mb-6 shadow-xl shadow-black/20">
          <label className="flex items-center gap-2 text-ghost-white font-bold text-sm mb-4">
            <LinkIcon size={16} className="text-muted-steel" />
            Paste a GitHub PR link
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/owner/repo/pull/123"
              className="flex-1 bg-canvas-night/50 border border-whisper-border rounded-lg px-4 py-3 text-ghost-white placeholder:text-muted-steel/50 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-whisper-border text-ghost-white hover:bg-primary hover:text-canvas-night disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-whisper-border disabled:hover:text-ghost-white transition-colors px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              Check <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-16">
          <p className="text-muted-steel text-sm leading-relaxed text-center md:text-left">
            This checks whether the PR is approved, merged, and part of an officially
            registered GSSoC 2026 project — then shows you exactly how many points it is
            worth.{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Read the terms
            </Link>{" "}
            for more on how this works.
          </p>
        </div>

        {/* Footer Text */}
        <div className="mt-auto text-center">
          <p className="text-muted-steel/60 text-xs font-mono">
            Not affiliated with GirlScript Summer of Code or GirlScript Foundation. Built for the community.
          </p>
        </div>
      </motion.main>
    </div>
  );
}
