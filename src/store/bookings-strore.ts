import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { Page } from "@/types/page.type";
import { Booking } from "@/types/booking.type";

type BookingStore = {
  bookings: Page<Booking>;
  loading: boolean;
  fetchBookings: (
    page?: number,
    status?: string
  ) => Promise<Page<Booking> | undefined>;
  setBookings: (bookings: Page<Booking>) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: {
    data: [],
    paging: {
      size: 0,
      total_pages: 0,
      current_page: 0,
    },
  },
  loading: true,
  setBookings: (bookings: Page<Booking>) => set({ bookings }),
  fetchBookings: async (page: number = 1, status: string = "pending") => {
    try {
      const params = {
        page,
        size: 10,
        status,
      };

      const res = await axiosInstance.get("/v1/bookings", {
        params,
        withCredentials: true,
      });

      set({ bookings: res.data, loading: false });

      return res.data;
      //eslint-disable-next-line
    } catch (error) {
      set({
        bookings: {
          data: [],
          paging: { size: 0, total_pages: 0, current_page: 0 },
        },
        loading: false,
      });
    }
  },
}));
