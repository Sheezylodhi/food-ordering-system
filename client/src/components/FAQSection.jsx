import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "Do I need a reservation?",
    answer: "While we welcome walk-ins, reservations are highly recommended, especially on weekends, to ensure you get a table at your preferred time."
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: "Yes, our chefs are happy to cater to vegetarian, vegan, and gluten-free dietary needs. Please mention your requirements at the time of booking."
  },
  {
    question: "Is there a dress code?",
    answer: "We recommend 'Smart Casual' attire to match the elegant atmosphere of The Amber Oak."
  },
  {
    question: "Can we host private events?",
    answer: "Absolutely. We offer exclusive packages for private gatherings, corporate dinners, and celebrations. Contact us for details."
  }
];

const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium text-gray-900">{item.question}</span>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-500 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-16">Frequently Asked</h2>
        <div className="space-y-2">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;