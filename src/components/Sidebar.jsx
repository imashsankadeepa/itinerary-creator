import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboardIcon, HotelIcon, ClipboardListIcon, MapPinIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon } from "lucide-react";
export default function Sidebar({
  isOpen,
  setIsOpen
}) {
  const menuItems = [{
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    path: "/"
  }, {
    icon: HotelIcon,
    label: "Hotels",
    path: "/hotels"
  }, {
    icon: ClipboardListIcon,
    label: "Requests",
    path: "/requests"
  }, {
    icon: MapPinIcon,
    label: "Locations",
    path: "/locations"
  },
{
    icon: MapPinIcon,
    label: "Locations",
    path: "/locations"
  }];
  return <>
      <motion.div initial={false} animate={{
      width: isOpen ? 256 : 80
    }} className="fixed left-0 top-0 h-screen bg-slate-900 text-white shadow-xl z-50">
        <div className="flex items-center justify-between p-6">
          {isOpen && <motion.h2 initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="text-xl font-bold">
              I Neary creater Admin
            </motion.h2>}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition">
            {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map(item => <NavLink key={item.path} to={item.path} className={({
          isActive
        }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-slate-800"}`}>
              <item.icon size={20} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </NavLink>)}
        </nav>
        <div className="absolute bottom-8 left-0 right-0 px-4 space-y-2">
          <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition w-full">
            <SettingsIcon size={20} />
            {isOpen && <span className="font-medium">Settings</span>}
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500 transition w-full">
            <LogOutIcon size={20} />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.div>
    </>;
}