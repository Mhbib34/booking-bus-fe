"use client";
import React, { useState } from "react";

import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import PageLoader from "@/components/fragment/PageLoader";
import Sidebar from "./components/layout/Sidebar";
import AdminDashboard from "./components/layout/AdminDashboard";
import RouteSection from "./components/layout/RouteSection";
import BusesSection from "./components/layout/BusesSection";
import ScheduleSection from "./components/layout/ScheduleSection";
import BookingSection from "./components/layout/BookingSection";

const AdminPage = () => {
  const { loading } = useAuthStore(
    useShallow((state) => {
      return { loading: state.loading };
    })
  );
  const [activeTab, setActiveTab] = useState("dashboard");

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; text: string; border: string }
    > = {
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
        return <BookingSection getStatusBadge={getStatusBadge} />;
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
