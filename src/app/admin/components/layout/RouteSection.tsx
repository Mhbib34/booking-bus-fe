import { Edit, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActionButton from "../fragment/ActionButton";
import TableRow from "../fragment/TableRow";
import TableHeader from "../fragment/TableHeader";
import { useRouteStore } from "@/store/routes-store";
import { useShallow } from "zustand/shallow";
import { Format } from "@/utils/format";
import Modal from "../template/Modal";
import RouteModal from "../modal/RouteModal";
import axiosInstance from "@/lib/axiosInstance";
import { showConfirm } from "@/lib/sonner";
import { useDebouncedValue } from "@/utils/useDebounce";

type Props = {
  getStatusBadge: (status: string) => React.JSX.Element;
};

const RouteSection = ({ getStatusBadge }: Props) => {
  const { routes, fetchRoutes } = useRouteStore(
    useShallow((state) => ({
      routes: state.routes,
      fetchRoutes: state.fetchRoutes,
    }))
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  //eslint-disable-next-line
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  //eslint-disable-next-line
  const openModal = (type: "add" | "edit", route?: any) => {
    setModalType(type);
    setSelectedRoute(route || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedRoute(null);
  };

  const handleDeActivate = async (id: string) => {
    try {
      await axiosInstance.patch(`/v1/routes/${id}`, {
        withCredentials: true,
      });
      fetchRoutes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchRoutes(1, debouncedSearchTerm); // filter by origin
    } else {
      fetchRoutes(1); // tanpa filter
    }
    //eslint-disable-next-line
  }, [debouncedSearchTerm]);

  console.log(debouncedSearchTerm);

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Rute Management</h2>
          <button
            onClick={() => openModal("add")}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Rute</span>
          </button>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari rute..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <TableHeader sortable>Kota Asal</TableHeader>
                  <TableHeader sortable>Kota Tujuan</TableHeader>
                  <TableHeader sortable>Harga</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Aksi</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {routes.data.length ? (
                  routes.data.map((route) => (
                    <TableRow key={route.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                        {route.origin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {route.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {Format.formatCurrency(route.base_price!)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(
                          route.is_active ? "active" : "inactive"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <ActionButton
                            icon={Edit}
                            onClick={() => openModal("edit", route)}
                          />
                          <ActionButton
                            icon={Trash2}
                            onClick={() =>
                              showConfirm(
                                "Nonaktifkan",
                                "Anda yakin ingin menonaktifkan rute ini?",
                                () => handleDeActivate(route.id!),
                                "Nonaktifkan"
                              )
                            }
                            variant="danger"
                          />
                        </div>
                      </td>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
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
        title={modalType === "edit" ? "Edit Rute" : "Tambah Rute"}
      >
        <RouteModal
          fetchRoutes={fetchRoutes}
          isEdit={modalType === "edit"}
          initialData={selectedRoute}
        />
      </Modal>
    </>
  );
};

export default RouteSection;
