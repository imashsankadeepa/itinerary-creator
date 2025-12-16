import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon, EditIcon, TrashIcon, StarIcon } from "lucide-react";
import Modal from "../components/Modal";
const initialHotels = [{
  id: 1,
  name: "Grand Plaza Hotel",
  city: "New York",
  status: "Active",
  rating: 4.8,
  rooms: 250
}, {
  id: 2,
  name: "Ocean View Resort",
  city: "Miami",
  status: "Active",
  rating: 4.5,
  rooms: 180
}, {
  id: 3,
  name: "Mountain Lodge",
  city: "Denver",
  status: "Inactive",
  rating: 4.2,
  rooms: 120
}, {
  id: 4,
  name: "City Center Inn",
  city: "Chicago",
  status: "Active",
  rating: 4.6,
  rooms: 200
}];
export default function HotelManagement() {
  const [hotels, setHotels] = useState(initialHotels);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    status: "Active",
    rating: "",
    rooms: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    const newHotel = {
      id: hotels.length + 1,
      ...formData,
      rating: parseFloat(formData.rating),
      rooms: parseInt(formData.rooms)
    };
    setHotels([...hotels, newHotel]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      city: "",
      status: "Active",
      rating: "",
      rooms: ""
    });
  };
  const handleDelete = id => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };
  return <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hotel Management</h1>
          <p className="text-gray-500 mt-1">Manage your hotel properties</p>
        </div>
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition shadow-lg">
          <PlusIcon size={20} />
          Add New Hotel
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hotel Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">City</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rooms</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hotels.map((hotel, index) => <motion.tr key={hotel.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{hotel.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{hotel.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hotel.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <StarIcon size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-800">{hotel.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{hotel.rooms}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <EditIcon size={18} />
                      </button>
                      <button onClick={() => handleDelete(hotel.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>)}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Hotel">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({
            ...formData,
            status: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => setFormData({
            ...formData,
            rating: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
            <input type="number" value={formData.rooms} onChange={e => setFormData({
            ...formData,
            rooms: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Add Hotel
            </button>
          </div>
        </form>
      </Modal>
    </div>;
}