import React from "react";
import { motion } from "framer-motion";
export default function ActivityItem({
  icon: Icon,
  title,
  time,
  color = "blue"
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600"
  };
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
      <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </motion.div>;
}