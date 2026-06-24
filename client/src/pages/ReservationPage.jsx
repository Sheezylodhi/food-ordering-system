import React from 'react';
import Footer from '../components/Footer';

const ReservationPage = () => {
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
          <div className="mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-600 font-bold">Reserve Your Experience</span>
            <h1 className="text-4xl font-serif text-gray-900 mt-2">Book a Table</h1>
          </div>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InputField label="Date" type="date" />
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest text-gray-400">Guests</label>
                <select className="bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-600 transition-colors w-full cursor-pointer">
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                </select>
              </div>
            </div>

            <InputField label="Full Name" type="text" placeholder="John Doe" />
            <InputField label="Email Address" type="email" placeholder="john@example.com" />
            
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest text-gray-400">Special Request</label>
              <textarea placeholder="Any dietary preferences?" rows="2" className="bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-600 transition-colors w-full" />
            </div>
            
            <button className="w-full bg-black text-white py-5 mt-4 hover:bg-amber-600 transition-all duration-300 uppercase tracking-[0.2em] text-[11px] font-bold">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
      
    </div>
   
  );
  
};

const InputField = ({ label, type, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] uppercase tracking-widest text-gray-400">{label}</label>
    <input type={type} placeholder={placeholder} className="bg-transparent border-b border-gray-300 py-3 outline-none focus:border-amber-600 transition-colors w-full" />
  </div>
);

export default ReservationPage;