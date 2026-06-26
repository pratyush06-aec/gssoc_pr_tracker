import React from "react";
import Link from "next/link";

export interface HomeFooterProps {}

export function HomeFooter({}: Readonly<HomeFooterProps>) {
  return (
    <footer className="bg-canvas-night border-t border-whisper-border w-full py-8 mt-auto z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-[1200px] mx-auto gap-4">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-steel">
          © 2026 TERMINAL SYSTEMS ARCHITECTURE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-muted-steel">
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
