import { useQuery } from "@tanstack/react-query";
import { getMyTripHistory } from "../api/trip.api";

export function useMyTripHistory() {
  return useQuery({
    queryKey: ["my-trip-history"],
    queryFn: getMyTripHistory,
  });
}
