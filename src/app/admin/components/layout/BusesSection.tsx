import React, { useEffect, useState } from "react";
import ActionButton from "../fragment/ActionButton";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import TableRow from "../fragment/TableRow";
import TableHeader from "../fragment/TableHeader";
import { useShallow } from "zustand/shallow";
import { useBusStore } from "@/store/buses-store";
import Modal from "../template/Modal";
import BusesModal from "../modal/BusesModal";

type Props = {
  getStatusBadge: (status: string) => React.JSX.Element;
};

const BusesSection = ({ getStatusBadge }: Props) => {
  const { buses, fetchBuses } = useBusStore(
    useShallow((state) => ({
      buses: state.buses,
      fetchBuses: state.fetchBuses,
    }))
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  //eslint-disable-next-line
  const [selectedBus, setSelectedBus] = useState<any>(null);

  //eslint-disable-next-line
  const openModal = (type: "add" | "edit", bus?: any) => {
    setModalType(type);
    setSelectedBus(bus || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedBus(null);
  };

  useEffect(() => {
    fetchBuses();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Bus Management</h2>
          <button
            onClick={() => openModal("add")}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Bus</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <TableHeader sortable>Nomor Bus</TableHeader>
                <TableHeader sortable>Kelas Bus</TableHeader>
                <TableHeader>Nomor Plat</TableHeader>
                <TableHeader>Total Kursi</TableHeader>
                <TableHeader>Rute</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Aksi</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {buses.length ? (
                buses.map((bus) => (
                  <TableRow key={bus.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {bus.bus_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white capitalize">
                      {bus.bus_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {bus.plate_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {bus.total_seats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {bus.origin} - {bus.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(bus.is_active ? "active" : "inactive")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* <ActionButton
                        icon={Eye}
                        onClick={() => openModal("view-bus", bus)}
                      /> */}
                        <ActionButton
                          icon={Edit}
                          onClick={() => openModal("edit", bus)}
                        />
                        <ActionButton
                          icon={Trash2}
                          onClick={() => console.log("delete", bus)}
                          variant="danger"
                        />
                      </div>
                    </td>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-white">
                    Belum ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        title={modalType === "edit" ? "Edit Bus" : "Tambah Bus "}
      >
        <BusesModal
          fetchBuses={fetchBuses}
          isEdit={modalType === "edit"}
          initialData={selectedBus}
        />
      </Modal>
    </>
  );
};

export default BusesSection;
