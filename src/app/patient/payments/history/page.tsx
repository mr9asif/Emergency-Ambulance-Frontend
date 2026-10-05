import React from 'react';
import { Receipt } from 'lucide-react';

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment History</h1>
        <p className="text-slate-500 mt-1">Review past transactions and paid invoices.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-emerald-50/50">
             <Receipt className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Transaction Logs</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            Your payment history will appear here once the financial module is fully activated. Features will include PDF receipts and tax statements.
          </p>
        </div>
      </div>
    </div>
  );
}
