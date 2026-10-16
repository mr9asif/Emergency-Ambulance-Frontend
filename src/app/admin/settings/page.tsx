"use client";

import React from "react";
import { Settings, ShieldCheck, Database, Bell, Lock } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-slate-700" />
          System Settings & Policies
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Configure dispatch thresholds, notification webhooks, and security policies.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 space-y-6 dark:bg-slate-900 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-600" />
            Dispatch Parameters
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Standard time-to-respond timeout before emergency reassignment.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Driver Response Window
              </label>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                10 Minutes (600s)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Assignments automatically expire if driver does not acknowledge.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Geofence Auto-Proximity
              </label>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                Haversine Distance (KM)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Nearest emergency-capable hospital priority calculation.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Telemetry Status
          </h3>
          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              API Gateways Operational
            </span>
            <span className="text-xs text-slate-400">REST + WebSocket Services</span>
          </div>
        </div>
      </div>
    </div>
  );
}
