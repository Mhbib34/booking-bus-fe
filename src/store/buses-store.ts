import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { Buses } from "@/types/bus.type";

type BusStore = {
  buses: Buses[];
  loading: boolean;
  fetchBuses: () => Promise<Buses[] | undefined>;
  setBuses: (buses: Buses[]) => void;
};

export const useBusStore = create<BusStore>((set) => ({
  buses: [],
  loading: true,
  setBuses: (buses: Buses[]) => set({ buses }),
  fetchBuses: async () => {
    try {
      const res = await axiosInstance.get("/v1/buses", {
        withCredentials: true,
      });

      console.log(res.data);

      set({ buses: res.data.data, loading: false });

      return res.data;
      //eslint-disable-next-line
    } catch (error) {
      set({
        buses: [],
        loading: false,
      });
    }
  },
}));
