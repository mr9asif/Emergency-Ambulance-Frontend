import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveOperatorApplication, rejectOperatorApplication } from "../api/admin.api";
import type { ApproveApplicationPayload, RejectApplicationPayload } from "../types/admin.types";
import { toast } from "sonner";

export function useApproveOperatorApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload?: ApproveApplicationPayload;
    }) => approveOperatorApplication(id, payload),
    onSuccess: () => {
      toast.success("Operator application approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["operator-applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["admin-operators"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to approve application";
      toast.error(message);
    },
  });
}

export function useRejectOperatorApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RejectApplicationPayload;
    }) => rejectOperatorApplication(id, payload),
    onSuccess: () => {
      toast.success("Operator application rejected");
      queryClient.invalidateQueries({ queryKey: ["operator-applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to reject application";
      toast.error(message);
    },
  });
}
