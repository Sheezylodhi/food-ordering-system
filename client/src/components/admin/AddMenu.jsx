import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Loader2, Sparkles, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

const AddMenu = () => {
  const [formData, setFormData] = useState({ 
    name: '', description: '', price: '', category: '', image: null, calories: '', isFeatured: false 
  });
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      try {
        const res = await axios.get(`${apiBaseUrl}/api/categories`);
        setCategories(res.data);
      } catch (err) { console.error("Error fetching categories", err); }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'Image size should be less than 5MB' });
        return;
      }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post(`${apiBaseUrl}/api/admin/add-item`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus({ type: 'success', message: 'Dish published successfully!' });
      setFormData({ name: '', description: '', price: '', category: '', image: null, calories: '', isFeatured: false });
      setPreview(null);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to upload dish.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 min-h-screen">
      {status.message && (
        <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
          {status.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
          <span className="font-bold text-sm sm:text-base">{status.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">Add Menu Item</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your restaurant inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Product Imagery</label>
            <label className={`relative flex flex-col items-center justify-center w-full h-64 sm:h-80 border-4 border-dashed rounded-3xl cursor-pointer ${preview ? 'border-indigo-100' : 'border-slate-200 bg-slate-50'}`}>
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
              ) : (
                <div className="text-slate-400 text-center p-4">
                  <Upload size={40} className="mx-auto mb-2" />
                  <span className="font-bold">Upload Image</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleImageChange} required />
            </label>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Dish Name</label>
              <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Price (USD)</label>
              <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price} required />
            </div>
          </div>
        </div>

        {/* Right Side (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6 lg:sticky lg:top-8">
            <h3 className="font-bold text-lg flex items-center gap-2"><Tag size={20}/> Metadata</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
              <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category} required>
                <option value="">Select Category</option>
                {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Calories</label>
              <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, calories: e.target.value})} value={formData.calories} />
            </div>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-indigo-600" onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} checked={formData.isFeatured} />
              <span className="font-bold text-slate-700">Display as Featured</span>
            </label>

            <button type="submit" disabled={loading} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm & Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;