"use client";

import React from "react";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { AdminCharts } from "@/features/admin/components/AdminCharts";
import { AdminStats } from "@/features/admin/components/AdminStats";
import { BarChart3 } from "lucide-react";

export default function AdminReportsPage() {
  const { data: stats, isLoading } = useAdminDashboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-purple-600" />
          Platform Analytics & Reports
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Detailed telemetry, mission completion benchmarks, and fleet efficiency reports.
        </p>
      </div>

      <AdminStats stats={stats} isLoading={isLoading} />
      <AdminCharts stats={stats} />
    </div>
  );
}
