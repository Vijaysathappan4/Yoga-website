
import React from 'react';
import ClassCard from '@/components/home/ClassCard';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const ClassList = ({ classes, onBook }) => {
  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {classes.map((yogaClass) => (
        <ClassCard key={yogaClass.id} yogaClass={yogaClass} onBook={onBook} />
      ))}
    </motion.div>
  );
};

export default ClassList;
