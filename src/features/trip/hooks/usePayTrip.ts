import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPayment } from "../api/trip.api";

export interface PayTripPayload {
  tripId: string;
  data?: any;
}

export function usePayTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, data }: PayTripPayload) =>
      createPayment(tripId, data),
    onSuccess: (res: any, variables) => {
      const gatewayUrl = res?.gatewayPageUrl || res?.data?.gatewayPageUrl;
      if (gatewayUrl) {
        toast.success("Redirecting to SSLCommerz gateway...");
        window.location.href = gatewayUrl;
        return;
      }
      toast.success("Payment initiated successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-active-trip"] });
      queryClient.invalidateQueries({ queryKey: ["trip", variables.tripId] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      queryClient.invalidateQueries({ queryKey: ["my-trip-history"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Payment initiation failed");
    },
  });
}
