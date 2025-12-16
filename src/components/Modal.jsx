import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
export default function Modal({
  isOpen,
  onClose,
  title,
  children
}) {
  return <AnimatePresence>
      {isOpen && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <motion.div initial={{
        opacity: 0,
        scale: 0.95,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.95,
        y: 20
      }} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <XIcon size={20} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </>}
    </AnimatePresence>;
}