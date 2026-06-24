import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, CreditCard, Truck, ChevronRight, XCircle } from 'lucide-react';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, total = 0 } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online"); // Default match with logic

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Shipping Logic: Online = Free, COD = 5.00
  const shippingCost = paymentMethod === "Online" ? 0 : 5.00;
  const subtotal = Number(total) || 0;
  const grandTotal = subtotal + shippingCost;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Token get karo
      const token = localStorage.getItem('token'); 
      
      // Step 1: Save Order Details to DB
      // Headers add karo yahan
      const { data } = await axios.post('http://localhost:5001/api/payment/save-order-details', {
        customerDetails: { ...form, paymentMethod },
        cart,
        total: grandTotal,
        paymentMethod
      });

      // Step 2: Handle Payment Logic
      if (paymentMethod === 'Online') {
        const res = await axios.post('http://localhost:5001/api/payment/create-checkout-session', {
          cart,
          orderId: data.orderId
        });

        if (res.data && res.data.url) {
          window.location.href = res.data.url;
        } else {
          alert("Payment gateway error.");
        }
      } else {
        window.location.href = `/success?orderId=${data.orderId}`; 
      }
    } catch (err) {
      console.error("Error details:", err);
      alert("Failed to process order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b py-6 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase">My Shop</div>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <span className="text-black">CART</span>
            <ChevronRight size={14} />
            <span className="text-black underline underline-offset-4">CHECKOUT</span>
          </div>
        </div>
      </header>

      <form onSubmit={handleCheckout} className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT SIDE: FORM */}
        <div className="flex-[0.6] p-6 lg:p-12 border-r border-gray-100">
          <div className="max-w-xl ml-auto">
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-4">Contact & Shipping</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="email" onChange={handleChange} placeholder="Email" className="col-span-2 w-full p-4 rounded-xl border border-gray-200 outline-none" />
                <input required name="name" onChange={handleChange} placeholder="Full Name" className="col-span-2 w-full p-4 rounded-xl border border-gray-200 outline-none" />
                <input required name="phone" onChange={handleChange} placeholder="Phone" className="col-span-2 w-full p-4 rounded-xl border border-gray-200 outline-none" />
                <input required name="address" onChange={handleChange} placeholder="Address" className="col-span-2 w-full p-4 rounded-xl border border-gray-200 outline-none" />
                <input required name="city" onChange={handleChange} placeholder="City" className="w-full p-4 rounded-xl border border-gray-200 outline-none" />
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <div onClick={() => setPaymentMethod("Online")} className={`p-4 border-2 rounded-2xl cursor-pointer ${paymentMethod === "Online" ? "border-black bg-gray-50" : "border-gray-100"}`}>
                  <div className="flex items-center gap-4"><CreditCard className="text-indigo-600"/> <p className="font-bold text-sm">Online Payment</p></div>
                </div>
                <div onClick={() => setPaymentMethod("COD")} className={`p-4 border-2 rounded-2xl cursor-pointer ${paymentMethod === "COD" ? "border-black bg-gray-50" : "border-gray-100"}`}>
                  <div className="flex items-center gap-4"><Truck className="text-green-600"/> <p className="font-bold text-sm">Cash on Delivery</p></div>
                </div>
              </div>
            </section>

            <button disabled={loading} type="submit" className="w-full py-5 rounded-2xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition-all">
              {loading ? "Processing..." : "PAY & COMPLETE ORDER"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="flex-[0.4] bg-gray-50 p-6 lg:p-12">
          <div className="max-w-md mx-auto lg:sticky lg:top-32">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><ShoppingBag/> Order Summary</h2>
            <div className="space-y-6 mb-8">
              {cart?.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-white rounded-xl overflow-hidden border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold uppercase">{item.name}</h4>
                    <p className="text-sm font-bold">${Number(item?.price || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-bold">${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-black"><span>TOTAL</span><span>${grandTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;