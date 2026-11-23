import { useMutation } from "@tanstack/react-query";
import { verifyAuthEmail } from "../api/auth.api";

export const useVerifyAuthEmail = () => {
  return useMutation({
    mutationKey: ["verify-auth-email"],
    mutationFn: verifyAuthEmail,
  });
};
