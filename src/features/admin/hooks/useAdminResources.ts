import { useQuery } from "@tanstack/react-query";
import { getAllAmbulances, getAllHospitals, getAllOperators } from "../api/admin.api";

export function useAdminOperators() {
  return useQuery({
    queryKey: ["admin-operators"],
    queryFn: getAllOperators,
  });
}

export function useAdminHospitals() {
  return useQuery({
    queryKey: ["admin-hospitals"],
    queryFn: getAllHospitals,
  });
}

export function useAdminAmbulances() {
  return useQuery({
    queryKey: ["admin-ambulances"],
    queryFn: getAllAmbulances,
  });
}
