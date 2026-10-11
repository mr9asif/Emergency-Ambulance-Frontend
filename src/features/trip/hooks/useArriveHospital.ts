import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arriveHospital } from "../api/trip.api";
import { toast } from "sonner";

export function useArriveHospital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: arriveHospital,
    onSuccess: (_, tripId) => {
      toast.success("Arrived at hospital recorded successfully");
      queryClient.invalidateQueries({ queryKey: ["my-active-trip"] });
      queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update hospital arrival"
      );
    },
  });
}
