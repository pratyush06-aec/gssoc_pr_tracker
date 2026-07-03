"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, GitPullRequest, Info, RefreshCw, Star, GripVertical, Shield } from "lucide-react";
import { LiveClock } from "@/components/pr-tracker/LiveClock";
import { motion, useMotionValue, animate } from "framer-motion";
import { HomePointsGuide } from "@/components/HomePointsGuide";

export function TrackerNavbar({ username }: { username: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      // Assuming max-w-[1100px], calculate bounds to keep it within the viewport
      const navWidth = Math.min(window.innerWidth - 32, 1100); 
      const xMax = (window.innerWidth - navWidth) / 2;
      setConstraints({
        left: -xMax,
        right: xMax,
        top: -10, // Sticky top is 24px (top-6), so allow a little upward drag
        bottom: window.innerHeight - 100, // Prevent dragging off the bottom
      });
    };
    
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Take exactly 5 seconds to return to the original position
    animate(x, 0, { duration: 5, ease: "easeInOut" });
    animate(y, 0, { duration: 5, ease: "easeInOut" });
  };

  return (
    <div className="sticky top-6 z-50 flex justify-center w-full pointer-events-none px-4">
      <motion.header 
        style={{ x, y }}
        drag
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={constraints}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={{ 
          maxWidth: isDragging ? "900px" : "1100px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto backdrop-blur-md rounded-full border border-whisper-border shadow-[0_8px_30px_rgba(0,0,0,0.12)] h-16 flex items-center justify-between w-full px-2 sm:px-4 cursor-grab ${isDragging ? 'bg-background/10' : 'bg-background/30'}`}
      >
        {/* Left Side */}
        <div className="flex items-center gap-2 md:gap-4 h-full">
          <div className="text-muted-steel/40 hover:text-muted-steel/80 transition-colors px-1 h-full flex items-center justify-center">
            <GripVertical className="w-5 h-5" />
          </div>

          <Link href="/" className="flex items-center gap-2 text-sm text-muted-steel hover:text-ghost-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Search</span>
          </Link>
          
          <div className="w-px h-6 bg-whisper-border hidden md:block"></div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-primary/10 text-primary p-1.5 rounded-full border border-primary/20">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-ghost-white hidden sm:inline">GSSoC PR Tracker</span>
            
            <div className="bg-pure-surface border border-whisper-border text-muted-steel px-3 py-1 rounded-full text-xs font-mono lowercase">
              @{username}
            </div>

            <div className="hidden lg:block">
              <HomePointsGuide />
            </div>

            <Link href="/terms" className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-whisper-border rounded-full text-xs text-muted-steel hover:text-ghost-white hover:bg-canvas-night/50 transition-colors">
              <Shield className="w-3.5 h-3.5" />
              Terms &amp; Privacy
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:block">
            <LiveClock />
          </div>

          <Link href={`/pr-tracker/${username}`} className="flex items-center gap-2 px-3 py-1.5 border border-whisper-border rounded-full text-xs font-medium text-ghost-white hover:bg-pure-surface transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </Link>

          <a href="https://github.com/PRODHOSH/gssoc-tracker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold hover:bg-primary/20 transition-colors">
            <Star className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Star</span>
          </a>
        </div>
      </motion.header>
    </div>
  );
}
