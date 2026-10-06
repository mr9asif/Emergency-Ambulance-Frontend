import { useQuery } from "@tanstack/react-query";
import { getMyTrips } from "../api/trip.api";

export function useMyTrips() {
  return useQuery({
    queryKey: ["my-trips"],
    queryFn: getMyTrips,
  });
}
