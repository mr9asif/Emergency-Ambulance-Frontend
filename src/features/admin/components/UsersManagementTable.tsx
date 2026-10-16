"use client";

import React, { useState } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";
import type { AdminUser, UserRole, UserStatus } from "../types/admin.types";
import { Modal } from "@/components/ui/Modal";
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Ban,
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { format } from "date-fns";

export function UsersManagementTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  const queryParams = {
    search: search ? search : undefined,
    role: roleFilter !== "ALL" ? (roleFilter as UserRole) : undefined,
    status: statusFilter !== "ALL" ? (statusFilter as UserStatus) : undefined,
    page,
    limit: 8,
  };

  const { data: usersData, isLoading } = useAdminUsers(queryParams);
  const updateStatusMutation = useUpdateUserStatus();

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [newStatus, setNewStatus] = useState<UserStatus>("ACTIVE");

  const users: AdminUser[] = usersData?.data ?? [];
  const meta = usersData?.meta ?? {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  };

  const handleOpenStatusModal = (user: AdminUser) => {
    setSelectedUser(user);
    setNewStatus(user.status);
  };

  const handleConfirmStatusChange = () => {
    if (!selectedUser) return;
    updateStatusMutation.mutate(
      { userId: selectedUser.id, status: newStatus },
      {
        onSuccess: () => setSelectedUser(null),
      }
    );
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 ring-1 ring-purple-600/20">
            <ShieldCheck className="h-3 w-3" /> Admin
          </span>
        );
      case "OPERATOR":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-600/20">
            <Shield className="h-3 w-3" /> Operator
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-blue-600/20">
            <UserIcon className="h-3 w-3" /> Patient / Customer
          </span>
        );
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case "SUSPENDED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            <AlertTriangle className="h-3 w-3" /> Suspended
          </span>
        );
      case "BLOCKED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
            <Ban className="h-3 w-3" /> Blocked
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      {/* Title & Filter Bar */}
      <div className="p-6 border-b border-slate-100 space-y-4 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              User Directory & Accounts
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Control account status, system permissions, and verify access
            </p>
          </div>

          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl dark:bg-slate-800">
            {meta.total} Total Registered Users
          </span>
        </div>

        {/* Filter inputs */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user by name, phone or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-medium outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customer / Patient</option>
              <option value="OPERATOR">Operator / Dispatcher</option>
              <option value="ADMIN">Administrator</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-500" />
                  Loading directory...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-400">
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
                  <p className="font-semibold text-slate-600 dark:text-slate-400">
                    No users matching criteria
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Try adjusting search query or filters.
                  </p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-600 text-sm shrink-0 dark:bg-slate-700 dark:text-slate-200">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email || "No email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {user.createdAt ? format(new Date(user.createdAt), "MMM dd, yyyy") : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role === "ADMIN" ? (
                      <span className="text-xs text-slate-400 italic">Protected</span>
                    ) : (
                      <button
                        onClick={() => handleOpenStatusModal(user)}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 active:scale-95 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                      >
                        Change Status
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500">
            Showing Page <span className="font-bold text-slate-800 dark:text-slate-200">{meta.page}</span> of{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">{meta.totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={meta.page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Modify User Account Status"
        description={`Update account standing for ${selectedUser?.name}`}
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {selectedUser?.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Phone: {selectedUser?.phone} | Role: {selectedUser?.role}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select New Account Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["ACTIVE", "SUSPENDED", "BLOCKED"] as UserStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setNewStatus(status)}
                  className={`rounded-2xl p-3 text-xs font-bold border transition-all text-center flex flex-col items-center gap-1.5 ${
                    newStatus === status
                      ? status === "ACTIVE"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                        : status === "SUSPENDED"
                        ? "border-amber-500 bg-amber-50 text-amber-800 shadow-sm"
                        : "border-rose-500 bg-rose-50 text-rose-800 shadow-sm"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 dark:bg-slate-800 dark:border-slate-700"
                  }`}
                >
                  {status === "ACTIVE" && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                  {status === "SUSPENDED" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                  {status === "BLOCKED" && <Ban className="h-4 w-4 text-rose-500" />}
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={updateStatusMutation.isPending}
              onClick={handleConfirmStatusChange}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
            >
              {updateStatusMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
