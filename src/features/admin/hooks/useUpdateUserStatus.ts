import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../api/admin.api";
import type { UserStatus } from "../types/admin.types";
import { toast } from "sonner";

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      updateUserStatus(userId, status),
    onSuccess: (_, variables) => {
      toast.success(`User status changed to ${variables.status}`);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update user status";
      toast.error(message);
    },
  });
}
