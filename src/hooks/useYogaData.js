import React, { useState, useEffect } from 'react';
import { initialClassesData } from '@/data/initialData';
import { toast } from '@/components/ui/use-toast';

export const useYogaData = () => {
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const savedClasses = localStorage.getItem('yogaClasses');
    const savedBookings = localStorage.getItem('yogaBookings');
    const savedAttendance = localStorage.getItem('yogaAttendance');
    
    setClasses(savedClasses ? JSON.parse(savedClasses) : initialClassesData);
    setBookings(savedBookings ? JSON.parse(savedBookings) : []);
    setAttendance(savedAttendance ? JSON.parse(savedAttendance) : []);
  }, []);

  useEffect(() => {
    if (classes.length > 0) {
      localStorage.setItem('yogaClasses', JSON.stringify(classes));
    }
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('yogaBookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('yogaAttendance', JSON.stringify(attendance));
  }, [attendance]);

  const handleBookClass = (classId, userName, userEmail) => {
    if (!userName || !userEmail) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email to book a class.",
        variant: "destructive"
      });
      return;
    }
    const classToBook = classes.find(c => c.id === classId);
    if (classToBook.booked >= classToBook.capacity) {
      toast({
        title: "Class Full",
        description: "This class is already at full capacity.",
        variant: "destructive"
      });
      return;
    }
    const existingBooking = bookings.find(b => b.classId === classId && b.email === userEmail);
    if (existingBooking) {
      toast({
        title: "Already Booked",
        description: "You've already booked this class.",
        variant: "destructive"
      });
      return;
    }

    const newBookingId = Date.now();
    const newBooking = {
      id: newBookingId,
      classId,
      name: userName,
      email: userEmail,
      bookingDate: new Date().toISOString()
    };

    const newAttendanceRecord = {
      id: Date.now() + 1,
      bookingId: newBookingId,
      attended: true,
      date: new Date().toISOString()
    };

    setBookings(prevBookings => [...prevBookings, newBooking]);
    setAttendance(prevAttendance => [...prevAttendance, newAttendanceRecord]);
    setClasses(classes.map(c => c.id === classId ? { ...c, booked: c.booked + 1 } : c));
    
    toast({
      title: "Class Booked!",
      description: `You've successfully booked ${classToBook.name}.`
    });
  };

  const handleMarkAttendance = (bookingId, attended) => {
    const existingAttendance = attendance.find(a => a.bookingId === bookingId);
    if (existingAttendance) {
      setAttendance(attendance.map(a => a.bookingId === bookingId ? { ...a, attended } : a));
    } else {
      setAttendance([...attendance, { id: Date.now(), bookingId, attended, date: new Date().toISOString() }]);
    }
    toast({
      title: "Attendance Updated",
      description: `Marked as ${attended ? 'present' : 'absent'}.`
    });
  };

  const addClass = (newClass) => {
    const classWithId = { ...newClass, id: Date.now(), booked: 0 };
    setClasses([...classes, classWithId]);
    toast({
      title: "Class Added",
      description: "New yoga class has been created successfully."
    });
  };

  const deleteClass = (classId) => {
    const bookingsToDelete = bookings.filter(b => b.classId === classId);
    const bookingIdsToDelete = bookingsToDelete.map(b => b.id);

    setClasses(classes.filter(c => c.id !== classId));
    setBookings(bookings.filter(b => b.classId !== classId));
    setAttendance(attendance.filter(a => !bookingIdsToDelete.includes(a.bookingId)));

    toast({
      title: "Class Deleted",
      description: "The yoga class and all its bookings have been removed."
    });
  };

  return { classes, bookings, attendance, handleBookClass, handleMarkAttendance, addClass, deleteClass };
};