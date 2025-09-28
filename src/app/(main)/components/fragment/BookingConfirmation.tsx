import { Button } from "@/components/ui/button";
import { Passenger } from "@/types/passengger.type";
import { Schedule } from "@/types/schedule.type";
import { Format } from "@/utils/format";
import { Clock, CreditCard, MapPin, Users } from "lucide-react";

type Props = {
  schedule: Schedule;
  passengers: Passenger[];
  totalAmount: number;
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
};
const BookingConfirmation = ({
  schedule,
  passengers,
  totalAmount,
  onConfirm,
  onBack,
  loading,
}: Props) => {
  return (
    <>
      <div className="space-y-6">
        {/* Trip Details */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3">
            Detail Perjalanan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Rute</p>
                <p className="font-medium">
                  {schedule.route?.origin} → {schedule.route?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Keberangkatan</p>
                <p className="font-medium">{schedule.departure_time}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Penumpang</p>
                <p className="font-medium">{passengers.length} orang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passengers List */}
        <div className="p-4 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3">Daftar Penumpang</h3>
          <div className="space-y-2">
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded text-xs flex items-center justify-center mr-3">
                    {passenger.seat_number}
                  </div>
                  <div>
                    <p className="font-medium">{passenger.passenger_name}</p>
                    <p className="text-sm text-gray-600">{passenger.phone}</p>
                  </div>
                </div>
                <p className="font-medium">
                  {Format.formatCurrency(schedule.price!)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              Subtotal ({passengers.length} tiket)
            </span>
            <span>Rp {totalAmount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-blue-600">
              Rp {totalAmount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant={"outline"}
            size={"lg"}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Kembali
          </Button>
          <Button
            onClick={onConfirm}
            size={"lg"}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center cursor-pointer"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Konfirmasi Booking
          </Button>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white "></div>
          <span className="ml-2">Processing...</span>
        </div>
      )}
    </>
  );
};

export default BookingConfirmation;
