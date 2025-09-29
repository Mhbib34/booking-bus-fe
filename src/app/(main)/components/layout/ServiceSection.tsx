import React from "react";

const ServiceSection = () => {
  return (
    <section data-aos="fade-up" id="services" className="bg-gray-50 py-20">
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
          <div data-aos="fade-right" className="bg-white rounded-lg p-8">
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
          <div data-aos="fade-left" className="bg-white rounded-lg p-8">
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
  );
};

export default ServiceSection;
