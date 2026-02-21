import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
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

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          <CartSidebar />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
