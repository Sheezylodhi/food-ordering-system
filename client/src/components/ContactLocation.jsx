import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactLocation = () => {
  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Info Column */}
        <div className="space-y-12">
          <h2 className="text-5xl font-serif text-gray-900">Visit Us</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-700">
                <MapPin size={20} /> <span className="text-[11px] uppercase tracking-widest font-bold">Location</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">123 Culinary Avenue, <br/> Gourmet District, Karachi</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-700">
                <Clock size={20} /> <span className="text-[11px] uppercase tracking-widest font-bold">Hours</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Daily: 12:00 PM – 11:00 PM <br/> Fri-Sun: Until 1:00 AM</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-700">
                <Phone size={20} /> <span className="text-[11px] uppercase tracking-widest font-bold">Call</span>
              </div>
              <p className="text-gray-600 text-sm">+92 21 1234 5678</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-700">
                <Mail size={20} /> <span className="text-[11px] uppercase tracking-widest font-bold">Email</span>
              </div>
              <p className="text-gray-600 text-sm">hello@theamberoak.com</p>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif italic">
            [ Interactive Map Area ]
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactLocation;