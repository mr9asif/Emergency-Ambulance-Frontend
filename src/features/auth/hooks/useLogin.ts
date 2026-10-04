"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import type { LoginRequest } from "../types/auth.types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });
}
