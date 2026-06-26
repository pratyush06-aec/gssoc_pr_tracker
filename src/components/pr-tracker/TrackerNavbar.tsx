import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Settings } from "lucide-react";

export function TrackerNavbar({ username }: { username: string }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-pure-surface/80 border-b border-whisper-border backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-8 h-16 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-2xl font-extrabold text-primary flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-muted-steel hover:text-primary transition-colors" />
            GSSoC_CONTRIBUTOR
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-primary transition-colors duration-200">Network</Link>
            <Link href="#" className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Registry</Link>
            <Link href="/dashboard" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-primary transition-colors duration-200">Assets</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link href={`/pr-tracker/${username}`} className="hidden md:block font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 border border-whisper-border hover:bg-canvas-night/5 transition-all text-ghost-white rounded-md">
            Refresh Data
          </Link>
          <a href="https://github.com/PRODHOSH/gssoc-tracker" target="_blank" rel="noopener noreferrer" className="bg-primary text-white font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-md hover:bg-primary-deep transition-all active:-translate-y-px flex items-center gap-2">
            Star Repo
          </a>
        </div>
      </div>
    </header>
  );
}
