import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Eye, Mail, Package, Loader2, Users, AlertTriangle } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/api/admin/users`);
      setUsers(data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const deleteUser = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    try {
      await axios.delete(`${apiBaseUrl}/api/admin/users/${deleteId}`);
      setDeleteId(null);
      fetchUsers();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Customer Directory</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Manage and monitor registered platform users.</p>
          </div>
          <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border font-bold text-slate-700 flex items-center gap-2 text-sm">
            <Users size={16} className="text-indigo-600"/> {users.length} Active Users
          </div>
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-6 sm:p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle size={32} /></div>
              <h2 className="text-xl font-bold mb-2">Delete User?</h2>
              <p className="text-slate-500 text-sm mb-6">This action will permanently remove this user and their data.</p>
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
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Activity</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-indigo-50/30 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-slate-800 text-sm sm:text-base">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                           <span className="text-slate-600 font-medium flex items-center gap-2 text-xs sm:text-sm"><Mail size={12}/> {user.email}</span>
                           <span className="text-indigo-600 font-bold flex items-center gap-2 text-xs sm:text-sm"><Package size={12}/> {user.orderCount} Orders</span>
                        </div>
                      </td>
                      <td className="p-6">
                         <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
                      </td>
                      <td className="p-6 text-right space-x-2">
                        <button className="p-2 sm:p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all"><Eye size={16} /></button>
                        <button onClick={() => setDeleteId(user._id)} className="p-2 sm:p-3 bg-slate-100 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;