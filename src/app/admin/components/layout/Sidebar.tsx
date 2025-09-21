import { showConfirm } from "@/lib/sonner";
import { useAuthStore } from "@/store/auth-store";
import { Bus, Calendar, LogOut, Route, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useShallow } from "zustand/shallow";

type sidebarProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({ activeTab, setActiveTab }: sidebarProps) => {
  const { logout } = useAuthStore(
    useShallow((state) => {
      return { logout: state.logout };
    })
  );

  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Settings },
    { id: "routes", label: "Routes", icon: Route },
    { id: "buses", label: "Buses", icon: Bus },
    { id: "schedules", label: "Schedules", icon: Calendar },
    { id: "bookings", label: "Bookings", icon: Users },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="py-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white text-center">BusKu</h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors cursor-pointer ${
                activeTab === item.id
                  ? "bg-blue-600 text-white border-r-2 border-blue-400"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
        <button
          onClick={() =>
            showConfirm(
              "Keluar",
              "Apakah anda yakin ingin keluar?",
              () => handleLogout(),
              "Keluar"
            )
          }
          className="flex items-center space-x-3 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
