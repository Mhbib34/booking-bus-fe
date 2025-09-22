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
import Header from "./(main)/components/fragment/Header";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";

interface Route {
  id: string;
  origin: string;
  destination: string;
  base_price: number;
  is_active: boolean;
}

interface Schedule {
  id: string;
  route: {
    id: string;
    origin: string;
    destination: string;
  };
  bus_class: string;
  departure_time: string;
  price: number;
  available_seats: number;
  status: string;
  bus?: {
    bus_number: string;
    bus_type: string;
    facilities: string[];
    plate_number: string;
  };
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

  const handleSearch = async () => {
    if (
      !searchForm.origin ||
      !searchForm.destination ||
      !searchForm.departure_date
    ) {
      alert("Mohon lengkapi semua field pencarian");
      return;
    }

    setIsSearching(true);

    // Mock search results - dalam implementasi nyata, panggil API
    setTimeout(() => {
      const mockSchedules: Schedule[] = [
        {
          id: "1",
          route: {
            id: "1",
            origin: searchForm.origin,
            destination: searchForm.destination,
          },
          bus_class: "Eksekutif",
          departure_time: "06:00",
          price: 85000,
          available_seats: 35,
          status: "scheduled",
          bus: {
            bus_number: "B001",
            bus_type: "eksekutif",
            facilities: ["ac", "wifi", "tv", "toilet"],
            plate_number: "B1234ABC",
          },
        },
        {
          id: "2",
          route: {
            id: "1",
            origin: searchForm.origin,
            destination: searchForm.destination,
          },
          bus_class: "VIP",
          departure_time: "08:00",
          price: 95000,
          available_seats: 28,
          status: "scheduled",
          bus: {
            bus_number: "B002",
            bus_type: "vip",
            facilities: ["ac", "wifi", "tv", "toilet", "reclining_seat"],
            plate_number: "B5678DEF",
          },
        },
        {
          id: "3",
          route: {
            id: "1",
            origin: searchForm.origin,
            destination: searchForm.destination,
          },
          bus_class: "Bisnis",
          departure_time: "14:00",
          price: 75000,
          available_seats: 42,
          status: "scheduled",
          bus: {
            bus_number: "B003",
            bus_type: "bisnis",
            facilities: ["ac", "wifi"],
            plate_number: "B9012GHI",
          },
        },
        {
          id: "4",
          route: {
            id: "1",
            origin: searchForm.origin,
            destination: searchForm.destination,
          },
          bus_class: "VIP",
          departure_time: "20:00",
          price: 95000,
          available_seats: 30,
          status: "scheduled",
          bus: {
            bus_number: "B004",
            bus_type: "vip",
            facilities: [
              "ac",
              "wifi",
              "tv",
              "toilet",
              "reclining_seat",
              "charging_port",
            ],
            plate_number: "B3456JKL",
          },
        },
      ];
      setSchedules(mockSchedules);
      setShowSchedules(true);
      setIsSearching(false);
    }, 1000);
  };

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

  const uniqueCities = Array.from(
    new Set([
      ...routes.map((r) => r.origin),
      ...routes.map((r) => r.destination),
    ])
  ).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        {/* Background Image */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pesan Tiket Bus Online
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Mudah, cepat, dan terpercaya untuk perjalanan Anda
          </p>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
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
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
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
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tanggal */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Keberangkatan
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={searchForm.departure_date}
                    onChange={(e) =>
                      setSearchForm({
                        ...searchForm,
                        departure_date: e.target.value,
                      })
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold flex items-center justify-center space-x-2"
                >
                  {isSearching ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Cari</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showSchedules && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Jadwal Keberangkatan
            </h2>
            <p className="text-gray-600">
              {searchForm.origin} → {searchForm.destination} •{" "}
              {new Date(searchForm.departure_date).toLocaleDateString("id-ID")}
            </p>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span className="text-xl font-bold text-gray-900">
                            {schedule.departure_time}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            schedule.bus_class === "VIP"
                              ? "bg-purple-100 text-purple-800"
                              : schedule.bus_class === "Eksekutif"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {schedule.bus_class}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {formatCurrency(schedule.price)}
                        </div>
                        <div className="text-sm text-gray-500">per orang</div>
                      </div>
                    </div>

                    {/* Bus Information */}
                    {schedule.bus && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Bus {schedule.bus.bus_number}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {schedule.bus.plate_number}
                            </p>
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
                                schedule.available_seats > 20
                                  ? "bg-green-100 text-green-800"
                                  : schedule.available_seats > 10
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {schedule.available_seats > 20
                                ? "Tersedia Banyak"
                                : schedule.available_seats > 10
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
                            {schedule.bus.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center space-x-1 px-2 py-1 bg-white rounded border text-xs"
                              >
                                <span>{getFacilityIcon(facility)}</span>
                                <span>{getFacilityLabel(facility)}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Seat Status */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>Estimasi perjalanan: 3-4 jam</span>
                        <span>•</span>
                        <span>
                          Terminal keberangkatan: Terminal {searchForm.origin}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    <p>Gratis pembatalan hingga 2 jam sebelum keberangkatan</p>
                  </div>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center space-x-2 transition-colors">
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
