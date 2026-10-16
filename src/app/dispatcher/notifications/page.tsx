"use client";

import React from "react";
import { useNotifications } from "@/features/dispatch/hooks/useDispatchQueries";
import { Bell, Loader2, Clock, CheckCheck } from "lucide-react";
import { format } from "date-fns";

export default function DispatcherNotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications();

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-red-600" />
            Dispatch Center Notifications
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            System alerts, driver status updates, and emergency priority broadcasts.
          </p>
        </div>
        <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
          {notifications.length} Alerts
        </span>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-red-600" />
            Syncing notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Bell className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
            <p className="font-semibold text-slate-600">No new notifications</p>
            <p className="text-xs text-slate-400 mt-1">
              Dispatch alerts and emergency updates will be delivered here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.map((notif: any) => (
              <div
                key={notif.id}
                className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 mt-0.5 dark:bg-red-950/60 dark:text-red-400">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {notif.title || "Dispatch Alert"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {notif.message || notif.content}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {notif.createdAt
                    ? format(new Date(notif.createdAt), "hh:mm a")
                    : "Just now"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
