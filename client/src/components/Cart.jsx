import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Your Order</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <hr className="my-4" />
          <h3 className="font-bold text-xl">Total: ${total.toFixed(2)}</h3>
          <button className="w-full bg-green-600 text-white mt-4 py-3 rounded-lg font-bold">
            Checkout Now
          </button>
        </>
      )}
    </div>
  );
};