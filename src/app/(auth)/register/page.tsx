"use client";

import {
  Ambulance,
  ArrowRight,
  Clock3,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Siren,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("PATIENT");

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

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Left Content */}
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-8 py-6 xl:px-10 xl:py-7 2xl:px-12 2xl:py-8">
          {/* Top */}
          <div className="flex items-center justify-between">
            {/* Online badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>

              <span className="text-xs sm:text-sm font-medium">
                Emergency Network Online
              </span>
            </div>

            {/* Siren icon */}
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
              <Siren className="w-5 h-5 text-red-400" />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-10 bg-red-500" />

              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-red-400">
                Join SwiftRescue
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-black tracking-tight text-white leading-[1.05]">
              One network.
              <br />
              <span className="text-red-500">Every second matters.</span>
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base xl:text-base text-zinc-300 leading-relaxed max-w-lg">
              Join a connected emergency response network that brings patients,
              dispatchers, ambulance drivers, and hospitals together when help
              is needed most.
            </p>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
              {/* Fast Response */}
              <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-3.5">
                <Clock3 className="w-5 h-5 text-red-400 mb-2" />

                <p className="text-base sm:text-lg font-bold text-white">
                  Fast
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                  Response
                </p>
              </div>

              {/* Smart Dispatch */}
              <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-3.5">
                <MapPin className="w-5 h-5 text-red-400 mb-2" />

                <p className="text-base sm:text-lg font-bold text-white">
                  Smart
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                  Dispatch
                </p>
              </div>

              {/* Connected */}
              <div className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-3.5">
                <Users className="w-5 h-5 text-red-400 mb-2" />

                <p className="text-base sm:text-lg font-bold text-white">
                  Connected
                </p>

                <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                  Healthcare
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
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

            {/* Security */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Secure & Reliable
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RIGHT SIDE — REGISTER FORM
      ========================================================= */}

      <section className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center bg-white dark:bg-black relative z-20">
        <div className="w-full max-w-md mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 py-5 xl:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-5 group w-fit">
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
              Create an account
            </h1>

            <p className="mt-1.5 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Join SwiftRescue today. Select your account type below.
            </p>
          </div>

          {/* Form Area */}
          <div className="mt-5">
            {/* Role Selector */}
            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-4 border border-zinc-200 dark:border-zinc-800">
              {/* Patient */}
              <button
                type="button"
                onClick={() => setRole("PATIENT")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === "PATIENT"
                    ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Patient
              </button>

              {/* Driver */}
              <button
                type="button"
                onClick={() => setRole("AMBULANCE_DRIVER")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === "AMBULANCE_DRIVER"
                    ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Driver
              </button>

              {/* Dispatcher / Hospital */}
              <button
                type="button"
                onClick={() => setRole("DISPATCHER")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === "DISPATCHER"
                    ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Hospital
              </button>
            </div>

            {/* Form */}
            <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
                >
                  Full Name
                </label>

                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-zinc-400" />
                  </div>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition"
                  />
                </div>
              </div>

              {/* Email */}
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
                    required
                    placeholder="john@example.com"
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
                >
                  Phone Number
                </label>

                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-zinc-400" />
                  </div>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition"
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

                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Create a strong password"
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl shadow-md shadow-red-500/20 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all active:scale-[0.98]"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Already have account */}
            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-300 dark:border-zinc-800" />
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white dark:bg-black text-zinc-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in instead
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Your information is securely protected</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
