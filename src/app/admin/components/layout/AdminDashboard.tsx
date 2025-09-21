import { Bus, Calendar, MapPin, Route, Users } from "lucide-react";
import React, { useEffect } from "react";
import StatsCard from "../fragment/StatsCard";
import { useShallow } from "zustand/shallow";
import { useBookingStore } from "@/store/bookings-strore";
import { useRouteStore } from "@/store/routes-store";
import { Format } from "@/utils/format";
import { useBusStore } from "@/store/buses-store";
import { useScheduleStore } from "@/store/schedule-store";

const AdminDashboard = () => {
  const { fetchBookings, bookings } = useBookingStore(
    useShallow((state) => {
      return {
        fetchBookings: state.fetchBookings,
        bookings: state.bookings,
      };
    })
  );

  const { routes, fetchRoutes } = useRouteStore(
    useShallow((state) => {
      return {
        routes: state.routes,
        fetchRoutes: state.fetchRoutes,
      };
    })
  );

  const { buses, fetchBuses } = useBusStore(
    useShallow((state) => {
      return {
        buses: state.buses,
        fetchBuses: state.fetchBuses,
      };
    })
  );

  const { schedules, fetchSchedules } = useScheduleStore(
    useShallow((state) => {
      return {
        schedules: state.schedules,
        fetchSchedules: state.fetchSchedules,
      };
    })
  );

  useEffect(() => {
    fetchBookings();
    fetchRoutes();
    fetchBuses();
    fetchSchedules();
    //eslint-disable-next-line
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        bg: "bg-green-900/30",
        text: "text-green-400",
        border: "border-green-500/30",
      },
      paid: {
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

    // @ts-expect-error TS7053
    const config = statusConfig[status] || statusConfig.active;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        {status}
      </span>
    );
  };

  const stats = {
    totalRoutes: routes ? routes.data.length : 0,
    totalBuses: buses ? buses.length : 0,
    totalBookings: bookings ? bookings.data.length : 0,
    activeSchedules: schedules ? schedules.length : 0,
  };

  // const [routes] = useState([
  //   {
  //     id: "1",
  //     origin: "Jakarta",
  //     destination: "Bandung",
  //     base_price: 75000,
  //     is_active: true,
  //   },
  //   {
  //     id: "2",
  //     origin: "Jakarta",
  //     destination: "Yogyakarta",
  //     base_price: 150000,
  //     is_active: true,
  //   },
  //   {
  //     id: "3",
  //     origin: "Bandung",
  //     destination: "Surabaya",
  //     base_price: 200000,
  //     is_active: false,
  //   },
  // ]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Routes"
          value={stats.totalRoutes}
          icon={Route}
          color="blue"
        />
        <StatsCard
          title="Total Buses"
          value={stats.totalBuses}
          icon={Bus}
          color="green"
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Users}
          color="purple"
        />
        <StatsCard
          title="Active Schedules"
          value={stats.activeSchedules}
          icon={Calendar}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Bookings
          </h3>
          <div className="space-y-3">
            {bookings.data.length > 0 ? (
              bookings!.data.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">
                      {booking.booking_code}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {booking.schedule?.route?.origin} -{" "}
                      {booking.schedule?.route?.destination}
                    </p>
                  </div>
                  {getStatusBadge(booking.booking_status!)}
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="text-gray-400">No recent bookings found.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Active Routes
          </h3>
          <div className="space-y-3">
            {routes.data
              .filter((r) => r.is_active)
              .slice(0, 5)
              .map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">
                      {route.origin} - {route.destination}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {Format.formatCurrency(route.base_price!)}
                    </p>
                  </div>
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
