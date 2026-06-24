import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Package, MapPin, LogOut, ChevronRight, X } from 'lucide-react';

function ProfilePage() {
  const [data, setData] = useState({ user: {}, orders: [] });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Logout function
 const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Token hatao
    localStorage.removeItem('role');       // Role hatao
    
    // Event dispatch karo taaki Navbar ko pata chale
    window.dispatchEvent(new Event('logout-success'));
    
    window.location.href = '/login'; // Redirect
};

  useEffect(() => {
   const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken'); 
       const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';// Yahan 'token' ki jagah 'adminToken' karo
      if (!token) return; // Agar token hi nahi hai toh request mat bhejo
      
     const res = await axios.get(`${apiBaseUrl}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
});
      setData(res.data);
    } catch (err) { 
      console.error("Error loading profile"); 
      // Agar error aaye (invalid token), toh logout kar do
      localStorage.removeItem('adminToken');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
};
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-black selection:text-white pt-32 pb-24 px-6">
      <main className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <section className="mb-16 border-b border-gray-100 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
              <User size={30} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-light tracking-tight italic">Hello, {data.user.name?.split(' ')[0] || 'User'}</h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <Mail size={14} /> <span>{data.user.email}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-all"
          >
            <LogOut size={14} /> Secure Logout
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Orders History */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <Package size={20} strokeWidth={1.5} />
              <h2 className="text-xl font-medium tracking-tight">Order History</h2>
            </div>

            <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Order ID</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Payment</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</th>
                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">Total</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.orders.map((o) => (
                    <tr key={o._id} className="group hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-5 text-sm font-medium">#{o._id.slice(-6)}</td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${o.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium capitalize">{o.status}</td>
                      <td className="px-6 py-5 text-sm font-semibold">${o.total}</td>
                      <td className="px-6 py-5 text-right text-gray-300 group-hover:text-black transition-colors cursor-pointer" onClick={() => setSelectedOrder(o)}>
                        <ChevronRight size={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Account/Sidebar */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <MapPin size={20} strokeWidth={1.5} />
              <h2 className="text-xl font-medium tracking-tight">Account Summary</h2>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">Total Orders</p>
              <p className="text-4xl font-light">{data.orders.length}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-light tracking-tight italic">Order Details</h2>
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mt-1">#{selectedOrder._id.slice(-6)}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
              {/* Mapping 'cart' array as per your Schema */}
              {selectedOrder.cart?.map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package size={20} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 leading-tight">{item.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1.5">
                      <span className="bg-gray-50 px-2 py-0.5 rounded-md">QTY: {item.quantity || item.qty}</span>
                      <span>•</span>
                      <span>${item.price}</span>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">${(item.price * (item.quantity || item.qty)).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total Amount</p>
                <p className="text-3xl font-light italic mt-1">${selectedOrder.total}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</p>
                <span className="px-4 py-1.5 bg-black text-white text-[10px] uppercase tracking-widest rounded-full font-bold">
                  {selectedOrder.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;