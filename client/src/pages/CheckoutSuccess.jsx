import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Loader2 } from 'lucide-react';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || "N/A";

  const steps = ["Placed", "Preparing", "Out for Delivery", "Delivered"];
  const currentStep = 1; // 1 = Preparing (FoodPanda style)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Order Confirmed</h1>
          <p className="text-gray-500 font-bold text-sm">Order ID: <span className="text-black">{orderId}</span></p>
        </div>

        {/* Tracking Bar (FoodPanda Style) */}
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step} className={`text-[10px] font-black uppercase ${index <= currentStep ? 'text-black' : 'text-gray-300'}`}>
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full flex overflow-hidden">
            {steps.map((_, index) => (
              <div key={index} className={`flex-1 ${index <= currentStep ? 'bg-green-500' : ''}`} />
            ))}
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-orange-50 p-6 rounded-2xl flex items-center gap-4 mb-8">
          <div className="bg-orange-500 p-3 rounded-xl text-white animate-pulse">
            <Loader2 size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg">Preparing your food</h3>
            <p className="text-xs font-bold text-orange-700">Estimated Arrival: 25 mins</p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4">
          <Link to="/" className="flex-1 py-4 rounded-xl bg-gray-900 text-white font-bold text-center hover:bg-black">
            Back Home
          </Link>
          <button className="flex-1 py-4 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50">
            Contact Rider
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;