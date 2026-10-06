"use client";

import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    error,
  } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    forgotPassword({
      email: email.trim(),
    });
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 font-sans selection:bg-red-100 selection:text-red-900">
        <div className="w-full max-w-md animate-in zoom-in-95 rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-200/50 duration-500 sm:p-10">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <CheckCircle2 className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
            Check your email
          </h2>

          <p className="mb-8 text-slate-600">
            We have sent password reset instructions to{" "}
            <span className="font-semibold text-slate-900">{email}</span>.
          </p>

          {/* Reset Password Button */}
          <Link
            href="/reset-password"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:bg-red-700 active:scale-[0.98]"
          >
            Enter OTP to Reset Password
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Back to Login */}
          <div className="mt-6">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-red-600"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] p-4 font-sans selection:bg-red-100 selection:text-red-900">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-xl shadow-red-500/30">
            <AlertTriangle className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Forgot password?
          </h2>

          <p className="mt-2 text-center text-slate-600">
            No worries, we will send you reset instructions.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />

                <div>
                  <p className="font-medium">Failed to send reset email</p>

                  <p className="mt-1 text-xs text-red-600/80">
                    {error instanceof Error
                      ? error.message
                      : "Something went wrong. Please try again."}
                  </p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending || !email.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending instructions...
                </>
              ) : (
                <>
                  Send instructions
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="mt-8 text-center text-sm font-medium text-slate-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-600 transition-all hover:text-red-700 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
