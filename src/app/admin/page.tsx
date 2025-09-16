// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Bus,
//   Route,
//   Calendar,
//   Users,
//   Settings,
//   LogOut,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   MoreVertical,
//   MapPin,
//   Clock,
//   DollarSign,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Sample data - replace with actual API calls
//   const [stats] = useState({
//     totalRoutes: 15,
//     totalBuses: 25,
//     totalBookings: 145,
//     activeSchedules: 32,
//   });

//   const [routes] = useState([
//     {
//       id: "1",
//       origin: "Jakarta",
//       destination: "Bandung",
//       base_price: 75000,
//       is_active: true,
//     },
//     {
//       id: "2",
//       origin: "Jakarta",
//       destination: "Yogyakarta",
//       base_price: 150000,
//       is_active: true,
//     },
//     {
//       id: "3",
//       origin: "Bandung",
//       destination: "Surabaya",
//       base_price: 200000,
//       is_active: false,
//     },
//   ]);

//   const [buses] = useState([
//     {
//       id: "1",
//       bus_number: "B001",
//       bus_type: "eksekutif",
//       total_seats: 40,
//       plate_number: "B1234ABC",
//       is_active: true,
//     },
//     {
//       id: "2",
//       bus_number: "B002",
//       bus_type: "bisnis",
//       total_seats: 45,
//       plate_number: "B5678DEF",
//       is_active: true,
//     },
//     {
//       id: "3",
//       bus_number: "B003",
//       bus_type: "VIP",
//       total_seats: 30,
//       plate_number: "B9012GHI",
//       is_active: false,
//     },
//   ]);

//   const [schedules] = useState([
//     {
//       id: "1",
//       route: "Jakarta - Bandung",
//       departure_time: "08:00",
//       bus_class: "eksekutif",
//       price: 85000,
//       available_seats: 35,
//       status: "scheduled",
//     },
//     {
//       id: "2",
//       route: "Jakarta - Yogyakarta",
//       departure_time: "10:00",
//       bus_class: "VIP",
//       price: 175000,
//       available_seats: 28,
//       status: "scheduled",
//     },
//     {
//       id: "3",
//       route: "Bandung - Surabaya",
//       departure_time: "14:00",
//       bus_class: "bisnis",
//       price: 210000,
//       available_seats: 42,
//       status: "cancelled",
//     },
//   ]);

//   const [bookings] = useState([
//     {
//       id: "1",
//       booking_code: "BK240001",
//       route: "Jakarta - Bandung",
//       passenger_count: 2,
//       total_amount: 170000,
//       status: "confirmed",
//     },
//     {
//       id: "2",
//       booking_code: "BK240002",
//       route: "Jakarta - Yogyakarta",
//       passenger_count: 1,
//       total_amount: 175000,
//       status: "pending",
//     },
//     {
//       id: "3",
//       booking_code: "BK240003",
//       route: "Bandung - Surabaya",
//       passenger_count: 3,
//       total_amount: 630000,
//       status: "cancelled",
//     },
//   ]);

//   const openModal = (type, item = null) => {
//     setModalType(type);
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalType("");
//     setSelectedItem(null);
//   };

//   const getStatusBadge = (status, type = "default") => {
//     const statusConfig = {
//       active: {
//         bg: "bg-green-900/30",
//         text: "text-green-400",
//         border: "border-green-500/30",
//       },
//       inactive: {
//         bg: "bg-red-900/30",
//         text: "text-red-400",
//         border: "border-red-500/30",
//       },
//       scheduled: {
//         bg: "bg-blue-900/30",
//         text: "text-blue-400",
//         border: "border-blue-500/30",
//       },
//       cancelled: {
//         bg: "bg-red-900/30",
//         text: "text-red-400",
//         border: "border-red-500/30",
//       },
//       confirmed: {
//         bg: "bg-green-900/30",
//         text: "text-green-400",
//         border: "border-green-500/30",
//       },
//       pending: {
//         bg: "bg-yellow-900/30",
//         text: "text-yellow-400",
//         border: "border-yellow-500/30",
//       },
//     };

//     const config = statusConfig[status] || statusConfig.active;

//     return (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   const StatCard = ({ title, value, icon: Icon, color = "blue" }) => (
//     <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-400 text-sm font-medium">{title}</p>
//           <p className="text-2xl font-bold text-white mt-1">{value}</p>
//         </div>
//         <div className={`p-3 rounded-full bg-${color}-900/30`}>
//           <Icon className={`h-6 w-6 text-${color}-400`} />
//         </div>
//       </div>
//     </div>
//   );

//   const TableHeader = ({ children, sortable = false }) => (
//     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">
//       <div
//         className={`flex items-center space-x-1 ${
//           sortable ? "cursor-pointer hover:text-gray-300" : ""
//         }`}
//       >
//         {children}
//       </div>
//     </th>
//   );

