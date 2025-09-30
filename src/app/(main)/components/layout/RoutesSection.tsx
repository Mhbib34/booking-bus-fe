"use client";

import { Button } from "@/components/ui/button";
import { useScheduleStore } from "@/store/schedule-store";
import { Route } from "@/types/route.type";
import { Schedule } from "@/types/schedule.type";
import { Format } from "@/utils/format";
import { Bus, ChevronRight } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";
import { motion } from "framer-motion";

type props = {
  setShowSchedule: React.Dispatch<React.SetStateAction<boolean>>;
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  scheduleSectionRef: React.RefObject<HTMLDivElement | null>;
  routes: Route[];
};

const RoutesSection = ({
  setShowSchedule,
  setSchedules,
  scheduleSectionRef,
  routes,
}: props) => {
  const { fetchSchedules } = useScheduleStore(
    useShallow((state) => ({
      fetchSchedules: state.fetchSchedules,
    }))
  );

  const handleSearch = async (origin: string, destination: string) => {
    const now = new Date();
    const dateIndonesia = now.toLocaleDateString("en-CA");

    try {
      await fetchSchedules(1, origin, destination, dateIndonesia);

      const state = useScheduleStore.getState();
      if (state.schedules.length > 0) {
        setSchedules(state.schedules);
        setShowSchedule(true);
      } else {
        setSchedules([]);
        setShowSchedule(false);
      }

      setTimeout(() => {
        scheduleSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.section
      id="rute"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // animasi jalan sekali saat 20% section terlihat
    >
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Rute Populer</h2>
        <p className="text-lg text-gray-600">
          Pilihan rute favorit dengan harga terbaik
        </p>
      </motion.div>

      {/* Grid Routes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.slice(0, 4).map((route, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {route.origin}
                </h3>
                <div className="flex items-center my-2">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {route.destination}
                </h3>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mulai dari</span>
                <span className="font-bold text-blue-600">
                  {Format.formatCurrency(route.base_price!)}
                </span>
              </div>
            </div>

            <Button
              onClick={() => handleSearch(route.origin!, route.destination!)}
              variant="outline"
              className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 font-medium transition-colors cursor-pointer"
            >
              Pilih Rute
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RoutesSection;
