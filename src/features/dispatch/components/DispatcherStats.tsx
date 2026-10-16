"use client";

import React from "react";
import {
  Siren,
  Ambulance,
  UserCheck,
  Radio,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface DispatcherStatsProps {
  pendingCount: number;
  availableAmbulanceCount: number;
  availableDriverCount: number;
  activeOffersCount: number;
  isLoading: boolean;
}

export function DispatcherStats({
  pendingCount,
  availableAmbulanceCount,
  availableDriverCount,
  activeOffersCount,
  isLoading,
}: DispatcherStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Pending Triage Queue Card */}
      <div
        className={`group relative overflow-hidden rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
          pendingCount > 0
            ? "border-2 border-red-500 bg-red-50/50 shadow-red-500/10 dark:bg-red-950/20"
            : "border border-slate-100 bg-white shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800"
        }`}
      >
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-red-500/15 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              {pendingCount > 0 && (
                <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              )}
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Pending Triage
              </p>
            </div>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : pendingCount}
            </h3>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg ${
              pendingCount > 0
                ? "bg-gradient-to-tr from-red-600 to-rose-500 shadow-red-500/30 animate-bounce"
                : "bg-slate-400"
            }`}
          >
            <Siren className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          {pendingCount > 0 ? (
            <span className="text-red-600 font-bold dark:text-red-400">
              Immediate action required
            </span>
          ) : (
            <span className="text-emerald-600 font-semibold dark:text-emerald-400">
              All requests dispatched
            </span>
          )}
        </p>
      </div>

      {/* Available Ambulances */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:border-slate-800">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Fleet on Standby
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : availableAmbulanceCount}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25">
            <Ambulance className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ambulances Ready for Dispatch
          </span>
        </p>
      </div>

      {/* Available Drivers */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:border-slate-800">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-blue-500/15 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Drivers on Duty
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : availableDriverCount}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1 text-blue-600 font-bold dark:text-blue-400">
            Active certified personnel
          </span>
        </p>
      </div>

      {/* Active Dispatches */}
      <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:border-slate-800">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-indigo-500/15 blur-2xl transition-all group-hover:scale-150" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Dispatch Channels
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {isLoading ? "..." : activeOffersCount}
            </h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
            <Radio className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1 text-indigo-600 font-bold dark:text-indigo-400">
            Offers in response window
          </span>
        </p>
      </div>
    </div>
  );
}
