import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar yahan ek hi baar aayega */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 flex-1 p-8">
        {/* Outlet mein tumhara Dashboard page jayega, 
            Lekin agar tum tabs switch karna chahte ho, 
            toh AdminDashboard ko 'activeTab' as a prop pass karna hoga */}
        <Outlet context={{ activeTab, setActiveTab }} />
      </main>
    </div>
  );
};

export default AdminLayout;