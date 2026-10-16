"use client";

import React from "react";
import type { AdminDashboardData } from "../types/admin.types";
import {
  Users,
  Ambulance,
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Wrench,
  UserCheck,
} from "lucide-react";

interface AdminStatsProps {
  stats?: AdminDashboardData;
  isLoading: boolean;
}

export function AdminStats({ stats, isLoading }: AdminStatsProps) {
  const users = stats?.users;
  const ambulances = stats?.ambulances;
  const trips = stats?.trips;

  const ambulanceAvailabilityPercent =
    ambulances && ambulances.total > 0
      ? Math.round((ambulances.available / ambulances.total) * 100)
      : 0;

  const tripCompletionPercent =
    trips && trips.total > 0
      ? Math.round((trips.completed / trips.total) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Users Card */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              User Base
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : users?.total ?? 0}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25">
            <Users className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <UserCheck className="h-3 w-3" />
            {users?.customers ?? 0} Patients
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            <ShieldCheck className="h-3 w-3" />
            {users?.operators ?? 0} Operators
          </span>
        </div>
      </div>

      {/* Ambulance Fleet Readiness */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Fleet Readiness
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : `${ambulanceAvailabilityPercent}%`}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
            <Ambulance className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {ambulances?.available ?? 0} Ready
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            {ambulances?.busy ?? 0} En Route
          </span>
          {(ambulances?.maintenance ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
              <Wrench className="h-3 w-3" />
              {ambulances?.maintenance}
            </span>
          )}
        </div>
      </div>

      {/* Active & In-Progress Trips */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-rose-500/10 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Live Operations
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : trips?.inProgress ?? 0}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-lg shadow-rose-500/25">
            <Activity className="h-6 w-6 animate-pulse" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
            <Clock className="h-3 w-3" />
            Currently Active Trips
          </span>
          <span className="text-slate-400">of {trips?.total ?? 0} total</span>
        </div>
      </div>

      {/* Completed Missions */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Completed Trips
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : trips?.completed ?? 0}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold">
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            {tripCompletionPercent}% Success Rate
          </span>
          <span className="text-slate-400">
            {trips?.cancelled ?? 0} cancelled
          </span>
        </div>
      </div>
    </div>
  );
}
