import apiClient from "@/lib/axios";

export const getPendingRequests = async () => {
  const response = await apiClient.get("/api/emergencyRequest/pending");
  return response.data;
};

export const createEmergencyRequest = async (payload: any) => {
  const response = await apiClient.post("/api/emergencyRequest", payload);
  return response.data;
};
