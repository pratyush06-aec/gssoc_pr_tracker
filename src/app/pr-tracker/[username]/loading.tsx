import { ds } from "@/lib/ds";

function Bone({ w = "100%", h = 16, r = 6 }: { w?: string | number; h?: number; r?: number }) {
  return (
    <div
      className="skeleton"
      style={{
        width: w, height: h, borderRadius: r,
        background: "#ebebeb",
      }}
    />
  );
}

export default function PRTrackerLoading() {
  return (
    <div style={{ minHeight: "100vh", background: ds.canvasSoft, fontFamily: "var(--font-sans)" }}>
      {/* Nav skeleton */}
      <div style={{
        background: ds.canvas, borderBottom: `1px solid ${ds.hairlineCool}`,
        padding: "0 20px", height: 52,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Bone w={60} h={14} />
        <Bone w={120} h={14} />
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 48px" }}>
        {/* Profile card skeleton */}
        <div style={{
          background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
          borderRadius: ds.rLg, padding: "20px 24px",
          display: "flex", gap: 20, marginBottom: 16,
        }}>
          <div className="skeleton" style={{ width: 68, height: 68, borderRadius: "50%", background: ds.canvasSoft, flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <Bone w={200} h={22} />
            <Bone w={100} h={18} />
            <Bone w={320} h={14} />
            <div style={{ display: "flex", gap: 12 }}>
              <Bone w={80} h={12} />
              <Bone w={80} h={12} />
              <Bone w={80} h={12} />
            </div>
          </div>
          <Bone w={110} h={80} />
        </div>

        {/* Stats grid skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 16 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
              background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
              borderRadius: ds.rLg, padding: "16px 18px",
            }}>
              <Bone w={30} h={30} r={8} />
              <div style={{ marginTop: 10 }}>
                <Bone w="70%" h={26} />
                <div style={{ marginTop: 5 }}><Bone w="50%" h={12} /></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 12, marginBottom: 12 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{
              background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
              borderRadius: ds.rLg, padding: "18px 20px",
            }}>
              <Bone w={160} h={16} />
              <div style={{ marginTop: 14 }}><Bone w="100%" h={200} /></div>
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div style={{
          background: ds.canvas, border: `1px solid ${ds.hairlineCool}`,
          borderRadius: ds.rLg, overflow: "hidden",
        }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${ds.hairlineCool}`, display: "flex", justifyContent: "space-between" }}>
            <Bone w={120} h={16} />
            <Bone w={200} h={32} />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              padding: "12px 18px",
              borderBottom: i < 5 ? `1px solid ${ds.hairlineCool}` : "none",
              display: "flex", gap: 12, alignItems: "center",
            }}>
              <Bone w="30%" h={14} />
              <Bone w="15%" h={14} />
              <Bone w="20%" h={14} />
              <Bone w="10%" h={14} />
              <Bone w="10%" h={14} />
              <Bone w="8%" h={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
