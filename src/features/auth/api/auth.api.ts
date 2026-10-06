import apiClient from "@/lib/axios";

import uploadClient from "@/lib/uploadClient";
import type {
  AuthResponse,
  AuthUser,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
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

export async function updateProfileImage(file: File) {
  const formData = new FormData();

  formData.append("profileImage", file);

  const response = await uploadClient.patch(
    "/api/auth/profile-image",
    formData,
  );

  return response.data;
}

// Update profile name
export async function updateProfileName(name: string) {
  const response = await apiClient.patch("/api/auth/profile-name", {
    name,
  });

  return response.data;
}

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/forgot-password",
    payload,
  );
  return response.data;
};

export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/reset-password",
    payload,
  );
  return response.data;
};
