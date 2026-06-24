import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import DishCard from './DishCard';

const MenuSection = forwardRef((props, ref) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

 useEffect(() => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  const fetchData = async () => {
    try {
      const [menuRes, catRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/admin/menu`),
        axios.get(`${apiBaseUrl}/api/categories`)
      ]);
      setMenuItems(menuRes.data);
      setCategories(catRes.data);
    } catch (err) { 
      console.error("Error loading menu:", err); 
    }
  };
  fetchData();
}, []);

  return (
    <section ref={ref} className="py-32 px-6 max-w-7xl mx-auto bg-white">
      {categories.map((cat) => (
        <div key={cat.name} id={cat.name.toLowerCase().replace(' ', '-')} className="mb-32">
          
          {/* Section Header - Highly Centered */}
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] text-amber-600 mb-4">Our Kitchen Selection</span>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900">{cat.name}</h2>
            <div className="w-16 h-[2px] bg-amber-600 mt-8"></div>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {menuItems
              .filter(item => item.category === cat.name)
              .map(dish => <DishCard key={dish._id} {...dish} />)}
          </div>
        </div>
      ))}
    </section>
  );
});

export default MenuSection;