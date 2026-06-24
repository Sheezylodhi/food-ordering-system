import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';

const MenuPage = () => {
  const { addToCart } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
  const fetchData = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    
    try {
      const [menuRes, catRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/admin/menu`),
        axios.get(`${apiBaseUrl}/api/categories`)
      ]);
      
      setItems(menuRes.data);
      setCategories(['All', ...catRes.data.map(c => c.name)]);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  
  fetchData();
}, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // Navbar ke liye 'pt-32' (32 padding top) diya hai taaki niche se start ho
    <div className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-12">
          <h1 className="text-6xl font-serif text-gray-900">Our Collection</h1>
          <div className="relative w-full md:w-80 group">
             {/* Search Bar UI */}
             <Search className="absolute left-0 top-3 text-gray-400 group-focus-within:text-amber-600 transition" size={20} />
             <input type="text" placeholder="Search dish..." className="w-full pl-8 py-2 bg-transparent border-b-2 border-gray-200 focus:border-amber-600 outline-none transition-all" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-10 mb-16 overflow-x-auto pb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[12px] uppercase tracking-[0.3em] font-medium transition-all ${activeCategory === cat ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-gray-400 hover:text-gray-900'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
  <AnimatePresence>
    {filteredItems.map(item => (
      <motion.div 
        layout 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0 }} 
        key={item._id} 
        className="group relative"
      >
        <div className="relative overflow-hidden mb-6 h-80 bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Add to Cart Overlay: Desktop (Hover) & Mobile (Always visible at bottom) */}
          <div className="absolute inset-0 bg-black/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 md:items-center md:pb-0 md:justify-end md:pr-4">
            <button 
              onClick={() => addToCart(item)}
              className="w-[90%] md:w-auto bg-white text-black p-3 md:rounded-full shadow-lg transition-all hover:bg-amber-600 hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold md:font-normal flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              <span className="md:hidden">Add to Order</span> {/* Mobile par text dikhega */}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-start font-serif">
          <h3 className="text-xl text-gray-900">{item.name}</h3>
          <span className="text-sm font-light text-amber-700">${item.price}</span>
        </div>
        <p className="text-[10px] uppercase text-gray-400 tracking-[0.2em] mt-2">{item.category}</p>
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>
      </div>
    </div>
  );
};

export default MenuPage;