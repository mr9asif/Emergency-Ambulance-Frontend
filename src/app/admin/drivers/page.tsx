"use client";

import React from "react";
import { useAdminOperators } from "@/features/admin/hooks/useAdminResources";
import { ShieldCheck, Phone, Mail, CheckCircle, Clock, Loader2, User } from "lucide-react";
import { format } from "date-fns";

export default function AdminDriversPage() {
  const { data: operators = [], isLoading } = useAdminOperators();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
            Operator & Driver Profiles
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Registered certified emergency drivers, dispatchers, and staff credentials.
          </p>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {operators.length} Active Operators
        </span>
      </div>

      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="px-6 py-4">Operator Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">License / Employee Code</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Duty Status</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-indigo-600" />
                    Loading operator profiles...
                  </td>
                </tr>
              ) : operators.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    <User className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
                    No operators registered yet.
                  </td>
                </tr>
              ) : (
                operators.map((op) => (
                  <tr
                    key={op.id}
                    className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {op.user.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                        {op.operatorType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-600 dark:text-slate-300">
                      {op.licenseNumber ? `Lic: ${op.licenseNumber}` : op.employeeCode || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 font-mono">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {op.user.phone}
                        </div>
                        {op.user.email && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Mail className="h-3 w-3 text-slate-400" />
                            {op.user.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {op.isAvailable ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          On Standby
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                          <Clock className="h-3 w-3" /> Off Duty / Dispatched
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {op.createdAt ? format(new Date(op.createdAt), "MMM d, yyyy") : "N/A"}
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
