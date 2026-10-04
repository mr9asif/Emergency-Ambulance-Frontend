export type UserRole = "PATIENT" | "DISPATCHER" | "AMBULANCE_DRIVER" | "ADMIN";

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  profileImage?: string | null;
  role: UserRole;

  emailVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: AuthUser;
  };
}
