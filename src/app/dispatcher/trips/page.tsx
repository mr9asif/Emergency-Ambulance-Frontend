"use client";

import React from "react";
import { useAllTrips } from "@/features/dispatch/hooks/useDispatchQueries";
import { Truck, CheckCircle, Clock, Loader2, Ambulance, User } from "lucide-react";
import { format } from "date-fns";

export default function DispatcherTripsPage() {
  const { data: trips = [], isLoading } = useAllTrips();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            <CheckCircle className="h-3 w-3 text-emerald-500" /> Completed
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="h-6 w-6 text-indigo-600" />
            Active Fleet Missions & Trips
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Real-time transit stages and journey progress.
          </p>
        </div>
        <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
          {trips.length} Total Trips
        </span>
      </div>

      <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="px-6 py-4">Trip Code</th>
                <th className="px-6 py-4">Ambulance</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Transit Status</th>
                <th className="px-6 py-4">Initiated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-indigo-600" />
                    Loading active journeys...
                  </td>
                </tr>
              ) : trips.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No trips recorded.
                  </td>
                </tr>
              ) : (
                trips.map((trip: any) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">
                      {trip.tripNumber || trip.id?.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Ambulance className="h-3.5 w-3.5 text-blue-600" />
                        {trip.ambulance?.registrationNumber || "Ambulance"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3 w-3 text-slate-400" />
                        {trip.driver?.user?.name || "Driver"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(trip.status)}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {trip.createdAt
                        ? format(new Date(trip.createdAt), "hh:mm a, MMM d")
                        : "N/A"}
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
