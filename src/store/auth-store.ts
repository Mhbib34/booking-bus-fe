import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/user.type";
import { showSuccess } from "@/lib/sonner";
import { isErrorResponse } from "@/utils/error-response";

type AuthStore = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/v1/users/profile", {
        withCredentials: true,
      });
      set({ user: res.data.data, loading: false });
      //eslint-disable-next-line
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.delete("/v1/auth/logout", {
        withCredentials: true,
      });
      set({ user: null, loading: false });
      showSuccess(res.data.message);
    } catch (error) {
      set({ loading: false });
      isErrorResponse(error, "Logout failed. Please try again.");
    }
  },
}));
