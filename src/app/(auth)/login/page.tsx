"use client";

import {
  Ambulance,
  ArrowRight,
  Clock3,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-black selection:bg-red-500/30">
      {/* =========================================================
          LEFT SIDE — 50% EMERGENCY VISUAL
      ========================================================= */}
      <section className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#09090b]">
        {/* Background Image */}
        <Image
          src="/images/ambulance-hero.jpg"
          alt="Emergency ambulance response"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Red cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-black/30 to-black/85" />

        {/* Red glow */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-8 xl:p-12 2xl:p-16">
          {/* Top */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>

              <span className="text-xs sm:text-sm font-medium">
                Emergency Network Online
              </span>
            </div>

            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
              <Siren className="w-5 h-5 text-red-400" />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-10 bg-red-500" />

              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-red-400">
                Emergency Response System
              </span>
            </div>

            <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tight text-white leading-[1.05]">
              When every
              <span className="text-red-500"> second </span>
              matters.
            </h2>

            <p className="mt-5 text-sm sm:text-base xl:text-lg text-zinc-300 leading-relaxed max-w-lg">
              SwiftRescue connects patients, dispatchers, ambulance drivers, and
              hospitals through one intelligent emergency response platform.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
              {/* Fast Response */}
              <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-4">
                <Clock3 className="w-5 h-5 text-red-400 mb-3" />

                <p className="text-base sm:text-xl font-bold text-white">
                  Fast
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-1">
                  Response
                </p>
              </div>

              {/* Smart Dispatch */}
              <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-4">
                <MapPin className="w-5 h-5 text-red-400 mb-3" />

                <p className="text-base sm:text-xl font-bold text-white">
                  Smart
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-1">
                  Dispatch
                </p>
              </div>

              {/* Connected */}
              <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-4">
                <Users className="w-5 h-5 text-red-400 mb-3" />

                <p className="text-base sm:text-xl font-bold text-white">
                  Connected
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-1">
                  Healthcare
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <Ambulance className="w-5 h-5 text-red-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">SwiftRescue</p>

                <p className="text-xs text-zinc-400">
                  Emergency Dispatch Platform
                </p>
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Secure & Reliable
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RIGHT SIDE — 50% LOGIN FORM
      ========================================================= */}
      <section className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center bg-white dark:bg-black relative z-20">
        <div className="w-full max-w-md mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 py-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Ambulance size={24} strokeWidth={2.5} />
            </div>

            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              SwiftRescue
            </span>
          </Link>

          {/* Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Please enter your details to access your account.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
                >
                  Email address
                </label>

                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="
                      appearance-none
                      block
                      w-full
                      pl-10
                      pr-3
                      py-3
                      sm:py-3.5
                      border
                      border-zinc-300
                      dark:border-zinc-700
                      rounded-xl
                      shadow-sm
                      placeholder-zinc-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-red-500/20
                      focus:border-red-500
                      text-sm
                      bg-white
                      dark:bg-zinc-900
                      text-zinc-900
                      dark:text-white
                      transition
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
                >
                  Password
                </label>

                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="
                      appearance-none
                      block
                      w-full
                      pl-10
                      pr-3
                      py-3
                      sm:py-3.5
                      border
                      border-zinc-300
                      dark:border-zinc-700
                      rounded-xl
                      shadow-sm
                      placeholder-zinc-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-red-500/20
                      focus:border-red-500
                      text-sm
                      bg-white
                      dark:bg-zinc-900
                      text-zinc-900
                      dark:text-white
                      transition
                    "
                  />
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="
                      h-4
                      w-4
                      text-red-600
                      focus:ring-red-500
                      border-zinc-300
                      dark:border-zinc-700
                      rounded
                      bg-white
                      dark:bg-zinc-900
                    "
                  />

                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="
                    text-sm
                    font-medium
                    text-red-600
                    hover:text-red-500
                    dark:text-red-500
                    dark:hover:text-red-400
                    transition-colors
                    whitespace-nowrap
                  "
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In */}
              <button
                type="submit"
                className="
                  w-full
                  flex
                  justify-center
                  items-center
                  gap-2
                  py-3
                  sm:py-3.5
                  px-4
                  rounded-xl
                  shadow-md
                  shadow-red-500/20
                  text-sm
                  font-semibold
                  text-white
                  bg-red-600
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-red-500
                  transition-all
                  active:scale-[0.98]
                "
              >
                Sign in
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300 dark:border-zinc-800" />
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white dark:bg-black text-zinc-500">
                    Do not have an account?
                  </span>
                </div>
              </div>

              {/* Register */}
              <div className="mt-6">
                <Link
                  href="/register"
                  className="
                    w-full
                    flex
                    justify-center
                    py-3
                    sm:py-3.5
                    px-4
                    border
                    border-zinc-300
                    dark:border-zinc-700
                    rounded-xl
                    shadow-sm
                    text-sm
                    font-medium
                    text-zinc-700
                    dark:text-zinc-300
                    bg-white
                    dark:bg-zinc-900
                    hover:bg-zinc-50
                    dark:hover:bg-zinc-800
                    transition-colors
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-red-500
                  "
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Your information is securely protected</span>
          </div>
        </div>
      </section>
    </div>
  );
}
