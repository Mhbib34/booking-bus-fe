"use client";

import React from "react";
import { motion } from "framer-motion";

const ServiceSection = () => {
  return (
    <motion.section
      id="bantuan"
      className="bg-gray-50 py-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Informasi Layanan
          </h2>
          <p className="text-lg text-gray-600">
            Semua yang perlu Anda ketahui tentang perjalanan bus bersama kami
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Process */}
          <motion.div
            className="bg-white rounded-lg p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Cara Pemesanan
            </h3>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Pilih Rute & Jadwal",
                  desc: "Cari dan pilih rute serta jadwal yang sesuai dengan kebutuhan Anda",
                },
                {
                  step: "2",
                  title: "Pilih Kursi",
                  desc: "Pilih nomor kursi dan isi data penumpang",
                },
                {
                  step: "3",
                  title: "Pembayaran",
                  desc: "Lakukan pembayaran melalui berbagai metode yang tersedia",
                },
                {
                  step: "4",
                  title: "Tiket Siap",
                  desc: "Terima tiket elektronik dan siap berangkat",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Terms & Conditions */}
          <motion.div
            className="bg-white rounded-lg p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Syarat & Ketentuan
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              {[
                {
                  title: "Pembatalan Tiket",
                  items: [
                    "• Gratis pembatalan hingga 2 jam sebelum keberangkatan",
                    "• Biaya pembatalan 50% untuk 2 jam - 30 menit sebelum berangkat",
                    "• Tidak dapat dibatalkan 30 menit sebelum keberangkatan",
                  ],
                },
                {
                  title: "Ketentuan Bagasi",
                  items: [
                    "• Bagasi gratis maksimal 20kg per penumpang",
                    "• Bagasi lebih dikenakan biaya tambahan",
                    "• Barang berbahaya dan mudah terbakar dilarang",
                  ],
                },
                {
                  title: "Keberangkatan",
                  items: [
                    "• Hadir minimal 30 menit sebelum keberangkatan",
                    "• Bawa identitas asli sesuai data pemesanan",
                    "• Bus tidak menunggu penumpang yang terlambat",
                  ],
                },
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-1 ml-4">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceSection;
