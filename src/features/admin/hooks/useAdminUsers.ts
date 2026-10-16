import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../api/admin.api";
import type { AdminUserQuery } from "../types/admin.types";

export function useAdminUsers(params?: AdminUserQuery) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAdminUsers(params),
  });
}
