import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Utensils, Users, 
  Settings, Layers, ListOrdered, ChevronRight, 
  FileText, LogOut, Menu, X 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile ke liye state

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.replace('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', icon: <ShoppingBag size={20} /> },
    { name: 'Menu', icon: <Utensils size={20} /> },
    { name: 'ManageMenu', icon: <Layers size={20} /> },
    { name: 'Category', icon: <ListOrdered size={20} /> },
    { name: 'CategoryList', icon: <ListOrdered size={20} /> },
    { name: 'AdminUsers', icon: <Users size={20} />},
    { name: 'ReportSystem', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-950 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* OVERLAY (Jab mobile par sidebar open ho) */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR ASIDE */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-slate-950 text-slate-300 p-4 flex flex-col border-r border-slate-800 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="flex items-center gap-3 px-4 py-6 mb-6 mt-12 lg:mt-0">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Amber Oak</h2>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button 
                key={item.name}
                onClick={() => { setActiveTab(item.name); setIsOpen(false); }} // Click par band ho jaye
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-amber-600/10 text-amber-500 font-medium' : 'hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-amber-500' : 'text-slate-500'}>{item.icon}</span>
                  <span className="text-[14px]">{item.name.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                {isActive && <ChevronRight size={16} className="text-amber-500" />}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="text-[14px]">Settings</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-[14px]">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;