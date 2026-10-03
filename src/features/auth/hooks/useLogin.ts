"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import type { LoginRequest } from "../types/auth.types";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
  });
}
