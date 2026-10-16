"use client";

import React from "react";
import { OperatorApplicationsTable } from "@/features/admin/components/OperatorApplicationsTable";

export default function AdminEmergencyRequestsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Operator Applications & Verifications
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Review, approve, or reject pending driver and dispatcher registrations.
        </p>
      </div>

      <OperatorApplicationsTable />
    </div>
  );
}
