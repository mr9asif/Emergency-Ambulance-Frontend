import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function PendingPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pending Payments</h1>
        <p className="text-slate-500 mt-1">Outstanding invoices requiring your attention.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-amber-50 text-amber-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-amber-50/50 relative">
             <CreditCard className="w-8 h-8" />
             <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-amber-50"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Invoice System Updates</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            The billing and payments module is currently being configured with our payment gateway providers.
          </p>
          <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm border border-slate-200">
             <AlertCircle className="w-4 h-4" />
             No action required right now
          </div>
        </div>
      </div>
    </div>
  );
}
