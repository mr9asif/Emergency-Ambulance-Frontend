import apiClient from "@/lib/axios";

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export const register = async (
  payload: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/register",
    payload,
  );

  return response.data;
};

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/login",
    payload,
  );

  return response.data;
};
