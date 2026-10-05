import apiClient from "@/lib/axios";

import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await apiClient.get<CurrentUserResponse>("/api/auth/me");
  console.log(response.data);
  return response.data.data;
};

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

export async function logout() {
  const response = await apiClient.post("/api/auth/logout");

  return response.data;
}
