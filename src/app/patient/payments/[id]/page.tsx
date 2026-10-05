import React from 'react';
import { FileText, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function PaymentDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/patient/payments/history" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Invoice Details</h1>
            <p className="text-slate-500 mt-1">Invoice ID: {params.id}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-blue-50/50">
             <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Detailed Invoice View</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            Invoice generation is being finalized. You will soon see itemized costs, tax breakdowns, and insurance coverage applied here.
          </p>
        </div>
      </div>
    </div>
  );
}
