import apiClient from "@/lib/axios";

export const getMyTrips = async () => {
  const response = await apiClient.get("/api/trip/my-trips");
  return response.data.data;
};

export const getMyActiveTrip = async () => {
  const response = await apiClient.get("/api/trip/my-trips/active");
  return response.data.data;
};

export const getMyTripHistory = async () => {
  const response = await apiClient.get("/api/trip/my-trips/history");
  return response.data.data;
};

export const getTripById = async (tripId: string) => {
  const response = await apiClient.get(`/api/trip/${tripId}`);
  return response.data.data;
};

export const confirmPickup = async (tripId: string) => {
  const response = await apiClient.patch(`/api/trip/${tripId}/confirm-pickup`);
  return response.data?.data ?? response.data;
};

export const arriveHospital = async (tripId: string) => {
  try {
    const response = await apiClient.patch(
      `/api/trip/${tripId}/arrive-hospital`,
    );
    return response.data?.data ?? response.data;
  } catch (error: any) {
    if (error?.response?.status === 405) {
      const response = await apiClient.post(
        `/api/trip/${tripId}/arrive-hospital`,
      );
      return response.data?.data ?? response.data;
    }
    throw error;
  }
};

export const createPayment = async (tripId: string, payload?: any) => {
  try {
    const response = await apiClient.post(
      `/api/payment/${tripId}`,
      payload || {},
    );
    return response.data?.data ?? response.data;
  } catch (error: any) {
    if (error?.response?.status === 405) {
      const response = await apiClient.patch(
        `/api/payment/${tripId}`,
        payload || {},
      );
      console.log("payment", response);
      return response.data?.data ?? response.data;
    }
    throw error;
  }
};
