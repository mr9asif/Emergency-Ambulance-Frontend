"use client";

import React from "react";
import { useAvailableAmbulances } from "@/features/dispatch/hooks/useDispatchQueries";
import { Ambulance, MapPin, Loader2 } from "lucide-react";

export default function DispatcherAmbulancesPage() {
  const { data: ambulances = [], isLoading } = useAvailableAmbulances();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Ambulance className="h-6 w-6 text-emerald-600" />
            Ambulances on Standby
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Units ready for immediate emergency dispatch.
          </p>
        </div>
        <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          {ambulances.length} Units Available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-3 p-12 text-center text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-emerald-600" />
            Loading available units...
          </div>
        ) : ambulances.length === 0 ? (
          <div className="col-span-3 p-12 text-center text-slate-400">
            No standby ambulances available right now.
          </div>
        ) : (
          ambulances.map((amb) => (
            <div
              key={amb.id}
              className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-all dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                  {amb.registrationNumber}
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  {amb.ambulanceType}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>Base: {amb.baseHospital?.name || "Main Emergency Hospital"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
