import React from 'react';
import { Activity, Clock } from 'lucide-react';

export default function ActiveEmergencyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Active Emergencies</h1>
        <p className="text-slate-500 mt-1">Monitor currently ongoing emergency dispatches.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-emerald-50/50 relative">
             <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Monitoring Dashboard</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            The active emergency tracker is being integrated. You will soon see a live feed of all ongoing dispatches and their current status.
          </p>
          <div className="mt-8 flex gap-3 text-sm text-slate-400 font-medium items-center">
             <Clock className="w-4 h-4" />
             Waiting for integration...
          </div>
        </div>
      </div>
    </div>
  );
}
