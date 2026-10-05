import React from 'react';
import { History } from 'lucide-react';

export default function TripHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trip History</h1>
        <p className="text-slate-500 mt-1">Review past ambulance journeys and logs.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-slate-100 text-slate-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-slate-50/50">
             <History className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Journey Archives</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            We are building a robust table view for all historical trips. You will be able to filter, search, and export trip records.
          </p>
        </div>
      </div>
    </div>
  );
}
