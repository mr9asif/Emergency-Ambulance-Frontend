export type EmergencyPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type EmergencyType =
  | "CARDIAC"
  | "ACCIDENT"
  | "PREGNANCY"
  | "STROKE"
  | "RESPIRATORY"
  | "TRAUMA"
  | "OTHER";

export type EmergencyStatus =
  | "PENDING"
  | "DISPATCHING"
  | "ASSIGNED"
  | "COMPLETED"
  | "CANCELLED";

export type AssignmentStatus =
  | "OFFERED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

export type AssignmentMethod = "AUTO" | "MANUAL";

export interface PendingEmergency {
  id: string;
  requestNumber?: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  emergencyType: EmergencyType;
  priority: EmergencyPriority;
  notes?: string | null;
  status: EmergencyStatus;
  createdAt: string;
  updatedAt?: string;
  patient?: {
    id: string;
    name: string;
    phone: string;
    gender?: string;
    dateOfBirth?: string;
  };
  customer?: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
  };
}

export interface AvailableDriver {
  id: string;
  userId: string;
  operatorType: "DRIVER";
  licenseNumber?: string | null;
  employeeCode?: string | null;
  hospitalId?: string | null;
  isAvailable: boolean;
  user: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    profileImage?: string | null;
  };
}

export interface AvailableAmbulance {
  id: string;
  registrationNumber: string;
  ambulanceType: "BASIC" | "ADVANCED" | "ICU";
  status: "AVAILABLE" | "BUSY" | "MAINTENANCE";
  baseHospitalId: string;
  baseHospital?: {
    id: string;
    name: string;
  };
}

export interface NearbyHospital {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceFromPickupKm: number;
}

export interface NearbyHospitalsResponse {
  emergencyRequest: {
    id: string;
    requestNumber: string;
    pickupAddress: string;
    pickupLatitude: number;
    pickupLongitude: number;
    emergencyType: string;
    priority: string;
    status: string;
  };
  hospitals: NearbyHospital[];
}

export interface DispatchAssignment {
  id: string;
  emergencyRequestId: string;
  driverId: string;
  ambulanceId: string;
  assignedBy?: string | null;
  assignmentMethod: AssignmentMethod;
  status: AssignmentStatus;
  offeredAt: string;
  respondedAt?: string | null;
  expiresAt?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  emergencyRequest?: PendingEmergency;
  driver?: {
    id: string;
    user?: {
      id: string;
      name: string;
      phone: string;
      email?: string | null;
    };
  };
  ambulance?: {
    id: string;
    registrationNumber: string;
    ambulanceType: string;
  };
}

export interface AssignEmergencyPayload {
  hospitalId: string;
  ambulanceId: string;
  driverId: string;
}