//   const TableRow = ({ children, onClick }) => (
//     <tr
//       className={`border-b border-gray-700 hover:bg-gray-800/50 transition-colors ${
//         onClick ? "cursor-pointer" : ""
//       }`}
//       onClick={onClick}
//     >
//       {children}
//     </tr>
//   );

//   const ActionButton = ({
//     icon: Icon,
//     onClick,
//     variant = "default",
//     size = "sm",
//   }) => {
//     const variants = {
//       default: "text-gray-400 hover:text-white",
//       danger: "text-red-400 hover:text-red-300",
//       success: "text-green-400 hover:text-green-300",
//     };

//     return (
//       <button
//         onClick={onClick}
//         className={`p-2 rounded transition-colors ${variants[variant]}`}
//       >
//         <Icon className={`h-4 w-4`} />
//       </button>
//     );
//   };

//   const Modal = ({ children }) =>
//     showModal && (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//         <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//           {children}
//         </div>
//       </div>
//     );

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Routes"
//           value={stats.totalRoutes}
//           icon={Route}
//           color="blue"
//         />
//         <StatCard
//           title="Total Buses"
//           value={stats.totalBuses}
//           icon={Bus}
//           color="green"
//         />
//         <StatCard
//           title="Total Bookings"
//           value={stats.totalBookings}
//           icon={Users}
//           color="purple"
//         />
//         <StatCard
//           title="Active Schedules"
//           value={stats.activeSchedules}
//           icon={Calendar}
//           color="orange"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <h3 className="text-lg font-semibold text-white mb-4">
//             Recent Bookings
//           </h3>
//           <div className="space-y-3">
//             {bookings.slice(0, 5).map((booking) => (
//               <div
//                 key={booking.id}
//                 className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
//               >
//                 <div>
//                   <p className="text-white font-medium">
//                     {booking.booking_code}
//                   </p>
//                   <p className="text-gray-400 text-sm">{booking.route}</p>
//                 </div>
//                 {getStatusBadge(booking.status)}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <h3 className="text-lg font-semibold text-white mb-4">
//             Active Routes
//           </h3>
//           <div className="space-y-3">
//             {routes
//               .filter((r) => r.is_active)
//               .slice(0, 5)
//               .map((route) => (
//                 <div
//                   key={route.id}
//                   className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
//                 >
//                   <div>
//                     <p className="text-white font-medium">
//                       {route.origin} - {route.destination}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       Rp {route.base_price.toLocaleString("id-ID")}
//                     </p>
//                   </div>
//                   <MapPin className="h-5 w-5 text-blue-400" />
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderRoutes = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-white">Route Management</h2>
//         <button
//           onClick={() => openModal("add-route")}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add Route</span>
//         </button>
//       </div>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="p-4 border-b border-gray-700">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search routes..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-700/50">
//               <tr>
//                 <TableHeader sortable>Origin</TableHeader>
//                 <TableHeader sortable>Destination</TableHeader>
//                 <TableHeader sortable>Base Price</TableHeader>
//                 <TableHeader>Status</TableHeader>
//                 <TableHeader>Actions</TableHeader>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {routes.map((route) => (
//                 <TableRow key={route.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
//                     {route.origin}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {route.destination}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     Rp {route.base_price.toLocaleString("id-ID")}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusBadge(route.is_active ? "active" : "inactive")}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <ActionButton
//                         icon={Eye}
//                         onClick={() => openModal("view-route", route)}
//                       />
//                       <ActionButton
//                         icon={Edit}
//                         onClick={() => openModal("edit-route", route)}
//                       />
//                       <ActionButton
//                         icon={Trash2}
//                         onClick={() => openModal("delete-route", route)}
//                         variant="danger"
//                       />
//                     </div>
//                   </td>
//                 </TableRow>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderBuses = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-white">Bus Management</h2>
//         <button
//           onClick={() => openModal("add-bus")}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add Bus</span>
//         </button>
//       </div>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="p-4 border-b border-gray-700">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="Search buses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-700/50">
//               <tr>
//                 <TableHeader sortable>Bus Number</TableHeader>
//                 <TableHeader sortable>Type</TableHeader>
//                 <TableHeader>Plate Number</TableHeader>
//                 <TableHeader>Seats</TableHeader>
//                 <TableHeader>Status</TableHeader>
//                 <TableHeader>Actions</TableHeader>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {buses.map((bus) => (
//                 <TableRow key={bus.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
//                     {bus.bus_number}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white capitalize">
//                     {bus.bus_type}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {bus.plate_number}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {bus.total_seats}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusBadge(bus.is_active ? "active" : "inactive")}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <ActionButton
//                         icon={Eye}
//                         onClick={() => openModal("view-bus", bus)}
//                       />
//                       <ActionButton
//                         icon={Edit}
//                         onClick={() => openModal("edit-bus", bus)}
//                       />
//                       <ActionButton
//                         icon={Trash2}
//                         onClick={() => openModal("delete-bus", bus)}
//                         variant="danger"
//                       />
//                     </div>
//                   </td>
//                 </TableRow>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderSchedules = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-white">
//           Schedule Management
//         </h2>
//         <button
//           onClick={() => openModal("add-schedule")}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add Schedule</span>
//         </button>
//       </div>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-700/50">
//               <tr>
//                 <TableHeader sortable>Route</TableHeader>
//                 <TableHeader sortable>Departure</TableHeader>
//                 <TableHeader>Class</TableHeader>
//                 <TableHeader sortable>Price</TableHeader>
//                 <TableHeader>Available Seats</TableHeader>
//                 <TableHeader>Status</TableHeader>
//                 <TableHeader>Actions</TableHeader>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {schedules.map((schedule) => (
//                 <TableRow key={schedule.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
//                     {schedule.route}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {schedule.departure_time}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white capitalize">
//                     {schedule.bus_class}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     Rp {schedule.price.toLocaleString("id-ID")}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {schedule.available_seats}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusBadge(schedule.status)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <ActionButton
//                         icon={Eye}
//                         onClick={() => openModal("view-schedule", schedule)}
//                       />
//                       <ActionButton
//                         icon={Edit}
//                         onClick={() => openModal("edit-schedule", schedule)}
//                       />
//                       <ActionButton
//                         icon={XCircle}
//                         onClick={() => openModal("cancel-schedule", schedule)}
//                         variant="danger"
//                       />
//                     </div>
//                   </td>
//                 </TableRow>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderBookings = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-white">Booking Management</h2>
//         <div className="flex space-x-2">
//           <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
//             <Filter className="h-4 w-4" />
//             <span>Filter</span>
//           </button>
//         </div>
//       </div>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-700/50">
//               <tr>
//                 <TableHeader sortable>Booking Code</TableHeader>
//                 <TableHeader sortable>Route</TableHeader>
//                 <TableHeader>Passengers</TableHeader>
//                 <TableHeader sortable>Total Amount</TableHeader>
//                 <TableHeader>Status</TableHeader>
//                 <TableHeader>Actions</TableHeader>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {bookings.map((booking) => (
//                 <TableRow key={booking.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
//                     {booking.booking_code}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {booking.route}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {booking.passenger_count}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     Rp {booking.total_amount.toLocaleString("id-ID")}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusBadge(booking.status)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex space-x-2">
//                       <ActionButton
//                         icon={Eye}
//                         onClick={() => openModal("view-booking", booking)}
//                       />
//                       {booking.status === "pending" && (
//                         <ActionButton
//                           icon={CheckCircle}
//                           onClick={() => openModal("confirm-booking", booking)}
//                           variant="success"
//                         />
//                       )}
//                     </div>
//                   </td>
//                 </TableRow>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return renderDashboard();
//       case "routes":
//         return renderRoutes();
//       case "buses":
//         return renderBuses();
//       case "schedules":
//         return renderSchedules();
//       case "bookings":
//         return renderBookings();
//       default:
//         return renderDashboard();
//     }
//   };

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: Settings },
//     { id: "routes", label: "Routes", icon: Route },
//     { id: "buses", label: "Buses", icon: Bus },
//     { id: "schedules", label: "Schedules", icon: Calendar },
//     { id: "bookings", label: "Bookings", icon: Users },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-900">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 border-r border-gray-700">
//         <div className="p-6 border-b border-gray-700">
//           <h1 className="text-xl font-bold text-white">Bus Admin</h1>
//         </div>

//         <nav className="mt-6">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveTab(item.id)}
//                 className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
//                   activeTab === item.id
//                     ? "bg-blue-600 text-white border-r-2 border-blue-400"
//                     : "text-gray-300 hover:text-white hover:bg-gray-700"
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
//           <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
//             <LogOut className="h-5 w-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="p-8">{renderContent()}</div>
//       </div>

//       {/* Modal */}
//       <Modal>
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold text-white capitalize">
//               {modalType.replace("-", " ")}
//             </h3>
//             <button
//               onClick={closeModal}
//               className="text-gray-400 hover:text-white"
//             >
//               <XCircle className="h-5 w-5" />
//             </button>
//           </div>

//           <div className="space-y-4">
//             <p className="text-gray-300">
//               Modal content for {modalType} would go here. This would include
//               forms for adding/editing items, confirmation dialogs for
//               deletions, and detailed views for items.
//             </p>

//             <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminDashboard;
