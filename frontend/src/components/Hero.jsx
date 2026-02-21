import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1696721497670-d57754966c1e"
          alt="DulceSal Pastelería"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 py-32">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 bg-rose-100/90 backdrop-blur-sm text-rose-800 rounded-full text-sm font-medium mb-6">
              Repostería Artesanal desde 2020
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Dulce<span className="text-rose-300">Sal</span>
              <br />
              <span className="text-4xl md:text-5xl text-rose-100">Pastelería</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
              Creamos momentos inolvidables con nuestras tortas artesanales, 
              pasteles y postres hechos con amor y los mejores ingredientes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg group"
              onClick={scrollToProducts}
            >
              Ver Productos
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-white text-gray-900 px-8 py-6 text-lg"
              onClick={scrollToContact}
            >
              <Phone className="mr-2" />
              Contáctanos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-200">Clientes Felices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4+</div>
              <div className="text-gray-200">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-200">Recetas Únicas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
