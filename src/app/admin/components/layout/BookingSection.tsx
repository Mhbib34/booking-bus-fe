import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import TableRow from "../fragment/TableRow";
import TableHeader from "../fragment/TableHeader";
import { useBookingStore } from "@/store/bookings-strore";
import { useShallow } from "zustand/shallow";
import { Format } from "@/utils/format";
import Modal from "../template/Modal";

type Props = {
  getStatusBadge: (status: string) => React.JSX.Element;
};

const BookingSection = ({ getStatusBadge }: Props) => {
  const { bookings, fetchBookings } = useBookingStore(
    useShallow((state) => ({
      bookings: state.bookings,
      fetchBookings: state.fetchBookings,
    }))
  );

  useEffect(() => {
    fetchBookings();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Booking Management
          </h2>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <TableHeader sortable>Booking Code</TableHeader>
                  <TableHeader sortable>Route</TableHeader>
                  <TableHeader>Passengers</TableHeader>
                  <TableHeader sortable>Total Amount</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {bookings.data.length ? (
                  bookings.data.map((booking) => (
                    <TableRow key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                        {booking.booking_code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {booking.schedule?.route?.origin} -
                        {booking.schedule?.route?.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {booking.passenger_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {Format.formatCurrency(booking.total_amount!)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.booking_status!)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* <ActionButton
                        icon={Eye}
                        onClick={() => openModal("view-booking", booking)}
                      /> */}
                          {/* {booking.booking_status === "pending" && (
                        <ActionButton
                          icon={CheckCircle}
                          onClick={() => openModal("confirm-booking", booking)}
                          variant="success"
                        />
                      )} */}
                        </div>
                      </td>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-white"
                    >
                      Belum ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSection;
