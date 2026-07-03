import React from "react";
import Link from "next/link";

export interface HomeFooterProps {}

export function HomeFooter({}: Readonly<HomeFooterProps>) {
  return (
    <footer className="bg-canvas-night/60 w-fit mx-auto py-3 px-6 mt-auto mb-6 z-10 border border-whisper-border rounded-full backdrop-blur-md shadow-lg shadow-black/20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-steel">
          © 2026 TERMINAL SYSTEMS ARCHITECTURE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-steel">
          <Link href="/terms" className="hover:text-ghost-white transition-opacity duration-300">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ghost-white transition-opacity duration-300">
            Terms
          </Link>
          <Link href="https://github.com/PRODHOSH/gssoc-tracker" className="hover:text-ghost-white transition-opacity duration-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
