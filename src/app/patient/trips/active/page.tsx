import React from 'react';
import { Truck, Navigation } from 'lucide-react';

export default function ActiveTripPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Active Trip</h1>
        <p className="text-slate-500 mt-1">View currently ongoing ambulance journeys.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-blue-50/50">
             <Truck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Live Journey Tracking</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            The active trip module is under construction. It will feature real-time map integration, ETA updates, and driver communication.
          </p>
          <div className="mt-8">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors">
               <Navigation className="w-4 h-4" />
               View Map Data
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
