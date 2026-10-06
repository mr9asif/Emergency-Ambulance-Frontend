"use client";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useMyTrips } from "@/features/trip/hooks/useMyTrips";
import { usePendingRequests } from "@/features/emergency/hooks/usePendingRequests";
import { Activity, Ambulance, ArrowRight, Clock, FileText, Map, Phone, Bell, Star } from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  const { data: user } = useCurrentUser();
  const { data: myTripsData, isLoading: isLoadingTrips } = useMyTrips();
  const { data: pendingRequestsData, isLoading: isLoadingRequests } = usePendingRequests();

  const trips = myTripsData?.data || [];
  const pendingRequests = pendingRequestsData?.data || [];
  const pastTripsCount = trips.length;
  const activeRequestsCount = pendingRequests.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Hello, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-slate-500 mt-1">Here is what's happening with your account today.</p>
        </div>
        <Link href="/patient/requests" className="shrink-0">
          <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/40 active:scale-95">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <Ambulance className="relative z-10 h-5 w-5 animate-pulse" />
            <span className="relative z-10">Request Emergency</span>
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active Requests Card */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 border border-slate-100">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-red-100 to-rose-50 blur-2xl transition-all group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Requests</p>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                  {isLoadingRequests ? "..." : activeRequestsCount}
                </h3>
              </div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-500 to-rose-400 text-white shadow-lg shadow-red-500/30">
              <Activity className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* Saved Patients Card */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 border border-slate-100">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-50 blur-2xl transition-all group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Saved Patients</p>
              <h3 className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">3</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
              <FileText className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* Past Trips Card */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 border border-slate-100 sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 blur-2xl transition-all group-hover:scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Past Trips</p>
              <h3 className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">
                {isLoadingTrips ? "..." : pastTripsCount}
              </h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/30">
              <Clock className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col">
          <div className="flex flex-row items-center justify-between border-b border-slate-100 p-6 bg-white/50 backdrop-blur-md">
            <h2 className="text-xl font-bold text-slate-900">Recent Emergency Requests</h2>
            <Link
              href="/patient/requests"
              className="group flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all 
              <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex-1 p-0 flex flex-col justify-center">
            {isLoadingRequests ? (
              <div className="p-12 text-center text-slate-500">Loading requests...</div>
            ) : pendingRequests.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {pendingRequests.slice(0, 4).map((req: any, i: number) => (
                  <div
                    key={req.id || i}
                    className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        <Activity className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg">
                          {req.patient?.name || "Emergency Patient"}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          {new Date(req.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/20">
                      {req.status || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Activity className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No active emergencies</h3>
                <p className="text-slate-500 mt-1 max-w-sm">
                  You currently have no active emergency requests. Stay safe!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Live Info */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-xl shadow-slate-900/20">
            <div className="rounded-[22px] bg-slate-900 p-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <Map className="h-12 w-12 text-blue-400 mb-4 relative z-10" />
              <h3 className="text-xl font-bold text-white relative z-10">Live Tracking</h3>
              <p className="text-slate-400 mt-2 mb-6 relative z-10 text-sm">
                Track your active ambulance in real-time.
              </p>
              <Link href="/patient/tracking" className="w-full relative z-10">
                <button className="w-full rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 transition-colors shadow-lg shadow-blue-500/20">
                  Open Map
                </button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-3">
              <Link
                href="/patient/patients"
                className="flex items-center p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
              >
                <div className="p-3 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white rounded-xl mr-4 transition-colors shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Manage Patients</h4>
                  <p className="text-xs text-slate-500 font-medium">Family members details</p>
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-blue-600 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/patient/profile"
                className="flex items-center p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white rounded-xl mr-4 transition-colors shadow-sm">
                  <Star className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Account Settings</h4>
                  <p className="text-xs text-slate-500 font-medium">Update your profile</p>
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-emerald-600 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
