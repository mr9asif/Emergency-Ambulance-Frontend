import React from 'react';
import { Ambulance, ArrowRight } from 'lucide-react';

export default function RequestAmbulancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Request Ambulance</h1>
        <p className="text-slate-500 mt-1">Dispatch an emergency vehicle immediately.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-red-50/50 relative">
             <Ambulance className="w-10 h-10" />
             <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Emergency Dispatch Interface</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            This high-priority module is being developed. It will allow one-click emergency dispatch with real-time location sharing.
          </p>
          <div className="mt-8 flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30">
               Initialize Dispatch
               <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
