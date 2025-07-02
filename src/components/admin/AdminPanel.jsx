import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

function AdminPanel() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase.from('booking').select('*')
      if (error) {
        console.error('Error fetching bookings:', error)
      } else {
        setBookings(data)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Booking Table</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.class_name}</td>
                <td>{b.booking_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminPanel
