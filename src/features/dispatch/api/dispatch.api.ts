import apiClient from "@/lib/axios";
import type {
  AssignEmergencyPayload,
  AvailableAmbulance,
  AvailableDriver,
  DispatchAssignment,
  NearbyHospitalsResponse,
  PendingEmergency,
} from "../types/dispatch.types";

export const getPendingEmergencyRequests = async (): Promise<PendingEmergency[]> => {
  const response = await apiClient.get<{ success: boolean; data: PendingEmergency[] }>(
    "/api/emergencyRequest/pending"
  );
  return response.data?.data ?? (response.data as unknown as PendingEmergency[]);
};

export const getAvailableDrivers = async (): Promise<AvailableDriver[]> => {
  const response = await apiClient.get<{ success: boolean; data: AvailableDriver[] }>(
    "/api/emergencyRequest/available-drivers"
  );
  return response.data?.data ?? (response.data as unknown as AvailableDriver[]);
};

export const getAvailableAmbulances = async (): Promise<AvailableAmbulance[]> => {
  const response = await apiClient.get<{ success: boolean; data: AvailableAmbulance[] }>(
    "/api/emergencyRequest/available-ambulances"
  );
  return response.data?.data ?? (response.data as unknown as AvailableAmbulance[]);
};

export const getNearbyHospitals = async (
  emergencyRequestId: string
): Promise<NearbyHospitalsResponse> => {
  try {
    const response = await apiClient.get<{
      success: boolean;
      data: NearbyHospitalsResponse;
    }>(`/api/emergencyRequest/${emergencyRequestId}/nearby-hospitals`);
    return response.data?.data ?? (response.data as unknown as NearbyHospitalsResponse);
  } catch (err: any) {
    if (err?.response?.status === 404) {
      const fallback = await apiClient.get<{
        success: boolean;
        data: NearbyHospitalsResponse;
      }>(`/api/emergencyRequest/${emergencyRequestId}/nearby-hospital`);
      return fallback.data?.data ?? (fallback.data as unknown as NearbyHospitalsResponse);
    }
    throw err;
  }
};

export const assignEmergencyRequest = async (
  emergencyRequestId: string,
  payload: AssignEmergencyPayload
) => {
  const response = await apiClient.post(
    `/api/emergencyRequest/${emergencyRequestId}/assign`,
    payload
  );
  return response.data?.data ?? response.data;
};

export const getAllDispatchOffers = async (): Promise<DispatchAssignment[]> => {
  const response = await apiClient.get<{
    success: boolean;
    data: DispatchAssignment[];
  }>("/api/dispatch-assignments/all-offers");
  return response.data?.data ?? (response.data as unknown as DispatchAssignment[]);
};

export const getMyDispatchOffers = async (): Promise<DispatchAssignment[]> => {
  const response = await apiClient.get<{
    success: boolean;
    data: DispatchAssignment[];
  }>("/api/dispatch-assignments/my-offers");
  return response.data?.data ?? (response.data as unknown as DispatchAssignment[]);
};

export const getAllTrips = async (): Promise<any[]> => {
  const response = await apiClient.get<{ success: boolean; data: any[] }>(
    "/api/trip"
  );
  return response.data?.data ?? (response.data as unknown as any[]);
};

export const getNotifications = async (): Promise<any[]> => {
  const response = await apiClient.get<{ success: boolean; data: any[] }>(
    "/api/notification"
  );
  return response.data?.data ?? (response.data as unknown as any[]);
};
