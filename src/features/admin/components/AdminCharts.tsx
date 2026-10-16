"use client";

import React, { useEffect, useState } from "react";
import type { AdminDashboardData } from "../types/admin.types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

interface AdminChartsProps {
  stats?: AdminDashboardData;
}

export function AdminCharts({ stats }: AdminChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !stats) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 rounded-3xl bg-white border border-slate-100 p-6 shadow-xl shadow-slate-200/40 animate-pulse flex items-center justify-center text-slate-400">
          Loading analytics...
        </div>
        <div className="h-80 rounded-3xl bg-white border border-slate-100 p-6 shadow-xl shadow-slate-200/40 animate-pulse flex items-center justify-center text-slate-400">
          Loading fleet data...
        </div>
      </div>
    );
  }

  const tripsData = [
    { name: "Completed", value: stats.trips.completed, color: "#10B981" },
    { name: "In Progress", value: stats.trips.inProgress, color: "#F43F5E" },
    { name: "Cancelled", value: stats.trips.cancelled, color: "#94A3B8" },
  ];

  const fleetData = [
    { name: "Available", value: stats.ambulances.available, color: "#10B981" },
    { name: "En Route / Busy", value: stats.ambulances.busy, color: "#F59E0B" },
    { name: "Maintenance", value: stats.ambulances.maintenance, color: "#EF4444" },
  ];

  const usersData = [
    { name: "Patients", count: stats.users.customers, fill: "#3B82F6" },
    { name: "Operators", count: stats.users.operators, fill: "#6366F1" },
    { name: "Admins", count: stats.users.admins, fill: "#8B5CF6" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Fleet Readiness Donut Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Ambulance Fleet Status</h3>
            <p className="text-xs text-slate-500">Real-time vehicle readiness</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            {stats.ambulances.total} Total
          </span>
        </div>
        <div className="flex-1 min-h-[240px] pt-4">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={fleetData}
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {fleetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trips Execution Bar Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Trip Dispatch Volume</h3>
            <p className="text-xs text-slate-500">Operational outcome summary</p>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            {stats.trips.total} Recorded
          </span>
        </div>
        <div className="flex-1 min-h-[240px] pt-4">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tripsData} barSize={36}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {tripsData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Demographics */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Platform Users</h3>
            <p className="text-xs text-slate-500">Breakdown by system role</p>
          </div>
          <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            {stats.users.total} Total
          </span>
        </div>
        <div className="flex-1 min-h-[240px] pt-4">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={usersData} layout="vertical" barSize={22}>
              <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94A3B8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="count" radius={[0, 10, 10, 0]}>
                {usersData.map((entry, index) => (
                  <Cell key={`user-bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
