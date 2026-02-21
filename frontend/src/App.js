import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App" id="inicio">
      <Header />
      <Hero />
      <Products />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
