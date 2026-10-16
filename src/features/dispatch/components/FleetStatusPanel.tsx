"use client";

import React, { useState } from "react";
import type {
  AvailableAmbulance,
  AvailableDriver,
} from "../types/dispatch.types";
import { Ambulance, UserCheck, Phone, ShieldCheck, MapPin } from "lucide-react";

interface FleetStatusPanelProps {
  ambulances: AvailableAmbulance[];
  drivers: AvailableDriver[];
}

export function FleetStatusPanel({
  ambulances,
  drivers,
}: FleetStatusPanelProps) {
  const [activeTab, setActiveTab] = useState<"ambulances" | "drivers">(
    "ambulances"
  );

  return (
    <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Available Readiness
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Active standby assets for emergency dispatch
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("ambulances")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === "ambulances"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Ambulances ({ambulances.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("drivers")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === "drivers"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
            }`}
          >
            Drivers ({drivers.length})
          </button>
        </div>
      </div>

      <div className="p-4 max-h-[360px] overflow-y-auto">
        {activeTab === "ambulances" ? (
          ambulances.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No ambulances currently available on standby.
            </div>
          ) : (
            <div className="space-y-2.5">
              {ambulances.map((amb) => (
                <div
                  key={amb.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors dark:bg-slate-800/50 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Ambulance className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                        {amb.registrationNumber}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {amb.baseHospital?.name || "Main Medical Center"}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {amb.ambulanceType}
                  </span>
                </div>
              ))}
            </div>
          )
        ) : drivers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No ambulance drivers on active duty.
          </div>
        ) : (
          <div className="space-y-2.5">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors dark:bg-slate-800/50 dark:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold dark:bg-blue-950/60 dark:text-blue-400">
                    {driver.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {driver.user.name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 font-mono">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {driver.user.phone}
                    </div>
                  </div>
                </div>
                {driver.licenseNumber && (
                  <span className="text-[10px] text-slate-500 font-mono bg-slate-200/60 px-2 py-0.5 rounded-md dark:bg-slate-700">
                    Lic: {driver.licenseNumber}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
