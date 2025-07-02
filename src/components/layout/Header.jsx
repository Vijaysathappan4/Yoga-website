import React from 'react';
import { motion } from 'framer-motion';
import { Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Header = ({
  currentView,
  setCurrentView,
  isAdmin,
  onLogout,
  onAdminClick
}) => {
  return <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-emerald-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex items-center space-x-3" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }}>
            <motion.div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center cursor-pointer" whileHover={{
            scale: 1.2,
            rotate: 15
          }} transition={{
            type: 'spring',
            stiffness: 300
          }}>
              <span className="text-white font-bold text-lg">🧘</span>
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Mkkottai yogalaya</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant={currentView === 'home' ? 'default' : 'ghost'} onClick={() => setCurrentView('home')} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Classes
              </Button>
            </motion.div>

            {isAdmin ? <>
                <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <Button variant={currentView === 'admin' ? 'default' : 'ghost'} onClick={() => setCurrentView('admin')} className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </motion.div>
                <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <Button variant="outline" onClick={onLogout} className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              </> : <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                <Button variant="outline" onClick={onAdminClick} className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </motion.div>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Header;