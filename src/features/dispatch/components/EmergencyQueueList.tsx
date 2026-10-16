"use client";

import React from "react";
import type { PendingEmergency } from "../types/dispatch.types";
import {
  Siren,
  MapPin,
  Clock,
  Phone,
  User,
  HeartPulse,
  Car,
  Baby,
  Activity,
  AlertCircle,
  Navigation,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

interface EmergencyQueueListProps {
  emergencies: PendingEmergency[];
  isLoading: boolean;
  onSelectEmergency: (emergency: PendingEmergency) => void;
}

export function EmergencyQueueList({
  emergencies,
  isLoading,
  onSelectEmergency,
}: EmergencyQueueListProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse";
      case "HIGH":
        return "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-300";
      case "MEDIUM":
        return "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300";
      default:
        return "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-950/60 dark:text-blue-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "CARDIAC":
        return <HeartPulse className="h-4 w-4 text-red-500" />;
      case "ACCIDENT":
        return <Car className="h-4 w-4 text-amber-500" />;
      case "PREGNANCY":
        return <Baby className="h-4 w-4 text-pink-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Siren className="h-5 w-5 text-red-600 animate-pulse" />
            Live Emergency Queue
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Active distress calls waiting for unit assignment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {emergencies.length} Incoming
          </span>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-red-500" />
            <p className="text-sm font-semibold">Connecting to emergency frequency...</p>
          </div>
        ) : emergencies.length === 0 ? (
          <div className="p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Activity className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Emergency Queue Clear
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No pending emergency requests in the triage queue. Dispatcher monitoring is active.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 transition-all hover:bg-white hover:border-red-300 hover:shadow-xl hover:shadow-red-500/5 dark:bg-slate-800/40 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-black tracking-wide uppercase ${getPriorityStyle(
                          emergency.priority
                        )}`}
                      >
                        {emergency.priority}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-0.5 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                        {getTypeIcon(emergency.emergencyType)}
                        {emergency.emergencyType}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" />
                        {emergency.createdAt
                          ? format(new Date(emergency.createdAt), "hh:mm a, MMM d")
                          : "Recently"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {emergency.patient?.name || emergency.customer?.name || "Patient"}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-slate-500">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {emergency.patient?.phone || emergency.customer?.phone || "No Phone"}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500 mt-0.5" />
                      <span className="font-medium line-clamp-1">
                        {emergency.pickupAddress}
                      </span>
                    </div>

                    {emergency.notes && (
                      <p className="text-xs text-slate-500 italic bg-white/80 p-2 rounded-xl border border-slate-100 dark:bg-slate-900/60 dark:border-slate-800">
                        "{emergency.notes}"
                      </p>
                    )}
                  </div>

                  {/* Right Column: CTA */}
                  <div className="shrink-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => onSelectEmergency(emergency)}
                      className="w-full md:w-auto rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold px-6 py-3 text-xs tracking-wide uppercase transition-all shadow-lg shadow-red-500/25 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Navigation className="h-4 w-4" />
                      Dispatch Unit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
