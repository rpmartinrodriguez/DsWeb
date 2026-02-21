import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { Checkout } from './pages/Checkout';
import { AdminPanel } from './pages/AdminPanel';
import { AdminLogin } from './pages/AdminLogin';
import { Toaster } from './components/ui/sonner';
import './App.css';

const HomePage = () => (
  <>
    <Header />
    <div id="inicio">
      <Hero />
    </div>
    <Products />
    <Services />
    <About />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#E8B4B8] border-t-transparent"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Redirect if already authenticated
const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#E8B4B8] border-t-transparent"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route 
                path="/admin/login" 
                element={
                  <AuthRoute>
                    <AdminLogin />
                  </AuthRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <CartSidebar />
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
