import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const DishCard = ({ name, description, price, image }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group relative flex flex-col items-center text-center p-2">
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
        />
        
        {/* ACTION BUTTON - Desktop par hover, Mobile par permanent */}
        <div className="absolute inset-0 bg-black/20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end md:items-center justify-center p-4">
           <button 
            onClick={() => addToCart({ name, description, price: Number(price), image })}
            className="w-full md:w-auto bg-white text-black px-6 py-3 md:py-2 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-amber-600 hover:text-white transition-all duration-300 md:translate-y-4 md:group-hover:translate-y-0"
           >
             Add to Order
           </button>
        </div>
      </div>

      {/* Details */}
      <div className="w-full pt-6">
        <h3 className="text-xl font-serif text-gray-900 mb-2 transition-colors duration-300 group-hover:text-amber-700">
          {name}
        </h3>
        <div className="w-8 h-[1px] bg-gray-300 mx-auto mb-3 group-hover:bg-amber-600 transition-colors"></div>
        <p className="text-gray-400 text-[11px] uppercase tracking-[0.2em] mb-4">
          ${price} | Small Plate
        </p>
      </div>
    </div>
  );
};

export default DishCard;