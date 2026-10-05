import React from 'react';
import { BellRing, CheckCircle2 } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Manage your alerts and communications.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Mark all as read
        </button>
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-purple-50 text-purple-600 p-4 rounded-full mb-5 shadow-inner ring-4 ring-purple-50/50">
             <BellRing className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">You're all caught up!</h3>
          <p className="text-slate-500 max-w-md mt-2 leading-relaxed">
            The notification center is being connected to the live backend. Expect real-time updates for trips, payments, and system alerts here.
          </p>
        </div>
      </div>
    </div>
  );
}
