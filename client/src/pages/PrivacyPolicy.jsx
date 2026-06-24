import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
        <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Legal Documentation</span>
        <h1 className="text-6xl font-black mb-6">Privacy Policy</h1>
        <p className="text-gray-400 font-medium">Last Updated: June 24, 2026</p>
      </motion.div>
      
      {/* Content */}
      <div className="space-y-16 text-gray-600">
        {[
          { title: "1. Our Commitment", text: "At The Amber Oak, we view your privacy as a foundational ingredient of our relationship. Just as we are selective with our culinary sourcing, we are equally rigorous in safeguarding your personal data." },
          { title: "2. Data Collection", text: "We collect only what is essential: your contact details, reservation history, and specific dining preferences. This information allows us to curate a bespoke experience tailored to your unique tastes." },
          { title: "3. Data Security", text: "Your data resides within a highly encrypted, secure architecture. We maintain a strict policy of non-disclosure; your information is never sold, traded, or rented. Your trust is our most premium asset, and it remains exclusively protected." },
          { title: "4. Cookies & Tracking", text: "Our website utilizes minimal, essential cookies to optimize your browsing journey. These are designed solely to ensure our platform performs with the elegance and speed our guests expect." },
          { title: "5. Your Rights", text: "You maintain full sovereignty over your data. Should you wish to review, update, or permanently delete your information from our records, a simple request to our concierge will be honored immediately." }
        ].map((section, idx) => (
          <motion.section key={idx} variants={itemVariants} className="border-l-2 border-gray-100 pl-8">
            <h2 className="text-xl font-bold text-black mb-4 tracking-tight">{section.title}</h2>
            <p className="leading-relaxed text-lg">{section.text}</p>
          </motion.section>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div variants={itemVariants} className="mt-24 p-10 bg-gray-50 rounded-[2rem] text-center">
        <h4 className="font-bold text-black mb-2">Questions regarding our policy?</h4>
        <p className="text-sm text-gray-500 mb-6">Our privacy team is available to assist you at any time.</p>
        <a href="mailto:privacy@theamberoak.com" className="inline-block px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-orange-500 transition-colors text-sm">
          Contact Concierge
        </a>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;