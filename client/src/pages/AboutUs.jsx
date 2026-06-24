import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Leaf, Award, Users, Target, Sparkles } from 'lucide-react';

const AboutUs = () => {
  // Animation Variants for smooth transitions
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-20 pb-20 overflow-x-hidden">
      
      {/* 1. Header Section - Refined Spacing */}
      <section className="max-w-4xl mx-auto px-6 text-center py-20">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: false }}>
          <Sparkles className="mx-auto text-orange-500 mb-6" size={32} />
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-black">The Amber Oak Legacy</h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed italic">
            Luxury is not just a service; it is an orchestrated experience. We blend the raw beauty of nature with the precision of high-end culinary arts.
          </p>
        </motion.div>
      </section>

      {/* 2. Philosophy Section (Large Featured Image) */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000" 
              alt="Luxury Kitchen" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Crafting Excellence<br/>In Every Bite.</h2>
            <p className="text-gray-600 text-lg leading-loose">
              From the humble seed to the final plating, our process is defined by patience. We don't just cook; we curate memories that linger long after the last course.
            </p>
            <div className="flex gap-4">
               <div className="p-4 bg-orange-100 rounded-2xl text-orange-600"><Utensils /></div>
               <div className="p-4 bg-gray-100 rounded-2xl text-black"><Leaf /></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats - Minimalist Black Box */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { n: "15+", label: "Master Chefs" },
            { n: "25k", label: "Happy Patrons" },
            { n: "100%", label: "Organic Sourcing" },
            { n: "12", label: "Global Awards" }
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="space-y-2">
              <h4 className="text-4xl font-black text-orange-500">{stat.n}</h4>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-[9px] font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Team Visionaries - Grid Layout */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black">The Visionaries</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800", name: "Chef Gordon", role: "Executive Chef" },
            { img: "https://images.unsplash.com/photo-1595273670150-ec0c3c3485c2?w=800", name: "Sarah Miller", role: "General Manager" },
            { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", name: "David Chen", role: "Lead Sommelier" }
          ].map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="relative rounded-[2rem] overflow-hidden aspect-[3/4]"
            >
              <img src={m.img} alt={m.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <h4 className="text-white text-xl font-bold">{m.name}</h4>
                <p className="text-orange-500 text-[10px] uppercase tracking-[0.2em] font-bold">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;