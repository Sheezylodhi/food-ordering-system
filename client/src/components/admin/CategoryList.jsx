import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, AlertTriangle, Inbox, Loader2 } from 'lucide-react';
import EditCategory from './EditCategory';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCat, setEditingCat] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  setLoading(true);
  try {
    const res = await axios.get(`${apiBaseUrl}/api/categories`);
    setCategories(res.data);
  } catch (err) { 
    console.error(err); 
  } finally { 
    setLoading(false); 
  }
};

const handleDelete = async () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  try {
    await axios.delete(`${apiBaseUrl}/api/categories/delete/${deleteId}`);
    setDeleteId(null);
    fetchCategories();
  } catch (err) { 
    alert("Delete failed"); 
  }
};

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Categories</h1>
            <p className="text-slate-500 font-medium">Manage your restaurant menu segments.</p>
          </div>
        </div>

        {/* Edit Modal Logic */}
        {editingCat && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
               <EditCategory category={editingCat} onCancel={() => setEditingCat(null)} onSave={() => { setEditingCat(null); fetchCategories(); }} />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle size={32} /></div>
              <h2 className="text-xl font-bold mb-2">Delete Category?</h2>
              <p className="text-slate-500 mb-6">Are you sure? This will remove all items associated with this category.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Confirm</button>
              </div>
            </div>
          </div>
        )}

        {/* List Content */}
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={40}/></div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {categories.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Icon</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-indigo-50/30 transition-all">
                      <td className="p-6"><img src={cat.icon} className="w-14 h-14 rounded-2xl object-cover shadow-sm" /></td>
                      <td className="p-6 font-bold text-slate-800">{cat.name}</td>
                      <td className="p-6 text-right space-x-2">
                        <button onClick={() => setEditingCat(cat)} className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Edit2 size={18} /></button>
                        <button onClick={() => setDeleteId(cat._id)} className="p-3 bg-slate-100 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center text-slate-400"><Inbox size={48} className="mx-auto mb-4 opacity-50" /> No categories found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;