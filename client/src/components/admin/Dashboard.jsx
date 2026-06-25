import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp, Calendar, Download, Filter } from 'lucide-react';

const AdminDashboard = () => {
    const [data, setData] = useState({ 
        totalOrders: 0, totalUsers: 0, deliveredOrders: 0, totalRevenue: 0, statusCounts: [] 
    });

    useEffect(() => {
        const fetchAllData = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
            try {
                const { data } = await axios.get(`${apiBaseUrl}/api/admin/analytics`);
                setData(data);
            } catch (err) {
                console.error("Error fetching analytics:", err);
            }
        };
        fetchAllData();
    }, []);

    const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

    return (
        // PADDING adjust ki hai mobile ke liye
        <div className="space-y-6 p-4 md:p-6 lg:p-8">
            {/* Header: Mobile par stack ho jayega */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-sm md:text-base text-slate-500 mt-1">Welcome back, Admin.</p>
                </div>
                {/* Buttons: Mobile par full width ya responsive */}
                <div className="flex w-full sm:w-auto items-center gap-2">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Stat Cards: Grid responsive hai, 1 column mobile, 2 tablet, 4 desktop */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Revenue" value={`$${data.totalRevenue?.toFixed(2) || "0"}`} icon={<DollarSign size={20} />} color="from-amber-500 to-orange-600" />
                <StatCard title="Orders" value={data.totalOrders} icon={<ShoppingBag size={20} />} color="from-blue-500 to-indigo-600" />
                <StatCard title="Users" value={data.totalUsers} icon={<Users size={20} />} color="from-emerald-500 to-teal-600" />
                <StatCard title="Delivered" value={data.deliveredOrders} icon={<TrendingUp size={20} />} color="from-purple-500 to-pink-600" />
            </div>

            {/* Charts: Mobile par ek ke niche ek ayenge */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-w-0">
                <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-md font-bold text-slate-800">Order Activity</h2>
                        <Filter size={18} className="text-slate-400 cursor-pointer" />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data.statusCounts}>
                            <XAxis dataKey="_id" axisLine={false} tickLine={false} fontSize={12} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} />
                            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-center">
                    <h2 className="text-md font-bold text-slate-800 mb-4">Status Breakdown</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={data.statusCounts} dataKey="count" innerRadius={50} outerRadius={70} paddingAngle={5} cornerRadius={5}>
                                {data.statusCounts?.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="relative bg-white p-5 rounded-3xl border border-slate-100 shadow-lg">
        <div className={`absolute top-4 right-4 p-2 rounded-xl bg-gradient-to-br ${color} text-white`}>
            {icon}
        </div>
        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-extrabold text-slate-800 mt-1">{value}</p>
    </div>
);

export default AdminDashboard;