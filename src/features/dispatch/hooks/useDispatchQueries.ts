import { useQuery } from "@tanstack/react-query";
import {
  getAllDispatchOffers,
  getAllTrips,
  getAvailableAmbulances,
  getAvailableDrivers,
  getNearbyHospitals,
  getNotifications,
  getPendingEmergencyRequests,
} from "../api/dispatch.api";

export function usePendingEmergencies() {
  return useQuery({
    queryKey: ["pending-emergencies"],
    queryFn: getPendingEmergencyRequests,
    refetchInterval: 10 * 1000,
    staleTime: 5 * 1000,
  });
}

export function useAvailableDrivers() {
  return useQuery({
    queryKey: ["available-drivers"],
    queryFn: getAvailableDrivers,
    refetchInterval: 15 * 1000,
    staleTime: 10 * 1000,
  });
}

export function useAvailableAmbulances() {
  return useQuery({
    queryKey: ["available-ambulances"],
    queryFn: getAvailableAmbulances,
    refetchInterval: 15 * 1000,
    staleTime: 10 * 1000,
  });
}

export function useNearbyHospitals(emergencyRequestId?: string) {
  return useQuery({
    queryKey: ["nearby-hospitals", emergencyRequestId],
    queryFn: () => getNearbyHospitals(emergencyRequestId!),
    enabled: !!emergencyRequestId,
    staleTime: 30 * 1000,
  });
}

export function useAllDispatchOffers() {
  return useQuery({
    queryKey: ["all-dispatch-offers"],
    queryFn: getAllDispatchOffers,
    refetchInterval: 10 * 1000,
    staleTime: 5 * 1000,
  });
}

export function useAllTrips() {
  return useQuery({
    queryKey: ["all-trips"],
    queryFn: getAllTrips,
    refetchInterval: 20 * 1000,
    staleTime: 15 * 1000,
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 30 * 1000,
  });
}
