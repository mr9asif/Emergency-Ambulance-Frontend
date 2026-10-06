import apiClient from "@/lib/axios";
import { Patient, CreatePatientDto, UpdatePatientDto } from "../types";

export const patientApi = {
  getPatients: async (): Promise<Patient[]> => {
    const response = await apiClient.get<{ success: boolean; message: string; data: Patient[] }>("/api/patient");
    return response.data.data;
  },

  getPatient: async (id: string): Promise<Patient> => {
    const response = await apiClient.get<{ success: boolean; message: string; data: Patient }>(`/api/patient/${id}`);
    return response.data.data;
  },

  createPatient: async (data: CreatePatientDto): Promise<Patient> => {
    const response = await apiClient.post<{ success: boolean; message: string; data: Patient }>("/api/patient", data);
    return response.data.data;
  },

  updatePatient: async (id: string, data: UpdatePatientDto): Promise<Patient> => {
    const response = await apiClient.patch<{ success: boolean; message: string; data: Patient }>(`/api/patient/${id}`, data);
    return response.data.data;
  },

  deletePatient: async (id: string): Promise<null> => {
    const response = await apiClient.delete<{ success: boolean; message: string; data: null }>(`/api/patient/${id}`);
    return response.data.data;
  }
};
