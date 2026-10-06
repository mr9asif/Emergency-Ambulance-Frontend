"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth.api";
import type { ForgotPasswordRequest } from "../types/auth.types";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) => forgotPassword(payload),
  });
}
