import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(`http://localhost:5001${endpoint}`, formData);
      
      // Dono (User/Admin) ke liye same key rakho
      localStorage.setItem('adminToken', res.data.token); 
      localStorage.setItem('role', res.data.role);

      window.dispatchEvent(new Event('login-success'));
      alert(isLogin ? "Welcome Back!" : "Account Created!");

      // Redirection Logic
      // Agar Admin hai toh hard reload (security) aur agar User hai toh normal navigation
      if (res.data.role === 'admin') {
        window.location.replace('/admin-dashboard');
      } else {
        navigate('/profile');
      }
      
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
};

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* LEFT: IMAGE SIDE */}
      <div className="hidden lg:flex w-1/2 bg-orange-50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/10" />
        <div className="z-10 text-center">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000" 
               alt="Food" className="rounded-3xl shadow-2xl mb-8 transform hover:scale-105 transition duration-500" />
          <h2 className="text-4xl font-black text-gray-900 mb-4">Craving something <br/> delicious?</h2>
          <p className="text-gray-600 font-bold">Sign in to track your order and get exclusive deals.</p>
        </div>
      </div>

      {/* RIGHT: FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-black mb-2">{isLogin ? "Welcome Back!" : "Create Account"}</h2>
           <p className="text-gray-400 font-bold">
  Don't have an account? 
  {/* Yahan Link component use karein */}
  <Link to="/register" className="text-orange-600 ml-2 hover:underline">
    Register
  </Link>
</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={20} />
                <input type="text" placeholder="Full Name" className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-orange-500" 
                       onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="email" placeholder="Email Address" className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-orange-500" 
                     onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="password" placeholder="Password" className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-orange-500" 
                     onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>

            <button type="submit" className="w-full bg-black text-white p-4 rounded-2xl font-bold hover:bg-gray-800 flex items-center justify-center gap-2 transition">
              {isLogin ? "Sign In" : "Register"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-bold text-gray-400">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <GoogleLogin
            onSuccess={async (res) => { /* Google logic */ }}
            theme="outline"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;