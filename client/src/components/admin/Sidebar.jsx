import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, Utensils, Users, 
  Settings, Layers, ListOrdered, ChevronRight, 
  FileText, LogOut 
} from 'lucide-react'; // FileText aur LogOut import kiye

const Sidebar = ({ activeTab, setActiveTab }) => {
  
 const handleLogout = () => {
    localStorage.removeItem('adminToken');
    // Session ko server side se bhi clear karna ho toh yahan call maro
    window.location.replace('/login'); // .replace use karo, .href nahi
};

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', icon: <ShoppingBag size={20} /> },
    { name: 'Menu', icon: <Utensils size={20} /> },
    { name: 'ManageMenu', icon: <Layers size={20} /> },
    { name: 'Category', icon: <ListOrdered size={20} /> },
    { name: 'CategoryList', icon: <ListOrdered size={20} /> },
    { name: 'AdminUsers', icon: <Users size={20} />},
    { name: 'ReportSystem', icon: <FileText size={20} /> }, // Report Icon Update
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 h-screen p-4 flex flex-col border-r border-slate-800 fixed">
      <div className="flex items-center gap-3 px-4 py-6 mb-6">
        <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Amber Oak</h2>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive ? 'bg-amber-600/10 text-amber-500 font-medium' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-300'}>
                  {item.icon}
                </span>
                <span className="text-[14px]">{item.name.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-amber-500" />}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout Section */}
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
  );
};

export default Sidebar;