import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Eye, User, Mail, Package, Loader2, Users, AlertTriangle } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5001/api/admin/users');
      setUsers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${deleteId}`);
      setDeleteId(null);
      fetchUsers();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer Directory</h1>
            <p className="text-slate-500 font-medium mt-1">Manage and monitor registered platform users.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border font-bold text-slate-700 flex items-center gap-2">
            <Users size={18} className="text-indigo-600"/> {users.length} Active Users
          </div>
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle size={32} /></div>
              <h2 className="text-xl font-bold mb-2">Delete User?</h2>
              <p className="text-slate-500 mb-6">This action will permanently remove this user and their data. Proceed?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button onClick={deleteUser} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Confirm</button>
              </div>
            </div>
          </div>
        )}

        {/* Table Content */}
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={40}/></div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">User Details</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Activity</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
             <tbody className="divide-y divide-slate-100">
  {users.map(user => (
    <tr key={user._id} className="hover:bg-indigo-50/30 transition-all">
      {/* User Info */}
      <td className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-slate-800">{user.name}</span>
        </div>
      </td>

      {/* Contact Column (Fixed Layout) */}
      <td className="p-6">
        <div className="flex flex-col gap-1">
           <span className="text-slate-600 font-medium flex items-center gap-2 text-sm"><Mail size={14}/> {user.email}</span>
           <span className="text-indigo-600 font-bold flex items-center gap-2 text-sm"><Package size={14}/> {user.orderCount} Orders</span>
        </div>
      </td>

      {/* Activity Status (If you have it, otherwise keep it clean) */}
      <td className="p-6">
         <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
      </td>

      {/* Actions */}
      <td className="p-6 text-right space-x-2">
        <button className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Eye size={18} /></button>
        <button onClick={() => setDeleteId(user._id)} className="p-3 bg-slate-100 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;