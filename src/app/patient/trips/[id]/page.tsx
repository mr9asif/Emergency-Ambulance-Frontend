import React from 'react';
import { Route, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TripDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patient/trips/history" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trip Details</h1>
          <p className="text-slate-500 mt-1">Detailed log for trip ID: {params.id}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-indigo-50/50">
             <Route className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Trip Analytics & Map Log</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            This detailed view will include a mapped route of the journey, vital timestamps, and driver/medic information for complete transparency.
          </p>
        </div>
      </div>
    </div>
  );
}
