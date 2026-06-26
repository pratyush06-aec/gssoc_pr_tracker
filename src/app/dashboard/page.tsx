import React from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";
import { HomeFooter } from "@/components/home/HomeFooter";

export default function DashboardPage() {
  return (
    <div className="bg-background text-ghost-white min-h-screen font-sans flex flex-col overflow-x-hidden">
      <DashboardNavbar />
      
      <main className="pt-24 pb-16 px-8 max-w-[1200px] mx-auto w-full flex-1 space-y-8">
        <DashboardHeader />
        <DashboardStats />
        <DashboardCharts />
        <DashboardActivity />
      </main>

      <HomeFooter />
    </div>
  );
}
