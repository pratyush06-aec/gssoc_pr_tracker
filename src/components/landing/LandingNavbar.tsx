import React from "react";
import Link from "next/link";

export interface LandingNavbarProps {}

export function LandingNavbar({}: Readonly<LandingNavbarProps>) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-whisper-border">
      <div className="flex justify-between items-center w-full px-8 max-w-[1200px] mx-auto h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-2xl text-primary font-bold tracking-tighter">
            GSSoC Tracker
          </Link>
          <div className="hidden md:flex gap-6">
            <Link 
              href="/" 
              className="text-primary font-bold border-b border-primary font-mono text-[11px] uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              Network
            </Link>
            <Link 
              href="/dashboard" 
              className="text-muted-steel font-mono text-[11px] uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              Assets
            </Link>
            <Link 
              href="/pr-check" 
              className="text-muted-steel font-mono text-[11px] uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              Registry
            </Link>
            <Link 
              href="#" 
              className="text-muted-steel font-mono text-[11px] uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              Nodes
            </Link>
          </div>
        </div>
        <Link 
          href="/"
          className="bg-primary text-white px-6 py-2 rounded-lg font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-primary-deep active:translate-y-px transition-all"
        >
          Start Tracking
        </Link>
      </div>
    </nav>
  );
}
