"use client";

import { Ambulance, ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-black selection:bg-red-500/30">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[560px] lg:px-20 relative z-10 bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Ambulance size={24} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              SwiftRescue
            </span>
          </Link>

          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Please enter your details to access your account.
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md shadow-red-500/20 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all active:scale-[0.98]"
                >
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300 dark:border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-black text-zinc-500">
                    Do not have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/register"
                  className="w-full flex justify-center py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Visuals */}
      <div className="hidden lg:block relative w-full flex-1 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Fastest response when you need it most.
            </h3>
            <p className="text-red-100 text-lg leading-relaxed">
              SwiftRescue dramatically reduced our dispatch times and helped our
              fleet reach patients faster than ever before.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <div>
                <p className="text-white font-medium">Dr. Sarah Jenkins</p>
                <p className="text-red-200 text-sm">
                  Chief of Emergency, NY Hospital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
