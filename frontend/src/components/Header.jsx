import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Instagram, Phone } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'productos', label: 'Productos' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-2xl font-bold group"
          >
            <span className={`transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Dulce
            </span>
            <span className="text-rose-500">Sal</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium transition-colors hover:text-rose-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/dulcesal_pasteleria"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-rose-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Button
              size="sm"
              className="bg-rose-500 hover:bg-rose-600 text-white"
              onClick={() => scrollToSection('contacto')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Llámanos
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 px-4 pt-4 border-t border-gray-200">
                <a
                  href="https://www.instagram.com/dulcesal_pasteleria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-rose-500"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <Button
                  size="sm"
                  className="bg-rose-500 hover:bg-rose-600 text-white flex-1"
                  onClick={() => scrollToSection('contacto')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Llámanos
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
