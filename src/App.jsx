import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/layout/Header'
import Hero from '@/components/home/Hero'
import ClassList from '@/components/home/ClassList'
import UserInfoForm from '@/components/home/UserInfoForm'
import AdminPanel from './components/admin/AdminPanel'

function App() {
  const [currentView, setCurrentView] = useState('home')

  return (
    <>
      <Helmet>
        <title>Yoga Website</title>
      </Helmet>

      <Toaster />

      <Header currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === 'home' && (
        <>
          <Hero />
          <ClassList />
          <UserInfoForm />
        </>
      )}

      {currentView === 'admin' && <AdminPanel />}
    </>
  )
}

export default App
