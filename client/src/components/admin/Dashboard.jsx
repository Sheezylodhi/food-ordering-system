import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, Users, ShoppingBag, TrendingUp, DollarSign, Calendar, Download, Filter } from 'lucide-react';

const AdminDashboard = () => {
    const [data, setData] = useState({ 
        totalOrders: 0, totalUsers: 0, deliveredOrders: 0, totalRevenue: 0, statusCounts: [] 
    });

    useEffect(() => {
        const fetchAllData = async () => {
            const { data } = await axios.get('http://localhost:5001/api/admin/analytics');
            setData(data);
        };
        fetchAllData();
    }, []);

    const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

    return (
        <div className="space-y-8 p-6">
            {/* Top Professional Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Welcome back, Admin. Here is your business overview.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                        <Calendar size={18} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        <Download size={18} /> Export Report
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${data.totalRevenue?.toFixed(2) || "0"}`} icon={<DollarSign size={24} />} color="from-amber-500 to-orange-600" />
                <StatCard title="Total Orders" value={data.totalOrders} icon={<ShoppingBag size={24} />} color="from-blue-500 to-indigo-600" />
                <StatCard title="Total Users" value={data.totalUsers} icon={<Users size={24} />} color="from-emerald-500 to-teal-600" />
                <StatCard title="Delivered" value={data.deliveredOrders} icon={<TrendingUp size={24} />} color="from-purple-500 to-pink-600" />
            </div>

            {/* Main Graphs */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Order Activity</h2>
                        <Filter size={20} className="text-slate-400 cursor-pointer hover:text-slate-600" />
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data.statusCounts}>
                            <XAxis dataKey="_id" axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px'}} />
                            <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">Status Breakdown</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={data.statusCounts} dataKey="count" innerRadius={70} outerRadius={90} paddingAngle={8} cornerRadius={10}>
                                {data.statusCounts?.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {data.statusCounts?.map((entry, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                                {entry._id}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-100 shadow-lg transition-all hover:scale-[1.02]">
        <div className={`absolute top-0 right-0 p-3 m-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
            {icon}
        </div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-extrabold text-slate-800 mt-2">{value}</p>
        <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 w-fit px-2 py-1 rounded-lg">
            <span>+2.5% vs prev month</span>
        </div>
    </div>
);

export default AdminDashboard;