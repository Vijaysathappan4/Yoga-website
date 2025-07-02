
import React from 'react';
import { motion } from 'framer-motion';

const UserInfoForm = ({ userName, setUserName, userEmail, setUserEmail }) => {
  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-emerald-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Book Your Class</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all w-full"
          />
        </motion.div>
        <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
          <input
            type="email"
            placeholder="Your Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserInfoForm;
