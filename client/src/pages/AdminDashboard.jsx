import React, { useState } from 'react';
// Sidebar ka import hata do yahan se
import AddMenu from '../components/admin/AddMenu';
import ManageMenu from '../components/admin/ManageMenu';
import CategoryManager from '../components/admin/CategoryManager';
import CategoryList from '../components/admin/CategoryList';
import AdminOrders from '../components/admin/AdminOrders';
import AdminUsers from '../components/admin/AdminUsers';
import Dashboard from '../components/admin/Dashboard';
import ReportSystem from '../components/admin/ReportSystem';

import { useOutletContext } from 'react-router-dom';

const AdminDashboard = () => {
  // Yahan activeTab ki state hai, lekin isay Sidebar se control hona chahiye
  // Isliye hum yahan se state hata kar Layout mein move karenge
const { activeTab } = useOutletContext();
  

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{activeTab}</h1>
      
      {activeTab === 'Dashboard' && <Dashboard />}
      {activeTab === 'Orders' && <AdminOrders />}
      {activeTab === 'Menu' && <AddMenu />}
      {activeTab === 'ManageMenu' && <ManageMenu />}
      {activeTab === 'Category' && <CategoryManager />}
      {activeTab === 'CategoryList' && <CategoryList />}
      {activeTab === 'AdminUsers' && <AdminUsers />}
      {activeTab === 'ReportSystem' && <ReportSystem />}

    </>
  );
};
export default AdminDashboard;