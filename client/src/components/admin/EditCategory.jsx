import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Save, Loader2, X } from 'lucide-react';

const EditCategory = ({ category, onCancel, onSave }) => {
  const [formData, setFormData] = useState({ 
    name: category.name || '', 
    icon: null 
  });
  const [preview, setPreview] = useState(category.icon);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    if (formData.icon) data.append('icon', formData.icon);

    try {
      // Backend mein .put route par FormData handle karna mat bhoolna
      await axios.put(`http://localhost:5001/api/categories/edit/${category._id}`, data);
      onSave();
    } catch (err) { 
      console.error(err);
      alert("Update failed"); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-900">Edit Category</h2>
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Icon Preview & Upload */}
        <label className="relative flex flex-col items-center justify-center w-full h-40 border-4 border-dashed border-indigo-100 rounded-3xl cursor-pointer bg-slate-50 hover:border-indigo-400 transition-all overflow-hidden">
          <img src={preview} alt="Category Icon" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Upload className="text-white" size={32} />
          </div>
          <input type="file" className="hidden" onChange={(e) => {
            setFormData({...formData, icon: e.target.files[0]});
            setPreview(URL.createObjectURL(e.target.files[0]));
          }} />
        </label>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category Name</label>
          <input 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-lg" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onCancel} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditCategory;