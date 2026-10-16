import { useQuery } from "@tanstack/react-query";
import { getOperatorApplications } from "../api/admin.api";

export function useOperatorApplications(params?: { status?: string }) {
  return useQuery({
    queryKey: ["operator-applications", params],
    queryFn: () => getOperatorApplications(params),
  });
}
