"use client";

import PageLoader from "@/components/fragment/PageLoader";
import { useAuthStore } from "@/store/auth-store";
import { Bus, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { motion } from "framer-motion";
import MobileMenu from "../fragment/MobileMenu";
import DekstopMenu from "../fragment/DekstopMenu";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setUserMenuOpen(false); // Close user menu when mobile menu opens
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setMobileMenuOpen(false); // Close mobile menu when user menu opens
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu") && !target.closest(".mobile-menu")) {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <header
      data-aos="fade-down"
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <Bus className="h-8 w-8 text-blue-600" />
            <span
              className={`text-xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              BusKu
            </span>
          </a>

          {/* Desktop Navigation */}
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

          {/* Desktop Actions */}
          <DekstopMenu
            user={user!}
            scrolled={scrolled}
            userMenuOpen={userMenuOpen}
            toggleUserMenu={toggleUserMenu}
            handleLogout={handleLogout}
            setUserMenuOpen={setUserMenuOpen}
          />

          {/* Mobile Hamburger Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none mobile-menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? (
                <X
                  className={`h-6 w-6 ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`h-6 w-6 ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          scrolled={scrolled}
          mobileMenuOpen={mobileMenuOpen}
          user={user!}
          closeMobileMenu={closeMobileMenu}
          handleLogout={handleLogout}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </header>
  );
};

export default Header;
