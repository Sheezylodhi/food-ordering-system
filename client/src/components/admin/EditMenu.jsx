import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Save, Loader2, Tag, CheckCircle2, AlertCircle, LayoutGrid } from 'lucide-react';

const EditMenu = ({ item, onSave }) => {
  const [formData, setFormData] = useState({ 
    name: item.name || '', 
    description: item.description || '', 
    price: item.price || '', 
    category: item.category || '', 
    image: null, 
    calories: item.calories || '', 
    isFeatured: item.isFeatured || false 
  });
  
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(item.image);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  useEffect(() => {
  const fetchCategories = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    
    try {
      const res = await axios.get(`${apiBaseUrl}/api/categories`);
      setCategories(res.data);
    } catch (err) { 
      console.error("Error fetching categories", err); 
    }
  };
  
  fetchCategories();
}, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus({ type: null, message: '' });
  
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => data.append(key, value));

  try {
    await axios.put(`${apiBaseUrl}/api/admin/edit-item/${item._id}`, data);
    setStatus({ type: 'success', message: 'Dish updated successfully!' });
    setTimeout(onSave, 1500);
  } catch (err) {
    setStatus({ type: 'error', message: 'Failed to update. Check your connection.' });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {status.message && (
        <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {status.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
          <span className="font-bold">{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block flex items-center gap-2"><LayoutGrid size={18}/> Product Visuals</label>
            <label className="relative flex flex-col items-center justify-center w-full h-80 border-4 border-dashed border-indigo-100 rounded-3xl cursor-pointer bg-slate-50 hover:border-indigo-400 transition-all">
              <img src={preview} className="h-full w-full object-cover rounded-3xl" />
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Dish Name</label>
              <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Price (USD)</label>
              <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price} required />
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 sticky top-8">
            <h3 className="font-bold text-xl flex items-center gap-2"><Tag size={20}/> Metadata</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
              <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
                {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-indigo-600" onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} checked={formData.isFeatured} />
              <span className="font-bold text-slate-700">Display as Featured</span>
            </label>
            <button type="submit" disabled={loading} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-bold text-lg hover:scale-[1.02] transition-transform">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditMenu;