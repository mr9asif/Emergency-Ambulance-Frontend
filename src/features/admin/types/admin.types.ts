export type UserRole = "CUSTOMER" | "OPERATOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BLOCKED";
export type OperatorType = "DRIVER" | "DISPATCHER" | "HOSPITAL_STAFF";
export type OperatorApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type AmbulanceStatus = "AVAILABLE" | "BUSY" | "MAINTENANCE";
export type AmbulanceType = "BASIC" | "ADVANCED" | "ICU";
export type TripStatus =
  | "NOT_STARTED"
  | "EN_ROUTE_PICKUP"
  | "ARRIVED_PICKUP"
  | "PICKUP_CONFIRMED"
  | "EN_ROUTE_HOSPITAL"
  | "ARRIVED_HOSPITAL"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminDashboardData {
  users: {
    total: number;
    customers: number;
    operators: number;
    admins: number;
  };
  ambulances: {
    total: number;
    available: number;
    busy: number;
    maintenance: number;
  };
  trips: {
    total: number;
    completed: number;
    inProgress: number;
    cancelled: number;
  };
}

export interface AdminDashboardResponse {
  success: boolean;
  message?: string;
  data: AdminDashboardData;
}

export interface AdminUser {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  profileImage?: string | null;
  role: UserRole;
  status: UserStatus;
  authProvider?: string;
  emailVerified: boolean;
  needPasswordChange?: boolean;
  createdAt: string;
  updatedAt: string;
  operatorProfile?: {
    id: string;
    operatorType: OperatorType;
    employeeCode?: string | null;
    licenseNumber?: string | null;
    isAvailable: boolean;
  } | null;
}

export interface AdminUsersResponse {
  success: boolean;
  message?: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: AdminUser[];
  };
}

export interface AdminUserQuery {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

export interface OperatorApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  operatorType: OperatorType;
  licenseNumber?: string | null;
  experienceYears?: number | null;
  status: OperatorApplicationStatus;
  emailVerified: boolean;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OperatorApplicationsResponse {
  success: boolean;
  message?: string;
  data: OperatorApplication[];
}

export interface ApproveApplicationPayload {
  employeeCode?: string;
}

export interface RejectApplicationPayload {
  rejectionReason: string;
}

export interface AdminOperator {
  id: string;
  userId: string;
  operatorType: OperatorType;
  licenseNumber?: string | null;
  employeeCode?: string | null;
  hospitalId?: string | null;
  isAvailable: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    createdAt: string;
  };
}

export interface AdminHospital {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  hasEmergency: boolean;
  isActive: boolean;
}

export interface AdminAmbulance {
  id: string;
  registrationNumber: string;
  ambulanceType: AmbulanceType;
  status: AmbulanceStatus;
  baseHospitalId: string;
  baseHospital?: {
    id: string;
    name: string;
  };
}
