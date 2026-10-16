"use client";

import React, { useState } from "react";
import {
  useAllDispatchOffers,
  useAvailableAmbulances,
  useAvailableDrivers,
  usePendingEmergencies,
} from "@/features/dispatch/hooks/useDispatchQueries";
import { DispatcherStats } from "@/features/dispatch/components/DispatcherStats";
import { EmergencyQueueList } from "@/features/dispatch/components/EmergencyQueueList";
import { DispatchModal } from "@/features/dispatch/components/DispatchModal";
import { LiveOffersTable } from "@/features/dispatch/components/LiveOffersTable";
import { FleetStatusPanel } from "@/features/dispatch/components/FleetStatusPanel";
import type { PendingEmergency } from "@/features/dispatch/types/dispatch.types";
import { Siren, RefreshCw, Radio } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function DispatcherDashboardPage() {
  const queryClient = useQueryClient();
  const [selectedEmergency, setSelectedEmergency] =
    useState<PendingEmergency | null>(null);

  const {
    data: pendingEmergencies = [],
    isLoading: isLoadingPending,
    isFetching: isFetchingPending,
  } = usePendingEmergencies();

  const {
    data: availableAmbulances = [],
    isLoading: isLoadingAmbulances,
  } = useAvailableAmbulances();

  const {
    data: availableDrivers = [],
    isLoading: isLoadingDrivers,
  } = useAvailableDrivers();

  const {
    data: allOffers = [],
    isLoading: isLoadingOffers,
  } = useAllDispatchOffers();

  const handleRefreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ["pending-emergencies"] });
    queryClient.invalidateQueries({ queryKey: ["available-ambulances"] });
    queryClient.invalidateQueries({ queryKey: ["available-drivers"] });
    queryClient.invalidateQueries({ queryKey: ["all-dispatch-offers"] });
  };

  const isLoadingStats =
    isLoadingPending || isLoadingAmbulances || isLoadingDrivers || isLoadingOffers;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Welcome & HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight dark:text-white">
              Dispatcher Command Center
            </h1>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Real-time emergency triage, ambulance resource routing, and live response monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefreshAll}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetchingPending ? "animate-spin text-red-600" : "text-slate-400"}`}
            />
            Sync Live Frequency
          </button>
        </div>
      </div>

      {/* Dispatcher KPI Metrics */}
      <DispatcherStats
        pendingCount={pendingEmergencies.length}
        availableAmbulanceCount={availableAmbulances.length}
        availableDriverCount={availableDrivers.length}
        activeOffersCount={allOffers.filter((o) => o.status === "OFFERED").length}
        isLoading={isLoadingStats}
      />

      {/* Main Grid: Live Emergency Queue + Standby Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EmergencyQueueList
            emergencies={pendingEmergencies}
            isLoading={isLoadingPending}
            onSelectEmergency={(emergency) => setSelectedEmergency(emergency)}
          />
        </div>

        <div>
          <FleetStatusPanel
            ambulances={availableAmbulances}
            drivers={availableDrivers}
          />
        </div>
      </div>

      {/* Dispatch Transmission Logs */}
      <div>
        <LiveOffersTable
          offers={allOffers}
          isLoading={isLoadingOffers}
        />
      </div>

      {/* Interactive Modal for Emergency Assignment */}
      <DispatchModal
        emergency={selectedEmergency}
        onClose={() => setSelectedEmergency(null)}
        availableAmbulances={availableAmbulances}
        availableDrivers={availableDrivers}
      />
    </div>
  );
}
