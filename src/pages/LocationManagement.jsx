import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, EditIcon, TrashIcon, MapPinIcon } from "lucide-react";
import Modal from "../components/Modal";
const initialLocations = [{
  id: 1,
  name: "Downtown District",
  city: "New York",
  hotelsCount: 45,
  status: "Active"
}, {
  id: 2,
  name: "Beach Front",
  city: "Miami",
  hotelsCount: 32,
  status: "Active"
}, {
  id: 3,
  name: "Mountain Area",
  city: "Denver",
  hotelsCount: 18,
  status: "Inactive"
}, {
  id: 4,
  name: "City Center",
  city: "Chicago",
  hotelsCount: 28,
  status: "Active"
}];
export default function LocationManagement() {
  const [locations, setLocations] = useState(initialLocations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    hotelsCount: "",
    status: "Active"
  });
  const handleSubmit = e => {
    e.preventDefault();
    const newLocation = {
      id: locations.length + 1,
      ...formData,
      hotelsCount: parseInt(formData.hotelsCount)
    };
    setLocations([...locations, newLocation]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      city: "",
      hotelsCount: "",
      status: "Active"
    });
  };
  const handleDelete = id => {
    setLocations(locations.filter(location => location.id !== id));
  };
  return <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Location Management</h1>
          <p className="text-gray-500 mt-1">Manage hotel locations and areas</p>
        </div>
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition shadow-lg">
          <PlusIcon size={20} />
          Add New Location
        </motion.button>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hotels Count</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.map((location, index) => <motion.tr key={location.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPinIcon size={18} className="text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{location.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{location.hotelsCount} hotels</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${location.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {location.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <EditIcon size={18} />
                      </button>
                      <button onClick={() => handleDelete(location.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>)}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Location">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input type="text" value={formData.city} onChange={e => setFormData({
            ...formData,
            city: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hotels Count</label>
            <input type="number" value={formData.hotelsCount} onChange={e => setFormData({
            ...formData,
            hotelsCount: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({
            ...formData,
            status: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Add Location
            </button>
          </div>
        </form>
      </Modal>
    </div>;
}