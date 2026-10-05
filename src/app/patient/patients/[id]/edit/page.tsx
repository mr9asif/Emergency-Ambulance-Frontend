import React from 'react';
import { Settings2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPatientPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/patient/patients/${params.id}`} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Patient</h1>
          <p className="text-slate-500 mt-1">Update details for patient ID: {params.id}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-amber-50 text-amber-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-amber-50/50">
             <Settings2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Edit Form Workspace</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            The edit interface is being designed. It will allow you to modify existing patient records seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
