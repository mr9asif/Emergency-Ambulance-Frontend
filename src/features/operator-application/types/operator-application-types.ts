export type OperatorType = "DRIVER" | "DISPATCHER";

export interface OperatorApplicationPayload {
  name: string;
  email: string;
  phone: string;
  operatorType: OperatorType;
  licenseNumber?: string;
}

export interface OperatorApplicationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    operatorType: OperatorType;
    status: string;
  };
}
