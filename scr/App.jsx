
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { useYogaData } from '@/hooks/useYogaData';

import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import UserInfoForm from '@/components/home/UserInfoForm';
import ClassList from '@/components/home/ClassList';
import AdminPanel from '@/components/admin/AdminPanel';
import AdminLoginModal from '@/components/admin/AdminLoginModal';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const {
    classes,
    bookings,
    attendance,
    handleBookClass,
    handleMarkAttendance,
    addClass,
    deleteClass
  } = useYogaData();

  const handleAdminLogin = (password) => {
    if (password === 'yoga123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setCurrentView('admin');
      toast({
        title: "Welcome Admin!",
        description: "You're now logged in as administrator."
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentView('home');
    toast({
      title: "Logged Out",
      description: "You've been logged out successfully."
    });
  };

  const handleBookClassWrapper = (classId) => {
    handleBookClass(classId, userName, userEmail);
  };

  return (
    <>
      <Helmet>
        <title>MK kottai yogalaya - Book Your Perfect Class</title>
        <meta name="description" content="Join our peaceful yoga community. Book classes, track attendance, and find your inner balance at MK kottai yogalaya." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Toaster />
        
        <Header
          currentView={currentView}
          setCurrentView={setCurrentView}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          onAdminClick={() => setShowAdminLogin(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150, duration: 0.5 }}
              >
                <Hero />
                <UserInfoForm
                  userName={userName}
                  setUserName={setUserName}
                  userEmail={userEmail}
                  setUserEmail={setUserEmail}
                />
                <ClassList classes={classes} onBook={handleBookClassWrapper} />
              </motion.div>
            )}

            {currentView === 'admin' && isAdmin && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150, duration: 0.5 }}
              >
                <AdminPanel
                  classes={classes}
                  bookings={bookings}
                  attendance={attendance}
                  onAddClass={addClass}
                  onDeleteClass={deleteClass}
                  onMarkAttendance={handleMarkAttendance}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <AdminLoginModal
          show={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onLogin={handleAdminLogin}
        />
      </div>
    </>
  );
}

export default App;
    
