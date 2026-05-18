import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ds } from "@/lib/ds";

export default function PRTrackerNotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: ds.canvasSoft,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-sans)",
    }}>
      <div style={{
        background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
        borderRadius: ds.rLg, padding: "40px 48px", textAlign: "center", maxWidth: 440,
        boxShadow: "0 1px 4px rgba(23,23,23,0.06)",
      }}>
        <p style={{ margin: "0 0 4px", fontSize: 11, color: ds.inkMute2, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
          GSSoC PR Tracker
        </p>
        <h1 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 600, color: ds.ink }}>
          User not found
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: ds.inkMute, lineHeight: 1.6 }}>
          This GitHub username doesn&apos;t exist or the GitHub API couldn&apos;t find it.
        </p>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "8px 18px", borderRadius: ds.rSm,
          background: ds.primary, color: ds.onPrimary,
          textDecoration: "none", fontSize: 14, fontWeight: 500,
        }}>
          <ArrowLeft size={14} /> Try another username
        </Link>
      </div>
    </div>
  );
}
