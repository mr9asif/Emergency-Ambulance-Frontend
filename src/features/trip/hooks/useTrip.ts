import { useQuery } from "@tanstack/react-query";
import { getTripById } from "../api/trip.api";

export function useTrip(tripId: string) {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTripById(tripId),
    enabled: !!tripId,
  });
}
