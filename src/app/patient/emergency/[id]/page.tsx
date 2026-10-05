import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EmergencyDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patient/emergency/active" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Emergency Details</h1>
          <p className="text-slate-500 mt-1">Incident ID: {params.id}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-rose-50 text-rose-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-rose-50/50">
             <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Incident Report & Log</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            Full incident reporting features are coming soon. This view will contain timestamped logs, medical notes, and dispatch timelines.
          </p>
        </div>
      </div>
    </div>
  );
}
