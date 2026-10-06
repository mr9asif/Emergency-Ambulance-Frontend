import apiClient from "@/lib/axios";

export const getMyTrips = async () => {
  const response = await apiClient.get("/api/trip/my-trips");
  return response.data;
};
