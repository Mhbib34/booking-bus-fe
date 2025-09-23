import Button from "@/components/fragment/Button";
import Input from "@/components/fragment/Input";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { ArrowRight, Bus, BusFront, MonitorDot } from "lucide-react";
import { useEffect, useState } from "react";

type RouteModalProps = {
  fetchRoutes: () => void;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    origin: string;
    destination: string;
    base_price: number;
    is_active?: boolean;
  };
};

const RouteModal = ({
  fetchRoutes,
  isEdit = false,
  initialData,
}: RouteModalProps) => {
  const [route, setRoute] = useState({
    origin: "",
    destination: "",
    base_price: 0,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && initialData) {
      setRoute({
        origin: initialData.origin,
        destination: initialData.destination,
        base_price: initialData.base_price,
        is_active: initialData.is_active ?? true,
      });
    }
  }, [isEdit, initialData]);

  //eslint-disable-next-line
  const handleChange = (field: keyof typeof route, value: any) => {
    setRoute((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && initialData?.id) {
        const res = await axiosInstance.put(`/v1/routes/${initialData.id}`, {
          origin: route.origin,
          destination: route.destination,
          base_price: Number(route.base_price),
          is_active: route.is_active,
        });
        if (res.status === 200) {
          showSuccess("Rute berhasil diperbarui.");
          fetchRoutes();
        }
      } else {
        const res = await axiosInstance.post("/v1/routes", {
          origin: route.origin,
          destination: route.destination,
          base_price: Number(route.base_price),
        });
        if (res.status === 201) {
          showSuccess("Rute berhasil ditambahkan.");
          fetchRoutes();
          setRoute({
            origin: "",
            destination: "",
            base_price: 0,
            is_active: true,
          });
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
      <Input
        placeholder="Kota Asal"
        Icon={BusFront}
        type="text"
        onChange={(e) => handleChange("origin", e.target.value)}
        value={route.origin}
      />
      <Input
        placeholder="Kota Tujuan"
        Icon={Bus}
        type="text"
        onChange={(e) => handleChange("destination", e.target.value)}
        value={route.destination}
      />
      <Input
        placeholder="Harga"
        Icon={MonitorDot}
        type="number"
        onChange={(e) => handleChange("base_price", e.target.value)}
        value={route.base_price}
      />

      {/* Modern Toggle - hanya muncul ketika edit */}
      {isEdit && (
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex flex-col">
            <label
              htmlFor="is_active"
              className="text-white font-medium text-sm"
            >
              Status Rute
            </label>
            <span className="text-gray-400 text-xs">
              {route.is_active ? "Rute sedang aktif" : "Rute sedang nonaktif"}
            </span>
          </div>

          <button
            type="button"
            id="is_active"
            role="switch"
            aria-checked={route.is_active}
            onClick={() => handleChange("is_active", !route.is_active)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
              ${
                route.is_active
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gray-600"
              }
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
                ${route.is_active ? "translate-x-6" : "translate-x-1"}
              `}
            />
          </button>
        </div>
      )}

      <Button loading={loading} type="submit">
        <span>{isEdit ? "Update Rute" : "Tambah Rute"}</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default RouteModal;
