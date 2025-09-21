"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import PageLoader from "@/components/fragment/PageLoader";
import Sidebar from "./components/layout/Sidebar";
import AdminDashboard from "./components/layout/AdminDashboard";
import RouteSection from "./components/layout/RouteSection";
import BusesSection from "./components/layout/BusesSection";
import ScheduleSection from "./components/layout/ScheduleSection";

const AdminPage = () => {
  const { loading } = useAuthStore(
    useShallow((state) => {
      return { loading: state.loading };
    })
  );
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Sample data - replace with actual API calls

  const [buses] = useState([
    {
      id: "1",
      bus_number: "B001",
      bus_type: "eksekutif",
      total_seats: 40,
      plate_number: "B1234ABC",
      is_active: true,
    },
    {
      id: "2",
      bus_number: "B002",
      bus_type: "bisnis",
      total_seats: 45,
      plate_number: "B5678DEF",
      is_active: true,
    },
    {
      id: "3",
      bus_number: "B003",
      bus_type: "VIP",
      total_seats: 30,
      plate_number: "B9012GHI",
      is_active: false,
    },
  ]);

  const [schedules] = useState([
    {
      id: "1",
      route: "Jakarta - Bandung",
      departure_time: "08:00",
      bus_class: "eksekutif",
      price: 85000,
      available_seats: 35,
      status: "scheduled",
    },
    {
      id: "2",
      route: "Jakarta - Yogyakarta",
      departure_time: "10:00",
      bus_class: "VIP",
      price: 175000,
      available_seats: 28,
      status: "scheduled",
    },
    {
      id: "3",
      route: "Bandung - Surabaya",
      departure_time: "14:00",
      bus_class: "bisnis",
      price: 210000,
      available_seats: 42,
      status: "cancelled",
    },
  ]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        bg: "bg-green-900/30",
        text: "text-green-400",
        border: "border-green-500/30",
      },
      inactive: {
        bg: "bg-red-900/30",
        text: "text-red-400",
        border: "border-red-500/30",
      },
      scheduled: {
        bg: "bg-blue-900/30",
        text: "text-blue-400",
        border: "border-blue-500/30",
      },
      cancelled: {
        bg: "bg-red-900/30",
        text: "text-red-400",
        border: "border-red-500/30",
      },
      confirmed: {
        bg: "bg-green-900/30",
        text: "text-green-400",
        border: "border-green-500/30",
      },
      pending: {
        bg: "bg-yellow-900/30",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
      },
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        {status}
      </span>
    );
  };

  const TableHeader = ({ children, sortable = false }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">
      <div
        className={`flex items-center space-x-1 ${
          sortable ? "cursor-pointer hover:text-gray-300" : ""
        }`}
      >
        {children}
      </div>
    </th>
  );

  const TableRow = ({ children, onClick }) => (
    <tr
      className={`border-b border-gray-700 hover:bg-gray-800/50 transition-colors ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </tr>
  );

  const ActionButton = ({
    icon: Icon,
    onClick,
    variant = "default",
    size = "sm",
  }) => {
    const variants = {
      default: "text-gray-400 hover:text-white",
      danger: "text-red-400 hover:text-red-300",
      success: "text-green-400 hover:text-green-300",
    };

    return (
      <button
        onClick={onClick}
        className={`p-2 rounded transition-colors ${variants[variant]}`}
      >
        <Icon className={`h-4 w-4`} />
      </button>
    );
  };

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Booking Management</h2>
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
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                    {booking.booking_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {booking.route}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {booking.passenger_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    Rp {booking.total_amount.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <ActionButton
                        icon={Eye}
                        onClick={() => openModal("view-booking", booking)}
                      />
                      {booking.status === "pending" && (
                        <ActionButton
                          icon={CheckCircle}
                          onClick={() => openModal("confirm-booking", booking)}
                          variant="success"
                        />
                      )}
                    </div>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "routes":
        return <RouteSection getStatusBadge={getStatusBadge} />;
      case "buses":
        return <BusesSection getStatusBadge={getStatusBadge} />;
      case "schedules":
        return <ScheduleSection getStatusBadge={getStatusBadge} />;
      case "bookings":
        return renderBookings();
      default:
        return <AdminDashboard />;
    }
  };

  if (loading) return <PageLoader />;

  return (
    <>
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content */}
      <div className="p-8 flex-1">{renderContent()}</div>
    </>
  );
};

export default AdminPage;
