import React, { useState } from "react";
import { motion } from "framer-motion";
import { FilterIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";
const initialRequests = [{
  id: 1,
  client: "John Doe",
  type: "Booking",
  status: "Pending",
  date: "2024-01-15"
}, {
  id: 2,
  client: "Jane Smith",
  type: "Cancellation",
  status: "Completed",
  date: "2024-01-14"
}, {
  id: 3,
  client: "Mike Johnson",
  type: "Modification",
  status: "Pending",
  date: "2024-01-13"
}, {
  id: 4,
  client: "Sarah Williams",
  type: "Booking",
  status: "Completed",
  date: "2024-01-12"
}, {
  id: 5,
  client: "Tom Brown",
  type: "Inquiry",
  status: "Cancelled",
  date: "2024-01-11"
}];
export default function ClientRequests() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [requests] = useState(initialRequests);
  const filters = ["All", "Pending", "Completed", "Cancelled"];
  const filteredRequests = activeFilter === "All" ? requests : requests.filter(req => req.status === activeFilter);
  const getStatusIcon = status => {
    switch (status) {
      case "Pending":
        return <ClockIcon size={16} />;
      case "Completed":
        return <CheckCircleIcon size={16} />;
      case "Cancelled":
        return <XCircleIcon size={16} />;
      default:
        return null;
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Client Requests</h1>
        <p className="text-gray-500 mt-1">Manage and track client requests</p>
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <FilterIcon size={20} className="text-gray-500" />
        <div className="flex gap-2">
          {filters.map(filter => <motion.button key={filter} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-lg font-medium transition ${activeFilter === filter ? "bg-blue-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
              {filter}
            </motion.button>)}
        </div>
      </div>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Request Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request, index) => <motion.tr key={request.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{request.client}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.type}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium">
                      View Details
                    </button>
                  </td>
                </motion.tr>)}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>;
}