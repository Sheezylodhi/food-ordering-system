import React, { useState } from 'react';
import axios from 'axios';
import { Download, Search, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

const ReportSystem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({ start: '', end: '' });

  const fetchReport = async () => {
    if (!dates.start || !dates.end) return alert("Select Date Range!");
    setLoading(true);
    try {
      const { data: response } = await axios.get(`http://localhost:5001/api/admin/reports`, {
        params: { start: dates.start, end: dates.end }
      });
      setData(response);
    } catch (err) { alert("Error fetching report"); }
    finally { setLoading(false); }
  };

  const exportToExcel = () => {
    // Excel mein jo columns dikhne chahiye
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

    // Total Calculation for Footer
    const totalRevenue = data.reduce((sum, item) => sum + (item.total || 0), 0);
    excelData.push({ "Order Date": "GRAND TOTAL", "Total Amount": totalRevenue });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detailed Report");
    XLSX.writeFile(workbook, `Finance_Report_${dates.start}_to_${dates.end}.xlsx`);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Controls */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border mb-8 flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">From</label>
            <input type="date" className="w-full p-3 bg-slate-50 rounded-xl" onChange={(e) => setDates({...dates, start: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">To</label>
            <input type="date" className="w-full p-3 bg-slate-50 rounded-xl" onChange={(e) => setDates({...dates, end: e.target.value})} />
          </div>
          <button onClick={fetchReport} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
            <Search size={18}/> {loading ? "Loading..." : "Generate"}
          </button>
          <button onClick={exportToExcel} disabled={data.length === 0} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-30">
            <FileSpreadsheet size={18}/> Export Excel
          </button>
        </div>

        {/* Table View */}
        {data.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  {["Date", "Customer", "Payment", "Status", "Amount"].map(h => <th key={h} className="p-4 text-left font-black text-slate-400 uppercase">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((o) => (
                  <tr key={o._id}>
                    <td className="p-4">{new Date(o.createdAt).toLocaleString()}</td>
                    <td className="p-4 font-bold">{o.user?.name || o.name}</td>
                    <td className="p-4">{o.paymentMethod} ({o.paymentStatus})</td>
                    <td className="p-4"><span className="bg-slate-100 px-2 py-1 rounded-md">{o.status}</span></td>
                    <td className="p-4 font-black text-indigo-600">${o.total}</td>
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
export default ReportSystem;