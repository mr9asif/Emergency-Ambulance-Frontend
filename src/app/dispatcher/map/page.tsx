"use client";

import React from "react";
import { Map, Navigation } from "lucide-react";

export default function DispatcherMapPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Map className="h-6 w-6 text-blue-600" />
          Live GPS Fleet Radar
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Geographic spatial view of active ambulances, distress calls, and regional hospitals.
        </p>
      </div>

      <div className="h-[500px] rounded-3xl bg-slate-900 border border-slate-800 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
            <Navigation className="h-8 w-8 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white">Interactive Fleet Radar</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-2">
            Real-time ambulance GPS beacons and active distress call points rendered via MapLibre GL.
          </p>
        </div>
      </div>
    </div>
  );
}
