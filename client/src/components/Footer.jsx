import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaTripadvisor } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#FAFAFA] py-24 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        
        {/* Column 1: Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">The Amber Oak</h2>
          <p className="text-[11px] leading-relaxed text-gray-500 mb-8">
            Experience the art of fine dining where tradition meets modern culinary innovation.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 border border-gray-200 hover:bg-amber-600 hover:text-white transition-all"><FaInstagram /></a>
            <a href="#" className="p-2 border border-gray-200 hover:bg-amber-600 hover:text-white transition-all"><FaFacebookF /></a>
            <a href="#" className="p-2 border border-gray-200 hover:bg-amber-600 hover:text-white transition-all"><FaTripadvisor /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-8">Navigation</h4>
          <ul className="space-y-4 text-[12px] text-gray-500 uppercase tracking-widest">
            <li><a href="/" className="hover:text-amber-600">Home</a></li>
            <li><a href="/menu" className="hover:text-amber-600">Our Menu</a></li>
            <li><a href="/about" className="hover:text-amber-600">Our Story</a></li>
            <li><a href="/reserve" className="hover:text-amber-600">Reservation</a></li>
          </ul>
        </div>

        {/* Column 3: Legal & Support */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-8">Support</h4>
          <ul className="space-y-4 text-[12px] text-gray-500 uppercase tracking-widest">
            <li><a href="/privacy" className="hover:text-amber-600">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-amber-600">Terms of Service</a></li>
            <li><a href="/contact" className="hover:text-amber-600">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-amber-600">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4: Location */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 mb-8">Visit Us</h4>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            123 Culinary Avenue,<br />
            Gourmet District,<br />
            Karachi, Pakistan
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
          © 2026 The Amber Oak. Designed with passion for culinary excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;