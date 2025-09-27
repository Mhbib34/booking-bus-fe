import { showConfirm } from "@/lib/sonner";
import { User } from "@/types/user.type";
import {
  ChevronDown,
  LogOut,
  Settings,
  TicketMinusIcon,
  User2,
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  scrolled: boolean;
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
  handleLogout: () => void;
  setUserMenuOpen: (open: boolean) => void;
};

const DekstopMenu = ({
  user,
  scrolled,
  userMenuOpen,
  toggleUserMenu,
  handleLogout,
  setUserMenuOpen,
}: Props) => {
  const router = useRouter();

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };
  return (
    <>
      {user ? (
        <div className="hidden md:flex items-center relative user-menu">
          {/* User Info Button */}
          <motion.button
            onClick={toggleUserMenu}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              scrolled
                ? "hover:bg-gray-100 text-gray-700"
                : "hover:bg-white/10 text-white"
            } ${
              userMenuOpen ? (scrolled ? "bg-gray-100" : "bg-white/10") : ""
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-blue-600 rounded-full p-1.5">
              <User2 className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
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
            <motion.div
              animate={{ rotate: userMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                className={`h-4 w-4 ${
                  scrolled ? "text-gray-500" : "text-white/70"
                }`}
              />
            </motion.div>
          </motion.button>

          {/* Desktop User Menu Dropdown */}
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                {/* User Info in Dropdown */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 rounded-full p-2">
                      <User2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.full_name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}

                <div className="py-1">
                  <motion.button
                    onClick={() => {
                      router.push("/bookings");
                      closeUserMenu();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TicketMinusIcon className="h-4 w-4" />
                    <span>My Bookings</span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      router.push("/profile");
                      closeUserMenu();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      showConfirm(
                        "Keluar",
                        "Apakah anda yakin ingin keluar?",
                        () => handleLogout(),
                        "Keluar"
                      );
                      closeUserMenu();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Keluar</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="hidden md:flex items-center space-x-4">
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
    </>
  );
};

export default DekstopMenu;
