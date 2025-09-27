import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, LogIn, UserPlus } from "lucide-react";

interface LoginWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
  featureName?: string;
}

const LoginWarning: React.FC<LoginWarningProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  featureName = "fitur ini",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8">
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                    className="bg-white/20 p-3 rounded-full"
                  >
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl font-bold text-white"
                    >
                      Login Diperlukan
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/90 text-sm"
                    >
                      Akses dibatasi untuk pengguna terdaftar
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-gray-700 text-sm mb-2">
                    Untuk menggunakan{" "}
                    <span className="font-semibold text-blue-600">
                      {featureName}
                    </span>
                    , Anda perlu masuk ke akun terlebih dahulu.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Belum punya akun? Daftar sekarang dan nikmati semua fitur
                    BusKu!
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col space-y-3 mt-6"
                >
                  {/* Login Button */}
                  <motion.button
                    onClick={onLogin}
                    className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn size={18} />
                    <span>Masuk ke Akun</span>
                  </motion.button>

                  {/* Register Button */}
                  <motion.button
                    onClick={onRegister}
                    className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all border border-gray-200 cursor-pointer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UserPlus size={18} />
                    <span>Daftar Akun Baru</span>
                  </motion.button>

                  {/* Cancel Button */}
                  <motion.button
                    onClick={onClose}
                    className="w-full text-gray-500 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm cursor-pointerz    "
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Nanti Saja
                  </motion.button>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400"></div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginWarning;
