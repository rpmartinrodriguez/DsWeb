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
      {/* Background Image with Vintage Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1696721497670-d57754966c1e"
          alt="DulceSal Pastelería"
          className="w-full h-full object-cover sepia-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5c3a3a]/85 via-[#8B6F6F]/70 to-transparent"></div>
        {/* Vintage Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(92, 58, 58, 0.3) 100%)'
        }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 py-32">
        <div className="max-w-3xl">
          {/* Vintage Decorative Corner */}
          <div className="absolute top-0 left-0 text-[#C9A875] text-6xl opacity-40 select-none">❦</div>
          
          <div className="animate-fade-in">
            <div className="inline-block px-6 py-3 bg-[#F5EDE0]/95 backdrop-blur-sm border-2 border-[#E8B4B8] text-[#8B6F6F] mb-8 relative">
              <span className="font-['Cormorant_Garamond'] text-base font-semibold tracking-widest">
                ~ REPOSTERÍA ARTESANAL DESDE 2020 ~
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-[#F5EDE0] mb-6 leading-tight tracking-tight">
              Dulce<span className="text-[#E8B4B8] italic">Sal</span>
              <br />
              <span className="text-5xl md:text-6xl text-[#EDE0D4] font-light tracking-wider">Pastelería</span>
            </h1>
            
            {/* Decorative Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#C9A875] to-transparent mb-6 relative">
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 text-[#C9A875] text-xl">✦</span>
            </div>
            
            <p className="text-xl md:text-2xl text-[#EDE0D4] mb-8 leading-relaxed font-['Cormorant_Garamond'] font-light">
              Creamos momentos inolvidables con nuestras tortas artesanales, 
              pasteles y postres hechos con amor y los mejores ingredientes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] px-8 py-6 text-lg font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5] shadow-lg group relative overflow-hidden"
              onClick={scrollToProducts}
            >
              <span className="relative z-10">Ver Productos</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-[#C9A5A5] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-[#F5EDE0]/95 backdrop-blur-sm hover:bg-[#EDE0D4] border-3 border-[#E8B4B8] text-[#5c3a3a] px-8 py-6 text-lg font-['Cormorant_Garamond'] font-semibold shadow-lg"
              onClick={scrollToContact}
            >
              <Phone className="mr-2" />
              Contáctanos
            </Button>
          </div>

          {/* Stats - Vintage Style */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t-2 border-[#E8B4B8]/40 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5c3a3a] px-4">
              <span className="text-[#C9A875] text-xl">✦</span>
            </div>
            <div className="text-center">
              <div className="text-5xl font-['Playfair_Display'] font-bold text-[#E8B4B8] mb-2">500+</div>
              <div className="text-[#EDE0D4] font-['Cormorant_Garamond'] text-sm tracking-wider">CLIENTES FELICES</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-['Playfair_Display'] font-bold text-[#E8B4B8] mb-2">4+</div>
              <div className="text-[#EDE0D4] font-['Cormorant_Garamond'] text-sm tracking-wider">AÑOS DE EXPERIENCIA</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-['Playfair_Display'] font-bold text-[#E8B4B8] mb-2">50+</div>
              <div className="text-[#EDE0D4] font-['Cormorant_Garamond'] text-sm tracking-wider">RECETAS ÚNICAS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vintage Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-[#E8B4B8]/70 rounded-full flex items-start justify-center p-2 bg-[#F5EDE0]/20 backdrop-blur-sm">
            <div className="w-1 h-3 bg-[#E8B4B8] rounded-full"></div>
          </div>
          <span className="text-[#E8B4B8] text-xs font-['Cormorant_Garamond'] tracking-widest">DESCUBRE</span>
        </div>
      </div>
    </section>
  );
};
