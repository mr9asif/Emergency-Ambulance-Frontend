"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import {
  Ambulance,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileBadge,
  Headset,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

import { useOperatorApplication } from "../hooks/use-operator-application";

import type { OperatorType } from "../types/operator-application-types";

export default function OperatorApplicationForm() {
  const router = useRouter();

  const { mutate, isPending, error } = useOperatorApplication();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    operatorType: "DRIVER" as OperatorType,
    licenseNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Change operator type
  const handleOperatorType = (type: OperatorType) => {
    setFormData((prev) => ({
      ...prev,
      operatorType: type,
      licenseNumber: "",
    }));

    setErrors({});
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(?:\+?8801|01)[3-9]\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid Bangladeshi phone number";
    }

    if (formData.operatorType === "DRIVER" && !formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "Driving license number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit application
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      operatorType: formData.operatorType,

      ...(formData.operatorType === "DRIVER" && {
        licenseNumber: formData.licenseNumber.trim(),
      }),
    };

    mutate(payload, {
      onSuccess: (response) => {
        if (response.success) {
          router.push(
            `/verify-email?email=${encodeURIComponent(
              response.data.email,
            )}&type=OPERATOR_APPLICATION`,
          );
        }
      },
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  // Extract backend error
  const apiError =
    (error as any)?.response?.data?.message || (error as Error)?.message;

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <Ambulance size={32} />
        </div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <ShieldCheck size={15} />
          Join Our Emergency Response Team
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Become an <span className="text-emerald-600">Operator</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Help us save lives. Apply to become an ambulance driver or dispatcher
          and join our emergency response network.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ClipboardList size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Application Form
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Enter your information to get started.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Operator Type */}
            <div>
              <label className={labelClass}>Select Operator Type *</label>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Driver */}
                <button
                  type="button"
                  onClick={() => handleOperatorType("DRIVER")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    formData.operatorType === "DRIVER"
                      ? "border-emerald-500 bg-emerald-50/70"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck
                      size={27}
                      className={
                        formData.operatorType === "DRIVER"
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    />

                    {formData.operatorType === "DRIVER" && (
                      <CheckCircle2 size={20} className="text-emerald-600" />
                    )}
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900">
                    Ambulance Driver
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Drive emergency ambulances and transport patients safely.
                  </p>
                </button>

                {/* Dispatcher */}
                <button
                  type="button"
                  onClick={() => handleOperatorType("DISPATCHER")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    formData.operatorType === "DISPATCHER"
                      ? "border-emerald-500 bg-emerald-50/70"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Headset
                      size={27}
                      className={
                        formData.operatorType === "DISPATCHER"
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }
                    />

                    {formData.operatorType === "DISPATCHER" && (
                      <CheckCircle2 size={20} className="text-emerald-600" />
                    )}
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900">Dispatcher</h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Manage emergency requests and coordinate ambulance dispatch.
                  </p>
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Name */}
            <div>
              <label className={labelClass}>Full Name *</label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email Address *</label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone Number *</label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="01712345678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {errors.phone && (
                <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Driver License */}
            {formData.operatorType === "DRIVER" && (
              <div>
                <label className={labelClass}>Driving License Number *</label>

                <div className="relative">
                  <FileBadge className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder="DL-123456789"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {errors.licenseNumber && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.licenseNumber}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  A valid driving license is required for ambulance drivers.
                </p>
              </div>
            )}

            {/* API Error */}
            {apiError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight size={19} />
                </>
              )}
            </button>

            <p className="text-center text-xs leading-6 text-slate-400">
              After submitting, you will receive an email verification request.
            </p>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Why Join */}
          <div className="overflow-hidden rounded-3xl bg-slate-950 p-7 text-white">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck size={26} />
            </div>

            <h3 className="text-xl font-bold">Why Join Our Team?</h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Become part of a team dedicated to improving emergency medical
              transportation.
            </p>

            <div className="mt-7 space-y-5">
              {[
                "Make a difference in people's lives",
                "Join an emergency response network",
                "Help improve emergency response times",
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7">
            <h3 className="font-bold text-slate-900">Application Process</h3>

            <div className="mt-6 space-y-6">
              {[
                {
                  title: "Submit Application",
                  desc: "Provide your personal information.",
                },
                {
                  title: "Email Verification",
                  desc: "Verify your email address.",
                },
                {
                  title: "Admin Review",
                  desc: "Our team reviews your application.",
                },
                {
                  title: "Approval",
                  desc: "Receive your onboarding invitation.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
