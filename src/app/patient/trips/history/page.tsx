"use client";

import { useMyTripHistory } from "@/features/trip/hooks/useMyTripHistory";
import { format } from "date-fns";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function TripHistoryPage() {
  const { data: historyTrips = [], isLoading } = useMyTripHistory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Trip History</h1>
        <p className="text-slate-500">
          View your past emergency trips and their details.
        </p>
      </div>

      {historyTrips.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <CalendarDays className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            No History Found
          </h2>
          <p className="text-slate-500 max-w-sm">
            You have not completed any trips yet. Your completed and cancelled
            trips will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {historyTrips.map((trip: any) => (
              <li key={trip.id}>
                <Link
                  href={`/patient/trips/${trip.id}`}
                  className="group flex flex-col md:flex-row md:items-center p-6 hover:bg-slate-50 transition-colors gap-6"
                >
                  {/* Status & Date */}
                  <div className="flex items-center gap-4 md:w-1/4 shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${
                        trip.status === "COMPLETED"
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                          : "bg-red-50 border-red-100 text-red-600"
                      }`}
                    >
                      {trip.status === "COMPLETED" ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <AlertCircle className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-bold text-sm ${
                          trip.status === "COMPLETED"
                            ? "text-emerald-700"
                            : "text-red-700"
                        }`}
                      >
                        {trip.status === "COMPLETED"
                          ? "Completed"
                          : "Cancelled"}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500 mt-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {format(
                          new Date(trip.createdAt || Date.now()),
                          "MMM d, yyyy",
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-100"></div>
                        <div className="w-0.5 h-6 bg-slate-200 ml-[3px] my-1"></div>
                        <div className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-100"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-sm font-medium text-slate-900 truncate pr-4">
                          {trip.emergencyRequest?.pickupAddress || "Location from map"}
                        </p>
                        <p className="text-sm font-medium text-slate-900 truncate pr-4">
                          {trip.emergencyRequest?.hospital?.name || "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info & Action */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-lg font-bold text-slate-900">
                        {trip.fareAmount || "0.00"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {trip.distanceKm ? `${trip.distanceKm} km` : "N/A"}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-200 group-hover:shadow-sm transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
