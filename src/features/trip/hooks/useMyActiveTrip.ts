import { useQuery } from "@tanstack/react-query";
import { getMyActiveTrip } from "../api/trip.api";

export function useMyActiveTrip() {
  return useQuery({
    queryKey: ["my-active-trip"],
    queryFn: getMyActiveTrip,
    refetchInterval: 5000,
  });
}
