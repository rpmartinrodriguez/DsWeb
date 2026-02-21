import React from 'react';
import { Button } from './ui/button';
import { Award, Heart, Users } from 'lucide-react';

export const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-[#F5EDE0]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Vintage Frame */}
            <div className="relative border-8 border-[#E8B4B8] shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/29696186/pexels-photo-29696186.jpeg"
                alt="Nuestra Pastelería"
                className="w-full h-[600px] object-cover sepia-[0.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5c3a3a]/40 to-transparent"></div>
              
              {/* Vintage Corner Decorations on Frame */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#C9A875]"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#C9A875]"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#C9A875]"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#C9A875]"></div>
            </div>
            
            {/* Floating Card - Vintage Style */}
            <div className="absolute -bottom-8 -right-8 bg-[#E8B4B8] p-8 shadow-2xl border-4 border-[#C9A5A5] relative">
              <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-[#C9A875]"></div>
              <div className="text-5xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2">4+</div>
              <div className="text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold tracking-wider">AÑOS DE PASIÓN</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-block px-6 py-3 bg-[#E8B4B8]/30 border-2 border-[#E8B4B8] text-[#5c3a3a] mb-6 relative">
              <span className="font-['Cormorant_Garamond'] text-sm font-semibold tracking-[0.3em]">NUESTRA HISTORIA</span>
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A875]"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-6">
              Pasión por la Repostería Artesanal
            </h2>
            
            {/* Decorative Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-0.5 bg-[#C9A875]"></div>
              <span className="text-[#C9A875] text-xl">✦</span>
              <div className="flex-1 h-0.5 bg-[#E8B4B8]"></div>
            </div>
            
            <p className="text-lg text-[#5c3a3a] mb-6 leading-relaxed font-['Cormorant_Garamond']">
              DulceSal nació en 2020 con un sueño simple: crear postres que no solo 
              endulcen el paladar, sino que también alimenten el alma. Cada receta es 
              el resultado de años de perfeccionamiento y amor por la repostería.
            </p>
            <p className="text-lg text-[#5c3a3a] mb-8 leading-relaxed font-['Cormorant_Garamond']">
              Utilizamos únicamente ingredientes premium, seleccionados cuidadosamente, 
              y técnicas artesanales que garantizan la más alta calidad en cada bocado. 
              Nuestro compromiso es hacer de cada celebración un momento inolvidable.
            </p>

            {/* Features - Vintage Style */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8B4B8] transition-colors relative">
                  <Heart className="w-7 h-7 text-[#8B6F6F] group-hover:text-[#F5EDE0] transition-colors" />
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875]"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C9A875]"></div>
                </div>
                <div>
                  <h4 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-1 text-lg">Hecho con Amor</h4>
                  <p className="text-[#8B6F6F] font-['Cormorant_Garamond']">Cada producto es elaborado con dedicación y pasión</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8B4B8] transition-colors relative">
                  <Award className="w-7 h-7 text-[#8B6F6F] group-hover:text-[#F5EDE0] transition-colors" />
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875]"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C9A875]"></div>
                </div>
                <div>
                  <h4 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-1 text-lg">Calidad Premium</h4>
                  <p className="text-[#8B6F6F] font-['Cormorant_Garamond']">Solo utilizamos los mejores ingredientes del mercado</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8B4B8] transition-colors relative">
                  <Users className="w-7 h-7 text-[#8B6F6F] group-hover:text-[#F5EDE0] transition-colors" />
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875]"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C9A875]"></div>
                </div>
                <div>
                  <h4 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-1 text-lg">Atención Personalizada</h4>
                  <p className="text-[#8B6F6F] font-['Cormorant_Garamond']">Trabajamos contigo para crear el postre perfecto</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] px-10 py-6 font-['Cormorant_Garamond'] font-bold text-lg border-4 border-[#C9A5A5] shadow-lg relative group overflow-hidden"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Conoce Más de Nosotros</span>
              <div className="absolute inset-0 bg-[#C9A5A5] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
