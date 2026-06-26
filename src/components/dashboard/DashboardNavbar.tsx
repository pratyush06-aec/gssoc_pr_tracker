import React from "react";
import Link from "next/link";

export function DashboardNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-pure-surface/80 backdrop-blur-md border-b border-whisper-border h-16">
      <div className="flex justify-between items-center w-full px-8 max-w-[1200px] mx-auto h-full">
        <Link href="/" className="font-display text-2xl font-extrabold text-primary tracking-tighter hover:opacity-80 transition-opacity">
          GSSoC Tracker
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-primary transition-colors duration-200">Network</Link>
          <Link href="/dashboard" className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Assets</Link>
          <Link href="/pr-check" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-primary transition-colors duration-200">Registry</Link>
          <Link href="#" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-primary transition-colors duration-200">Nodes</Link>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-md font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-primary-deep transition-all active:translate-y-px">
          START TRACKING
        </button>
      </div>
    </nav>
  );
}
