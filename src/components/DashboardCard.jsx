import React from "react";
import { motion } from "framer-motion";
export default function DashboardCard({
  icon: Icon,
  title,
  value,
  caption,
  color = "blue"
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600"
  };
  return <motion.div whileHover={{
    y: -4
  }} className="bg-white rounded-xl p-6 card-shadow-hover">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
          <p className="text-xs text-gray-400">{caption}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>;
}