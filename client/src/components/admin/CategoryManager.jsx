import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FolderPlus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const CategoryManager = () => {
  const [formData, setFormData] = useState({ name: '', icon: null });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ type: null, message: '' });

 const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.icon) return alert("Please select an icon!");
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    
    setLoading(true);
    setStatus({ type: null, message: '' });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('icon', formData.icon); // File object yahan se jayega

   try {
    await axios.post(`${apiBaseUrl}/api/categories/add`, data);
    setStatus({ type: 'success', message: 'Category created successfully!' });
    setFormData({ name: '', icon: null });
    setPreview(null);
  } catch (err) {
    console.error(err);
    setStatus({ type: 'error', message: 'Failed to create category.' });
  } finally {
    setLoading(false);
    setTimeout(() => setStatus({ type: null, message: '' }), 4000);
  }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Status Notifications */}
      {status.message && (
        <div className={`fixed top-5 right-5 z-[100] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right ${status.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold">{status.message}</span>
        </div>
      )}

      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Category</h1>
          <p className="text-slate-500 font-medium mt-1">Define new menu categories for your storefront.</p>
        </div>

        <form onSubmit={handleAdd} className="space-y-6">
          {/* Icon Upload Zone */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category Icon</label>
            <label className={`relative flex flex-col items-center justify-center w-full h-40 border-4 border-dashed rounded-3xl cursor-pointer transition-all ${preview ? 'border-indigo-100' : 'border-slate-200 hover:border-indigo-400 bg-slate-50'}`}>
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <Upload size={32} className="mb-2" />
                  <span className="font-bold text-sm">Upload Icon</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={(e) => {
                setFormData({...formData, icon: e.target.files[0]});
                setPreview(URL.createObjectURL(e.target.files[0]));
              }} required />
            </label>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Display Name</label>
            <input 
              className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-lg" 
              placeholder="e.g., Italian, Desi, Drinks" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 mt-4"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Save Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryManager;