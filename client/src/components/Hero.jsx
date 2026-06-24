import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div> 
      </div>

      {/* Hero Content - Centered with elegant spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6 text-center">
        
        {/* Subtle Label */}
        <span className="text-amber-500 text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase mb-6 animate-fade-in">
          Established 1998
        </span>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-8xl font-serif font-light mb-8 leading-[0.9] animate-fade-in-up">
          An Unforgettable <br/> <span className="italic opacity-90">Journey of Taste</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm md:text-lg text-gray-300 mb-12 max-w-xl font-light tracking-widest leading-relaxed animate-fade-in-delay">
          Experience the art of fine dining where tradition meets modern culinary excellence in the heart of the city.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6 animate-fade-in-delay-2">
          <button 
  onClick={() => navigate('/menu')} 
  className="px-10 py-4 bg-amber-600 text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-amber-700 transition-all duration-300 cursor-pointer"
>
  View Menu
</button>

<button 
  onClick={() => navigate('/reserve')} 
  className="px-10 py-4 border border-white/30 text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
>
  Reserve Table
</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;