import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, UserCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Navbar.jsx mein:
const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const { cart, setIsOpen: setIsCartOpen } = useContext(CartContext); 

 useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  
  // Login aur Logout dono ke liye update logic
  const handleAuthChange = () => {
    setIsLoggedIn(!!localStorage.getItem('adminToken')); // Key match honi chahiye!
  };

  window.addEventListener('login-success', handleAuthChange);
  window.addEventListener('logout-success', handleAuthChange); // Ye event logout pe call karenge

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('login-success', handleAuthChange);
    window.removeEventListener('logout-success', handleAuthChange);
  };
}, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Our Story', path: '/about-us' },
    { name: 'Reservations', path: '/reserve' },
    { name: 'Location', path: '/#ContactLocation' }
  ];

  const handleNavClick = (link) => {
    setIsOpen(false); // Mobile menu band kar do
    if (link.path === '/' && location.pathname === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.name === 'Gallery' && location.pathname === '/') {
       document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    } else if (link.path === '/contact') {
       if (location.pathname === '/') {
           document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
       } else {
           navigate('/#location'); 
       }
    } else {
        navigate(link.path);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b border-white/10 ${isScrolled ? 'bg-black py-4' : 'bg-black py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          <div className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase cursor-pointer hover:text-amber-500 transition-colors" onClick={() => navigate('/')}>
            The Amber Oak
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-[11px] font-medium uppercase tracking-[0.25em]">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => handleNavClick(link)} className="cursor-pointer group relative py-2 hover:text-amber-500 transition-colors">
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-amber-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
           {isLoggedIn ? (
    <button onClick={() => navigate('/profile')} className="hover:text-amber-500 transition-colors">
        <UserCircle size={24} />
    </button>
) : (
    <button onClick={() => navigate('/login')} className="hidden md:block text-[10px] uppercase tracking-[0.2em] hover:text-amber-500 transition-colors">
        Login
    </button>
)}
            
            <button onClick={() => setIsCartOpen(true)} className="relative cursor-pointer hover:text-amber-500 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-[9px] w-4 h-4 rounded-full flex items-center justify-center text-black font-bold">
                {cart?.length || 0}
              </span>
            </button>

            <button className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - YEH BHI ZAROORI HAI */}
    <div className={`md:hidden fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 text-white ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
  
  {/* Close Button Inside Menu */}
  <button className="absolute top-8 right-6" onClick={() => setIsOpen(false)}>
    <X size={32} />
  </button>

  {navLinks.map((link) => (
    <button 
      key={link.name} 
      onClick={() => handleNavClick(link)} 
      className="text-2xl font-light uppercase tracking-widest cursor-pointer hover:text-amber-500 transition-colors"
    >
      {link.name}
    </button>
  ))}
  
  {!isLoggedIn ? (
     <button onClick={() => handleNavClick({path: '/login'})} className="text-2xl font-light uppercase tracking-widest hover:text-amber-500">
       Login
     </button>
  ) : (
     <button onClick={() => { handleNavClick({path: '/profile'}); }} className="text-2xl font-light uppercase tracking-widest hover:text-amber-500">
       Profile
     </button>
  )}
</div>
    </>
  );
};

export default Navbar;