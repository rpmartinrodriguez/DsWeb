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
          ? 'bg-[#F5EDE0]/98 backdrop-blur-md shadow-lg border-b-2 border-[#E8B4B8]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Vintage Logo */}
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-2xl font-['Playfair_Display'] font-bold group relative"
          >
            <span className={`transition-colors ${isScrolled ? 'text-[#5c3a3a]' : 'text-[#F5EDE0]'}`}>
              Dulce
            </span>
            <span className="text-[#E8B4B8] italic">Sal</span>
            <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isScrolled ? 'bg-[#E8B4B8]' : 'bg-[#F5EDE0]'}`}></div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-['Cormorant_Garamond'] font-semibold text-base transition-colors hover:text-[#E8B4B8] relative group ${
                  isScrolled ? 'text-[#5c3a3a]' : 'text-[#F5EDE0]'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8B4B8] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/dulcesal_pasteleria"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-[#E8B4B8] ${
                isScrolled ? 'text-[#5c3a3a]' : 'text-[#F5EDE0]'
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Button
              size="sm"
              className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5] shadow-md"
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
              <X className={`w-6 h-6 ${isScrolled ? 'text-[#5c3a3a]' : 'text-[#F5EDE0]'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#5c3a3a]' : 'text-[#F5EDE0]'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 bg-[#F5EDE0]/98 backdrop-blur-md rounded-b-2xl shadow-xl border-b-2 border-[#E8B4B8]">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-2 text-[#5c3a3a] hover:text-[#E8B4B8] hover:bg-[#EDE0D4] font-['Cormorant_Garamond'] font-semibold transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 px-4 pt-4 border-t-2 border-[#E8B4B8]">
                <a
                  href="https://www.instagram.com/dulcesal_pasteleria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5c3a3a] hover:text-[#E8B4B8]"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <Button
                  size="sm"
                  className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5] flex-1"
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
