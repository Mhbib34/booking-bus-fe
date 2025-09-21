"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function AuthInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  return null;
}
