"use client";

import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

import {
  Ambulance,
  ArrowRight,
  Loader2,
  Mail,
  ShieldCheck,
  Siren,
} from "lucide-react";

import { useVerifyAuthEmail } from "@/features/auth/hooks/useVerifyEmail";
import { useVerifyOperatorEmail } from "@/features/operator-application/hooks/use-operator-application";
import { toast } from "sonner";

type VerificationType = "AUTH" | "OPERATOR_APPLICATION";

interface VerifyEmailFormProps {
  initialEmail: string;
  verificationType: VerificationType;
}

interface VerificationResponse {
  success: boolean;
  message: string;
}

// ---------------------------------------------
// Verification Form
// ---------------------------------------------

function VerifyEmailForm({
  initialEmail,
  verificationType,
}: VerifyEmailFormProps) {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // React Query mutations
  const authMutation = useVerifyAuthEmail();
  const operatorMutation = useVerifyOperatorEmail();

  const isLoading = authMutation.isPending || operatorMutation.isPending;

  const isOperator = verificationType === "OPERATOR_APPLICATION";

  // ---------------------------------------------
  // Handle Email Verification
  // ---------------------------------------------

  const handleVerifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate email
    if (!email.trim() || !otp.trim()) {
      setError("Please enter your email and OTP.");
      return;
    }

    // Validate OTP
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      otp,
    };

    try {
      let response: VerificationResponse;

      // Select verification API
      if (isOperator) {
        response = await operatorMutation.mutateAsync(payload);
      } else {
        response = await authMutation.mutateAsync(payload);
      }

      if (response.success) {
        if (isOperator) {
          toast.success("Email verified successfully!", {
            description:
              "Your operator application is now under review. Please check your email for further updates.",
            duration: 4000,
          });

          setTimeout(() => {
            router.push("/");
          }, 2500);
        } else {
          toast.success("Email verified successfully!", {
            description: response.message,
            duration: 3000,
          });

          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } else {
        setError(response.message || "Email verification failed.");
      }
    } catch (err: unknown) {
      if (isAxiosError<{ message?: string }>(err)) {
        setError(
          err.response?.data?.message ||
            "Invalid OTP or email verification failed.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-10 selection:bg-red-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-[#09090b] to-black" />

      <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[130px]" />

      <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-red-600/10 blur-[130px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <Link
          href="/"
          className="group mb-8 flex items-center justify-center gap-3"
        >
          <div className="rounded-xl bg-red-600 p-2.5 text-white shadow-lg shadow-red-600/20 transition-transform group-hover:scale-105">
            <Ambulance size={27} strokeWidth={2.5} />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              SwiftRescue
            </h2>

            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Emergency Dispatch Platform
            </p>
          </div>
        </Link>

        {/* Verification Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Top Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-red-900 via-red-500 to-red-900" />

          <div className="p-6 sm:p-9">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500">
                <ShieldCheck size={38} strokeWidth={1.7} />

                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-950 bg-green-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="h-px w-7 bg-red-500/60" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                  {isOperator ? "Operator Verification" : "Account Security"}
                </span>

                <span className="h-px w-7 bg-red-500/60" />
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Verify Your Email
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                {isOperator
                  ? "Verify your email address to complete your operator application."
                  : "One final step! Verify your email address to activate your SwiftRescue account."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerifyEmail} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Email Address
                </label>

                <div className="group relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-red-400"
                  />

                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    required
                  />
                </div>
              </div>

              {/* OTP Field */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-zinc-300">
                    Verification Code
                  </label>

                  <span className="text-xs text-zinc-500">6-digit OTP</span>
                </div>

                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-4 text-center text-2xl font-bold tracking-[0.7em] text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  required
                />

                <p className="mt-2 text-xs text-zinc-500">
                  Enter the verification code sent to your email inbox.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5">
                  <Siren size={18} className="mt-0.5 shrink-0 text-red-400" />

                  <p className="text-sm leading-relaxed text-red-300">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-3.5">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-green-400"
                  />

                  <p className="text-sm leading-relaxed text-green-300">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !!success}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Email
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 border-t border-zinc-800" />

            {/* Footer */}
            <div className="text-center">
              <p className="text-sm text-zinc-500">
                Already verified?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="font-semibold text-red-400 transition hover:text-red-300 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
          <ShieldCheck size={15} className="text-green-500" />

          <span>Your information is securely protected by SwiftRescue.</span>
        </div>

        <p className="mt-3 text-center text-[11px] text-zinc-700">
          © {new Date().getFullYear()} SwiftRescue. All rights reserved.
        </p>
      </div>
    </main>
  );
}

// ---------------------------------------------
// Read URL Parameters
// ---------------------------------------------

function VerifyEmailContent() {
  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") ?? "";

  const typeFromUrl = searchParams.get("type");

  const verificationType: VerificationType =
    typeFromUrl === "OPERATOR_APPLICATION" ? "OPERATOR_APPLICATION" : "AUTH";

  return (
    <VerifyEmailForm
      key={`${emailFromUrl}-${verificationType}`}
      initialEmail={emailFromUrl}
      verificationType={verificationType}
    />
  );
}

// ---------------------------------------------
// Page Component
// ---------------------------------------------

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
          Loading verification...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
