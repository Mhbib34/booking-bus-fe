import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking.type";
import { Format } from "@/utils/format";
import { Download, X } from "lucide-react";
import React from "react";

type TIcketModalProps = {
  showTicket: boolean;
  setShowTicket: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBooking: Booking | null;
  ticketRef: React.RefObject<HTMLDivElement | null>;
  handlePrintTicket: (
    ticketRef: React.RefObject<HTMLDivElement | null>,
    booking: Booking
  ) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.JSX.Element;
};
const TIcketModal = ({
  showTicket,
  setShowTicket,
  selectedBooking,
  ticketRef,
  handlePrintTicket,
  getStatusColor,
  getStatusIcon,
}: TIcketModalProps) => {
  return (
    <>
      {showTicket && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">E-Ticket</h2>
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() =>
                      handlePrintTicket(ticketRef, selectedBooking)
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Print PDF
                  </Button>
                  <button
                    onClick={() => setShowTicket(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div ref={ticketRef} className="ticket">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {/* Ticket Header */}
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">
                      BUS TICKET
                    </h1>
                    <div className="text-lg font-semibold text-gray-800">
                      Booking Code: {selectedBooking.booking_code}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getStatusColor(
                        selectedBooking.booking_status!
                      )}`}
                    >
                      {getStatusIcon(selectedBooking.booking_status!)}
                      {selectedBooking.booking_status!.toUpperCase()}
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center text-center">
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-gray-800">
                          {selectedBooking.schedule?.route?.origin}
                        </div>
                        <div className="text-sm text-gray-600">Departure</div>
                      </div>
                      <div className="flex-1">
                        <div className="border-t-2 border-dashed border-gray-300 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-sm hidden md:block">
                            {selectedBooking.schedule?.departure_time}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-gray-800">
                          {selectedBooking.schedule?.route?.destination}
                        </div>
                        <div className="text-sm text-gray-600">Arrival</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-semibold">
                        {selectedBooking.passenger_count}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-800">
                        Total Amount:
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        {Format.formatCurrency(selectedBooking.total_amount!)}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-sm text-gray-600 mt-6 border-t border-gray-200 pt-4">
                    <p>Please arrive 30 minutes before departure time</p>
                    <p>Show this ticket to the bus conductor</p>
                    <p className="mt-2">Thank you for choosing our service!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TIcketModal;
