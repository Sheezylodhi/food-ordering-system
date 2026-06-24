import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('role');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Agar page admin-only hai aur user admin nahi hai
  if (adminOnly && role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }
  
  return children;
};

export default ProtectedRoute;