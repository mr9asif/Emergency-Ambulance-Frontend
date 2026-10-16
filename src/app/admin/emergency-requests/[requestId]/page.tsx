"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DetailsPage() {
  return (
    <div className="p-6 space-y-4">
      <Link href=".." className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-xl shadow-slate-200/40 text-center">
        <h2 className="text-xl font-bold text-slate-900">Record Details</h2>
        <p className="text-xs text-slate-500 mt-1">Detailed entity view and management console.</p>
      </div>
    </div>
  );
}
