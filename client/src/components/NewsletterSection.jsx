import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-gray-900 text-white px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-serif mb-6">Stay Connected</h3>
        <p className="text-gray-400 mb-10 font-light">
          Join our culinary circle for exclusive updates, seasonal menu previews, and event invitations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 bg-white/5 border border-white/10 px-6 py-4 outline-none text-white focus:border-amber-600 transition-colors"
          />
          <button className="bg-amber-600 px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-300">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;