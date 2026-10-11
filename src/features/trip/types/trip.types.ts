export type EmergencyRequestStatus =
  | "PENDING"
  | "DISPATCHING"
  | "ASSIGNED"
  | "EN_ROUTE_TO_PICKUP"
  | "ARRIVED_AT_PICKUP"
  | "PATIENT_PICKED_UP"
  | "EN_ROUTE_TO_HOSPITAL"
  | "ARRIVED_AT_HOSPITAL"
  | "COMPLETED"
  | "CANCELLED";

export type TripStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface PatientInfo {
  id: string;
  userId?: string;
  name: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  medicalNotes?: string;
  emergencyContact?: string;
}

export interface HospitalInfo {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  latitude?: string | number;
  longitude?: string | number;
  isActive?: boolean;
  hasEmergency?: boolean;
}

export interface DriverUserInfo {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface DriverInfo {
  id: string;
  userId: string;
  operatorType?: string;
  licenseNumber?: string;
  employeeCode?: string;
  hospitalId?: string | null;
  isAvailable?: boolean;
  user?: DriverUserInfo;
}

export interface AmbulanceInfo {
  id: string;
  registrationNumber: string;
  ambulanceType: string;
  status: string;
  baseHospitalId?: string | null;
  currentLatitude?: number | null;
  currentLongitude?: number | null;
}

export interface EmergencyRequestInfo {
  id: string;
  requestNumber: string;
  customerId?: string;
  patientId?: string;
  hospitalId?: string;
  pickupAddress: string;
  pickupLatitude?: string | number;
  pickupLongitude?: string | number;
  emergencyType: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  requiredTime?: string | null;
  notes?: string | null;
  status: EmergencyRequestStatus;
  patient?: PatientInfo;
  hospital?: HospitalInfo;
  customer?: {
    id: string;
    name: string;
    phone: string;
    email?: string;
  };
}

export interface ActiveTrip {
  id: string;
  tripNumber?: string;
  emergencyRequestId: string;
  dispatchAssignmentId?: string;
  driverId?: string;
  ambulanceId?: string;
  hospitalId?: string;
  startedAt?: string;
  pickedUpAt?: string | null;
  arrivedAtHospitalAt?: string | null;
  completedAt?: string | null;
  distanceKm?: number | null;
  fareAmount?: number | null;
  status: TripStatus | string;
  createdAt: string;
  updatedAt: string;
  emergencyRequest?: EmergencyRequestInfo;
  ambulance?: AmbulanceInfo;
  driver?: DriverInfo;
  dispatchAssignment?: any;
  payment?: any;
}
