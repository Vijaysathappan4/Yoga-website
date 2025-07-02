import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

function UserInfoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class_name: '',
    booking_date: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.from('booking').insert([formData])
    if (error) {
      alert('❌ Error booking class')
      console.error(error)
    } else {
      alert('✅ Class booked successfully!')
      console.log(data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="class_name" placeholder="Class Name" onChange={handleChange} required />
      <input name="booking_date" type="date" onChange={handleChange} required />
      <button type="submit">Book Class</button>
    </form>
  )
}

export default UserInfoForm
