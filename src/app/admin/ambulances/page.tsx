"use client";

import React from "react";
import { useAdminAmbulances } from "@/features/admin/hooks/useAdminResources";
import { Ambulance, Building2, Wrench, CheckCircle, Clock, Loader2 } from "lucide-react";

export default function AdminAmbulancesPage() {
  const { data: ambulances = [], isLoading } = useAdminAmbulances();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available
          </span>
        );
      case "BUSY":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
            <Clock className="h-3 w-3" /> En Route
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700">
            <Wrench className="h-3 w-3" /> Maintenance
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Ambulance className="h-6 w-6 text-emerald-600" />
            Ambulance Fleet
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Registered medical emergency vehicles, equipment types, and station assignments.
          </p>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {ambulances.length} Registered Units
        </span>
      </div>

      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="px-6 py-4">Registration</th>
                <th className="px-6 py-4">Type / Capability</th>
                <th className="px-6 py-4">Base Hospital</th>
                <th className="px-6 py-4">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-emerald-600" />
                    Loading ambulance fleet...
                  </td>
                </tr>
              ) : ambulances.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">
                    <Ambulance className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
                    No ambulances registered yet.
                  </td>
                </tr>
              ) : (
                ambulances.map((amb) => (
                  <tr
                    key={amb.id}
                    className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">
                      {amb.registrationNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {amb.ambulanceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        {amb.baseHospital?.name || "Unassigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(amb.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
