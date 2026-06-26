import React from "react";

function Bone({ w = "100%", h = 16, r = 6 }: { w?: string | number; h?: number; r?: number }) {
  return (
    <div
      className="animate-pulse bg-muted-steel/20"
      style={{
        width: w, height: h, borderRadius: r,
      }}
    />
  );
}

export default function PRTrackerLoading() {
  return (
    <div className="bg-background min-h-screen font-sans flex flex-col">
      {/* Nav skeleton */}
      <div className="bg-canvas-night border-b border-whisper-border px-6 md:px-12 h-16 flex justify-between items-center w-full sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Bone w={150} h={24} />
          <Bone w={80} h={14} />
        </div>
        <div className="flex items-center gap-4">
          <Bone w={100} h={32} />
          <Bone w={80} h={32} />
        </div>
      </div>

      <div className="pt-24 pb-16 max-w-[1200px] mx-auto px-8 w-full flex-1">
        {/* Profile card skeleton */}
        <div className="bg-pure-surface border border-whisper-border rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8">
          <div className="flex items-center gap-6">
            <div className="animate-pulse bg-muted-steel/20" style={{ width: 80, height: 80, borderRadius: "50%", flexShrink: 0 }} />
            <div className="flex flex-col gap-3">
              <Bone w={250} h={28} />
              <Bone w={120} h={20} />
              <div className="flex gap-4 mt-2">
                <Bone w={60} h={14} />
                <Bone w={80} h={14} />
                <Bone w={70} h={14} />
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <Bone w={60} h={12} />
            <Bone w={120} h={40} />
          </div>
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-pure-surface border border-whisper-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Bone w={80} h={12} />
                <Bone w={20} h={20} r={4} />
              </div>
              <Bone w={60} h={32} />
              <div className="mt-2"><Bone w={120} h={12} /></div>
            </div>
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[0, 1].map((i) => (
            <div key={i} className="bg-pure-surface border border-whisper-border rounded-xl p-6">
              <div className="mb-6"><Bone w={140} h={16} /></div>
              <div className="flex justify-center"><Bone w={200} h={200} r={100} /></div>
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-pure-surface border border-whisper-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-whisper-border flex justify-between items-center">
            <Bone w={150} h={20} />
            <Bone w={250} h={36} />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`p-5 flex gap-4 items-center ${i < 4 ? 'border-b border-whisper-border' : ''}`}>
              <Bone w="35%" h={16} />
              <Bone w="15%" h={16} />
              <Bone w="20%" h={24} />
              <Bone w="15%" h={16} />
              <Bone w="15%" h={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
