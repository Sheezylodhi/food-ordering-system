import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { X, Eye, Search, ChevronLeft, ChevronRight, CreditCard, Package } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  try {
    const { data } = await axios.get(`${apiBaseUrl}/api/admin/orders`);
    setOrders(data);
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
};

    const filteredOrders = useMemo(() => {
        return orders.filter(o => 
            o.name.toLowerCase().includes(search.toLowerCase()) || 
            o.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [orders, search]);

    // Pagination Logic
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const updateStatus = async (id, status) => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  
  try {
    await axios.patch(`${apiBaseUrl}/api/admin/orders/${id}`, { status });
    setSelectedOrder(null);
    fetchOrders();
  } catch (err) {
    console.error("Error updating order status:", err);
  }
};

    return (
        <div className="p-8 space-y-6 bg-white min-h-screen font-sans">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Order Management</h1>
                    <p className="text-slate-500 text-sm">Efficiently manage your store orders</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Search orders..." 
                        className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-2xl w-72 bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                            <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Payment</th>
                            <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                            <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {currentOrders.map(order => (
                            <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-6">
                                    <div className="font-bold text-slate-800">{order.name}</div>
                                    <div className="text-xs text-slate-400">{order.email}</div>
                                </td>
                                <td className="p-6">
                                    <span className="text-sm font-semibold text-slate-700">{order.paymentMethod}</span>
                                    <div className={`text-[10px] uppercase font-bold ${order.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{order.paymentStatus}</div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-6 font-extrabold text-slate-800">${order.total.toFixed(2)}</td>
                                <td className="p-6 text-right">
                                    <button onClick={() => setSelectedOrder(order)} className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 p-2.5 rounded-xl transition-all">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Footer */}
                <div className="p-6 flex justify-between items-center bg-slate-50/30 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredOrders.length)} of {filteredOrders.length}</span>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 border bg-white rounded-lg hover:bg-slate-50 disabled:opacity-50"><ChevronLeft size={20}/></button>
                        <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 border bg-white rounded-lg hover:bg-slate-50 disabled:opacity-50"><ChevronRight size={20}/></button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl font-medium">Customer: <span className="font-bold block">{selectedOrder.name}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl font-medium">Phone: <span className="font-bold block">{selectedOrder.phone || "N/A"}</span></div>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl font-medium">Address: <span className="font-bold block text-xs">{selectedOrder.address}</span></div>
                            <div className="border-t pt-4">
                                <h4 className="font-bold mb-2">Items:</h4>
                                {selectedOrder.cart.map((item, i) => (
                                    <div key={i} className="flex justify-between py-1 border-b text-xs"><span>{item.name} x {item.qty}</span><span className="font-bold">${(item.price * item.qty).toFixed(2)}</span></div>
                                ))}
                            </div>
                        </div>
                        <select value={selectedOrder.status} onChange={(e) => updateStatus(selectedOrder._id, e.target.value)} className="w-full mt-6 p-4 border-2 border-indigo-100 rounded-2xl font-bold bg-indigo-50 text-indigo-700 outline-none">
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminOrders;