import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mock';

export const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor recompensa
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-2 border-gray-100 hover:border-rose-200 transition-all duration-300 hover:shadow-xl bg-white"
            >
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(testimonial.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 mb-1">100%</div>
            <div className="text-gray-600">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 mb-1">5.0</div>
            <div className="text-gray-600">Calificación</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 mb-1">500+</div>
            <div className="text-gray-600">Reseñas</div>
          </div>
        </div>
      </div>
    </section>
  );
};
