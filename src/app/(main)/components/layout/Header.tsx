"use client";

import PageLoader from "@/components/fragment/PageLoader";
import { showConfirm } from "@/lib/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Bus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const Header = () => {
  const { user, logout, loading } = useAuthStore(
    useShallow((state) => {
      return {
        user: state.user,
        logout: state.logout,
        loading: state.loading,
      };
    })
  );
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) return <PageLoader />;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Bus className="h-8 w-8 text-blue-600" />
            <span
              className={`text-xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              BusKu
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className={`font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              Beranda
            </a>
            <a
              href="#route"
              className={`font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              Rute
            </a>
            <a
              href="#services"
              className={`font-medium ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              Bantuan
            </a>
          </nav>

          {/* Actions */}
          {user ? (
            <div
              onClick={() =>
                showConfirm(
                  "Keluar",
                  "Apakah anda yakin ingin keluar?",
                  () => handleLogout(),
                  "Keluar"
                )
              }
              className="flex items-center space-x-4 border border-red-600  px-4 py-1 rounded-lg cursor-pointer hover:bg-red-700 group transition-all duration-300"
            >
              <button
                className={`font-medium cursor-pointer group-hover:text-white text-red-600 transition-all duration-300`}
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/login")}
                className={`font-medium cursor-pointer ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                Masuk
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
