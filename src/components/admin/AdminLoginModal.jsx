
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AdminLoginModal = ({ show, onClose, onLogin }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(password);
    setPassword('');
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
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 17, stiffness: 250 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h3>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none mb-6"
          />
          <div className="flex space-x-3">
            <Button onClick={handleLogin} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
              Login
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300">
              Cancel
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
