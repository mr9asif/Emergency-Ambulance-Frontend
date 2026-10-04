// "use client";

// import { useQuery } from "@tanstack/react-query";

// import { getCurrentUser } from "../api/auth.api";

// export function useCurrentUser() {
//   return useQuery({
//     queryKey: ["current-user"],
//     queryFn: getCurrentUser,
//     retry: false,
//     staleTime: 5 * 60 * 1000,
//   });
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";

export function useCurrentUser() {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      console.log("🔥 Calling /api/auth/me");

      const user = await getCurrentUser();

      console.log("🔥 /api/auth/me returned:", user);

      return user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  console.log("🔥 useCurrentUser:", {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
  });

  return query;
}
