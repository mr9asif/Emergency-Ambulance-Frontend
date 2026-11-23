import apiClient from "@/lib/axios";

import type {
  OperatorApplicationPayload,
  OperatorApplicationResponse,
} from "../types/operator-application-types";

export const createOperatorApplication = async (
  payload: OperatorApplicationPayload,
): Promise<OperatorApplicationResponse> => {
  const response = await apiClient.post("/api/operatorApplication", payload);

  return response.data;
};

export const verifyOperatorEmail = async (payload: {
  email: string;
  otp: string;
}) => {
  const response = await apiClient.post(
    "/api/operatorApplication/verify-email",
    payload,
  );

  return response.data;
};
