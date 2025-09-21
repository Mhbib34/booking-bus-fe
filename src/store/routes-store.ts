import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { Page } from "@/types/page.type";
import { Route } from "@/types/route.type";

type RouteStore = {
  routes: Page<Route>;
  loading: boolean;
  fetchRoutes: (
    page?: number,
    origin?: string,
    destination?: string
  ) => Promise<Page<Route> | undefined>;
  setRoutes: (routes: Page<Route>) => void;
};

export const useRouteStore = create<RouteStore>((set) => ({
  routes: {
    data: [],
    paging: {
      size: 0,
      total_pages: 0,
      current_page: 0,
    },
  },
  loading: true,
  setRoutes: (routes: Page<Route>) => set({ routes }),
  fetchRoutes: async (
    page: number = 1,
    origin?: string,
    destination?: string
  ) => {
    try {
      const params = {
        page,
        size: 10,
        origin,
        destination,
      };

      const res = await axiosInstance.get("/v1/routes", {
        params,
        withCredentials: true,
      });

      set({ routes: res.data, loading: false });

      return res.data;
      //eslint-disable-next-line
    } catch (error) {
      set({
        routes: {
          data: [],
          paging: { size: 0, total_pages: 0, current_page: 0 },
        },
        loading: false,
      });
    }
  },
}));
