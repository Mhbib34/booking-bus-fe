import { Schedule } from "@/types/schedule.type";
import { Format } from "@/utils/format";
import { getFacilityIcon, getFacilityLabel } from "@/utils/status";
import {
  ChevronRight,
  Clock,
  Users,
  SearchX,
  Calendar,
  MapPin,
} from "lucide-react";
import React, { forwardRef, useState } from "react";
import BookingModal from "../modal/BookingModal";

type ScheduleProps = {
  showSchedules: boolean;
  schedules: Schedule[];
  hasSearched: boolean;
};

const SearchResultSection = forwardRef<HTMLElement, ScheduleProps>(
  ({ showSchedules, schedules, hasSearched }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ❌ MASALAH 1: selectedSchedule tidak didefinisikan
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
      null
    );
    // ❌ MASALAH 2: selectedSeats tidak didefinisikan
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleBookingClick = (schedule: Schedule) => {
      setSelectedSchedule(schedule);
      // TODO: Implementasi logika pemilihan kursi
      // Untuk sementara set dummy seats
      setSelectedSeats(["A1"]);
      setIsModalOpen(true);
    };

    return (
      <>
        {showSchedules && schedules.length > 0 ? (
          <section
            ref={ref}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <div className="mb-6 md:mt-20 mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Jadwal Keberangkatan
              </h2>
              <p className="text-gray-600">
                Berikut adalah daftar jadwal keberangkatan yang tersedia:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center md:space-x-4 space-y-2 md:space-y-0 md:flex-row flex-col">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <span className="text-xl font-bold text-gray-900">
                              {schedule.departure_time?.slice(0, 5)}
                            </span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              schedule.bus_class === "bisnis"
                                ? "bg-purple-100 text-purple-800"
                                : schedule.bus_class === "eksekutif"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {schedule.bus_class}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {Format.formatCurrency(schedule.price!)}
                          </div>
                          <div className="text-sm text-gray-500">per orang</div>
                        </div>
                      </div>

                      {/* Bus Information */}
                      {schedule.bus && (
                        <>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  Bus {schedule.bus.bus_number}
                                </h4>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                                  <Users className="h-4 w-4" />
                                  <span>
                                    {schedule.available_seats} kursi tersedia
                                  </span>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    schedule.available_seats! > 20
                                      ? "bg-green-100 text-green-800"
                                      : schedule.available_seats! > 10
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {schedule.available_seats! > 20
                                    ? "Tersedia Banyak"
                                    : schedule.available_seats! > 10
                                    ? "Tersedia Terbatas"
                                    : "Hampir Penuh"}
                                </span>
                              </div>
                            </div>

                            {/* Facilities */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                Fasilitas:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {schedule.bus.facilities.map(
                                  (facility, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center space-x-1 px-2 py-1 bg-white rounded border text-xs"
                                    >
                                      <span>{getFacilityIcon(facility)}</span>
                                      <span>{getFacilityLabel(facility)}</span>
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                            <div className="flex md:items-center md:space-x-4 md:space-y-0 space-y-4 flex-col md:flex-row ">
                              <span>Estimasi perjalanan: 3-4 jam</span>
                              <span className="hidden md:block">•</span>
                              <span>
                                Terminal keberangkatan: Terminal{" "}
                                {schedule.route?.origin}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between md:items-center space-y-4 md:space-y-0 pt-4 border-t md:flex-row flex-col">
                    <div className="text-sm text-gray-500">
                      <p>
                        Gratis pembatalan hingga 2 jam sebelum keberangkatan
                      </p>
                    </div>
                    <button
                      onClick={() => handleBookingClick(schedule)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center space-x-2 transition-colors justify-center cursor-pointer"
                    >
                      <span>Pesan</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ PERBAIKAN: Gunakan selectedSchedule dan selectedSeats */}
            {isModalOpen && selectedSchedule && (
              <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                schedule={selectedSchedule}
                selectedSeats={selectedSeats}
              />
            )}
          </section>
        ) : hasSearched && !showSchedules ? (
          <section
            ref={ref}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 md:mt-10">
              <div className="text-center">
                {/* Icon */}
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                  <SearchX className="w-8 h-8 text-gray-400" />
                </div>

                {/* Main Message */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Jadwal Tidak Tersedia
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Maaf, tidak ada jadwal keberangkatan yang tersedia untuk rute
                  dan tanggal yang Anda pilih.
                </p>

                {/* Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">
                      Coba Tanggal Lain
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      Pilih tanggal keberangkatan yang berbeda
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">
                      Periksa Rute
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      Pastikan rute keberangkatan dan tujuan sudah benar
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900 mb-1">
                      Cek Lagi Nanti
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      Jadwal mungkin akan ditambahkan kemudian
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                    Hubungi Customer Service
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </>
    );
  }
);

SearchResultSection.displayName = "SearchResultSection";

export default SearchResultSection;
