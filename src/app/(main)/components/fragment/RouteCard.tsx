import { useScheduleStore } from "@/store/schedule-store";
import { Route } from "@/types/route.type";
import { Format } from "@/utils/format";
import { Bus, ChevronRight } from "lucide-react";

// Komponen client (CSR) untuk handle klik & fetch schedules
export default function RouteCard({ route }: { route: Route }) {
  const { fetchSchedules } = useScheduleStore();

  const handleSearch = async () => {
    await fetchSchedules(
      1,
      route.origin,
      route.destination,
      new Date().toISOString().split("T")[0]
    );
    // state schedules bisa diakses dari store
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{route.origin}</h3>
          <div className="flex items-center my-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">
            {route.destination}
          </h3>
        </div>
        <Bus className="h-8 w-8 text-blue-600" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Mulai dari</span>
          <span className="font-bold text-blue-600">
            {Format.formatCurrency(route.base_price!)}
          </span>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 font-medium transition-colors cursor-pointer"
      >
        Pilih Rute
      </button>
    </div>
  );
}
