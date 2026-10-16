"use client";

import React from "react";
import { useAdminHospitals } from "@/features/admin/hooks/useAdminResources";
import { Building2, Phone, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function AdminHospitalsPage() {
  const { data: hospitals = [], isLoading } = useAdminHospitals();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            Hospital Directory
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Emergency medical centers, trauma facilities, and response coordinates.
          </p>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {hospitals.length} Medical Centers
        </span>
      </div>

      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="px-6 py-4">Hospital Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Emergency Facility</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
                    Loading hospitals...
                  </td>
                </tr>
              ) : hospitals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    <Building2 className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
                    No hospitals registered yet.
                  </td>
                </tr>
              ) : (
                hospitals.map((hosp) => (
                  <tr
                    key={hosp.id}
                    className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {hosp.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {hosp.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500" />
                        {hosp.address}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {hosp.hasEmergency ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle className="h-3 w-3 text-emerald-500" /> 24/7 ER Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                          Non-Emergency
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {hosp.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600">
                          <XCircle className="h-3.5 w-3.5" /> Inactive
                        </span>
                      )}
                    </td>
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
