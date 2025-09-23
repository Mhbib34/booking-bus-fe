"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  Bus,
  Shield,
  CreditCard,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import Header from "./(main)/components/layout/Header";
import HeroSection from "./(main)/components/layout/HeroSection";
import { Schedule } from "@/types/schedule.type";
import { Format } from "@/utils/format";

interface Route {
  id: string;
  origin: string;
  destination: string;
  base_price: number;
  is_active: boolean;
}

interface PopularRoute {
  origin: string;
  destination: string;
  price_from: number;
  travel_time: string;
}

const Home = () => {
  const { fetchUser } = useAuthStore(
    useShallow((state) => {
      return { fetchUser: state.fetchUser };
    })
  );
  const [routes, setRoutes] = useState<Route[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([]);
  const [searchForm, setSearchForm] = useState({
    origin: "",
    destination: "",
    departure_date: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showSchedules, setShowSchedules] = useState(false);

  // Mock data untuk demo - dalam implementasi nyata, ambil dari API
  useEffect(() => {
    const mockRoutes: Route[] = [
      {
        id: "1",
        origin: "Jakarta",
        destination: "Bandung",
        base_price: 75000,
        is_active: true,
      },
      {
        id: "2",
        origin: "Jakarta",
        destination: "Yogyakarta",
        base_price: 150000,
        is_active: true,
      },
      {
        id: "3",
        origin: "Jakarta",
        destination: "Medan",
        base_price: 350000,
        is_active: true,
      },
      {
        id: "4",
        origin: "Bandung",
        destination: "Surabaya",
        base_price: 200000,
        is_active: true,
      },
      {
        id: "5",
        origin: "Jakarta",
        destination: "Surabaya",
        base_price: 180000,
        is_active: true,
      },
      {
        id: "6",
        origin: "Medan",
        destination: "Padang",
        base_price: 120000,
        is_active: true,
      },
    ];
    setRoutes(mockRoutes);

    const mockPopularRoutes: PopularRoute[] = [
      {
        origin: "Jakarta",
        destination: "Bandung",
        price_from: 75000,
        travel_time: "3 jam",
      },
      {
        origin: "Jakarta",
        destination: "Yogyakarta",
        price_from: 150000,
        travel_time: "8 jam",
      },
      {
        origin: "Jakarta",
        destination: "Surabaya",
        price_from: 180000,
        travel_time: "12 jam",
      },
      {
        origin: "Bandung",
        destination: "Jakarta",
        price_from: 75000,
        travel_time: "3 jam",
      },
    ];
    setPopularRoutes(mockPopularRoutes);
    fetchUser();
    //eslint-disable-next-line
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getFacilityIcon = (facility: string) => {
    const facilityMap: { [key: string]: string } = {
      ac: "❄️",
      wifi: "📶",
      tv: "📺",
      toilet: "🚽",
      reclining_seat: "🛋️",
      charging_port: "🔌",
    };
    return facilityMap[facility] || "✓";
  };

  const getFacilityLabel = (facility: string) => {
    const facilityMap: { [key: string]: string } = {
      ac: "AC",
      wifi: "WiFi",
      tv: "TV",
      toilet: "Toilet",
      reclining_seat: "Kursi Rebah",
      charging_port: "Charging Port",
    };
    return facilityMap[facility] || facility;
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        setSchedules={setSchedules}
        setShowSchedule={setShowSchedules}
      />

      {/* Search Results */}
      {showSchedules && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
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

                    {/* Seat Status */}
                  </div>
                </div>

                <div className="flex justify-between md:items-center space-y-4 md:space-y-0 pt-4 border-t md:flex-row flex-col">
                  <div className="text-sm text-gray-500">
                    <p>Gratis pembatalan hingga 2 jam sebelum keberangkatan</p>
                  </div>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center space-x-2 transition-colors justify-center">
                    <span>Pilih Kursi</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Routes */}
      <section
        id="route"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-slideUp"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rute Populer
          </h2>
          <p className="text-lg text-gray-600">
            Pilihan rute favorit dengan harga terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border"
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
                    {formatCurrency(route.price_from)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Durasi</span>
                  <span className="text-sm font-medium">
                    {route.travel_time}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchForm({
                    origin: route.origin,
                    destination: route.destination,
                    departure_date: new Date().toISOString().split("T")[0],
                  });
                }}
                className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 font-medium transition-colors"
              >
                Pilih Rute
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Services Info */}
      <section id="services" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Informasi Layanan
            </h2>
            <p className="text-lg text-gray-600">
              Semua yang perlu Anda ketahui tentang perjalanan bus bersama kami
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Process */}
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Cara Pemesanan
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Pilih Rute & Jadwal
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Cari dan pilih rute serta jadwal yang sesuai dengan
                      kebutuhan Anda
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pilih Kursi</h4>
                    <p className="text-gray-600 text-sm">
                      Pilih nomor kursi dan isi data penumpang
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pembayaran</h4>
                    <p className="text-gray-600 text-sm">
                      Lakukan pembayaran melalui berbagai metode yang tersedia
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tiket Siap</h4>
                    <p className="text-gray-600 text-sm">
                      Terima tiket elektronik dan siap berangkat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Syarat & Ketentuan
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Pembatalan Tiket
                  </h4>
                  <ul className="space-y-1 ml-4">
                    <li>
                      • Gratis pembatalan hingga 2 jam sebelum keberangkatan
                    </li>
                    <li>
                      • Biaya pembatalan 50% untuk 2 jam - 30 menit sebelum
                      berangkat
                    </li>
                    <li>
                      • Tidak dapat dibatalkan 30 menit sebelum keberangkatan
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Ketentuan Bagasi
                  </h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Bagasi gratis maksimal 20kg per penumpang</li>
                    <li>• Bagasi lebih dikenakan biaya tambahan</li>
                    <li>• Barang berbahaya dan mudah terbakar dilarang</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Keberangkatan
                  </h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Hadir minimal 30 menit sebelum keberangkatan</li>
                    <li>• Bawa identitas asli sesuai data pemesanan</li>
                    <li>• Bus tidak menunggu penumpang yang terlambat</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Pilih BusGo?
            </h2>
            <p className="text-lg text-gray-600">
              Kami berkomitmen memberikan layanan terbaik untuk perjalanan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aman & Terpercaya
              </h3>
              <p className="text-gray-600">
                Keamanan dan kenyamanan perjalanan Anda adalah prioritas utama
                kami
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pembayaran Mudah
              </h3>
              <p className="text-gray-600">
                Berbagai metode pembayaran tersedia untuk kemudahan transaksi
                Anda
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Layanan 24/7
              </h3>
              <p className="text-gray-600">
                Tim customer service kami siap membantu Anda kapan saja
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bus className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">BusGo</span>
              </div>
              <p className="text-gray-400">
                Solusi terpercaya untuk perjalanan bus online di Indonesia
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Cari Tiket
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Rute Populer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Promo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@busgo.com</li>
                <li>Telepon: (021) 123-4567</li>
                <li>WhatsApp: +62 812-3456-7890</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BusGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
