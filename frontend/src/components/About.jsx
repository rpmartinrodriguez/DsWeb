import React from 'react';
import { Button } from './ui/button';
import { Award, Heart, Users } from 'lucide-react';

export const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/29696186/pexels-photo-29696186.jpeg"
                alt="Nuestra Pastelería"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-bold text-rose-600 mb-1">4+</div>
              <div className="text-gray-700 font-medium">Años de Pasión</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium mb-4">
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pasión por la Repostería Artesanal
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              DulceSal nació en 2020 con un sueño simple: crear postres que no solo 
              endulcen el paladar, sino que también alimenten el alma. Cada receta es 
              el resultado de años de perfeccionamiento y amor por la repostería.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Utilizamos únicamente ingredientes premium, seleccionados cuidadosamente, 
              y técnicas artesanales que garantizan la más alta calidad en cada bocado. 
              Nuestro compromiso es hacer de cada celebración un momento inolvidable.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hecho con Amor</h4>
                  <p className="text-gray-600">Cada producto es elaborado con dedicación y pasión</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Calidad Premium</h4>
                  <p className="text-gray-600">Solo utilizamos los mejores ingredientes del mercado</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Atención Personalizada</h4>
                  <p className="text-gray-600">Trabajamos contigo para crear el postre perfecto</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conoce Más de Nosotros
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
