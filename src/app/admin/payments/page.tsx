"use client";

import React from "react";
import { CreditCard } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-emerald-600" />
          Financial & Payment Operations
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Review emergency ambulance dispatch charges, driver disbursements, and SSLCommerz transaction receipts.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-12 text-center shadow-xl shadow-slate-200/40 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        <CreditCard className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Payment Settlements Ledger
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Trip payment history and transactions from customer journeys are synced via the payment gateway API.
        </p>
      </div>
    </div>
  );
}
