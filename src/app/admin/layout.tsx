"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  Ambulance,
  Building2,
  Truck,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

const navigation = [
  { name: "Executive Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "User Directory", href: "/admin/users", icon: Users },
  { name: "Ambulance Fleet", href: "/admin/ambulances", icon: Ambulance },
  { name: "Hospitals Directory", href: "/admin/hospitals", icon: Building2 },
  { name: "Driver Profiles", href: "/admin/drivers", icon: ShieldCheck },
  { name: "Trip Operations", href: "/admin/trips", icon: Truck },
  { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: user } = useCurrentUser();
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["current-user"] });
        router.push("/login");
        router.refresh();
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex w-72 max-w-sm flex-1 flex-col bg-white text-slate-900 shadow-2xl">
            <div className="flex h-20 shrink-0 items-center justify-between px-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-600 p-2 text-white shadow-lg shadow-purple-500/30">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    SwiftRescue
                  </span>
                  <p className="text-[10px] font-mono text-purple-600 font-bold tracking-wider uppercase">
                    Admin Portal
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
              <nav className="space-y-1.5">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === "/admin/dashboard" && pathname === "/admin");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-[280px] md:flex-col md:fixed md:inset-y-0 border-r border-slate-200/80 bg-white">
        <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-100">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 text-white shadow-lg shadow-purple-500/30">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                SwiftRescue
              </span>
              <p className="text-[10px] font-mono text-purple-600 font-bold tracking-wider uppercase flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                Administrator
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto mt-6 px-4">
          <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Management
          </div>
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/admin/dashboard" && pathname === "/admin");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-purple-600"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 flex-col md:pl-[280px]">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-black text-purple-700 ring-1 ring-purple-600/20">
                <ShieldAlert className="h-3.5 w-3.5 text-purple-600" />
                SYSTEM ADMINISTRATION
              </span>
              <span className="text-xs text-slate-400 font-medium">|</span>
              <span className="text-xs text-slate-500 font-medium">
                Global Operations Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-purple-600 ring-2 ring-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all bg-white"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name || "Admin"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase() || "A"}</span>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="text-[10px] text-purple-600 mt-0.5 uppercase tracking-wider font-bold">
                    Super Admin
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">
                      {user?.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {user?.email || user?.phone}
                    </p>
                  </div>

                  <Link
                    href="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors mt-1"
                  >
                    Public Home
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
