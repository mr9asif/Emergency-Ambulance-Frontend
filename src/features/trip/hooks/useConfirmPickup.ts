import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmPickup } from "../api/trip.api";
import { toast } from "sonner";

export function useConfirmPickup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmPickup,
    onSuccess: (_, tripId) => {
      toast.success("Pickup confirmed successfully");
      queryClient.invalidateQueries({ queryKey: ["my-active-trip"] });
      queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to confirm pickup");
    },
  });
}
