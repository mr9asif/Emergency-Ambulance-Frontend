"use client";

import React from "react";
import { UsersManagementTable } from "@/features/admin/components/UsersManagementTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          User Management
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Manage system users, customer accounts, and operator privileges.
        </p>
      </div>

      <UsersManagementTable />
    </div>
  );
}
