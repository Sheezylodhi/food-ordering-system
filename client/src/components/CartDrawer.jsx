import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartDrawer = () => {
  const { cart, isOpen, setIsOpen, removeFromCart, addToCart, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  const getPrice = (price) => parseFloat(String(price).replace('$', '')) || 0;
  const total = cart.reduce((sum, item) => sum + (getPrice(item.price) * item.qty), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"
          />

          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-white z-50 shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Elegant Header */}
            <div className="p-8 border-b flex justify-between items-center bg-white/80 backdrop-blur-md">
              <h2 className="text-2xl font-serif">Your Selection</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <LayoutGroup>
                {cart.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-gray-400">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag size={32} className="text-gray-300"/>
                    </div>
                    <p className="font-serif text-gray-900 mb-2">Your table is quiet</p>
                    <p className="text-sm mb-8 italic text-gray-400">Add something to get started</p>
                    <button onClick={() => { setIsOpen(false); navigate('/menu'); }} className="text-[10px] border-b border-black uppercase tracking-[0.2em] hover:text-amber-600 hover:border-amber-600 transition-all">Continue Exploring</button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <motion.div layout key={item.id} exit={{ opacity: 0, x: 20 }} className="flex gap-4 items-start group">
                        <div className="w-20 h-24 overflow-hidden bg-gray-100">
                            <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.name} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-amber-600 font-bold text-sm mt-1">{item.price}</p>
                          <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center gap-3 border border-gray-200 px-3 py-1 rounded-full">
                              <button onClick={() => decreaseQty(item.name)} className="text-gray-400 hover:text-black transition-colors"><Minus size={12}/></button>
                              <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                              <button onClick={() => addToCart(item)} className="text-gray-400 hover:text-black transition-colors"><Plus size={12}/></button>
                            </div>
                            <button onClick={() => removeFromCart(item.name)} className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">Remove</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </LayoutGroup>
            </div>

            {/* Premium Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t bg-gray-50">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Subtotal</span>
                  <span className="font-serif text-3xl">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { setIsOpen(false); navigate('/checkout'); }}
                  className="w-full bg-black text-white py-5 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-amber-700 transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;