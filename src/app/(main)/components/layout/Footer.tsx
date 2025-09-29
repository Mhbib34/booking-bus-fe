"use client";

import { Bus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

// Variants untuk container & item
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const UserFooter = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-gray-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Logo & Deskripsi */}
          <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">BusKu</span>
            </div>
            <p className="text-gray-400">
              Solusi terpercaya untuk perjalanan bus online di Indonesia
            </p>
          </motion.div>

          {/* Layanan */}
          <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#beranda" className="hover:text-white">
                  Cari Tiket
                </a>
              </li>
              <li>
                <a href="#rute" className="hover:text-white">
                  Rute Populer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Promo
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Bantuan */}
          <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
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
          </motion.div>

          {/* Kontak */}
          <motion.div variants={itemVariants} transition={{ duration: 0.8 }}>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@busku.com</li>
              <li>Telepon: (021) 123-4567</li>
              <li>WhatsApp: +62 812-3456-7890</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 1 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2025 BusKu. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default UserFooter;
