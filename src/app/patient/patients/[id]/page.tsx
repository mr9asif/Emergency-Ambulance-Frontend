import React from 'react';
import { User, ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/patient/patients" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Patient Details</h1>
            <p className="text-slate-500 mt-1">Viewing information for patient ID: {params.id}</p>
          </div>
        </div>
        <Link 
          href={`/patient/patients/${params.id}/edit`}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Patient
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-indigo-50/50">
             <User className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Patient Profile Data</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            Detailed view module is in development. Soon you'll be able to view complete medical records, past emergency requests, and more here.
          </p>
        </div>
      </div>
    </div>
  );
}
