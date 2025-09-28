import { Button } from "@/components/ui/button";
import { Passenger } from "@/types/passengger.type";
import { Phone, User } from "lucide-react";
import React from "react";

type Props = {
  passengers: Passenger[];
  setPassengers: (passengers: Passenger[]) => void;
  onNext: () => void;
  onBack: () => void;
};

const PassenggerForm = ({
  passengers,
  setPassengers,
  onNext,
  onBack,
}: Props) => {
  const updatePassenger = (
    index: number,
    field: keyof Passenger,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const isFormValid = passengers.every((p) => p.passenger_name && p.phone);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-xl bg-gray-50"
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-medium">
                {passenger.seat_number}
              </div>
              <h3 className="ml-3 font-semibold text-gray-900">
                Penumpang {index + 1}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={passenger.passenger_name}
                  onChange={(e) =>
                    updatePassenger(index, "passenger_name", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) =>
                    updatePassenger(index, "phone", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="081234567890"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

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
          onClick={onNext}
          disabled={!isFormValid}
          size={"lg"}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
};

export default PassenggerForm;
