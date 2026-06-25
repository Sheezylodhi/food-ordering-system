import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full lg:ml-64 p-10 md:p-8 transition-all duration-300">
        <Outlet context={{ activeTab, setActiveTab }} />
      </main>
    </div>
  );
};

export default AdminLayout;