"use client";

import React, { useState } from "react";
import {
  useOperatorApplications,
} from "../hooks/useOperatorApplications";
import {
  useApproveOperatorApplication,
  useRejectOperatorApplication,
} from "../hooks/useApplicationActions";
import type {
  OperatorApplication,
  OperatorApplicationStatus,
} from "../types/admin.types";
import { Modal } from "@/components/ui/Modal";
import {
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  FileCheck,
  User,
  Phone,
  Mail,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

export function OperatorApplicationsTable() {
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const { data: applications = [], isLoading } = useOperatorApplications(
    selectedStatus === "ALL" ? undefined : { status: selectedStatus }
  );

  const approveMutation = useApproveOperatorApplication();
  const rejectMutation = useRejectOperatorApplication();

  const [reviewingApp, setReviewingApp] = useState<OperatorApplication | null>(
    null
  );
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [employeeCode, setEmployeeCode] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const handleOpenAction = (
    app: OperatorApplication,
    type: "approve" | "reject"
  ) => {
    setReviewingApp(app);
    setActionType(type);
    setEmployeeCode("");
    setRejectionReason("");
  };

  const handleCloseModal = () => {
    setReviewingApp(null);
    setActionType(null);
  };

  const handleConfirmApproval = () => {
    if (!reviewingApp) return;
    approveMutation.mutate(
      {
        id: reviewingApp.id,
        payload: employeeCode ? { employeeCode } : undefined,
      },
      {
        onSuccess: handleCloseModal,
      }
    );
  };

  const handleConfirmRejection = () => {
    if (!reviewingApp || !rejectionReason.trim()) return;
    rejectMutation.mutate(
      {
        id: reviewingApp.id,
        payload: { rejectionReason: rejectionReason.trim() },
      },
      {
        onSuccess: handleCloseModal,
      }
    );
  };

  const filteredApps =
    selectedStatus === "ALL"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  const getStatusBadge = (status: OperatorApplicationStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
            <CheckCircle className="h-3.5 w-3.5" /> Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-600/20">
            <XCircle className="h-3.5 w-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
            <Clock className="h-3.5 w-3.5 animate-spin" /> Pending Review
          </span>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "DRIVER":
        return (
          <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
            Ambulance Driver
          </span>
        );
      case "DISPATCHER":
        return (
          <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
            Dispatcher
          </span>
        );
      default:
        return (
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
            Hospital Staff
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-indigo-600" />
            Operator Applications
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Review driver and dispatcher credentials for onboarding
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl dark:bg-slate-800 self-start sm:self-auto">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedStatus(tab)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedStatus === tab
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50">
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Role & License</th>
              <th className="px-6 py-4">Email Status</th>
              <th className="px-6 py-4">Submitted</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-indigo-500" />
                  Loading operator applications...
                </td>
              </tr>
            ) : filteredApps.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-400">
                  <Shield className="h-10 w-10 mx-auto mb-2 opacity-30 text-slate-500" />
                  <p className="font-semibold text-slate-600 dark:text-slate-400">
                    No operator applications found
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Applications submitted by drivers and dispatchers will appear here.
                  </p>
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-slate-50/80 transition-colors dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold dark:bg-indigo-950/60 dark:text-indigo-400">
                        {app.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {app.name}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {app.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {getRoleBadge(app.operatorType)}
                      {app.licenseNumber && (
                        <p className="text-xs text-slate-500 font-mono">
                          Lic: {app.licenseNumber}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {app.emailVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle className="h-3.5 w-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <Clock className="h-3.5 w-3.5" /> Unverified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {app.createdAt ? format(new Date(app.createdAt), "MMM dd, yyyy") : "N/A"}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {app.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenAction(app, "approve")}
                          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs font-semibold transition-all shadow-sm shadow-emerald-500/20 active:scale-95"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleOpenAction(app, "reject")}
                          className="rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 text-xs font-semibold transition-all border border-rose-200 active:scale-95"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Completed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Approve Modal */}
      <Modal
        isOpen={actionType === "approve"}
        onClose={handleCloseModal}
        title="Approve Operator Application"
        description={`Grant platform access to ${reviewingApp?.name} as an active ${reviewingApp?.operatorType}.`}
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {reviewingApp?.name} ({reviewingApp?.email})
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Role: {reviewingApp?.operatorType} | License: {reviewingApp?.licenseNumber || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Assign Employee Code (Optional)
            </label>
            <input
              type="text"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              placeholder="e.g. EMP-2026-042"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={approveMutation.isPending}
              onClick={handleConfirmApproval}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-sm font-semibold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
            >
              {approveMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Confirm Approval
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={actionType === "reject"}
        onClose={handleCloseModal}
        title="Reject Operator Application"
        description="Please state the reason for rejecting this application. An email notification will be sent."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-2xl text-xs font-medium dark:bg-amber-950/40 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            This action marks the application as REJECTED and notifies the applicant.
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Rejection Reason *
            </label>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Invalid commercial driving license number provided or failed verification."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={rejectMutation.isPending || !rejectionReason.trim()}
              onClick={handleConfirmRejection}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white px-5 py-2 text-sm font-semibold transition-all shadow-md shadow-rose-500/20 flex items-center gap-2"
            >
              {rejectMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Confirm Rejection
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
