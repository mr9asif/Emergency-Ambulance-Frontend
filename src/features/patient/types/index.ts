export interface Patient {
  id: string;
  userId: string;
  name: string;
  phone: string;
  dateOfBirth: string; // ISO String
  gender: string;
  bloodGroup: string;
  medicalNotes: string;
  emergencyContact: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  name: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  medicalNotes: string;
  emergencyContact: string;
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}
