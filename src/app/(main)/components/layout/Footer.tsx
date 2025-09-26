import { Bus } from "lucide-react";
import React from "react";

const UserFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bus className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">BusKu</span>
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
                <a href="#route" className="hover:text-white">
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
  );
};

export default UserFooter;
