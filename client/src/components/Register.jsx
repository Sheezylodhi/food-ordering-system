import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function Register() {
  const [step, setStep] = useState(1); // 1 = Form, 2 = OTP
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', formData);
      setStep(2);
    } catch (err) { alert(err.response?.data?.error || "Registration Failed"); }
  };

// Register.jsx mein yeh logic use karo
const handleVerify = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/verify-otp', { 
      email: formData.email, 
      otp: otp // .trim() ki zaroorat nahi agar input type text hai
    });
    
    alert(response.data.message);
    window.location.href = '/login';
  } catch (err) { 
    // Yahan console.log karo taaki pta chale server kya error bhej raha hai
    console.log(err.response?.data); 
    alert(err.response?.data?.error || "Invalid OTP"); 
  }
};

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* LEFT: IMAGE SIDE (Same as Login) */}
      <div className="hidden lg:flex w-1/2 bg-orange-50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/10" />
        <div className="z-10 text-center">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000" 
               alt="Food" className="rounded-3xl shadow-2xl mb-8 transform hover:scale-105 transition duration-500" />
          <h2 className="text-4xl font-black text-gray-900 mb-4">Join our <br/> food community!</h2>
          <p className="text-gray-600 font-bold">Create an account to start ordering your favorite meals.</p>
        </div>
      </div>

      {/* RIGHT: FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-black mb-2">{step === 1 ? "Create Account" : "Verify Email"}</h2>
            <p className="text-gray-400 font-bold">
              {step === 1 ? "Already have an account?" : "Check your email for the code."}
              <Link to="/login" className="text-orange-600 ml-2 hover:underline">
                {step === 1 ? "Sign In" : "Back to Login"}
              </Link>
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={20} />
                <input type="text" placeholder="Full Name" className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-orange-500" 
                       onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
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
                Register <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-4 text-orange-500" size={20} />
                <input type="text" maxLength="6" placeholder="Enter 6-digit OTP" className="w-full p-4 pl-12 rounded-2xl bg-gray-50 border-none outline-none text-center text-xl tracking-widest focus:ring-2 focus:ring-orange-500" 
                       onChange={(e) => setOtp(e.target.value)} required />
              </div>
              <button onClick={handleVerify} className="w-full bg-green-600 text-white p-4 rounded-2xl font-bold hover:bg-green-700 transition">
                Verify & Complete
              </button>
              <button onClick={handleRegister} className="w-full text-sm font-bold text-gray-400 hover:text-black">
                Resend OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;