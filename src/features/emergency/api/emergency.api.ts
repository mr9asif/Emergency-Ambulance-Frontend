import apiClient from "@/lib/axios";

export const getPendingRequests = async () => {
  const response = await apiClient.get("/api/emergencyRequest/pending");
  return response.data;
};

export const getMyPendingRequests = async () => {
  const response = await apiClient.get("/api/emergencyRequest/my-pending");
  return response.data;
};

export const createEmergencyRequest = async (payload: any) => {
  const response = await apiClient.post("/api/emergencyRequest", payload);
  return response.data;
};

export const cancelEmergencyRequest = async (id: string) => {
  const response = await apiClient.patch(`/api/emergencyRequest/${id}/cancel`);
  return response.data;
};
