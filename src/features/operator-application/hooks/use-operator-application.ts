import { useMutation } from "@tanstack/react-query";

import {
  createOperatorApplication,
  verifyOperatorEmail,
} from "../api/operator-application.api";

export const useOperatorApplication = () => {
  return useMutation({
    mutationKey: ["operator-application"],
    mutationFn: createOperatorApplication,
  });
};

export const useVerifyOperatorEmail = () => {
  return useMutation({
    mutationKey: ["verify-operator-email"],
    mutationFn: verifyOperatorEmail,
  });
};
