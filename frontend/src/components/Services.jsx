import React from 'react';
import { services } from '../data/mock';
import { Card, CardContent } from './ui/card';
import { Cake, Users, Cookie, ShoppingCart } from 'lucide-react';

const iconMap = {
  cake: Cake,
  users: Users,
  cookie: Cookie,
  'shopping-cart': ShoppingCart
};

export const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-[#F5EDE0] relative overflow-hidden">
      {/* Vintage Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-[#C9A875] text-8xl">❦</div>
        <div className="absolute bottom-20 right-20 text-[#C9A875] text-8xl">✦</div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#E8B4B8]/30 border-2 border-[#E8B4B8] text-[#5c3a3a] mb-6 relative">
            <span className="font-['Cormorant_Garamond'] text-sm font-semibold tracking-[0.3em]">NUESTROS SERVICIOS</span>
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
            Lo Que Hacemos Mejor
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
            <span className="text-[#C9A875] text-2xl">❦</span>
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
          </div>
          <p className="text-xl text-[#8B6F6F] max-w-2xl mx-auto font-['Cormorant_Garamond'] italic">
            Servicios personalizados para hacer de tu evento algo inolvidable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className="group text-center border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-[#F5EDE0] relative"
              >
                {/* Vintage Corner Decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A875] opacity-50"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A875] opacity-50"></div>
                
                <CardContent className="p-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-[#E8B4B8]/30 border-4 border-[#E8B4B8] flex items-center justify-center group-hover:bg-[#E8B4B8] group-hover:border-[#C9A5A5] transition-all duration-500 relative">
                    <Icon className="w-10 h-10 text-[#8B6F6F] group-hover:text-[#F5EDE0] transition-colors duration-500" />
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875]"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C9A875]"></div>
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-3 group-hover:text-[#8B6F6F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#8B6F6F] leading-relaxed font-['Cormorant_Garamond']">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section - Vintage Style */}
        <div className="mt-20 relative overflow-hidden border-8 border-[#E8B4B8]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1737700089128-cbbb2dc71631"
              alt="Servicio especial"
              className="w-full h-full object-cover sepia-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A5A5]/95 to-[#E8B4B8]/95"></div>
            {/* Vintage Pattern Overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)`
              }}
            ></div>
          </div>
          <div className="relative z-10 py-20 px-8 text-center text-[#5c3a3a]">
            {/* Decorative Top */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-[#C9A875] text-3xl">✦</span>
              <div className="w-32 h-0.5 bg-[#C9A875]"></div>
              <span className="text-[#C9A875] text-3xl">❦</span>
              <div className="w-32 h-0.5 bg-[#C9A875]"></div>
              <span className="text-[#C9A875] text-3xl">✦</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
              ¿Tienes un evento especial?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto font-['Cormorant_Garamond'] text-[#5c3a3a]">
              Contáctanos para crear algo único y personalizado para tu celebración
            </p>
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#F5EDE0] text-[#5c3a3a] px-10 py-4 font-['Cormorant_Garamond'] font-bold text-lg hover:bg-[#EDE0D4] transition-colors inline-flex items-center gap-3 shadow-xl border-4 border-[#C9A5A5] relative group overflow-hidden"
            >
              <span className="relative z-10">Solicitar Cotización</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            {/* Decorative Bottom */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-32 h-0.5 bg-[#C9A875]"></div>
              <span className="text-[#C9A875] text-2xl">✦</span>
              <div className="w-32 h-0.5 bg-[#C9A875]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
