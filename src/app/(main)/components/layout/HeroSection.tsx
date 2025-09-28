import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { showWarning } from "@/lib/sonner";
import { useScheduleStore } from "@/store/schedule-store";
import { Schedule } from "@/types/schedule.type";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { useShallow } from "zustand/shallow";

type props = {
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  setShowSchedule: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleSectionRef: React.RefObject<HTMLDivElement | null>;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
};
const HeroSection = ({
  setSchedules,
  setShowSchedule,
  scheduleSectionRef,
  setHasSearched,
}: props) => {
  const { fetchSchedules } = useScheduleStore(
    useShallow((state) => {
      return {
        schdedules: state.schedules,
        fetchSchedules: state.fetchSchedules,
      };
    })
  );
  const [searchForm, setSearchForm] = useState({
    origin: "",
    destination: "",
    departure_date: undefined as Date | undefined,
  });

  const [isSearching, setIsSearching] = useState(false);

  //eslint-disable-next-line
  const handleChange = (field: keyof typeof searchForm, value: any) => {
    setSearchForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    if (
      !searchForm.origin ||
      !searchForm.destination ||
      !searchForm.departure_date
    ) {
      showWarning("Mohon lengkapi semua field pencarian");
      return;
    }

    setHasSearched(true);
    setIsSearching(true);
    try {
      // panggil fetchSchedules dulu
      await fetchSchedules(
        1,
        searchForm.origin,
        searchForm.destination,
        format(searchForm.departure_date, "yyyy-MM-dd")
      );

      const state = useScheduleStore.getState();
      if (state.schedules.length > 0) {
        setSchedules(state.schedules);
        setShowSchedule(true);
        setTimeout(() => {
          scheduleSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      } else if (state.schedules.length === 0) {
        setSchedules([]);
        setShowSchedule(false);
        setTimeout(() => {
          scheduleSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      }
    } catch (error) {
      console.error("❌ handleSearch error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-white"
    >
      {/* Background Image */}
      <div>
        <Image
          src="https://i.pinimg.com/1200x/6d/84/32/6d8432a39d07f0b8faff8e1327d2299e.jpg"
          alt="Hero Background"
          fill
          priority
          className="absolute inset-0 object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-blue-800/70" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn mt-20 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Typewriter
              options={{
                strings: [
                  "Selamat Datang",
                  "Pesan Tiket Bus Online",
                  "Mudah & Cepat",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                cursor: "",
              }}
            />
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Mudah, cepat, dan terpercaya untuk perjalanan Anda
          </p>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Dari */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dari
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={searchForm.origin}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, origin: e.target.value })
                    }
                  >
                    <option value="">Pilih kota asal</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Bukittinggi">Bukittinggi</option>
                    <option value="Medan">Medan</option>
                    <option value="Padang">Padang</option>
                  </select>
                </div>
              </div>

              {/* Ke */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ke
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={searchForm.destination}
                    onChange={(e) =>
                      setSearchForm({
                        ...searchForm,
                        destination: e.target.value,
                      })
                    }
                  >
                    <option value="">Pilih kota tujuan</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Bukittinggi">Bukittinggi</option>
                    <option value="Medan">Medan</option>
                    <option value="Padang">Padang</option>
                  </select>
                </div>
              </div>

              {/* Tanggal */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={`w-full flex items-center pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-left text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        !searchForm.departure_date ? "text-gray-400" : ""
                      }`}
                    >
                      <CalendarIcon className="absolute left-3 h-5 w-5 text-gray-400" />
                      {searchForm.departure_date
                        ? format(searchForm.departure_date, "PPP")
                        : "Pilih tanggal"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-months"
                      selected={searchForm.departure_date}
                      onSelect={(date) =>
                        setSearchForm({
                          ...searchForm,
                          departure_date: date ?? undefined,
                        })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  variant={"destructive"}
                  size={"icon"}
                  className="w-full bg-blue-600 text-white py-6 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSearching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Cari</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
