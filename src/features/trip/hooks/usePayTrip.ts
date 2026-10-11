import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../api/trip.api";
import { toast } from "sonner";

export interface PayTripPayload {
  tripId: string;
  data?: {
    paymentMethod?: string;
    amount?: number;
    transactionId?: string;
    [key: string]: any;
  };
}

export function usePayTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, data }: PayTripPayload) => createPayment(tripId, data),
    onSuccess: (_, variables) => {
      toast.success("Payment completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-active-trip"] });
      queryClient.invalidateQueries({ queryKey: ["trip", variables.tripId] });
      queryClient.invalidateQueries({ queryKey: ["my-trips"] });
      queryClient.invalidateQueries({ queryKey: ["my-trip-history"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Payment processing failed");
    },
  });
}
