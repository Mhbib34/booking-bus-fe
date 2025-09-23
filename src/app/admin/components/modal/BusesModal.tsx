import Button from "@/components/fragment/Button";
import Input from "@/components/fragment/Input";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { useRouteStore } from "@/store/routes-store";
import { Format } from "@/utils/format";
import {
  ArrowRight,
  Bus,
  BusFront,
  MonitorDot,
  MapPin,
  Hash,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

type BusesModalProps = {
  fetchBuses: () => void;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    route_id: string;
    bus_number: string;
    bus_type: string;
    total_seats: string | number;
    facilities: string[];
    plate_number: string;
    is_active?: boolean;
  };
};

const BusesModal = ({
  fetchBuses,
  isEdit = false,
  initialData,
}: BusesModalProps) => {
  const [bus, setBus] = useState({
    route_id: "",
    bus_number: "",
    bus_type: "",
    total_seats: "",
    facilities: [] as string[],
    plate_number: "",
    is_active: true,
  });
  const [facilitiesInput, setFacilitiesInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { routes, fetchRoutes } = useRouteStore(
    useShallow((state) => ({
      routes: state.routes,
      fetchRoutes: state.fetchRoutes,
    }))
  );

  useEffect(() => {
    fetchRoutes();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEdit && initialData) {
      setBus({
        route_id: initialData.route_id,
        bus_number: initialData.bus_number,
        bus_type: initialData.bus_type,
        total_seats: String(initialData.total_seats),
        facilities: initialData.facilities,
        plate_number: initialData.plate_number,
        is_active: initialData.is_active ?? true,
      });
      // Set facilities input sebagai string yang dipisah koma
      setFacilitiesInput(initialData.facilities.join(", "));
    }
  }, [isEdit, initialData]);

  //eslint-disable-next-line
  const handleChange = (field: keyof typeof bus, value: any) => {
    setBus((prev) => ({ ...prev, [field]: value }));
  };

  // Handle facilities input change
  const handleFacilitiesChange = (value: string) => {
    setFacilitiesInput(value);
    // Convert string yang dipisah koma menjadi array
    const facilitiesArray = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    handleChange("facilities", facilitiesArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && initialData?.id) {
        const res = await axiosInstance.put(`/v1/buses/${initialData.id}`, {
          route_id: bus.route_id,
          bus_number: bus.bus_number,
          bus_type: bus.bus_type,
          total_seats: Number(bus.total_seats),
          facilities: bus.facilities,
          plate_number: bus.plate_number,
          is_active: bus.is_active,
        });
        console.log(res);

        if (res.status === 200) {
          showSuccess("Bus berhasil diperbarui.");
          fetchBuses();
        }
      } else {
        const res = await axiosInstance.post("/v1/buses", {
          route_id: bus.route_id,
          bus_number: bus.bus_number,
          bus_type: bus.bus_type,
          total_seats: Number(bus.total_seats),
          facilities: bus.facilities,
          plate_number: bus.plate_number,
        });
        if (res.status === 201) {
          showSuccess("Bus berhasil ditambahkan.");
          fetchBuses();
          setBus({
            route_id: "",
            bus_number: "",
            bus_type: "",
            total_seats: "",
            facilities: [],
            plate_number: "",
            is_active: true,
          });
          setFacilitiesInput("");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Route Selection */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">Pilih Rute</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={bus.route_id}
            onChange={(e) => handleChange("route_id", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="" disabled>
              Pilih Rute
            </option>
            {routes.data.map((route) => (
              <option key={route.id} value={route.id}>
                {route.origin} → {route.destination} (Rp{" "}
                {Format.formatCurrency(route.base_price!)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {isEdit ? null : (
        <Input
          placeholder="Nomor Bus (contoh: B001)"
          Icon={Hash}
          type="text"
          onChange={(e) => handleChange("bus_number", e.target.value)}
          value={bus.bus_number}
        />
      )}

      <Input
        placeholder="Tipe Bus (contoh: Executive, Economy)"
        Icon={Bus}
        type="text"
        onChange={(e) => handleChange("bus_type", e.target.value)}
        value={bus.bus_type}
      />

      {isEdit ? null : (
        <Input
          placeholder="Nomor Plat (contoh: B 1234 ABC)"
          Icon={BusFront}
          type="text"
          onChange={(e) => handleChange("plate_number", e.target.value)}
          value={bus.plate_number}
        />
      )}

      <Input
        placeholder="Total Kursi"
        Icon={MonitorDot}
        type="number"
        onChange={(e) => handleChange("total_seats", parseInt(e.target.value))}
        value={bus.total_seats.toString()}
      />

      {/* Facilities Input */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">Fasilitas</label>
        <div className="relative">
          <Settings className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <textarea
            placeholder="Masukkan fasilitas dipisah dengan koma (contoh: AC, WiFi, Toilet, Reclining Seat)"
            value={facilitiesInput}
            onChange={(e) => handleFacilitiesChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            rows={3}
          />
        </div>
        {bus.facilities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {bus.facilities.map((facility, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-md border border-blue-600/30"
              >
                {facility}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Modern Toggle - hanya muncul ketika edit */}
      {isEdit && (
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex flex-col">
            <label
              htmlFor="is_active"
              className="text-white font-medium text-sm"
            >
              Status Bus
            </label>
            <span className="text-gray-400 text-xs">
              {bus.is_active ? "Bus sedang aktif" : "Bus sedang nonaktif"}
            </span>
          </div>

          <button
            type="button"
            id="is_active"
            role="switch"
            aria-checked={bus.is_active}
            onClick={() => handleChange("is_active", !bus.is_active)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
              ${
                bus.is_active
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gray-600"
              }
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
                ${bus.is_active ? "translate-x-6" : "translate-x-1"}
              `}
            />
          </button>
        </div>
      )}

      <Button loading={loading} type="submit">
        <span>{isEdit ? "Update Bus" : "Tambah Bus"}</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default BusesModal;
