import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { Schedule } from "@/types/schedule.type";

type ScheduleStore = {
  schedules: Schedule[];
  loading: boolean;
  fetchSchedules: (
    page?: number,
    origin?: string,
    destination?: string,
    departure_date?: string
  ) => Promise<Schedule[] | undefined>;
  setSchedules: (schedules: Schedule[]) => void;
};

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],
  loading: true,
  setSchedules: (schedules: Schedule[]) => set({ schedules }),
  fetchSchedules: async (
    page: number = 1,
    origin?: string,
    destination?: string,
    departure_date?: string
  ) => {
    try {
      const params = {
        page,
        size: 10,
        origin,
        destination,
        departure_date,
      };

      const res = await axiosInstance.get("/v1/schedules", {
        params,
        withCredentials: true,
      });

      console.log(res.data);

      set({ schedules: res.data.data, loading: false });

      return res.data;
      //eslint-disable-next-line
    } catch (error) {
      set({
        schedules: [],
        loading: false,
      });
    }
  },
}));
