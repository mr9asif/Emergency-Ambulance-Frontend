"use client";

import React from "react";
import { useAllDispatchOffers } from "@/features/dispatch/hooks/useDispatchQueries";
import { LiveOffersTable } from "@/features/dispatch/components/LiveOffersTable";
import { Radio } from "lucide-react";

export default function DispatcherDispatchOperationsPage() {
  const { data: offers = [], isLoading } = useAllDispatchOffers();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Radio className="h-6 w-6 text-indigo-600" />
          Dispatch Operations & Transmission Logs
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Monitor offers sent to ambulance drivers, acknowledgments, and acceptance responses.
        </p>
      </div>

      <LiveOffersTable offers={offers} isLoading={isLoading} />
    </div>
  );
}
