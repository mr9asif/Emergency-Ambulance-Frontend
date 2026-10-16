"use client";

import React, { useState } from "react";
import {
  useAvailableAmbulances,
  useAvailableDrivers,
  usePendingEmergencies,
} from "@/features/dispatch/hooks/useDispatchQueries";
import { EmergencyQueueList } from "@/features/dispatch/components/EmergencyQueueList";
import { DispatchModal } from "@/features/dispatch/components/DispatchModal";
import type { PendingEmergency } from "@/features/dispatch/types/dispatch.types";
import { Siren } from "lucide-react";

export default function DispatcherEmergencyRequestsPage() {
  const [selectedEmergency, setSelectedEmergency] =
    useState<PendingEmergency | null>(null);

  const { data: pendingEmergencies = [], isLoading } =
    usePendingEmergencies();
  const { data: ambulances = [] } = useAvailableAmbulances();
  const { data: drivers = [] } = useAvailableDrivers();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Siren className="h-6 w-6 text-red-600 animate-pulse" />
          Emergency Triage & Queue
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Active incoming calls requiring emergency ambulance dispatch.
        </p>
      </div>

      <EmergencyQueueList
        emergencies={pendingEmergencies}
        isLoading={isLoading}
        onSelectEmergency={(em) => setSelectedEmergency(em)}
      />

      <DispatchModal
        emergency={selectedEmergency}
        onClose={() => setSelectedEmergency(null)}
        availableAmbulances={ambulances}
        availableDrivers={drivers}
      />
    </div>
  );
}
