import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Check, X, CalendarX2 } from 'lucide-react';
import AddClassModal from '@/components/admin/AddClassModal';

const isClassOver = (yogaClass) => {
  if (!yogaClass || !yogaClass.date || !yogaClass.time || !yogaClass.duration) {
    return true; 
  }

  const now = new Date();
  const classStartDateTime = new Date(`${yogaClass.date} ${yogaClass.time}`);

  if (isNaN(classStartDateTime.getTime())) {
    return true;
  }

  const durationInMinutes = parseInt(yogaClass.duration, 10);
  if (isNaN(durationInMinutes)) {
    return true;
  }

  const classEndDateTime = new Date(classStartDateTime.getTime() + durationInMinutes * 60 * 1000);

  return now > classEndDateTime;
};


const AdminPanel = ({ classes, bookings, attendance, onAddClass, onDeleteClass, onMarkAttendance }) => {
  const [activeTab, setActiveTab] = useState('classes');
  const [showAddClass, setShowAddClass] = useState(false);

  const getAttendanceForBooking = (bookingId) => {
    return attendance.find(a => a.bookingId === bookingId);
  };
  
  const activeBookings = bookings.filter(booking => {
    const yogaClass = classes.find(c => c.id === booking.classId);
    return !isClassOver(yogaClass);
  });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Manage classes and track attendance</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-lg">
          <Button variant={activeTab === 'classes' ? 'default' : 'ghost'} onClick={() => setActiveTab('classes')} className={activeTab === 'classes' ? 'bg-emerald-500 text-white' : 'text-gray-600'}>Manage Classes</Button>
          <Button variant={activeTab === 'attendance' ? 'default' : 'ghost'} onClick={() => setActiveTab('attendance')} className={activeTab === 'attendance' ? 'bg-emerald-500 text-white' : 'text-gray-600'}>Attendance</Button>
        </div>
      </div>

      {activeTab === 'classes' && (
        <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Class Management</h3>
            <Button onClick={() => setShowAddClass(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Class
            </Button>
          </div>
          <div className="grid gap-4">
            {classes.map(yogaClass => (
              <motion.div key={yogaClass.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-100" variants={itemVariants} whileHover={{ scale: 1.02, x: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{yogaClass.name}</h4>
                    <p className="text-gray-600 mb-2">{yogaClass.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                      <div><span className="font-medium">Instructor:</span> {yogaClass.instructor}</div>
                      <div><span className="font-medium">Time:</span> {yogaClass.time}</div>
                      <div><span className="font-medium">Duration:</span> {yogaClass.duration}</div>
                      <div><span className="font-medium">Capacity:</span> {yogaClass.booked}/{yogaClass.capacity}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onDeleteClass(yogaClass.id)} className="text-red-600 border-red-300 hover:bg-red-50 ml-4">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'attendance' && (
        <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
          <h3 className="text-xl font-semibold text-gray-800">Attendance Management</h3>
          <div className="grid gap-4">
            {activeBookings.length > 0 ? (
              activeBookings.map(booking => {
                const yogaClass = classes.find(c => c.id === booking.classId);
                const attendanceRecord = getAttendanceForBooking(booking.id);
                return (
                  <motion.div key={booking.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-100" variants={itemVariants} whileHover={{ scale: 1.02, x: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }} transition={{ type: 'spring', stiffness: 300 }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{yogaClass?.name}</h4>
                        <p className="text-gray-600">{booking.name} ({booking.email})</p>
                        <p className="text-sm text-gray-500">Booked: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => onMarkAttendance(booking.id, true)} className={`${attendanceRecord?.attended === true ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}><Check className="w-4 h-4 mr-1" /> Present</Button>
                        <Button size="sm" onClick={() => onMarkAttendance(booking.id, false)} className={`${attendanceRecord?.attended === false ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-100'}`}><X className="w-4 h-4 mr-1" /> Absent</Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
               <motion.div variants={itemVariants} className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4">
                 <CalendarX2 className="w-12 h-12 text-emerald-400" />
                 <p className="text-gray-600 font-medium text-lg">No Active Classes</p>
                 <p className="text-gray-500 max-w-sm">There are no attendance records to show for active or upcoming classes right now. Bookings for past classes are hidden.</p>
               </motion.div>
            )}
          </div>
        </motion.div>
      )}

      <AddClassModal show={showAddClass} onClose={() => setShowAddClass(false)} onAddClass={onAddClass} />
    </div>
  );
};

export default AdminPanel;