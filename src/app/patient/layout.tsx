"use client";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import {
  AlertTriangle,
  Ambulance,
  Bell,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  Map,
  Menu,
  Truck,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const navigation = [
  { name: "Overview", href: "/patient/dashboard", icon: LayoutDashboard },
  {
    name: "Patients",
    icon: Users,
    children: [
      { name: "Patient List", href: "/patient/patients" },
      { name: "Add Patient", href: "/patient/patients/new" },
    ],
  },
  {
    name: "Emergency",
    icon: AlertTriangle,
    children: [
      { name: "Request Ambulance", href: "/patient/emergency/request" },
      { name: "Active Emergency", href: "/patient/emergency/active" },
    ],
  },
  {
    name: "Trips",
    icon: Truck,
    children: [
      { name: "Active Trip", href: "/patient/trips/active" },
      { name: "Trip History", href: "/patient/trips/history" },
    ],
  },
  {
    name: "Live Tracking",
    href: "/patient/tracking",
    icon: Map,
  },
  {
    name: "Payments",
    icon: CreditCard,
    children: [
      { name: "Pending Payments", href: "/patient/payments/pending" },
      { name: "Payment History", href: "/patient/payments/history" },
    ],
  },
  {
    name: "Notifications",
    href: "/patient/notifications",
    icon: Bell,
  },
];

const SidebarItem = ({ item, pathname, setSidebarOpen }: any) => {
  const hasChildren = item.children && item.children.length > 0;

  const isActive = hasChildren
    ? item.children.some(
        (child: any) =>
          pathname === child.href || pathname.startsWith(child.href + "/"),
      )
    : pathname === item.href || pathname.startsWith(item.href + "/");

  const [expanded, setExpanded] = useState(isActive);

  useEffect(() => {
    if (isActive) setExpanded(true);
  }, [isActive]);

  if (!hasChildren) {
    const isDirectActive =
      pathname === item.href ||
      (item.href !== "/patient/dashboard" &&
        pathname.startsWith(item.href + "/"));
    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen && setSidebarOpen(false)}
        className={`group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isDirectActive
            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <item.icon
          className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
            isDirectActive
              ? "text-white"
              : "text-slate-400 group-hover:text-slate-600"
          }`}
        />
        {item.name}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive && !expanded
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <div className="flex items-center">
          <item.icon
            className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
              isActive && !expanded
                ? "text-blue-700"
                : "text-slate-400 group-hover:text-slate-600"
            }`}
          />
          {item.name}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="mt-1 space-y-1 px-3">
          <div className="border-l-2 border-slate-100 ml-2 pl-4 py-1 space-y-1">
            {item.children.map((child: any) => {
              const isChildActive = pathname === child.href;
              return (
                <Link
                  key={child.name}
                  href={child.href}
                  onClick={() => setSidebarOpen && setSidebarOpen(false)}
                  className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isChildActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-3 ${isChildActive ? "bg-blue-600" : "bg-transparent"}`}
                  ></span>
                  {child.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: user } = useCurrentUser();

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex w-72 max-w-sm flex-1 flex-col bg-white shadow-2xl transition-transform">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex h-20 shrink-0 items-center px-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-red-600 to-rose-400 p-2 rounded-xl shadow-lg shadow-red-500/20">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  SwiftAid
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1.5 px-4 py-6">
                {navigation.map((item) => (
                  <SidebarItem
                    key={item.name}
                    item={item}
                    pathname={pathname}
                    setSidebarOpen={setSidebarOpen}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-[280px] md:flex-col md:inset-y-0 md:fixed border-r border-slate-200/80 bg-white/60 backdrop-blur-xl">
        <Link
          href="/"
          className="flex h-20 shrink-0 items-center px-6 border-b border-slate-100/80"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-500 p-2 text-white shadow-lg shadow-red-500/30">
              <Ambulance size={28} strokeWidth={2.5} />
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900">
              SwiftRescue
            </span>
          </div>
        </Link>
        <div className="flex flex-1 flex-col overflow-y-auto mt-6">
          <nav className="flex-1 space-y-1.5 px-4 pb-8">
            {navigation.map((item) => (
              <SidebarItem key={item.name} item={item} pathname={pathname} />
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-[280px] transition-all">
        <div className="sticky top-0 z-30 flex h-20 flex-shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl items-center gap-x-4 px-4 sm:gap-x-6 sm:px-8">
          <button
            type="button"
            className="md:hidden -m-2.5 p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>
              <div
                className="hidden lg:block lg:h-8 lg:w-px lg:bg-slate-200"
                aria-hidden="true"
              />
              <div ref={profileRef} className="relative">
                {/* Profile Button */}
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 p-1 pr-4 rounded-full border border-slate-200 hover:border-slate-300 hover:shadow-sm cursor-pointer transition-all bg-white"
                >
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name || "Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                    )}
                  </div>

                  <span className="text-sm font-medium text-slate-700 hidden sm:block">
                    {user?.name || "User"}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 hidden sm:block transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 z-50">
                    {/* Profile */}
                    <Link
                      href="/patient/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <User className="h-4 w-4 text-slate-500" />
                      <span>Profile</span>
                    </Link>

                    {/* Divider */}
                    <div className="my-1 border-t border-slate-100" />

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={() => {
                        // Add your logout function here
                        console.log("Logout clicked");
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 17l5-5-5-5"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H3"
                        />
                      </svg>

                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
