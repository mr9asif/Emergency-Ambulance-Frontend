"use client";

import { useMutation } from "@tanstack/react-query";
import { updateProfileImage } from "../api/auth.api";

export function useUpdateProfileImage() {
  return useMutation({
    mutationFn: (file: File) => updateProfileImage(file),
  });
}
