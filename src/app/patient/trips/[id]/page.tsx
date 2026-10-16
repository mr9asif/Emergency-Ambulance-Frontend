"use client";

import { useTrip } from "@/features/trip/hooks/useTrip";
import { useConfirmPickup } from "@/features/trip/hooks/useConfirmPickup";
import { usePayTrip } from "@/features/trip/hooks/usePayTrip";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  MapPin, 
  Clock,
  User,
  Phone,
  Ambulance,
  CheckCircle2,
  AlertCircle,
  Wallet,
  Loader2,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const { data: trip, isLoading, error } = useTrip(tripId);
  const { mutate: confirmPickup, isPending: isConfirming } = useConfirmPickup();
  const { mutate: payTrip, isPending: isPaying } = usePayTrip();

  const handleProceedPayment = () => {
    payTrip(
      {
        tripId,
      },
      {
        onSuccess: (res: any) => {
          const redirectUrl = res?.gatewayPageUrl || res?.data?.gatewayPageUrl;
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Loading trip details...</p>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Trip Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md">
          We couldn't find the details for this trip. It might have been deleted or you don't have access to it.
        </p>
        <button 
          onClick={() => router.back()}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5"
        >
          Go Back
        </button>
      </div>
    );
  }

  const emergencyStatus = trip.emergencyRequest?.status;
  let currentStatus = emergencyStatus || trip.status || "PENDING";
  if (trip.status === "COMPLETED" || emergencyStatus === "COMPLETED") {
    currentStatus = "COMPLETED";
  } else if (trip.status === "CANCELLED" || emergencyStatus === "CANCELLED") {
    currentStatus = "CANCELLED";
  } else if (emergencyStatus) {
    currentStatus = emergencyStatus;
  }
  const isCompleted = currentStatus === "COMPLETED";
  const isCancelled = currentStatus === "CANCELLED";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trip Details</h1>
          <p className="text-slate-500">ID: #{trip.id.substring(0, 8)}</p>
        </div>
        
        {/* Status Badge */}
        <div className="ml-auto">
          {isCompleted ? (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-semibold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </div>
          ) : isCancelled ? (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full font-semibold border border-red-200">
              <AlertCircle className="w-4 h-4" />
              Cancelled
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Active
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Card if Needs Confirmation */}
          {currentStatus === "ARRIVED_AT_PICKUP" && (
            <div className="bg-emerald-50 rounded-3xl p-6 md:p-8 border border-emerald-200 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between">
              <div>
                <h2 className="text-xl font-bold text-emerald-900 mb-2">Ambulance Arrived</h2>
                <p className="text-emerald-700">The assigned driver has reached your location. Please board the ambulance and confirm your pickup to start the hospital journey.</p>
              </div>
              <button
                onClick={() => confirmPickup(trip.id)}
                disabled={isConfirming}
                className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-5 h-5" />
                {isConfirming ? "Confirming..." : "Confirm Pickup"}
              </button>
            </div>
          )}

          {/* Action Card if Arrived at Hospital -> Payment Required */}
          {currentStatus === "ARRIVED_AT_HOSPITAL" && (
            <div className="bg-teal-50 rounded-3xl p-6 md:p-8 border border-teal-200 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-teal-950">Arrived at Hospital - Payment Due</h2>
                  {(trip.fareAmount || trip.fare) && (
                    <span className="bg-teal-200 text-teal-900 text-xs font-bold px-2.5 py-0.5 rounded-md">
                      ৳{trip.fareAmount || trip.fare}
                    </span>
                  )}
                </div>
                <p className="text-teal-800 text-sm">
                  You have arrived at your destination hospital. Please proceed to SSLCommerz to complete the payment for this emergency trip.
                </p>
              </div>
              <button
                onClick={handleProceedPayment}
                disabled={isPaying}
                className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-teal-600/30 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to SSLCommerz...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="bg-slate-100 rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-[400px] relative flex flex-col items-center justify-center">
            {/* Live tracking map would be embedded here */}
            <MapPin className="w-16 h-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-400">Live Map Tracking</h3>
            <p className="text-slate-400 mt-2">Map interface will be rendered here.</p>
          </div>

          {/* Location Timeline */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Route Details</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-50 shadow-sm z-10"></div>
                  <div className="w-0.5 h-full bg-slate-200 my-1 min-h-[60px]"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Pickup Point</p>
                  <p className="text-slate-900 font-medium text-lg leading-tight mb-2">
                    {trip.emergencyRequest?.pickupAddress || trip.pickupAddress || "Location selected on map"}
                  </p>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    Requested at {format(new Date(trip.createdAt || Date.now()), "h:mm a")}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-50 shadow-sm z-10"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-1">Destination Hospital</p>
                  <p className="text-slate-900 font-medium text-lg leading-tight mb-2">
                    {trip.emergencyRequest?.hospital?.name || trip.hospital?.name || trip.dropoffAddress || "Not set yet"}
                  </p>
                  {(trip.emergencyRequest?.hospital?.address || trip.hospital?.address) && (
                    <p className="text-slate-500 text-sm">
                      {trip.emergencyRequest?.hospital?.address || trip.hospital?.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Trip Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Date</span>
                <span className="font-medium text-slate-900">{format(new Date(trip.createdAt || Date.now()), "MMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Distance</span>
                <span className="font-medium text-slate-900">{trip.distanceKm || trip.distance ? `${trip.distanceKm || trip.distance} km` : "Calculating..."}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Est. Time</span>
                <span className="font-medium text-slate-900">{trip.estimatedTime ? `${trip.estimatedTime} mins` : "--"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Cost</span>
                <span className="font-bold text-slate-900 text-lg">৳{trip.fareAmount || trip.fare || "1,200"}</span>
              </div>
            </div>
          </div>

          {trip.driver && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Driver & Vehicle</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200">
                  <User className="w-7 h-7 text-slate-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">{trip.driver.user?.name || trip.driver.name}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <span className="text-yellow-500">★</span> 4.9 Rating
                  </p>
                </div>
              </div>

              {trip.ambulance && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Ambulance className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-900">{trip.ambulance.ambulanceType || trip.ambulance.type || "Standard"} Ambulance</span>
                  </div>
                  <div className="text-sm text-slate-500 pl-8">
                    Reg: <span className="font-mono text-slate-700">{trip.ambulance.registrationNumber || "N/A"}</span>
                  </div>
                </div>
              )}

              {(trip.driver.user?.phone || trip.driver.phone) && (
                <a 
                  href={`tel:${trip.driver.user?.phone || trip.driver.phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-xl font-semibold transition-colors border border-blue-200"
                >
                  <Phone className="w-5 h-5" />
                  Contact Driver
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
