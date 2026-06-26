"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

export function QuickFeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const emojis = ["😞", "😕", "😐", "🙂", "🤩"];

  return (
    <div className="fixed bottom-6 right-6 w-[320px] bg-pure-surface rounded-2xl shadow-2xl z-50 overflow-hidden font-sans border border-whisper-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-whisper-border">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-1.5 rounded-lg border border-primary/20">
            <MessageSquare size={14} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-ghost-white text-[15px]">Quick feedback</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-muted-steel hover:text-ghost-white transition-colors">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-muted-steel/80 text-[15px] mb-4">How useful is GSSoC Tracker for you?</p>
        
        <div className="flex justify-between gap-2 mb-5">
          {emojis.map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedEmoji(idx)}
              className={`w-11 h-11 flex items-center justify-center text-xl rounded-xl border transition-all ${
                selectedEmoji === idx 
                  ? "border-primary bg-primary/10 scale-110 shadow-sm" 
                  : "border-whisper-border bg-canvas-night/50 hover:bg-canvas-night hover:border-whisper-border"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Any suggestions? (optional)"
          className="w-full text-[14px] p-3 border border-whisper-border rounded-xl resize-none h-[80px] mb-4 bg-canvas-night/50 text-ghost-white placeholder:text-muted-steel/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />

        <div className="flex gap-3">
          <button
            disabled={selectedEmoji === null}
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
              selectedEmoji !== null 
                ? "bg-primary text-canvas-night hover:bg-primary/90 shadow-sm" 
                : "bg-canvas-night text-muted-steel/50 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-muted-steel border border-whisper-border hover:bg-canvas-night/50 hover:text-ghost-white transition-colors"
          >
            Don't ask
          </button>
        </div>
      </div>
    </div>
  );
}
