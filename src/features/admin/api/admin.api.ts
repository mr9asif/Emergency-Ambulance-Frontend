import apiClient from "@/lib/axios";
import type {
  AdminAmbulance,
  AdminDashboardData,
  AdminDashboardResponse,
  AdminHospital,
  AdminOperator,
  AdminUser,
  AdminUserQuery,
  AdminUsersResponse,
  ApproveApplicationPayload,
  OperatorApplication,
  OperatorApplicationsResponse,
  RejectApplicationPayload,
  UserStatus,
} from "../types/admin.types";

export const getAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await apiClient.get<AdminDashboardResponse>("/api/admin/dashboard");
  return response.data?.data ?? (response.data as unknown as AdminDashboardData);
};

export const getAdminUsers = async (params?: AdminUserQuery) => {
  const response = await apiClient.get<AdminUsersResponse>("/api/admin/users", {
    params,
  });
  return response.data?.data ?? response.data;
};

export const getAdminUserById = async (userId: string): Promise<AdminUser> => {
  const response = await apiClient.get<{ success: boolean; data: AdminUser }>(
    `/api/admin/users/${userId}`
  );
  return response.data?.data ?? response.data;
};

export const updateUserStatus = async (userId: string, status: UserStatus) => {
  const response = await apiClient.patch(`/api/admin/users/${userId}/status`, {
    status,
  });
  return response.data?.data ?? response.data;
};

export const getOperatorApplications = async (params?: { status?: string }): Promise<OperatorApplication[]> => {
  const response = await apiClient.get<OperatorApplicationsResponse>(
    "/api/admin/operator-applications",
    { params }
  );
  return response.data?.data ?? (response.data as unknown as OperatorApplication[]);
};

export const getOperatorApplicationById = async (id: string): Promise<OperatorApplication> => {
  const response = await apiClient.get<{ success: boolean; data: OperatorApplication }>(
    `/api/admin/operator-applications/${id}`
  );
  return response.data?.data ?? response.data;
};

export const approveOperatorApplication = async (
  id: string,
  payload?: ApproveApplicationPayload
) => {
  const response = await apiClient.patch(
    `/api/admin/operator-applications/${id}/approve`,
    payload || {}
  );
  return response.data?.data ?? response.data;
};

export const rejectOperatorApplication = async (
  id: string,
  payload: RejectApplicationPayload
) => {
  const response = await apiClient.patch(
    `/api/admin/operator-applications/${id}/reject`,
    payload
  );
  return response.data?.data ?? response.data;
};

export const getAllOperators = async (): Promise<AdminOperator[]> => {
  const response = await apiClient.get<{ success: boolean; data: AdminOperator[] }>(
    "/api/admin/operators"
  );
  return response.data?.data ?? (response.data as unknown as AdminOperator[]);
};

export const getAllHospitals = async (): Promise<AdminHospital[]> => {
  const response = await apiClient.get<{ success: boolean; data: AdminHospital[] }>(
    "/api/hospital"
  );
  return response.data?.data ?? (response.data as unknown as AdminHospital[]);
};

export const getAllAmbulances = async (): Promise<AdminAmbulance[]> => {
  const response = await apiClient.get<{ success: boolean; data: AdminAmbulance[] }>(
    "/api/ambulance"
  );
  return response.data?.data ?? (response.data as unknown as AdminAmbulance[]);
};
