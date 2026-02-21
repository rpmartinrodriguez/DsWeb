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
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo Que Hacemos Mejor
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                className="group text-center border-2 border-gray-100 hover:border-rose-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-rose-100 rounded-2xl flex items-center justify-center group-hover:bg-rose-500 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-rose-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1737700089128-cbbb2dc71631"
              alt="Servicio especial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600/95 to-pink-600/95"></div>
          </div>
          <div className="relative z-10 py-20 px-8 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Tienes un evento especial?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-rose-50">
              Contáctanos para crear algo único y personalizado para tu celebración
            </p>
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-rose-50 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Solicitar Cotización
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
