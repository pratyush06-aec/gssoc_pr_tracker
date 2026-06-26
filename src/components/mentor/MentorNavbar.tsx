import React from "react";
import Link from "next/link";
import { Bell, Terminal } from "lucide-react";
import Image from "next/image";

export function MentorNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-pure-surface/80 backdrop-blur-md border-b border-whisper-border h-16">
      <div className="flex justify-between items-center w-full px-8 max-w-[1200px] mx-auto h-full">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-2xl font-extrabold text-primary tracking-tighter hover:opacity-80 transition-opacity">
            MENTOR_TERMINAL
          </Link>
          <div className="hidden md:flex gap-6 mt-1">
            <Link href="/" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-ghost-white transition-colors pb-4">Network</Link>
            <Link href="/dashboard" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-ghost-white transition-colors pb-4">Assets</Link>
            <Link href="/pr-check" className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-4">Registry</Link>
            <Link href="#" className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-steel hover:text-ghost-white transition-colors pb-4">Nodes</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-muted-steel hover:bg-canvas-night/5 p-2 transition-all duration-200 rounded-md">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-muted-steel hover:bg-canvas-night/5 p-2 transition-all duration-200 rounded-md">
            <Terminal className="w-5 h-5" />
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-whisper-border bg-canvas-night ml-2">
            <Image 
              src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg" 
              alt="Mentor Profile" 
              width={32} 
              height={32} 
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
