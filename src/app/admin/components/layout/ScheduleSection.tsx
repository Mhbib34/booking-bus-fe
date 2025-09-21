import React, { useEffect, useState } from "react";
import ActionButton from "../fragment/ActionButton";
import TableHeader from "../fragment/TableHeader";
import TableRow from "../fragment/TableRow";
import { Edit, Plus } from "lucide-react";
import Modal from "../template/Modal";
import { useShallow } from "zustand/shallow";
import { useScheduleStore } from "@/store/schedule-store";
import { Format } from "@/utils/format";
import ScheduleModal from "../modal/ScheduleModal";

type Props = {
  getStatusBadge: (status: string) => React.JSX.Element;
};

const ScheduleSection = ({ getStatusBadge }: Props) => {
  const { schedules, fetchSchedules } = useScheduleStore(
    useShallow((state) => ({
      schedules: state.schedules,
      fetchSchedules: state.fetchSchedules,
    }))
  );
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  //eslint-disable-next-line
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  //eslint-disable-next-line
  const openModal = (type: "add" | "edit", schedule?: any) => {
    setModalType(type);
    setSelectedSchedule(schedule || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedSchedule(null);
  };

  useEffect(() => {
    fetchSchedules();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            Jadwal Management
          </h2>
          <button
            onClick={() => openModal("add")}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Jadwal</span>
          </button>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <TableHeader sortable>Route</TableHeader>
                  <TableHeader sortable>Departure</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader sortable>Price</TableHeader>
                  <TableHeader>Available Seats</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {schedules.length ? (
                  schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                        {schedule.origin} - {schedule.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {schedule.departure_time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white capitalize">
                        {schedule.bus_class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {Format.formatCurrency(schedule.price!)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {schedule.available_seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(schedule.status!)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <ActionButton
                            icon={Edit}
                            onClick={() => openModal("edit", schedule)}
                          />
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
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        showModal={showModal}
        closeModal={closeModal}
        title={modalType === "edit" ? "Edit Jadwal" : "Tambah Jadwal"}
      >
        <ScheduleModal
          fetchSchedules={fetchSchedules}
          isEdit={modalType === "edit"}
          initialData={selectedSchedule}
        />
      </Modal>
    </>
  );
};

export default ScheduleSection;
