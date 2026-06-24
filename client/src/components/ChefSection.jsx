import React from 'react';
import { motion } from 'framer-motion';

const ChefSection = () => {
  return (
    <section className="py-32 px-6 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        
        {/* Animated Image with parallax frame */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-5/12 relative"
        >
          <div className="absolute -inset-4 border border-amber-600/30 rounded-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80" 
            alt="Head Chef" 
            className="w-full grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-2xl"
          />
        </motion.div>

        {/* Animated Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-6/12 space-y-8"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-amber-700 font-bold">The Creative Mind</span>
          
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 leading-[1.1]">
            "Art is in the <span className="italic font-serif">Simplicity</span>"
          </h2>
          
          <div className="h-[2px] w-20 bg-amber-600"></div>
          
          <p className="text-gray-500 text-lg leading-loose italic font-serif">
            "Food is not just about hunger; it’s about connection. We source the finest local ingredients 
            to craft dishes that tell a story of heritage, passion, and perfection in every bite."
          </p>
          
          <div className="pt-6">
            <h4 className="text-xl font-medium text-gray-900 tracking-wide uppercase text-[14px]">Marcus Aurelius</h4>
            <p className="text-amber-700 uppercase tracking-[0.2em] text-[10px] mt-1">Head Chef & Founder</p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default ChefSection;