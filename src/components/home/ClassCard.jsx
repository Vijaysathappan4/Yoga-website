
import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 100 }
  },
};

const ClassCard = ({ yogaClass, onBook }) => {
  const isFull = yogaClass.booked >= yogaClass.capacity;

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-emerald-100 hover:shadow-2xl transition-shadow duration-300 shine-effect flex flex-col"
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{yogaClass.name}</h3>
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">🧘‍♀️</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 flex-grow">{yogaClass.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <User className="w-4 h-4 mr-2 text-emerald-500" />
          <span className="text-sm">{yogaClass.instructor}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock className="w-4 h-4 mr-2 text-emerald-500" />
          <span className="text-sm">{yogaClass.time} • {yogaClass.duration}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Users className="w-4 h-4 mr-2 text-emerald-500" />
          <span className="text-sm">{yogaClass.booked}/{yogaClass.capacity} spots filled</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="w-full bg-emerald-100 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(yogaClass.booked / yogaClass.capacity) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          ></motion.div>
        </div>

        <Button
          onClick={() => onBook(yogaClass.id)}
          disabled={isFull}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          {isFull ? 'Class Full' : 'Book Now'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ClassCard;
