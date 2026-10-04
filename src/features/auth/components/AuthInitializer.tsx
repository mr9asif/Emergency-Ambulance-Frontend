"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function AuthInitializer() {
  const { data: user, isSuccess, isError } = useCurrentUser();

  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    if (isSuccess && user) {
      setUser(user);
    }
    console.log(user);

    if (isError) {
      clearUser();
    }
  }, [isSuccess, isError, user, setUser, clearUser]);

  return null;
}
