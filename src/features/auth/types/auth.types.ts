export type UserRole = "PATIENT" | "DISPATCHER" | "AMBULANCE_DRIVER" | "ADMIN";

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: AuthUser;
  };
}
