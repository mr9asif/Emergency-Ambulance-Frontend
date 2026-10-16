"use client";

import { useArriveHospital } from "@/features/trip/hooks/useArriveHospital";
import { useConfirmPickup } from "@/features/trip/hooks/useConfirmPickup";
import { useMyActiveTrip } from "@/features/trip/hooks/useMyActiveTrip";
import { usePayTrip } from "@/features/trip/hooks/usePayTrip";
import { ActiveTrip, EmergencyRequestStatus } from "@/features/trip/types/trip.types";
import {
  AlertCircle,
  AlertTriangle,
  Ambulance,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  HeartPulse,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface StatusDetail {
  label: string;
  subtitle: string;
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  icon: any;
  stepIndex: number;
}

const statusConfig: Record<string, StatusDetail> = {
  PENDING: {
    label: "Searching for Ambulance",
    subtitle: "Locating the nearest available ambulance unit for your emergency.",
    color: "bg-amber-500",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    icon: Clock,
    stepIndex: 0,
  },
  DISPATCHING: {
    label: "Dispatching Ambulance",
    subtitle: "Contacting nearby emergency drivers and hospital response teams.",
    color: "bg-amber-500",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    icon: Clock,
    stepIndex: 0,
  },
  ASSIGNED: {
    label: "Ambulance Assigned",
    subtitle: "An ambulance and certified driver have been assigned to your request.",
    color: "bg-blue-500",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    icon: Ambulance,
    stepIndex: 1,
  },
  EN_ROUTE_TO_PICKUP: {
    label: "Driver is on the way",
    subtitle: "Ambulance is currently driving to your pickup address. Please stay safe and ready.",
    color: "bg-blue-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    icon: Navigation,
    stepIndex: 2,
  },
  ARRIVED_AT_PICKUP: {
    label: "Driver Arrived at Pickup",
    subtitle: "The ambulance has reached your location. Please board and confirm pickup below.",
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    icon: MapPin,
    stepIndex: 3,
  },
  PATIENT_PICKED_UP: {
    label: "Patient Boarded (Departing)",
    subtitle: "Pickup confirmed! The ambulance is departing towards the destination hospital.",
    color: "bg-purple-600",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    icon: CheckCircle2,
    stepIndex: 4,
  },
  EN_ROUTE_TO_HOSPITAL: {
    label: "Going to Hospital",
    subtitle: "The ambulance is currently transporting the patient to the hospital.",
    color: "bg-purple-600",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    icon: Ambulance,
    stepIndex: 4,
  },
  ARRIVED_AT_HOSPITAL: {
    label: "Arrived at Hospital",
    subtitle: "Ambulance has reached the destination hospital. Please proceed to payment to finalize.",
    color: "bg-teal-600",
    bgLight: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-700",
    icon: MapPin,
    stepIndex: 5,
  },
  COMPLETED: {
    label: "Trip Completed",
    subtitle: "Payment received. This emergency trip has been completed successfully.",
    color: "bg-emerald-600",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    icon: Check,
    stepIndex: 6,
  },
  CANCELLED: {
    label: "Trip Cancelled",
    subtitle: "This emergency request was cancelled.",
    color: "bg-rose-500",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
    icon: AlertCircle,
    stepIndex: -1,
  },
};

const journeySteps = [
  { key: "requested", label: "Requested" },
  { key: "on_way", label: "On the way" },
  { key: "at_pickup", label: "Arrived Pickup" },
  { key: "to_hospital", label: "To Hospital" },
  { key: "at_hospital", label: "Hospital / Pay" },
];

export default function ActiveTripPage() {
  const { data: rawActiveTrip, isLoading } = useMyActiveTrip();
  const activeTrip = rawActiveTrip as ActiveTrip | undefined;

  const { mutate: confirmPickup, isPending: isConfirming } = useConfirmPickup();
  const { mutate: arriveHospital, isPending: isArrivingHospital } = useArriveHospital();
  const { mutate: payTrip, isPending: isPaying } = usePayTrip();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500 animate-pulse">
          Retrieving active trip details...
        </p>
      </div>
    );
  }

  if (!activeTrip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] bg-white rounded-3xl border border-slate-200/80 p-10 text-center shadow-sm">
        <div className="w-20 h-20 bg-slate-100/80 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
          <Ambulance className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          No Active Trips
        </h2>
        <p className="text-slate-500 mb-8 max-w-md text-sm leading-relaxed">
          You don't have any ongoing emergency trips right now. If you need urgent medical transport, please request an ambulance immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/patient/emergency/request"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-red-500/25 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            <Ambulance className="w-4 h-4" />
            Request Ambulance
          </Link>
          <Link
            href="/patient/trips/history"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            View Trip History
          </Link>
        </div>
      </div>
    );
  }

  // Determine current lifecycle status from emergencyRequest.status or fallback to trip.status
  const emergencyStatus = activeTrip.emergencyRequest?.status as EmergencyRequestStatus | undefined;
  const tripStatus = activeTrip.status;

  let currentStatus = "PENDING";
  if (tripStatus === "COMPLETED" || emergencyStatus === "COMPLETED") {
    currentStatus = "COMPLETED";
  } else if (tripStatus === "CANCELLED" || emergencyStatus === "CANCELLED") {
    currentStatus = "CANCELLED";
  } else if (emergencyStatus) {
    currentStatus = emergencyStatus;
  } else if (tripStatus && tripStatus !== "IN_PROGRESS") {
    currentStatus = tripStatus;
  }

  const config = statusConfig[currentStatus] || statusConfig.PENDING;

  // Calculate stepper progress bar percentage
  const getProgressPercentage = () => {
    switch (currentStatus) {
      case "PENDING":
      case "DISPATCHING":
        return 12;
      case "ASSIGNED":
        return 28;
      case "EN_ROUTE_TO_PICKUP":
        return 48;
      case "ARRIVED_AT_PICKUP":
        return 65;
      case "PATIENT_PICKED_UP":
      case "EN_ROUTE_TO_HOSPITAL":
        return 82;
      case "ARRIVED_AT_HOSPITAL":
        return 94;
      case "COMPLETED":
        return 100;
      default:
        return 10;
    }
  };

  const fareAmount = activeTrip.fareAmount || 1200;

  const handleConfirmPickup = () => {
    confirmPickup(activeTrip.id);
  };

  const handleArriveHospital = () => {
    arriveHospital(activeTrip.id);
  };

  const handleProceedPayment = () => {
    payTrip(
      {
        tripId: activeTrip.id,
      },
      {
        onSuccess: (res: any) => {
          const redirectUrl = res?.gatewayPageUrl || res?.data?.gatewayPageUrl;
          if (redirectUrl) {
            toast.success("Redirecting to SSLCommerz...");
            window.location.href = redirectUrl;
          }
        },
      }
    );
  };

  const patient = activeTrip.emergencyRequest?.patient;
  const hospital = activeTrip.emergencyRequest?.hospital;
  const driver = activeTrip.driver;
  const ambulance = activeTrip.ambulance;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Active Emergency Trip
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
              LIVE
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Trip Number: <span className="text-slate-700 font-semibold">{activeTrip.tripNumber || `#${activeTrip.id.substring(0, 8)}`}</span>
            {activeTrip.emergencyRequest?.requestNumber && (
              <span className="ml-2 text-slate-400">
                (Request: {activeTrip.emergencyRequest.requestNumber})
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href={`/patient/trips/${activeTrip.id}`}
            className="text-slate-700 hover:text-slate-900 font-semibold text-sm bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            View Full Details
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Status, Actions, Location, Patient */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Status & Action Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <config.icon className="w-52 h-52 text-slate-900" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-xs ${config.bgLight} ${config.textColor} border ${config.borderColor}`}>
                  <span className={`w-2 h-2 rounded-full ${config.color} animate-ping`}></span>
                  Current Status
                </div>

                {activeTrip.emergencyRequest?.priority && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      activeTrip.emergencyRequest.priority === "HIGH"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-orange-100 text-orange-700 border border-orange-200"
                    }`}
                  >
                    Priority: {activeTrip.emergencyRequest.priority}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                {config.label}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                {config.subtitle}
              </p>

              {/* Progress Bar & Visual Stepper */}
              <div className="space-y-4 mb-8">
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`h-full ${config.color} rounded-full transition-all duration-700 ease-out`}
                    style={{
                      width: `${getProgressPercentage()}%`,
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-5 text-center gap-1">
                  {journeySteps.map((step, idx) => {
                    const isDone =
                      (idx === 0 && config.stepIndex >= 0) ||
                      (idx === 1 && config.stepIndex >= 2) ||
                      (idx === 2 && config.stepIndex >= 3) ||
                      (idx === 3 && config.stepIndex >= 4) ||
                      (idx === 4 && config.stepIndex >= 5);

                    const isCurrent =
                      (idx === 0 && config.stepIndex <= 1) ||
                      (idx === 1 && config.stepIndex === 2) ||
                      (idx === 2 && config.stepIndex === 3) ||
                      (idx === 3 && config.stepIndex === 4) ||
                      (idx === 4 && config.stepIndex >= 5);

                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1.5 transition-colors ${
                            isDone
                              ? "bg-slate-900 text-white"
                              : isCurrent
                              ? "bg-blue-600 text-white ring-4 ring-blue-100"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {isDone ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span
                          className={`text-[11px] font-semibold leading-tight ${
                            isCurrent
                              ? "text-slate-900 font-bold"
                              : isDone
                              ? "text-slate-700"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DYNAMIC ACTION BUTTONS ACCORDING TO USER FLOW */}
              {/* 1. When ARRIVED_AT_PICKUP -> Confirm Pickup Option */}
              {currentStatus === "ARRIVED_AT_PICKUP" && (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 sm:p-6 mb-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-950 text-base">
                          Ambulance is at your pickup location!
                        </h3>
                        <p className="text-emerald-800 text-xs sm:text-sm mt-0.5">
                          Please board the ambulance, then confirm pickup to start your hospital journey.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleConfirmPickup}
                      disabled={isConfirming}
                      className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      {isConfirming ? "Confirming..." : "I'm in Ambulance (Confirm Pickup)"}
                    </button>
                  </div>
                </div>
              )}

              {/* 2. When PATIENT_PICKED_UP or EN_ROUTE_TO_HOSPITAL -> Provide hospital arrival action */}
              {(currentStatus === "EN_ROUTE_TO_HOSPITAL" ||
                currentStatus === "PATIENT_PICKED_UP") && (
                <div className="bg-purple-50/90 border border-purple-200 rounded-2xl p-5 sm:p-6 mb-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20">
                        <Ambulance className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-bold text-purple-950 text-base">
                          Heading to {hospital?.name || "Hospital"}
                        </h3>
                        <p className="text-purple-800 text-xs sm:text-sm mt-0.5">
                          Patient safely picked up. When you reach the hospital gate, confirm arrival.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleArriveHospital}
                      disabled={isArrivingHospital}
                      className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MapPin className="w-5 h-5" />
                      {isArrivingHospital ? "Updating..." : "Arrived at Hospital"}
                    </button>
                  </div>
                </div>
              )}

              {/* 3. When ARRIVED_AT_HOSPITAL -> Direct SSLCommerz Payment Redirect */}
              {currentStatus === "ARRIVED_AT_HOSPITAL" && (
                <div className="bg-teal-50/90 border border-teal-200 rounded-2xl p-5 sm:p-6 mb-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/20">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-teal-950 text-base">
                            Arrived at Hospital - Payment Due
                          </h3>
                          {activeTrip.fareAmount && (
                            <span className="bg-teal-200 text-teal-900 text-xs font-bold px-2 py-0.5 rounded-md">
                              ৳{activeTrip.fareAmount}
                            </span>
                          )}
                        </div>
                        <p className="text-teal-800 text-xs sm:text-sm mt-0.5">
                          You have arrived at {hospital?.name || "the hospital"}. Proceed to SSLCommerz to complete the payment.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleProceedPayment}
                      disabled={isPaying}
                      className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Redirecting to SSLCommerz...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-5 h-5" />
                          Proceed to Payment {activeTrip.fareAmount ? `(৳${activeTrip.fareAmount})` : ""}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* 4. When COMPLETED -> Done message and button to trip history */}
              {currentStatus === "COMPLETED" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-950 text-base">
                          Trip Completed & Settled
                        </h3>
                        <p className="text-emerald-800 text-xs sm:text-sm mt-0.5">
                          Payment has been confirmed. You can review full invoice and logs in trip history.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/patient/trips/history"
                      className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <span>View in Trip History</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location & Destination Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
              <span>Location & Route Details</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                Emergency Route
              </span>
            </h3>

            <div className="space-y-6">
              {/* Pickup Point */}
              <div className="flex gap-4">
                <div className="mt-1 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <div className="w-0.5 h-full bg-slate-200 my-1 min-h-[44px]"></div>
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pickup Location
                  </p>
                  <p className="text-slate-900 font-semibold text-base mt-1">
                    {activeTrip.emergencyRequest?.pickupAddress || "Location selected on map"}
                  </p>
                </div>
              </div>

              {/* Hospital Destination */}
              <div className="flex gap-4">
                <div className="mt-1 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-50"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Destination Hospital
                    </p>
                    {hospital?.hasEmergency && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-700 rounded-md">
                        Emergency Unit Ready
                      </span>
                    )}
                  </div>
                  <p className="text-slate-900 font-semibold text-base mt-1">
                    {hospital?.name || "Selected Hospital"}
                  </p>
                  {hospital?.address && (
                    <p className="text-slate-500 text-xs mt-0.5">
                      {hospital.address}
                    </p>
                  )}
                  {hospital?.phone && (
                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {hospital.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Patient & Emergency Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-red-500" />
              Patient & Medical Context
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Patient Name
                </p>
                <p className="font-bold text-slate-900 text-base">
                  {patient?.name || "Not specified"}
                </p>
                {patient?.phone && (
                  <p className="text-xs text-slate-500 mt-1">Phone: {patient.phone}</p>
                )}
                {patient?.emergencyContact && (
                  <p className="text-xs text-slate-500">
                    Emergency Contact: {patient.emergencyContact}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Blood Group & Gender
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 font-bold rounded-lg text-xs">
                    Blood:{" "}
                    {patient?.bloodGroup
                      ? patient.bloodGroup.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")
                      : "N/A"}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs">
                    {patient?.gender || "Unknown"}
                  </span>
                </div>
              </div>

              {activeTrip.emergencyRequest?.notes && (
                <div className="sm:col-span-2 bg-amber-50/80 p-4 rounded-2xl border border-amber-200/70">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Emergency Medical Notes
                      </p>
                      <p className="text-sm font-medium text-amber-950 mt-1">
                        {activeTrip.emergencyRequest.notes}
                      </p>
                      {patient?.medicalNotes && (
                        <p className="text-xs text-amber-800/80 mt-1">
                          Patient Medical History: {patient.medicalNotes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Driver, Ambulance, Fare */}
        <div className="space-y-6">
          {/* Assigned Driver Card */}
          {driver && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Assigned Driver
              </h3>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200/60 shadow-inner">
                  <User className="w-6 h-6 text-slate-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">
                    {driver.user?.name || "Driver"}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">Ambulance Driver</p>
                  {driver.employeeCode && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      ID: {driver.employeeCode}
                    </p>
                  )}
                </div>
              </div>

              {driver.user?.phone && (
                <a
                  href={`tel:${driver.user.phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-slate-100 text-slate-800 py-3 rounded-xl font-bold transition-all border border-slate-200 text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Call Driver ({driver.user.phone})
                </a>
              )}
            </div>
          )}

          {/* Ambulance Info Card */}
          {ambulance && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>Ambulance Info</span>
                <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-md">
                  {ambulance.status}
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Vehicle Type</p>
                    <p className="font-bold text-slate-900 mt-0.5">
                      {ambulance.ambulanceType || "Standard"} Life Support
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Ambulance className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Registration Number</p>
                  <p className="font-mono font-bold text-slate-900 mt-0.5 text-base tracking-wide">
                    {ambulance.registrationNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fare & Payment Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
              <span>Trip Fare & Billing</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  currentStatus === "COMPLETED" || activeTrip.payment
                    ? "bg-emerald-100 text-emerald-700"
                    : currentStatus === "ARRIVED_AT_HOSPITAL"
                    ? "bg-amber-100 text-amber-700 animate-pulse"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {currentStatus === "COMPLETED" || activeTrip.payment
                  ? "PAID"
                  : currentStatus === "ARRIVED_AT_HOSPITAL"
                  ? "DUE NOW"
                  : "PENDING"}
              </span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-500 font-medium">Total Amount</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  ৳{fareAmount}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure online payment processed through SSLCommerz gateway.
              </p>

              {currentStatus === "ARRIVED_AT_HOSPITAL" && (
                <button
                  onClick={handleProceedPayment}
                  disabled={isPaying}
                  className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-600/25 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to SSLCommerz...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
