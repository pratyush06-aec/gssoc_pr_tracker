import React from "react";
import Link from "next/link";
import { Bell, Settings } from "lucide-react";
import Image from "next/image";

export function ValidatorNavbar() {
  return (
    <header className="fixed top-0 w-full bg-pure-surface/80 backdrop-blur-md border-b border-whisper-border z-50">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
            GSSoC Tracker
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-8 mt-1">
            <Link href="/dashboard" className="font-mono text-[11px] font-bold text-muted-steel hover:text-primary transition-colors uppercase tracking-widest pb-1">Dashboard</Link>
            <Link href="/pr-check" className="font-mono text-[11px] font-bold text-primary border-b-2 border-primary uppercase tracking-widest pb-1">Pull Requests</Link>
            <Link href="#" className="font-mono text-[11px] font-bold text-muted-steel hover:text-primary transition-colors uppercase tracking-widest pb-1">Contributors</Link>
            <Link href="#" className="font-mono text-[11px] font-bold text-muted-steel hover:text-primary transition-colors uppercase tracking-widest pb-1">Benchmarks</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center px-4 py-2 bg-primary/10 text-primary font-mono text-[11px] font-bold uppercase tracking-widest rounded-md hover:bg-primary/20 transition-colors">
            Validate PR
          </button>
          <div className="flex items-center gap-4 text-muted-steel">
            <Bell className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <div className="w-8 h-8 rounded-full bg-canvas-night border border-whisper-border overflow-hidden ml-2">
              <Image 
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" 
                alt="Profile" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
