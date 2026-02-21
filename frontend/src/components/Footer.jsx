import React from 'react';
import { Instagram, Mail, Phone, Heart } from 'lucide-react';
import { contactInfo } from '../data/mock';

export const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">Dulce</span>
              <span className="text-rose-500">Sal</span>
            </div>
            <p className="text-gray-400 mb-6">
              Creando momentos dulces e inolvidables desde 2020
            </p>
            <div className="flex gap-4">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-10 h-10 bg-gray-800 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="hover:text-rose-500 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('productos')}
                  className="hover:text-rose-500 transition-colors"
                >
                  Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="hover:text-rose-500 transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nosotros')}
                  className="hover:text-rose-500 transition-colors"
                >
                  Nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-3">
              <li className="hover:text-rose-500 transition-colors cursor-pointer">
                Tortas Personalizadas
              </li>
              <li className="hover:text-rose-500 transition-colors cursor-pointer">
                Eventos & Catering
              </li>
              <li className="hover:text-rose-500 transition-colors cursor-pointer">
                Panadería Artesanal
              </li>
              <li className="hover:text-rose-500 transition-colors cursor-pointer">
                Pedidos Online
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-rose-500 transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-rose-500 transition-colors break-all">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} DulceSal Pastelería. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> para endulzar tu vida
          </p>
        </div>
      </div>
    </footer>
  );
};
