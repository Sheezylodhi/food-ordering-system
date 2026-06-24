import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-8 py-40 font-sans"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-20">
        <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Binding Agreement</span>
        <h1 className="text-6xl font-black mb-6">Terms & Conditions</h1>
        <p className="text-gray-400 font-medium">Last Updated: June 24, 2026</p>
      </motion.div>
      
      {/* Content */}
      <div className="space-y-16 text-gray-600">
        {[
          { title: "1. Acceptance of Terms", text: "By engaging with our digital platform, you enter into a formal agreement with The Amber Oak. Your continued use signifies your absolute acceptance of these standards, crafted to maintain the integrity of our service." },
          { title: "2. Reservation & Cancellation", text: "Each reservation is a commitment to an experience. We kindly request that any adjustments or cancellations are communicated at least 24 hours prior to your scheduled arrival. This allows us to extend our hospitality to other esteemed guests." },
          { title: "3. Intellectual Property", text: "The elegance of The Amber Oak brand, from our visual identity to our curated menu narratives, remains the exclusive property of our establishment. Any unauthorized reproduction or commercial use is strictly prohibited." },
          { title: "4. Guest Conduct", text: "To preserve the serene and sophisticated atmosphere of our dining rooms, we ask all guests to adhere to a code of conduct that respects the comfort and experience of fellow patrons." },
          { title: "5. Limitation of Liability", text: "While we strive for perfection in every detail, The Amber Oak shall not be held liable for any unforeseen circumstances beyond our reasonable control during your dining experience." }
        ].map((section, idx) => (
          <motion.section key={idx} variants={itemVariants} className="border-l-2 border-gray-100 pl-8">
            <h2 className="text-xl font-bold text-black mb-4 tracking-tight">{section.title}</h2>
            <p className="leading-relaxed text-lg">{section.text}</p>
          </motion.section>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div variants={itemVariants} className="mt-24 p-10 bg-black rounded-[2rem] text-center">
        <h4 className="font-bold text-white mb-2">Need Further Clarification?</h4>
        <p className="text-sm text-gray-400 mb-6">Our legal and concierge teams are at your disposal.</p>
        <a href="mailto:legal@theamberoak.com" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-white hover:text-black transition-colors text-sm">
          Speak to Concierge
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Terms;