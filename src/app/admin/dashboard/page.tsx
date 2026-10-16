"use client";

import React from "react";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { AdminStats } from "@/features/admin/components/AdminStats";
import { AdminCharts } from "@/features/admin/components/AdminCharts";
import { OperatorApplicationsTable } from "@/features/admin/components/OperatorApplicationsTable";
import { UsersManagementTable } from "@/features/admin/components/UsersManagementTable";
import { ShieldAlert, RefreshCw, Sparkles, Building2, Ambulance, Truck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const { data: dashboardStats, isLoading, isFetching } = useAdminDashboard();

  const handleSyncAll = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    queryClient.invalidateQueries({ queryKey: ["operator-applications"] });
    queryClient.invalidateQueries({ queryKey: ["admin-users"] });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Quick Operations Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-purple-100 p-1.5 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight dark:text-white">
              System Administration
            </h1>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Global monitoring of fleet capacity, dispatch reliability, user accounts, and verification queues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSyncAll}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin text-purple-600" : "text-slate-400"}`}
            />
            Refresh Telemetry
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <AdminStats stats={dashboardStats} isLoading={isLoading} />

      {/* Analytical Charts */}
      <AdminCharts stats={dashboardStats} />

      {/* Operator Applications Review Queue */}
      <OperatorApplicationsTable />

      {/* User Directory Management */}
      <UsersManagementTable />
    </div>
  );
}
