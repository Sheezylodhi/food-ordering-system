import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "A symphony of flavors. The Amber Oak is not just dining, it is a masterclass in culinary artistry.",
    author: "James Peterson",
    role: "The Gourmet Times"
  },
  {
    text: "The perfect balance of tradition and modern technique. Truly an unforgettable experience.",
    author: "Elena Rodriguez",
    role: "Fine Dining Critic"
  },
  {
    text: "The attention to detail in every dish is unparalleled. A must-visit for any food lover.",
    author: "Marcus Thorne",
    role: "Lifestyle Magazine"
  }
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 bg-[#FDFBF7] px-6 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <span className="text-[10px] tracking-[0.4em] uppercase text-amber-700 font-bold mb-8 block">Guest Voices</span>
        
        <div className="h-[300px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="px-4"
            >
              <p className="text-3xl md:text-4xl font-serif text-gray-900 italic leading-snug mb-10">
                "{testimonials[index].text}"
              </p>
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-900">{testimonials[index].author}</h4>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 mt-2">{testimonials[index].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-8 mt-12">
          <button onClick={prevSlide} className="p-2 border border-gray-300 rounded-full hover:border-amber-600 hover:text-amber-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="p-2 border border-gray-300 rounded-full hover:border-amber-600 hover:text-amber-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;