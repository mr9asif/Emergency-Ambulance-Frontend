"use client";

import React from "react";
import type { DispatchAssignment } from "../types/dispatch.types";
import {
  Radio,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Ambulance,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

interface LiveOffersTableProps {
  offers: DispatchAssignment[];
  isLoading: boolean;
}

export function LiveOffersTable({ offers, isLoading }: LiveOffersTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/20">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Driver Accepted
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-rose-600/20">
            <XCircle className="h-3.5 w-3.5 text-rose-600" /> Rejected
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            <Clock className="h-3.5 w-3.5" /> Expired
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-600/20">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            Offered (Pending Driver)
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Radio className="h-5 w-5 text-indigo-600" />
            Dispatch Transmission Log
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status of ambulance assignment offers
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl dark:bg-slate-800">
          {offers.length} Recorded Transmissions
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <th className="px-6 py-4">Emergency Incident</th>
              <th className="px-6 py-4">Assigned Unit & Driver</th>
              <th className="px-6 py-4">Offered At</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Response Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-indigo-500" />
                  Loading dispatch history...
                </td>
              </tr>
            ) : offers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-12 text-center text-slate-400">
                  <Radio className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
                  <p className="font-semibold text-slate-600 dark:text-slate-400">
                    No dispatches transmitted yet
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    When you deploy an ambulance to an emergency, it will track here.
                  </p>
                </td>
              </tr>
            ) : (
              offers.map((offer) => (
                <tr
                  key={offer.id}
                  className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {offer.emergencyRequest?.pickupAddress || "Emergency Location"}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Patient: {offer.emergencyRequest?.patient?.name || "Emergency Patient"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 dark:text-slate-200">
                        <Ambulance className="h-3.5 w-3.5 text-blue-600" />
                        {offer.ambulance?.registrationNumber || "Ambulance Unit"} (
                        {offer.ambulance?.ambulanceType || "BASIC"})
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <User className="h-3 w-3 text-slate-400" />
                        {offer.driver?.user?.name || "Driver"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {offer.offeredAt
                      ? format(new Date(offer.offeredAt), "hh:mm:ss a, MMM d")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(offer.status)}</td>
                  <td className="px-6 py-4 text-xs">
                    {offer.rejectionReason ? (
                      <span className="text-rose-600 font-medium">
                        "{offer.rejectionReason}"
                      </span>
                    ) : offer.respondedAt ? (
                      <span className="text-slate-500">
                        Responded at{" "}
                        {format(new Date(offer.respondedAt), "hh:mm:ss a")}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Awaiting driver acknowledgment</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
