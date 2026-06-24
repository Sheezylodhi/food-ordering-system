import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

   useEffect(() => {
  const fetchData = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    
    try {
      // User aur uske orders dono le aao
      const { data: userData } = await axios.get(`${apiBaseUrl}/api/admin/users/${id}`);
      const { data: orderData } = await axios.get(`${apiBaseUrl}/api/admin/orders-by-email/${userData.email}`);
      
      setUser(userData);
      setOrders(orderData);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  
  fetchData();
}, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-10">
            {/* User Details */}
            <div className="bg-white p-6 shadow rounded mb-8">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p>Email: {user.email}</p>
            </div>

            {/* Orders Table */}
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <table className="w-full border text-left">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id} className="border-b">
                            <td className="p-3">{o._id}</td>
                            <td className="p-3">${o.total}</td>
                            <td className="p-3">{o.status}</td>
                            <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserDetails;