import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignEmergencyRequest } from "../api/dispatch.api";
import type { AssignEmergencyPayload } from "../types/dispatch.types";
import { toast } from "sonner";

export function useAssignEmergency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      emergencyRequestId,
      payload,
    }: {
      emergencyRequestId: string;
      payload: AssignEmergencyPayload;
    }) => assignEmergencyRequest(emergencyRequestId, payload),
    onSuccess: () => {
      toast.success("Emergency dispatched successfully! Offer sent to driver.");
      // Invalidate queries so UI reflects the newly assigned state instantly
      queryClient.invalidateQueries({ queryKey: ["pending-emergencies"] });
      queryClient.invalidateQueries({ queryKey: ["available-ambulances"] });
      queryClient.invalidateQueries({ queryKey: ["available-drivers"] });
      queryClient.invalidateQueries({ queryKey: ["all-dispatch-offers"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to assign emergency request";
      toast.error(message);
    },
  });
}
