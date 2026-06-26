"use client";
import { useState, FormEvent } from "react";
import { Loader2, Link2, CheckCircle2, XCircle, Clock } from "lucide-react";

/* ── Types ── */
type Verdict = "valid" | "pending" | "not_approved" | "flagged" | "closed" | "unofficial";

interface PrLabel { name: string; color: string; }

interface PrCheckResult {
  pr: {
    number: number; title: string; url: string;
    repo: string; repoUrl: string;
    author: string; authorUrl: string; authorAvatar: string;
    state: "merged" | "open" | "closed";
    mergedAt: string | null; createdAt: string;
    labels: PrLabel[];
  };
  verdict: Verdict;
  isOfficialRepo: boolean;
  points: number;
  scoring: {
    base: number;
    difficultyLabel: string | null; difficultyScore: number; usedDefaultDiff: boolean;
    qualityLabel: string | null; qualityMultiplier: number; qualityBonus: number; qualityDowngraded: boolean;
    typeBonuses: string[]; typeBonusTotal: number; total: number;
  };
  flags: { hasApproved: boolean; invalidLabel: string | null; isMerged: boolean; isOfficial: boolean; };
}

/* ── Verdict config ── */
const VERDICT_META: Record<Verdict, { color: string; bg: string; border: string; title: string; label: string; }> = {
  valid: { color: "text-green-500", bg: "bg-green-500", border: "border-green-500", title: "Valid", label: "VALID" },
  pending: { color: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500", title: "Pending merge", label: "PENDING" },
  not_approved: { color: "text-red-500", bg: "bg-red-500", border: "border-red-500", title: "Not approved", label: "INVALID" },
  flagged: { color: "text-red-500", bg: "bg-red-500", border: "border-red-500", title: "Flagged", label: "FLAGGED" },
  closed: { color: "text-muted-steel", bg: "bg-muted-steel", border: "border-whisper-border", title: "Closed without merge", label: "CLOSED" },
  unofficial: { color: "text-red-500", bg: "bg-red-500", border: "border-red-500", title: "Not an official repo", label: "UNOFFICIAL" },
};

export function PrChecker() {
  const [urlInput, setUrlInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<PrCheckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function check(e: FormEvent) {
    e.preventDefault();
    const val = urlInput.trim();
    if (!val) return;

    setPhase("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/pr-check?url=${encodeURIComponent(val)}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setPhase("error");
        return;
      }

      setResult(data as PrCheckResult);
      setPhase("success");
    } catch {
      setErrorMsg("Could not reach the server. Check your connection.");
      setPhase("error");
    }
  }

  const vm = result ? VERDICT_META[result.verdict] : null;

  return (
    <div className="space-y-6">
      {/* Input */}
      <section className="bg-pure-surface border border-whisper-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 rounded-lg">
        <label className="block font-mono text-[11px] font-bold text-muted-steel mb-4 uppercase tracking-widest">
          GITHUB PULL REQUEST URL
        </label>
        <form onSubmit={check} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-steel w-5 h-5" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); if (phase === "error") setPhase("idle"); }}
              className={`w-full pl-12 pr-4 py-3 bg-canvas-night/5 border ${phase === "error" ? 'border-red-500' : 'border-whisper-border'} rounded-md focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm transition-all outline-none text-ghost-white`}
              placeholder="https://github.com/org/repo/pull/123"
            />
          </div>
          <button
            type="submit"
            disabled={phase === "loading" || !urlInput.trim()}
            className="px-8 py-3 bg-primary text-white font-mono text-[11px] font-bold uppercase tracking-widest rounded-md hover:bg-primary-deep transition-all active:-translate-y-px whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {phase === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> VALIDATING...</> : "VALIDATE PR"}
          </button>
        </form>
        {phase === "error" && (
          <p className="font-sans text-sm text-red-500 mt-4">{errorMsg}</p>
        )}
      </section>

      {/* Results */}
      {phase === "success" && result && vm && (
        <section className={`bg-pure-surface overflow-hidden rounded-lg border border-whisper-border border-t-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${vm.border}`}>
          <div className="p-8 border-b border-whisper-border flex justify-between items-center bg-canvas-night/5">
            <div>
              <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">VALIDATION STATUS</span>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-3 h-3 rounded-full ${vm.bg}`}></span>
                <h2 className={`font-display text-2xl font-bold uppercase tracking-wider ${vm.color}`}>{vm.label}</h2>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-[11px] font-bold text-muted-steel uppercase tracking-widest">CALCULATED SCORE</span>
              <div className={`font-display text-4xl font-extrabold ${result.scoring.total > 0 ? 'text-primary' : 'text-muted-steel'}`}>
                +{result.scoring.total} <span className="text-base font-mono uppercase tracking-widest">PTS</span>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[11px] font-bold text-muted-steel block border-b border-whisper-border pb-1 mb-2 uppercase tracking-widest">REPOSITORY</span>
                <a href={result.pr.repoUrl} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-ghost-white hover:text-primary transition-colors">
                  {result.pr.repo}
                </a>
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-muted-steel block border-b border-whisper-border pb-1 mb-2 uppercase tracking-widest">AUTHOR</span>
                <a href={result.pr.authorUrl} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-ghost-white hover:text-primary transition-colors flex items-center gap-2 mt-1">
                  <img src={result.pr.authorAvatar} alt="" className="w-5 h-5 rounded-full" />
                  @{result.pr.author}
                </a>
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-muted-steel block border-b border-whisper-border pb-1 mb-2 uppercase tracking-widest">PR TITLE</span>
                <a href={result.pr.url} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-ghost-white hover:text-primary transition-colors block">
                  {result.pr.title}
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[11px] font-bold text-muted-steel block border-b border-whisper-border pb-1 mb-2 uppercase tracking-widest">MERGED STATUS</span>
                <div className={`flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest ${result.flags.isMerged ? 'text-green-500' : result.pr.state === 'closed' ? 'text-muted-steel' : 'text-yellow-500'}`}>
                  {result.flags.isMerged ? <CheckCircle2 className="w-5 h-5" /> : result.pr.state === 'closed' ? <XCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  <span>{result.flags.isMerged ? "MERGED INTO MAIN" : result.pr.state === 'closed' ? "CLOSED" : "OPEN"}</span>
                </div>
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-muted-steel block border-b border-whisper-border pb-1 mb-2 uppercase tracking-widest">BENCHMARK LABELS</span>
                {result.pr.labels.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.pr.labels.map(l => (
                      <span key={l.name} className="px-2 py-0.5 bg-canvas-night/10 text-muted-steel border border-whisper-border font-mono text-[10px] font-bold rounded-sm uppercase tracking-widest">
                        {l.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="font-mono text-xs text-muted-steel">No labels</span>
                )}
              </div>
              
              {/* Feedback messages */}
              {!result.flags.hasApproved && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                   <p className="font-sans text-xs text-red-500">Missing gssoc:approved label. A GSSoC mentor needs to review and apply this label.</p>
                </div>
              )}
              {result.flags.invalidLabel && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                   <p className="font-sans text-xs text-red-500">Flagged as {result.flags.invalidLabel}. It scores 0 points.</p>
                </div>
              )}
              {!result.flags.isOfficial && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                   <p className="font-sans text-xs text-red-500">Repo is NOT part of the official GSSoC 2026 registered projects.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
