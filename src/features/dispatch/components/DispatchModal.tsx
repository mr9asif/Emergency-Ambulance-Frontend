"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import type {
  AvailableAmbulance,
  AvailableDriver,
  PendingEmergency,
} from "../types/dispatch.types";
import { useNearbyHospitals } from "../hooks/useDispatchQueries";
import { useAssignEmergency } from "../hooks/useAssignEmergency";
import {
  MapPin,
  Building2,
  Ambulance,
  UserCheck,
  AlertTriangle,
  Loader2,
  Navigation,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface DispatchModalProps {
  emergency: PendingEmergency | null;
  onClose: () => void;
  availableAmbulances: AvailableAmbulance[];
  availableDrivers: AvailableDriver[];
}

export function DispatchModal({
  emergency,
  onClose,
  availableAmbulances,
  availableDrivers,
}: DispatchModalProps) {
  const { data: nearbyData, isLoading: isLoadingHospitals } = useNearbyHospitals(
    emergency?.id
  );
  const assignMutation = useAssignEmergency();

  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string>("");
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");

  const hospitals = nearbyData?.hospitals ?? [];

  // When nearby hospitals load, auto-select the closest hospital
  useEffect(() => {
    if (hospitals.length > 0 && !selectedHospitalId) {
      setSelectedHospitalId(hospitals[0].id);
    }
  }, [hospitals, selectedHospitalId]);

  // Reset selection when emergency changes
  useEffect(() => {
    if (emergency) {
      setSelectedHospitalId("");
      setSelectedAmbulanceId("");
      setSelectedDriverId("");
    }
  }, [emergency]);

  // Ambulances at selected hospital or all available
  const matchingAmbulances = selectedHospitalId
    ? availableAmbulances.filter(
        (a) => a.baseHospitalId === selectedHospitalId
      )
    : availableAmbulances;

  const ambulancesToShow =
    matchingAmbulances.length > 0 ? matchingAmbulances : availableAmbulances;

  const handleDispatch = () => {
    if (!emergency || !selectedHospitalId || !selectedAmbulanceId || !selectedDriverId) {
      return;
    }

    assignMutation.mutate(
      {
        emergencyRequestId: emergency.id,
        payload: {
          hospitalId: selectedHospitalId,
          ambulanceId: selectedAmbulanceId,
          driverId: selectedDriverId,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const isFormValid =
    !!selectedHospitalId && !!selectedAmbulanceId && !!selectedDriverId;

  return (
    <Modal
      isOpen={!!emergency}
      onClose={onClose}
      maxWidth="3xl"
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <Ambulance className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Dispatch Ambulance Unit
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Emergency Request #{emergency?.requestNumber || emergency?.id.slice(0, 8)}
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Patient and Incident Summary */}
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Patient & Caller
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {emergency?.patient?.name || emergency?.customer?.name || "Patient"}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Phone className="h-3 w-3" />
                {emergency?.patient?.phone || emergency?.customer?.phone || "No phone"}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Triage Classification
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="rounded-lg bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-950/60 dark:text-red-300">
                  {emergency?.priority} Priority
                </span>
                <span className="rounded-lg bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  {emergency?.emergencyType}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <MapPin className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
            <span className="font-semibold">{emergency?.pickupAddress}</span>
          </div>

          {emergency?.notes && (
            <div className="mt-2 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 italic">
              <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>Notes: "{emergency.notes}"</span>
            </div>
          )}
        </div>

        {/* Step 1: Destination Hospital */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-blue-600" />
              1. Destination Hospital (Nearest Emergency Ready)
            </span>
            {isLoadingHospitals && (
              <span className="text-xs font-normal text-blue-600 flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Calculating route distance...
              </span>
            )}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
            {hospitals.map((hosp, index) => {
              const isSelected = selectedHospitalId === hosp.id;
              return (
                <button
                  key={hosp.id}
                  type="button"
                  onClick={() => setSelectedHospitalId(hosp.id)}
                  className={`flex flex-col text-left p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600/30 dark:bg-blue-950/50"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                      {hosp.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        index === 0
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {hosp.distanceFromPickupKm} km
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {hosp.address}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Available Ambulance */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <Ambulance className="h-4 w-4 text-emerald-600" />
              2. Assign Ambulance
            </span>
            <span className="text-xs font-normal text-slate-500">
              {ambulancesToShow.length} Available
            </span>
          </label>

          {ambulancesToShow.length === 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              No ambulances currently available in fleet standby.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-40 overflow-y-auto pr-1">
              {ambulancesToShow.map((amb) => {
                const isSelected = selectedAmbulanceId === amb.id;
                return (
                  <button
                    key={amb.id}
                    type="button"
                    onClick={() => setSelectedAmbulanceId(amb.id)}
                    className={`flex flex-col text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600/30 dark:bg-emerald-950/50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                        {amb.registrationNumber}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {amb.ambulanceType}
                      </span>
                    </div>
                    {amb.baseHospital && (
                      <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                        Base: {amb.baseHospital.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 3: Available Driver */}
        <div>
          <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-indigo-600" />
              3. Assign Driver on Duty
            </span>
            <span className="text-xs font-normal text-slate-500">
              {availableDrivers.length} On Duty
            </span>
          </label>

          {availableDrivers.length === 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              No active ambulance drivers available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-40 overflow-y-auto pr-1">
              {availableDrivers.map((driver) => {
                const isSelected = selectedDriverId === driver.id;
                return (
                  <button
                    key={driver.id}
                    type="button"
                    onClick={() => setSelectedDriverId(driver.id)}
                    className={`flex flex-col text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-600/30 dark:bg-indigo-950/50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    }`}
                  >
                    <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                      {driver.user.name}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      {driver.user.phone}
                    </span>
                    {driver.licenseNumber && (
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Lic: {driver.licenseNumber}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isFormValid || assignMutation.isPending}
            onClick={handleDispatch}
            className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 text-white px-6 py-2.5 text-sm font-bold transition-all shadow-lg shadow-red-500/25 active:scale-95 flex items-center gap-2"
          >
            {assignMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Dispatching Unit...
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4" />
                Deploy Emergency Unit Now
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
