import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const UserInfoForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', class: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('bookings')
      .insert([{ 
        name: formData.name, 
        email: formData.email, 
        class_name: formData.class 
      }]);

    setLoading(false);

    if (error) {
      alert('Booking failed ❌');
      console.error(error);
    } else {
      alert('✅ Booking successful!');
      setFormData({ name: '', email: '', class: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required className="w-full p-2 border" />

      <input type="email" placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required className="w-full p-2 border" />

      <input type="text" placeholder="Class Name"
        value={formData.class}
        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        required className="w-full p-2 border" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </form>
  );
};

export default UserInfoForm;
