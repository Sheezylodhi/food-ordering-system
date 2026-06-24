
import React, { useState } from 'react'; // 1. Yahan useState add kiya
import axios from 'axios';
import Footer from '../components/Footer';
const ReservationPage = () => {
    const [formData, setFormData] = useState({ date: '', guests: '2 People', name: '', email: '', specialRequest: '' });
  const [loading, setLoading] = useState(false); // Loading state add ki

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Process shuru
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    
    try {
      await axios.post(`${apiBaseUrl}/api/reservations`, formData);
      alert("Reservation request sent!");
      setFormData({ date: '', guests: '2 People', name: '', email: '', specialRequest: '' }); // Form clear
    } catch (err) { 
      alert("Failed to reserve table"); 
    } finally {
      setLoading(false); // Process khatam
    }
  };

  return (
    // Parent container ko screen height di hai
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA]">
      
      {/* Left Side: Visual Story */}
      <div className="hidden md:block w-1/2 relative bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1550966871-3ed39b5ed0b8?auto=format&fit=crop&w=1200&q=80" 
          alt="Fine Dining Atmosphere" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-16 left-16 text-white max-w-md">
          <h2 className="text-4xl font-serif mb-4 italic">"An Unforgettable Affair"</h2>
          <p className="text-gray-300 leading-relaxed font-light">
            Crafting memories from 1998. Join us for a culinary journey that transcends the ordinary.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-20 px-6 md:px-20 bg-white">
        <div className="w-full max-w-lg">
          {/* Form mein onSubmit attach kiya */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InputField 
                label="Date" type="date" 
                value={formData.date} 
                onChange={(e) => setFormData({...formData, date: e.target.value})} 
              />
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest text-gray-400">Guests</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-600 transition-colors w-full cursor-pointer"
                >
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                </select>
              </div>
            </div>

            <InputField label="Full Name" type="text" placeholder="John Doe" 
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            
            <InputField label="Email Address" type="email" placeholder="john@example.com" 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest text-gray-400">Special Request</label>
              <textarea 
                value={formData.specialRequest} 
                onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
                placeholder="Any dietary preferences?" rows="2" 
                className="bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-600 transition-colors w-full" 
              />
            </div>
            
            {/* Button type submit zaroori hai */}
           <button 
      type="submit" 
      disabled={loading} // Loading ke waqt button disable
      className="w-full bg-black text-white py-5 mt-4 hover:bg-amber-600 transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold disabled:opacity-50"
    >
      {loading ? "Sending..." : "Confirm Reservation"}
    </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// InputField ko props pass karne ke liye update kiya
const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] uppercase tracking-widest text-gray-400">{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-600 transition-colors w-full" />
  </div>
);

export default ReservationPage;