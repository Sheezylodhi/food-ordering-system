import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryIcons = ({ onCategoryClick }) => {
    const [categories, setCategories] = useState([]);
    const scrollRef = useRef(null);

   useEffect(() => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  axios.get(`${apiBaseUrl}/api/categories`)
    .then(res => setCategories(res.data))
    .catch(err => console.error("Categories fetch error:", err));
}, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
            <h3 className="text-center text-amber-500 uppercase tracking-[0.3em] text-[10px] mb-8">Browse by Category</h3>
            
            {/* Nav Arrows */}
            <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-amber-600 transition-colors">
                <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-amber-600 transition-colors">
                <ChevronRight size={20} />
            </button>

            {/* Categories Container */}
            <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-hidden scroll-smooth px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((cat) => (
                    <div 
                        key={cat._id} 
                        className="flex flex-col items-center cursor-pointer min-w-[120px] group"
                        onClick={() => onCategoryClick(cat.name)}
                    >
                        <div className="w-24 h-24 rounded-full border border-white/10 p-1 transition-all duration-500 group-hover:border-amber-500 group-hover:scale-105 shadow-lg">
                            <img 
                                src={cat.icon} 
                                alt={cat.name} 
                                className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                            />
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.2em] font-medium mt-4 text-gray-400 group-hover:text-white transition-colors">
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryIcons;