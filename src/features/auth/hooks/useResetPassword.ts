"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth.api";
import type { ResetPasswordRequest } from "../types/auth.types";

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => resetPassword(payload),
  });
}
