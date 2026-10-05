import React from 'react';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddPatientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patient/patients" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Patient</h1>
          <p className="text-slate-500 mt-1">Register a new patient to your account.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-blue-50/50">
             <UserPlus className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Patient Form UI</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            This module is currently being built. It will feature a comprehensive form to quickly and securely add patient details including medical history.
          </p>
          <div className="mt-8 flex gap-3">
             <Link href="/patient/patients" className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm shadow-slate-900/20">
               Return to List
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
