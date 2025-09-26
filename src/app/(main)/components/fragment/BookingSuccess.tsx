import { CheckCircle } from "lucide-react";

type Props = {
  bookingCode: string;
  onClose: () => void;
};

const BookingSuccess = ({ bookingCode, onClose }: Props) => {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Berhasil!
        </h3>
        <p className="text-gray-600">Tiket Anda telah berhasil dipesan</p>
      </div>

      <div className="p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Kode Booking</p>
        <p className="text-2xl font-bold text-blue-600">{bookingCode}</p>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-800">
          Silakan simpan kode booking Anda. Kami akan mengirimkan konfirmasi
          melalui email.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-colors"
      >
        Selesai
      </button>
    </div>
  );
};

export default BookingSuccess;
