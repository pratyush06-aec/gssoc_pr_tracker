import React from "react";
import { MentorNavbar } from "@/components/mentor/MentorNavbar";
import { MentorHeader } from "@/components/mentor/MentorHeader";
import { MentorStats } from "@/components/mentor/MentorStats";
import { MentorCharts } from "@/components/mentor/MentorCharts";
import { MentorPRTable } from "@/components/mentor/MentorPRTable";
import { HomeFooter } from "@/components/home/HomeFooter";
import type { MentorPR } from "@/lib/mentor-tracker";

// Mock data to preview the UI without live GitHub API
const MOCK_PRS: MentorPR[] = [
  {
    id: 1, number: 1042, title: "fix: documentation typo", url: "#", repo: "gssoc/web-app", repoUrl: "#",
    state: "open", mergedAt: null, createdAt: new Date().toISOString(), labels: ["gssoc:approved"], labelColors: {},
    levelLabel: "level:beginner", levelScore: 10, qualityLabel: null, qualityBonus: 0, points: 10
  },
  {
    id: 2, number: 1043, title: "feat: add analytics layer", url: "#", repo: "crimson/protocol-ui", repoUrl: "#",
    state: "open", mergedAt: null, createdAt: new Date().toISOString(), labels: ["invalid"], labelColors: {},
    levelLabel: "level:advanced", levelScore: 30, qualityLabel: null, qualityBonus: 0, points: 0
  },
  {
    id: 3, number: 1044, title: "refactor: api hooks", url: "#", repo: "gssoc/tracker", repoUrl: "#",
    state: "open", mergedAt: null, createdAt: new Date().toISOString(), labels: [], labelColors: {},
    levelLabel: "level:intermediate", levelScore: 20, qualityLabel: null, qualityBonus: 0, points: 0
  }
];

export default function MentorPage() {
  return (
    <div className="bg-background text-ghost-white min-h-screen font-sans flex flex-col overflow-x-hidden">
      <MentorNavbar />
      
      <main className="pt-24 pb-16 px-8 max-w-[1200px] mx-auto w-full flex-1">
        <MentorHeader />
        <MentorStats />
        <MentorCharts />
        <MentorPRTable prs={MOCK_PRS} />
      </main>

      <HomeFooter />
    </div>
  );
}
