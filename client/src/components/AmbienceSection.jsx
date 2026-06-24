import React from 'react';
import { motion } from 'framer-motion';

const AmbienceSection = () => {
  // Animation variants for smooth reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase text-amber-600 font-bold">Our Space</span>
          <h2 className="text-5xl font-serif text-gray-900 mt-4">The Atmosphere</h2>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]"
        >
          {/* Main Large Image */}
          <motion.div variants={itemVariants} className="col-span-2 row-span-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              alt="Dining Hall"
            />
          </motion.div>

          {/* Top Right Image */}
          <motion.div variants={itemVariants} className="col-span-2 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              alt="Interior Detail"
            />
          </motion.div>

          {/* Bottom Left Small Image */}
          <motion.div variants={itemVariants} className="col-span-1 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=80" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              alt="Bar Area"
            />
          </motion.div>

          {/* Bottom Right Small Image */}
          <motion.div variants={itemVariants} className="col-span-1 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              alt="Fine Dining Setup"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbienceSection;