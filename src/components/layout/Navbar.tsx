"use client";

import { Ambulance, ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DefaultImage from "../../../public/images/default-profile.jpeg";

// Change this import according to your project structure
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export function Navbar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: user, isLoading } = useCurrentUser();
  console.log("user", user);

  const handleLogout = () => {
    // Remove authentication cookies
    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";

    setIsProfileOpen(false);
    setIsOpen(false);

    router.push("/login");
    router.refresh();
  };

  const getInitial = () => {
    if (!user) return "U";

    const name = user.name || user.email || "";

    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/20 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-red-500 p-2 text-white shadow-lg shadow-red-500/30">
              <Ambulance size={28} strokeWidth={2.5} />
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              SwiftRescue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            >
              Home
            </Link>

            <Link
              href="#features"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            >
              Features
            </Link>

            <Link
              href="#roles"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            >
              How it Works
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden items-center md:flex">
            {/* Loading state */}
            {isLoading ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-800" />
            ) : user ? (
              /* Logged In User */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full p-1.5 transition-all hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  {/* Profile Image */}
                  <Image
                    src={
                      user.profileImage ||
                      "../../../public/images/default-profile.jpeg"
                    }
                    alt={user.name || "Profile"}
                    width={42}
                    height={42}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-red-500/20"
                  />

                  <ChevronDown
                    size={17}
                    className={`text-gray-500 transition-transform dark:text-gray-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950">
                    {/* User Info */}
                    <div className="border-b border-gray-100 px-4 py-4 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <Image
                            src={user.profileImage}
                            alt={user.name || "Profile"}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 font-semibold text-white">
                            {getInitial()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Actions */}
                    <div className="p-2">
                      {/* Profile */}
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          router.push("/profile");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-red-500 dark:text-gray-200 dark:hover:bg-zinc-900 dark:hover:text-red-400"
                      >
                        <User size={18} />
                        Profile
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-gray-200 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out */
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:text-red-500 dark:text-white"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-500/50"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-20 z-50 w-full border-t border-gray-100 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-5">
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="flex items-center rounded-xl px-4 py-3 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-500/10"
            >
              Home
            </Link>

            <Link
              onClick={() => setIsOpen(false)}
              href="#features"
              className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-500/10"
            >
              Features
            </Link>

            <Link
              onClick={() => setIsOpen(false)}
              href="#roles"
              className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-500/10"
            >
              How it Works
            </Link>

            <Link
              onClick={() => setIsOpen(false)}
              href="/contact"
              className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-500/10"
            >
              Contact
            </Link>

            {/* Mobile Auth */}
            {/* Mobile Auth */}
            <div className="mt-5 border-t border-gray-100 pt-5 dark:border-zinc-800">
              {isLoading ? (
                <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-100 dark:bg-zinc-900" />
              ) : user ? (
                <div className="space-y-2">
                  {/* User Profile Card */}
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/70">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <Image
                        src={user.profileImage || DefaultImage}
                        alt={user.name || "Profile"}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-zinc-800"
                      />

                      {/* User Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                          {user.email || user.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-900"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                      <User size={18} />
                    </span>

                    <span>Profile</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10">
                      <LogOut size={18} />
                    </span>

                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/login"
                    className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
                  >
                    Log in
                  </Link>

                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/register"
                    className="block w-full rounded-xl bg-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
