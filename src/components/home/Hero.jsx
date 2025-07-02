
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="text-center mb-12">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Find Your <motion.span
          className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Inner Peace
        </motion.span>
      </motion.h2>
      <motion.p
        className="text-xl text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Join our mindful community and discover the transformative power of yoga
      </motion.p>
    </div>
  );
};

export default Hero;
