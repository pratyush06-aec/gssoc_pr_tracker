import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GitPullRequest, Clock, AlertTriangle, Star } from "lucide-react";
import { ds, fontMono } from "@/lib/ds";
import { buildPRTrackerData } from "@/lib/pr-tracker";
import { GitHubProfileCard } from "@/components/pr-tracker/GitHubProfileCard";
import { StatsGrid } from "@/components/pr-tracker/StatsGrid";
import { DifficultyChart } from "@/components/pr-tracker/DifficultyChart";
import { PointsTimeline } from "@/components/pr-tracker/PointsTimeline";
import { LabelsPieChart } from "@/components/pr-tracker/LabelsPieChart";
import { PRTable } from "@/components/pr-tracker/PRTable";
import type { PRTrackerData } from "@/types/pr-tracker";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function PRTrackerDashboard({ params }: Props) {
  const { username } = await params;
  const decoded = decodeURIComponent(username);

  let data: PRTrackerData | null = null;
  let errorCode: string | null = null;

  try {
    data = await buildPRTrackerData(decoded);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "USER_NOT_FOUND") return notFound();
    errorCode = msg.startsWith("RATE_LIMITED") ? "RATE_LIMITED" : "API_ERROR";
  }

  if (errorCode) {
    return <ErrorPage username={decoded} code={errorCode} />;
  }

  if (!data) return notFound();

  const fetchedDate = new Date(data.fetchedAt).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div style={{ minHeight: "100vh", background: ds.canvasSoft, fontFamily: "var(--font-sans)" }}>
      {/* Nav */}
      <div style={{
        background: ds.canvas,
        borderBottom: `1px solid ${ds.hairlineCool}`,
        padding: "0 20px",
        height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 3px rgba(23,23,23,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: 4,
            color: ds.inkMute, textDecoration: "none", fontSize: 13,
          }}>
            <ArrowLeft size={14} />
            Search
          </Link>
          <span style={{ color: ds.hairline }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GitPullRequest size={14} color={ds.primary} />
            <span style={{ fontSize: 14, fontWeight: 600, color: ds.ink }}>GSSoC PR Tracker</span>
            <span style={{ fontSize: 12, color: ds.inkMute2, fontFamily: fontMono }}>@{data.user.login}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: ds.inkMute2 }}>
            <Clock size={11} /> {fetchedDate}
          </span>
          <a
            href="https://github.com/PRODHOSH/gssoc-tracker"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "5px 12px", borderRadius: ds.rSm,
              border: `1px solid ${ds.hairline}`,
              fontSize: 12, fontWeight: 500, color: ds.inkMute,
              textDecoration: "none", background: ds.canvas,
            }}
          >
            <Star size={12} />
            Star
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 60px" }}>
        {/* Profile */}
        <GitHubProfileCard
          user={data.user}
          rank={data.rank}
          totalPoints={data.totalPoints}
        />

        {/* Stats */}
        <StatsGrid data={data} />

        {/* No PRs found message */}
        {data.allPRs.length === 0 && (
          <div style={{
            background: "rgba(245,158,11,0.04)",
            border: `1px solid rgba(245,158,11,0.2)`,
            borderRadius: ds.rMd,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <AlertTriangle size={14} color="#f59e0b" />
            <p style={{ margin: 0, fontSize: 13, color: ds.inkMute }}>
              No GSSoC PRs with{" "}
              <code style={{ fontFamily: fontMono, fontSize: 12, color: ds.ink }}>gssoc:approved</code>{" "}
              label found for <strong>@{data.user.login}</strong>.
            </p>
          </div>
        )}

        {/* Charts row */}
        {data.allPRs.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 12,
              marginBottom: 12,
            }}>
              <PointsTimeline validPRs={data.validPRs} />
              <LabelsPieChart allPRs={data.allPRs} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <DifficultyChart validPRs={data.validPRs} />
            </div>
          </>
        )}

        {/* PR table */}
        <div style={{ marginBottom: 12 }}>
          <PRTable prs={data.allPRs} username={data.user.login} />
        </div>

        {/* Info note */}
        <div style={{
          background: ds.canvas,
          border: `1px solid ${ds.hairlineCool}`,
          borderRadius: ds.rMd,
          padding: "12px 16px",
          marginBottom: 24,
        }}>
          <p style={{ margin: 0, fontSize: 12, color: ds.inkMute2, lineHeight: 1.6 }}>
            <strong style={{ color: ds.inkMute }}>How points are calculated:</strong>{" "}
            Formula: <code style={{ fontFamily: fontMono, fontSize: 11 }}>50 + (difficulty × quality) + type_bonus</code>.
            Every merged <code style={{ fontFamily: fontMono, fontSize: 11 }}>gssoc:approved</code> PR gets a base of 50 pts.
            PRs with <code style={{ fontFamily: fontMono, fontSize: 11 }}>gssoc:invalid</code>,{" "}
            <code style={{ fontFamily: fontMono, fontSize: 11 }}>gssoc:spam</code>, or{" "}
            <code style={{ fontFamily: fontMono, fontSize: 11 }}>gssoc:ai-slop</code> earn 0 points.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: ds.inkFaint }}>
          GSSoC 2026 PR Tracker ·{" "}
          <a href="https://gssoc.girlscript.org" target="_blank" rel="noopener noreferrer" style={{ color: ds.inkMute2 }}>
            gssoc.girlscript.org
          </a>
        </p>
      </div>
    </div>
  );
}

/* ── Error page ───────────────────────────────────────────────── */
function ErrorPage({ username, code }: { username: string; code: string }) {
  const isRateLimit = code === "RATE_LIMITED";
  return (
    <div style={{
      minHeight: "100vh", background: ds.canvasSoft,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{
        background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
        borderRadius: ds.rLg, padding: "40px 48px", textAlign: "center", maxWidth: 460,
        boxShadow: "0 1px 4px rgba(23,23,23,0.06)",
      }}>
        <p style={{ margin: "0 0 4px", fontSize: 11, color: ds.inkMute2, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
          GSSoC PR Tracker
        </p>
        <h1 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 600, color: ds.ink }}>
          {isRateLimit ? "Rate limit reached" : "Something went wrong"}
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: ds.inkMute, lineHeight: 1.6 }}>
          {isRateLimit
            ? "GitHub API rate limit exceeded. Set a GITHUB_TOKEN environment variable to increase the limit, or try again in a few minutes."
            : `Failed to fetch PR data for @${username}. The GitHub API may be temporarily unavailable.`}
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 18px", borderRadius: ds.rSm,
            background: ds.primary, color: ds.onPrimary,
            textDecoration: "none", fontSize: 14, fontWeight: 500,
          }}>
            <ArrowLeft size={14} /> Try again
          </Link>
        </div>
      </div>
    </div>
  );
}
