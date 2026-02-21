import React from 'react';
import { Instagram, Mail, Phone, Heart } from 'lucide-react';
import { contactInfo } from '../data/mock';

export const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#5c3a3a] text-[#EDE0D4] relative">
      {/* Decorative Top Border */}
      <div className="h-2 bg-gradient-to-r from-[#E8B4B8] via-[#C9A875] to-[#E8B4B8]"></div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-3xl font-['Playfair_Display'] font-bold mb-4">
              <span className="text-[#F5EDE0]">Dulce</span>
              <span className="text-[#E8B4B8] italic">Sal</span>
            </div>
            <div className="w-24 h-0.5 bg-[#C9A875] mb-4"></div>
            <p className="text-[#C9A5A5] mb-6 font-['Cormorant_Garamond'] leading-relaxed">
              Creando momentos dulces e inolvidables desde 2020
            </p>
            <div className="flex gap-4">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#8B6F6F] hover:bg-[#E8B4B8] border-2 border-[#C9A5A5] flex items-center justify-center transition-colors group relative"
              >
                <Instagram className="w-6 h-6 text-[#EDE0D4] group-hover:text-[#5c3a3a]" />
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href={contactInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#8B6F6F] hover:bg-[#E8B4B8] border-2 border-[#C9A5A5] flex items-center justify-center transition-colors group relative"
              >
                <Phone className="w-6 h-6 text-[#EDE0D4] group-hover:text-[#5c3a3a]" />
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-12 h-12 bg-[#8B6F6F] hover:bg-[#E8B4B8] border-2 border-[#C9A5A5] flex items-center justify-center transition-colors group relative"
              >
                <Mail className="w-6 h-6 text-[#EDE0D4] group-hover:text-[#5c3a3a]" />
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F5EDE0] font-['Playfair_Display'] font-bold mb-4 text-lg">Enlaces Rápidos</h3>
            <div className="w-16 h-0.5 bg-[#C9A875] mb-4"></div>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="hover:text-[#E8B4B8] transition-colors font-['Cormorant_Garamond'] hover:translate-x-1 inline-block"
                >
                  → Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('productos')}
                  className="hover:text-[#E8B4B8] transition-colors font-['Cormorant_Garamond'] hover:translate-x-1 inline-block"
                >
                  → Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-[#E8B4B8] transition-colors font-['Cormorant_Garamond'] hover:translate-x-1 inline-block"
                >
                  → Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nosotros')}
                  className="hover:text-[#E8B4B8] transition-colors font-['Cormorant_Garamond'] hover:translate-x-1 inline-block"
                >
                  → Nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#F5EDE0] font-['Playfair_Display'] font-bold mb-4 text-lg">Servicios</h3>
            <div className="w-16 h-0.5 bg-[#C9A875] mb-4"></div>
            <ul className="space-y-3">
              <li className="hover:text-[#E8B4B8] transition-colors cursor-pointer font-['Cormorant_Garamond']">
                ✦ Tortas Personalizadas
              </li>
              <li className="hover:text-[#E8B4B8] transition-colors cursor-pointer font-['Cormorant_Garamond']">
                ✦ Eventos & Catering
              </li>
              <li className="hover:text-[#E8B4B8] transition-colors cursor-pointer font-['Cormorant_Garamond']">
                ✦ Panadería Artesanal
              </li>
              <li className="hover:text-[#E8B4B8] transition-colors cursor-pointer font-['Cormorant_Garamond']">
                ✦ Pedidos Online
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#F5EDE0] font-['Playfair_Display'] font-bold mb-4 text-lg">Contacto</h3>
            <div className="w-16 h-0.5 bg-[#C9A875] mb-4"></div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-[#E8B4B8] transition-colors font-['Cormorant_Garamond']">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-[#E8B4B8] transition-colors break-all font-['Cormorant_Garamond']">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-['Cormorant_Garamond']">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-[#8B6F6F] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#C9A5A5] text-sm text-center md:text-left font-['Cormorant_Garamond']">
            © {new Date().getFullYear()} DulceSal Pastelería. Todos los derechos reservados.
          </p>
          <p className="text-[#C9A5A5] text-sm flex items-center gap-2 font-['Cormorant_Garamond']">
            Hecho con <Heart className="w-4 h-4 text-[#E8B4B8] fill-[#E8B4B8]" /> para endulzar tu vida
          </p>
        </div>
      </div>
    </footer>
  );
};
