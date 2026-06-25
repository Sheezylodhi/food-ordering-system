import React, { useState } from 'react';
import axios from 'axios';
import { Search, FileSpreadsheet, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';

const ReportSystem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({ start: '', end: '' });

  const fetchReport = async () => {
    if (!dates.start || !dates.end) return alert("Select Date Range!");
    
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    setLoading(true);
    
    try {
      const { data: response } = await axios.get(`${apiBaseUrl}/api/admin/reports`, {
        params: { start: dates.start, end: dates.end }
      });
      setData(response);
    } catch (err) { 
      alert("Error fetching report"); 
    } finally { 
      setLoading(false); 
    }
  };

  const exportToExcel = () => {
    const excelData = data.map(o => ({
      "Order Date": new Date(o.createdAt).toLocaleString(),
      "Customer Name": o.user?.name || o.name || "N/A",
      "Email": o.user?.email || o.email || "N/A",
      "Phone": o.phone || "N/A",
      "Payment Type": o.paymentMethod,
      "Payment Status": o.paymentStatus,
      "Delivery Status": o.status,
      "Total Amount": o.total
    }));

    const totalRevenue = data.reduce((sum, item) => sum + (item.total || 0), 0);
    excelData.push({ "Order Date": "GRAND TOTAL", "Total Amount": totalRevenue });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detailed Report");
    XLSX.writeFile(workbook, `Report_${dates.start}_to_${dates.end}.xlsx`);
  };

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">Finance Report</h1>
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">From Date</label>
            <input type="date" className="w-full p-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setDates({...dates, start: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">To Date</label>
            <input type="date" className="w-full p-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setDates({...dates, end: e.target.value})} />
          </div>
          <button onClick={fetchReport} className="bg-indigo-600 text-white p-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Search size={18}/>} Generate
          </button>
          <button onClick={exportToExcel} disabled={data.length === 0} className="bg-emerald-600 text-white p-3 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-30 hover:bg-emerald-700 transition-all">
            <FileSpreadsheet size={18}/> Export
          </button>
        </div>

        {/* Table View */}
        {data.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    {["Date", "Customer", "Payment", "Status", "Amount"].map(h => <th key={h} className="p-4 text-left font-black text-slate-400 uppercase">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.map((o) => (
                    <tr key={o._id} className="hover:bg-slate-50">
                      <td className="p-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 font-bold">{o.user?.name || o.name}</td>
                      <td className="p-4">{o.paymentMethod}</td>
                      <td className="p-4"><span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold uppercase">{o.status}</span></td>
                      <td className="p-4 font-black text-indigo-600">${o.total}</td>
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
export default ReportSystem;