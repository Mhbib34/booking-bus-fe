import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/types/user.type";
import { LogOut, Settings, TicketMinusIcon, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { showConfirm } from "@/lib/sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  user: User;
  closeMobileMenu: () => void;
  handleLogout: () => void;
  setMobileMenuOpen: (open: boolean) => void;
};
const MobileMenu = ({
  scrolled,
  mobileMenuOpen,
  user,
  closeMobileMenu,
  handleLogout,
  setMobileMenuOpen,
}: MobileMenuProps) => {
  const MotionLink = motion(Link);

  const handleMobileNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // Tutup menu terlebih dahulu
      setMobileMenuOpen(false);

      // Delay sedikit untuk memastikan menu tertutup, lalu scroll ke section
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300); // Delay 300ms untuk menunggu animasi menu selesai
    } else {
      // Untuk link biasa
      setMobileMenuOpen(false);
      if (href !== "#") {
        window.location.href = href;
      }
    }
  };
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`md:hidden absolute top-16 left-0 right-0 overflow-hidden ${
            scrolled ? "bg-white" : "bg-transparent backdrop-blur-lg shadow-md"
          } shadow-lg border-t ${
            scrolled ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="px-4 py-4 space-y-4"
          >
            {/* Mobile Navigation */}
            <div className="space-y-3">
              <motion.a
                href="#beranda"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick("#beranda");
                }}
                className={`block font-medium cursor-pointer ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                Beranda
              </motion.a>
              <motion.a
                href="#rute"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick("#rute");
                }}
                className={`block font-medium cursor-pointer ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                Rute
              </motion.a>
              <motion.a
                href="#bantuan"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick("#bantuan");
                }}
                className={`block font-medium cursor-pointer ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                Bantuan
              </motion.a>
            </div>

            {/* Mobile Actions */}
            <motion.div
              className="pt-4 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {user ? (
                <div className="space-y-3">
                  {/* Mobile User Info */}
                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      scrolled ? "bg-gray-50" : "bg-white/10"
                    }`}
                  >
                    <div className="bg-blue-600 rounded-full p-2">
                      <User2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          scrolled ? "text-gray-900" : "text-white"
                        }`}
                      >
                        {user.full_name || "User"}
                      </p>
                      <p
                        className={`text-xs ${
                          scrolled ? "text-gray-500" : "text-white/70"
                        }`}
                      >
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Menu Actions */}
                  <MotionLink
                    onClick={() => {
                      closeMobileMenu();
                    }}
                    href="/bookings"
                    className={`w-full flex items-center space-x-3 text-left font-medium py-2 px-3 rounded-lg ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-50"
                        : "text-white hover:bg-white/10"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TicketMinusIcon className="h-4 w-4" />
                    <span>My Bookings</span>
                  </MotionLink>
                  <MotionLink
                    onClick={() => {
                      closeMobileMenu();
                    }}
                    href="/profile"
                    className={`w-full flex items-center space-x-3 text-left font-medium py-2 px-3 rounded-lg ${
                      scrolled
                        ? "text-gray-700 hover:bg-gray-50"
                        : "text-white hover:bg-white/10"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </MotionLink>

                  <motion.button
                    onClick={() =>
                      showConfirm(
                        "Keluar",
                        "Apakah anda yakin ingin keluar?",
                        () => handleLogout(),
                        "Keluar"
                      )
                    }
                    className="w-full flex items-center space-x-3 text-left font-medium text-red-600 hover:bg-red-50 py-2 px-3 rounded-lg"
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Keluar</span>
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    asChild
                    onClick={() => {
                      closeMobileMenu();
                    }}
                    variant={"ghost"}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-center"
                  >
                    <Link href="/login">Masuk</Link>
                  </Button>
                  <Button
                    asChild
                    onClick={() => {
                      closeMobileMenu();
                    }}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-center"
                  >
                    <Link href="/register">Daftar</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
