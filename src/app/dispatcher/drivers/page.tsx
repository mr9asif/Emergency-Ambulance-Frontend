"use client";

import React from "react";
import { useAvailableDrivers } from "@/features/dispatch/hooks/useDispatchQueries";
import { Users, Phone, Loader2, ShieldCheck } from "lucide-react";

export default function DispatcherDriversPage() {
  const { data: drivers = [], isLoading } = useAvailableDrivers();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Ambulance Drivers on Duty
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Active drivers ready to accept dispatches.
          </p>
        </div>
        <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
          {drivers.length} Drivers On Duty
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-3 p-12 text-center text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
            Loading drivers on duty...
          </div>
        ) : drivers.length === 0 ? (
          <div className="col-span-3 p-12 text-center text-slate-400">
            No active ambulance drivers on duty right now.
          </div>
        ) : (
          drivers.map((driver) => (
            <div
              key={driver.id}
              className="rounded-3xl bg-white p-5 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-all dark:bg-slate-900 dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 font-bold dark:bg-blue-950/60 dark:text-blue-400">
                  {driver.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {driver.user.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-mono mt-0.5">
                    <Phone className="h-3 w-3" />
                    {driver.user.phone}
                  </div>
                </div>
              </div>
              {driver.licenseNumber && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Lic: {driver.licenseNumber}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold font-sans">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ready
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
