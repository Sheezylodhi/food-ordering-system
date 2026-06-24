import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, PlusCircle, Loader2, Sparkles, LayoutGrid, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

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
      try {
        const res = await axios.get('http://localhost:5001/api/categories');
        setCategories(res.data);
      } catch (err) { console.error("Error fetching categories", err); }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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
    setStatus({ type: null, message: '' });

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post('http://localhost:5001/api/admin/add-item', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus({ type: 'success', message: 'Dish successfully published to the menu!' });
      setFormData({ name: '', description: '', price: '', category: '', image: null, calories: '', isFeatured: false });
      setPreview(null);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to upload dish. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: null, message: '' }), 5000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      {/* Animated Status Alert */}
      {status.message && (
        <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right ${status.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {status.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
          <span className="font-bold">{status.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Add Menu Item</h1>
          <p className="text-slate-500 mt-2 font-medium">Use the advanced portal to manage restaurant inventory.</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 border-2 border-slate-200 rounded-2xl font-bold hover:bg-white transition-all">Drafts</button>
           <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200">
             <Sparkles size={18} /> Pro Tools
           </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">Product Imagery</label>
            <label className={`relative flex flex-col items-center justify-center w-full h-80 border-4 border-dashed rounded-3xl cursor-pointer transition-all ${preview ? 'border-indigo-100' : 'border-slate-200 hover:border-indigo-400 bg-slate-50'}`}>
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <Upload size={48} className="mb-4" />
                  <span className="font-bold text-lg">Upload Product Image</span>
                  <span className="text-sm">or drag and drop</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleImageChange} required />
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

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 sticky top-8">
            <h3 className="font-bold text-xl flex items-center gap-2"><Tag size={20}/> Metadata</h3>
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
            <button type="submit" disabled={loading} className="w-full py-6 bg-slate-900 text-white rounded-3xl font-bold text-lg hover:scale-[1.02] transition-transform">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm & Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddMenu;