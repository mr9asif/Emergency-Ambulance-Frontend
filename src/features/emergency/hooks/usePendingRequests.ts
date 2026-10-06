import { useQuery } from "@tanstack/react-query";
import { getPendingRequests } from "../api/emergency.api";

export function usePendingRequests() {
  return useQuery({
    queryKey: ["pending-requests"],
    queryFn: getPendingRequests,
  });
}
