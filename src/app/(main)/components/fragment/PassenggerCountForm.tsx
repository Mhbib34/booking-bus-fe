import { Button } from "@/components/ui/button";
import { Schedule } from "@/types/schedule.type";
import { Format } from "@/utils/format";
import { Clock, CreditCard, MapPin, Users } from "lucide-react";
import React from "react";

type Props = {
  passengerCount: number;
  updatePassengerCount: (count: number) => void;
  schedule: Schedule;
  onNext: () => void;
};

const PassenggerCountForm = ({
  passengerCount,
  updatePassengerCount,
  schedule,
  onNext,
}: Props) => {
  const maxPassengers = Math.min(schedule.available_seats || 40, 8);
  return (
    <div className="space-y-6">
      {/* Trip Info */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
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
            <CreditCard className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Harga per Tiket</p>
              <p className="font-medium text-blue-600">
                {Format.formatCurrency(schedule.price!)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Count Selection */}
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Berapa jumlah penumpang?
          </h3>
          <p className="text-gray-600">
            Pilih jumlah penumpang yang akan melakukan perjalanan
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={() =>
              passengerCount > 1 && updatePassengerCount(passengerCount - 1)
            }
            disabled={passengerCount <= 1}
            className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors flex items-center justify-center text-xl font-bold"
          >
            -
          </button>

          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {passengerCount}
            </div>
            <div className="text-sm text-gray-500">
              {passengerCount === 1 ? "Penumpang" : "Penumpang"}
            </div>
          </div>

          <button
            onClick={() =>
              passengerCount < maxPassengers &&
              updatePassengerCount(passengerCount + 1)
            }
            disabled={passengerCount >= maxPassengers}
            className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors flex items-center justify-center text-xl font-bold"
          >
            +
          </button>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6]
            .filter((num) => num <= maxPassengers)
            .map((num) => (
              <button
                key={num}
                onClick={() => updatePassengerCount(num)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  passengerCount === num
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {num}
              </button>
            ))}
        </div>

        <div className="text-sm text-gray-500">
          Maksimal {maxPassengers} penumpang per pemesanan
        </div>
      </div>

      {/* Price Summary */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Harga per tiket</span>
          <span>{Format.formatCurrency(schedule.price!)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Jumlah penumpang</span>
          <span>{passengerCount} orang</span>
        </div>
        <div className="flex justify-between items-center font-semibold text-lg pt-2 border-t border-gray-200">
          <span>Total Harga</span>
          <span className="text-blue-600">
            {Format.formatCurrency(schedule.price! * passengerCount)}
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          size={"lg"}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center cursor-pointer"
        >
          <Users className="w-4 h-4 mr-2" />
          Lanjut ke Data Penumpang
        </Button>
      </div>
    </div>
  );
};

export default PassenggerCountForm;
