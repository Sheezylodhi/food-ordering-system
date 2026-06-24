import React from 'react';
import { motion } from 'framer-motion';

const StorySection = () => {
  return (
    <section className="py-32 bg-[#0F0F0F] text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Story Content - Slide In from Left */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-amber-500 font-bold">Our Heritage</span>
          <h2 className="text-5xl md:text-6xl font-serif font-light leading-[1.1]">
            A Journey of <br/> <span className="italic opacity-80">Senses & Time</span>
          </h2>
          <p className="text-gray-400 text-lg leading-loose font-light">
            Founded in 1998, The Amber Oak began as a modest kitchen experiment. 
            Two decades later, we continue to bridge the gap between ancestral techniques 
            and modern culinary innovation, crafting memories rather than just meals.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-10 py-4 border border-amber-600/50 text-amber-500 uppercase tracking-[0.2em] text-[11px] hover:bg-amber-600 hover:text-black transition-all duration-300"
          >
            Discover The History
          </motion.button>
        </motion.div>

        {/* Gallery - Staggered reveal */}
        <div className="grid grid-cols-2 gap-6 h-[500px]">
          <motion.img 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=80" 
            className="w-full h-full object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-700" 
          />
          <motion.img 
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80" 
            className="w-full h-full object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-700 mt-16" 
          />
        </div>
        
      </div>
    </section>
  );
};

export default StorySection;