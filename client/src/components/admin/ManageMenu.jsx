import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Search, ChevronLeft, ChevronRight, AlertTriangle, Loader2, Inbox } from 'lucide-react';
import EditMenu from './EditMenu';

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => { fetchMenu(); }, []);

  const fetchMenu = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  setLoading(true);
  try {
    const res = await axios.get(`${apiBaseUrl}/api/admin/menu`);
    setMenuItems(res.data);
  } catch (err) { 
    console.error(err); 
  } finally { 
    setLoading(false); 
  }
};

const handleDelete = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  try {
    await axios.delete(`${apiBaseUrl}/api/admin/delete-item/${deleteId}`);
    setDeleteId(null);
    fetchMenu();
  } catch (err) { 
    alert("Delete failed"); 
  }
};

  const filtered = menuItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Edit State: Full Page Redirect logic
  if (editingItem) return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <button onClick={() => setEditingItem(null)} className="flex items-center gap-2 mb-8 text-slate-500 font-bold hover:text-indigo-600 transition-colors">
        ← Return to Inventory
      </button>
      <EditMenu item={editingItem} onSave={() => { setEditingItem(null); fetchMenu(); }} />
    </div>
  );

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory</h1>
          <p className="text-slate-500 font-medium">Manage your restaurant menu items efficiently.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input onChange={(e) => setSearch(e.target.value)} placeholder="Search dishes..." className="pl-12 pr-4 py-3 rounded-2xl border-0 bg-white shadow-sm w-80 outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={48} /></div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {filtered.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>{['Product', 'Category', 'Price', 'Actions'].map(h => <th key={h} className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentData.map(item => (
                  <tr key={item._id} className="hover:bg-indigo-50/30 transition-all">
                    <td className="p-6 flex items-center gap-4">
                      <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </td>
                    <td className="p-6 font-semibold text-slate-500">{item.category}</td>
                    <td className="p-6 font-black text-indigo-600">${item.price}</td>
                    <td className="p-6 text-right space-x-2">
                      <button onClick={() => setEditingItem(item)} className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Edit2 size={18} /></button>
                      <button onClick={() => setDeleteId(item._id)} className="p-3 bg-slate-100 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center text-slate-400"><Inbox size={48} className="mx-auto mb-4 opacity-50" /> No dishes found.</div>
          )}
          
          {/* Pagination */}
          {filtered.length > itemsPerPage && (
            <div className="p-6 border-t flex justify-between items-center bg-slate-50">
              <span className="text-xs font-bold text-slate-400">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 bg-white border rounded-xl shadow-sm disabled:opacity-50"><ChevronLeft size={20}/></button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 bg-white border rounded-xl shadow-sm disabled:opacity-50"><ChevronRight size={20}/></button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-3xl w-full max-w-sm text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><AlertTriangle size={40} /></div>
            <h2 className="text-2xl font-black mb-2">Delete Dish?</h2>
            <p className="text-slate-500 mb-8">This will permanently remove the dish from your menu.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageMenu;