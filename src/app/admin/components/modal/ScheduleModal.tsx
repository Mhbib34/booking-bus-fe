import Button from "@/components/fragment/Button";
import Input from "@/components/fragment/Input";
import axiosInstance from "@/lib/axiosInstance";
import { showError, showSuccess } from "@/lib/sonner";
import { useBusStore } from "@/store/buses-store";
import { useRouteStore } from "@/store/routes-store";
import { Format } from "@/utils/format";
import {
  ArrowRight,
  MonitorDot,
  MapPin,
  Hash,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

type ScheduleModalProps = {
  fetchSchedules: () => void;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    route_id: string;
    bus_id: string;
    departure_time: string;
    departure_date: string;
    available_seats?: number;
    bus_class: string;
    price: number;
    status?: string;
  };
};

const ScheduleModal = ({
  fetchSchedules,
  isEdit = false,
  initialData,
}: ScheduleModalProps) => {
  const [schedule, setSchedule] = useState({
    route_id: "",
    bus_id: "",
    departure_time: "",
    available_seats: 0,
    bus_class: "",
    price: 0,
    departure_date: "",
    status: "scheduled",
  });
  const [loading, setLoading] = useState(false);

  const { routes, fetchRoutes } = useRouteStore(
    useShallow((state) => ({
      routes: state.routes,
      fetchRoutes: state.fetchRoutes,
    }))
  );

  const { buses, fetchBuses } = useBusStore(
    useShallow((state) => ({
      buses: state.buses,
      fetchBuses: state.fetchBuses,
    }))
  );

  useEffect(() => {
    fetchRoutes();
    fetchBuses();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isEdit && initialData) {
      setSchedule({
        route_id: initialData.route_id,
        bus_id: initialData.bus_id,
        departure_time: initialData.departure_time,
        available_seats: initialData.available_seats || 0,
        price: initialData.price,
        departure_date: initialData.departure_date,
        bus_class: initialData.bus_class,
        status: initialData.status || "scheduled",
      });
    }
  }, [isEdit, initialData]);

  //eslint-disable-next-line
  const handleChange = (field: keyof typeof schedule, value: any) => {
    setSchedule((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && initialData?.id) {
        const res = await axiosInstance.put(`/v1/schedules/${initialData.id}`, {
          route_id: schedule.route_id,
          bus_id: schedule.bus_id,
          price: Number(schedule.price),
          departure_time: schedule.departure_time,
          available_seats: Number(schedule.available_seats),
          departure_date: schedule.departure_date,
          bus_class: schedule.bus_class,
          status: schedule.status,
        });
        if (res.status === 200) {
          showSuccess("Bus berhasil diperbarui.");
          fetchSchedules();
        }
      } else {
        const res = await axiosInstance.post("/v1/schedules", {
          route_id: schedule.route_id,
          bus_id: schedule.bus_id,
          price: Number(schedule.price),
          departure_time: schedule.departure_time,
          available_seats: Number(schedule.available_seats),
          departure_date: schedule.departure_date,
          bus_class: schedule.bus_class,
          status: schedule.status,
        });

        if (res.status === 201) {
          showSuccess("Bus berhasil ditambahkan.");
          fetchSchedules();
          setSchedule({
            route_id: "",
            bus_id: "",
            departure_time: "",
            price: 0,
            departure_date: "",
            available_seats: 0,
            bus_class: "",
            status: "scheduled",
          });
        }
      }
    } catch (error) {
      console.log(error);
      showError("Bus gagal ditambahkan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Route Selection */}
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={schedule.route_id}
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

      {/* Bus Class */}
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={schedule.bus_class}
            onChange={(e) => handleChange("bus_class", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="" disabled>
              Pilih Kelas Bus
            </option>
            <option value="ekonomi">Ekonomi</option>
            <option value="eksekutif">Eksekutif</option>
            <option value="bisnis">Bisnis</option>
          </select>
        </div>
      </div>

      {/* bus */}
      <div className="space-y-2">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={schedule.bus_id}
            onChange={(e) => handleChange("bus_id", e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="" disabled>
              Pilih Bus
            </option>
            {buses
              .filter(
                (bus) =>
                  bus.bus_type === schedule.bus_class &&
                  bus.route_id === schedule.route_id
              )
              .map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.bus_number}
                </option>
              ))}
          </select>
        </div>
      </div>

      <Input
        placeholder="Waktu Keberangkatan (contoh: 08:00)"
        Icon={Hash}
        type="text"
        onChange={(e) => handleChange("departure_time", e.target.value)}
        value={schedule.departure_time}
      />

      <Input
        placeholder="Tanggal Keberangkatan"
        Icon={Calendar}
        type="date"
        onChange={(e) => handleChange("departure_date", e.target.value)}
        value={schedule.departure_date}
      />

      <Input
        placeholder="Jumlah Kursi Tersedia"
        Icon={MonitorDot}
        type="number"
        onChange={(e) =>
          handleChange("available_seats", parseInt(e.target.value))
        }
        value={schedule.available_seats.toString()}
      />
      <Input
        placeholder="Harga Tiket"
        Icon={DollarSign}
        type="number"
        onChange={(e) => handleChange("price", parseInt(e.target.value))}
        value={schedule.price.toString()}
      />

      {isEdit && (
        <div className="space-y-2">
          <label className="text-white font-medium text-sm">Pilih Status</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={schedule.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="" disabled>
                Pilih Status
              </option>
              <option value="scheduled">Scheduled</option>
              <option value="cancelled">Cancelled</option>
              <option value="boarding">Boarding</option>
              <option value="arrived">Arrived</option>
              <option value="departed">Departed</option>
            </select>
          </div>
        </div>
      )}

      <Button loading={loading} type="submit">
        <span>{isEdit ? "Update Bus" : "Tambah Bus"}</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ScheduleModal;
