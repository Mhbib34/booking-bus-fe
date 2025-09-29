"use client";

import { CreditCard, Phone, Shield } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

// Variants untuk container dan card
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // jeda antar anak
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={cardVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mengapa Pilih BusKu?
          </h2>
          <p className="text-lg text-gray-600">
            Kami berkomitmen memberikan layanan terbaik untuk perjalanan Anda
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
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
          </motion.div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Pembayaran Mudah
            </h3>
            <p className="text-gray-600">
              Berbagai metode pembayaran tersedia untuk kemudahan transaksi Anda
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Layanan 24/7
            </h3>
            <p className="text-gray-600">
              Tim customer service kami siap membantu Anda kapan saja
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
