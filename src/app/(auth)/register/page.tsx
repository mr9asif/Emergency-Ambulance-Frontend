"use client";

import Link from "next/link";
import { Ambulance, ArrowRight, Mail, Lock, User, Phone } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("PATIENT");

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-black selection:bg-red-500/30">
      {/* Left side - Visuals */}
      <div className="hidden lg:block relative w-full flex-1 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black/80"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="absolute bottom-20 left-12 right-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-6">
            Join our growing network
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">A unified platform for everyone.</h3>
          <p className="text-zinc-300 text-lg leading-relaxed max-w-lg">
            Whether you are a patient looking for reliable emergency transport, a driver looking to save lives, or a hospital managing dispatch—we have you covered.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[500px] xl:w-[600px] lg:px-20 relative z-10 bg-white dark:bg-black border-l border-zinc-200 dark:border-zinc-800 py-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
            <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Ambulance size={24} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              SwiftRescue
            </span>
          </Link>

          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Join SwiftRescue today. Select your account type below.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-6 border border-zinc-200 dark:border-zinc-800">
              <button 
                onClick={() => setRole("PATIENT")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${role === "PATIENT" ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
              >
                Patient
              </button>
              <button 
                onClick={() => setRole("AMBULANCE_DRIVER")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${role === "AMBULANCE_DRIVER" ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
              >
                Driver
              </button>
              <button 
                onClick={() => setRole("DISPATCHER")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${role === "DISPATCHER" ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
              >
                Hospital
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
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
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
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
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
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
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
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
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    placeholder="Create a strong password"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md shadow-red-500/20 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all active:scale-[0.98]"
                >
                  Create Account
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
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
