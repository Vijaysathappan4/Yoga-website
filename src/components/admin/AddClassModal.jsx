
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AddClassModal = ({ show, onClose, onAddClass }) => {
  const [newClass, setNewClass] = useState({
    name: '', instructor: '', time: '', duration: '', capacity: '', date: '', description: ''
  });

  const handleAddClass = () => {
    if (!newClass.name || !newClass.instructor || !newClass.time || !newClass.capacity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    onAddClass({ ...newClass, capacity: parseInt(newClass.capacity) });
    setNewClass({ name: '', instructor: '', time: '', duration: '', capacity: '', date: '', description: '' });
    onClose();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 17, stiffness: 250 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Class</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Class Name *" value={newClass.name} onChange={e => setNewClass({ ...newClass, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
            <input type="text" placeholder="Instructor *" value={newClass.instructor} onChange={e => setNewClass({ ...newClass, instructor: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
            <input type="time" placeholder="Time *" value={newClass.time} onChange={e => setNewClass({ ...newClass, time: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
            <input type="text" placeholder="Duration (e.g., 60 min)" value={newClass.duration} onChange={e => setNewClass({ ...newClass, duration: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
            <input type="number" placeholder="Capacity *" value={newClass.capacity} onChange={e => setNewClass({ ...newClass, capacity: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
            <input type="date" value={newClass.date} onChange={e => setNewClass({ ...newClass, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none" />
            <textarea placeholder="Description" value={newClass.description} onChange={e => setNewClass({ ...newClass, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none resize-none" />
          </div>
          <div className="flex space-x-3 mt-6">
            <Button onClick={handleAddClass} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">Add Class</Button>
            <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300">Cancel</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddClassModal;
