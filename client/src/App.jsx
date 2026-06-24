import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Context
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

// Components & Pages
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryIcons from './components/CategoryIcons';
import MenuSection from './components/MenuSection';
import ChefSection from './components/ChefSection';
import StorySection from './components/StorySection';
import AmbienceSection from './components/AmbienceSection';
import TestimonialSection from './components/TestimonialSection';
import ContactLocation from './components/ContactLocation';
import NewsletterSection from './components/NewsletterSection';
import FAQSection from './components/FAQSection';
import Register from './components/Register';
import Login from './components/Login';
import ReservationPage from './pages/ReservationPage';
import MenuPage from './pages/MenuPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';



// Admin Imports
import AdminDashboard from './pages/AdminDashboard';
import UserDetails from './pages/UserDetails';
import AdminLayout from './layouts/AdminLayout'; // Tumhari nayi layout file

function App() {

 

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            
            {/* PUBLIC ROUTES (Jahan Navbar, Drawer aur Footer aayenge) */}
            <Route element={<> <Navbar /> <CartDrawer /> <Outlet /> <Footer /> </>}>
              <Route path="/" element={
                <>
                  <Hero /> <CategoryIcons /> <MenuSection /> <ChefSection /> 
                  <StorySection /> <AmbienceSection /> <TestimonialSection /> 
                  <FAQSection /> <ContactLocation /> <NewsletterSection />
                </>
              } />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reserve" element={<ReservationPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />


              <Route path="/profile" element={
  <ProtectedRoute adminOnly={false}>
    <ProfilePage />
  </ProtectedRoute>
} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<CheckoutSuccess />} />
              <Route path="/cancel" element={<CheckoutCancel />} />
            </Route>

            {/* ADMIN ROUTES (Yahan Navbar/Footer nahi aayenge) */}
         <Route path="/admin-dashboard" element={
  <ProtectedRoute adminOnly={true}>
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route index element={<AdminDashboard />} />
  <Route path="user/:id" element={<UserDetails />} />
</Route>

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;