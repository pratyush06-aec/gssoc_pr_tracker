import React from "react";
import Link from "next/link";
import { ArrowLeft, GitPullRequest, Info, RefreshCw, Star } from "lucide-react";
import { LiveClock } from "@/components/pr-tracker/LiveClock";

export function TrackerNavbar({ username }: { username: string }) {
  // Format current date roughly to match the screenshot "26 Jun, 10:42 pm"
  // Using a static/client hydration safe approach would require a client component, 
  // but for a server component we can just omit it or render a generic status. 
  // To avoid hydration errors, we'll just skip the dynamic time and use a "Live Status" indicator.

  return (
    <header className="bg-background/50 backdrop-blur-md w-full h-16 sticky top-0 z-50 border-b border-whisper-border">
      <div className="flex justify-between items-center px-6 md:px-12 w-full h-full">
        {/* Left Side */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-steel hover:text-ghost-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Search</span>
          </Link>
          
          <div className="w-px h-6 bg-whisper-border hidden md:block"></div>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-1.5 rounded-md border border-primary/20">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-ghost-white hidden sm:inline">GSSoC PR Tracker</span>
            
            <div className="bg-pure-surface border border-whisper-border text-muted-steel px-3 py-1 rounded-full text-xs font-mono lowercase">
              @{username}
            </div>

            <Link href="/terms" className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-whisper-border rounded-md text-xs text-muted-steel hover:text-ghost-white hover:bg-canvas-night/50 transition-colors">
              <Info className="w-3.5 h-3.5" />
              Points System
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4">
          <LiveClock />

          <Link href={`/pr-tracker/${username}`} className="flex items-center gap-2 px-3 py-1.5 border border-whisper-border rounded-md text-xs font-medium text-ghost-white hover:bg-pure-surface transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </Link>

          <a href="https://github.com/PRODHOSH/gssoc-tracker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-md text-xs font-bold hover:bg-primary/20 transition-colors">
            <Star className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Star</span>
          </a>
        </div>
      </div>
    </header>
  );
}
