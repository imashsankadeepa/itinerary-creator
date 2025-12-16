// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HotelIcon, MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon, 
  TagIcon, BellIcon, SearchIcon, UserCircleIcon, PlusIcon, TrendingUpIcon 
} from "lucide-react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import snow_icon from "../assets/snow_icon.webp";

// DashboardCard
const DashboardCard = ({ icon: Icon, title, value, caption, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
    <div className={`p-3 rounded-full bg-${color}-100 text-${color}-500`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-gray-400">{caption}</p>
    </div>
  </div>
);

// ActivityItem
const ActivityItem = ({ icon: Icon, title, time, color }) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 rounded-full bg-${color}-100 text-${color}-500`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-gray-700">{title}</p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  </div>
);

// Snowfall overlay
const SnowfallOverlay = ({ count = 100 }) => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const flakeArray = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: 8 + Math.random() * 20,
      duration: 8 + Math.random() * 30,
      delay: Math.random() * 30,
      opacity: 0.5 + Math.random() * 0.5,
    }));
    setFlakes(flakeArray);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {flakes.map(flake => (
        <img
          key={flake.id}
          src={snow_icon}
          alt="snow"
          style={{
            position: "absolute",
            top: "-50px",
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.duration}s linear ${flake.delay}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Sample Data
const barData = [
  { month: "Jan", hotels: 12 },
  { month: "Feb", hotels: 19 },
  { month: "Mar", hotels: 15 },
  { month: "Apr", hotels: 25 },
  { month: "May", hotels: 22 },
  { month: "Jun", hotels: 30 }
];

const lineData = [
  { month: "Jan", satisfaction: 85 },
  { month: "Feb", satisfaction: 88 },
  { month: "Mar", satisfaction: 82 },
  { month: "Apr", satisfaction: 90 },
  { month: "May", satisfaction: 92 },
  { month: "Jun", satisfaction: 95 }
];

const pieData = [
  { name: "Pending", value: 35, color: "#F59E0B" },
  { name: "Completed", value: 50, color: "#10B981" },
  { name: "Cancelled", value: 15, color: "#EF4444" }
];

// Dashboard Component
export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Snow overlay for entire page */}
      <SnowfallOverlay count={150} />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <BellIcon size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                <UserCircleIcon size={32} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard icon={HotelIcon} title="Total Hotels" value="124" caption="Updated today" color="blue" />
            <DashboardCard icon={MapPinIcon} title="Total Locations" value="48" caption="Across 12 cities" color="purple" />
            <DashboardCard icon={ClockIcon} title="Pending Requests" value="35" caption="Needs attention" color="orange" />
            <DashboardCard icon={CheckCircleIcon} title="Completed Requests" value="256" caption="This month" color="green" />
            <DashboardCard icon={XCircleIcon} title="Cancelled Requests" value="18" caption="Last 30 days" color="red" />
            <DashboardCard icon={TagIcon} title="Discount Packages" value="42" caption="Active offers" color="purple" />
          </div>

          {/* Activities + Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md lg:col-span-1"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-2">
                <ActivityItem icon={PlusIcon} title="New hotel added" time="2 minutes ago" color="green" />
                <ActivityItem icon={CheckCircleIcon} title="Client request approved" time="15 minutes ago" color="blue" />
                <ActivityItem icon={MapPinIcon} title="Location updated" time="1 hour ago" color="orange" />
                <ActivityItem icon={HotelIcon} title="Hotel rating changed" time="2 hours ago" color="blue" />
                <ActivityItem icon={TrendingUpIcon} title="New discount package" time="3 hours ago" color="green" />
              </div>
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
              <motion.div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Hotels Added Per Month</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Bar dataKey="hotels" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Client Satisfaction (%)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>

          {/* Pie Chart */}
          <motion.div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Request Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Hima / Christmas */}
          <motion.div className="bg-red-50 rounded-xl p-6 shadow-md mt-8 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2">🎄 Hima Special!</h3>
              <p className="text-gray-700">Merry Christmas! Enjoy the festive season with special offers and updates.</p>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Christmas Tree" className="w-24 h-24" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
