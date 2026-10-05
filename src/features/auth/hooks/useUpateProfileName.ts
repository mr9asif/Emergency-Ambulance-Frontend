"use client";

import { useMutation } from "@tanstack/react-query";

import { updateProfileName } from "../api/auth.api";

export function useUpdateProfileName() {
  return useMutation({
    mutationFn: (name: string) => updateProfileName(name),
  });
}
