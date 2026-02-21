import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { getTestimonials } from '../services/api';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="testimonios" className="py-24 bg-gradient-to-b from-[#EDE0D4] to-[#F5EDE0] relative">
      {/* Vintage Decorative Elements */}
      <div className="absolute top-10 left-10 text-[#C9A875] text-6xl opacity-10">❦</div>
      <div className="absolute bottom-10 right-10 text-[#C9A875] text-6xl opacity-10">✦</div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#E8B4B8]/30 border-2 border-[#E8B4B8] text-[#5c3a3a] mb-6 relative">
            <span className="font-['Cormorant_Garamond'] text-sm font-semibold tracking-[0.3em]">TESTIMONIOS</span>
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
            <span className="text-[#C9A875] text-2xl">❦</span>
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
          </div>
          <p className="text-xl text-[#8B6F6F] max-w-2xl mx-auto font-['Cormorant_Garamond'] italic">
            La satisfacción de nuestros clientes es nuestra mejor recompensa
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#E8B4B8] border-t-transparent"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-lg font-['Cormorant_Garamond'] text-[#8B6F6F]">
                No hay testimonios disponibles
              </p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-[#F5EDE0] relative"
              >
              {/* Vintage Quote Mark */}
              <div className="absolute -top-4 left-6 text-[#C9A875] text-6xl font-['Playfair_Display'] opacity-40">"</div>
              
              {/* Vintage Corner Decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A875] opacity-50"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A875] opacity-50"></div>
              
              <CardContent className="p-8 pt-12">
                {/* Stars */}
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A875] text-[#C9A875]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#5c3a3a] mb-6 leading-relaxed font-['Cormorant_Garamond'] text-lg italic relative z-10">
                  {testimonial.comment}
                </p>

                {/* Decorative Divider */}
                <div className="w-16 h-0.5 bg-[#C9A875] mx-auto mb-6"></div>

                {/* Author */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E8B4B8] to-[#D8A7A7] border-4 border-[#C9A5A5] flex items-center justify-center text-[#F5EDE0] font-['Playfair_Display'] font-bold text-2xl shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <div className="font-['Playfair_Display'] font-semibold text-[#5c3a3a] text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">
                      {new Date(testimonial.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>

        {/* Trust Badges - Vintage Style */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-12 md:gap-20">
          <div className="text-center relative">
            <div className="text-5xl font-['Playfair_Display'] font-bold text-[#C9A875] mb-2">100%</div>
            <div className="text-[#8B6F6F] font-['Cormorant_Garamond'] tracking-wider">SATISFACCIÓN</div>
            <div className="absolute -top-2 -left-2 text-[#E8B4B8] text-2xl">✦</div>
          </div>
          <div className="text-center relative">
            <div className="text-5xl font-['Playfair_Display'] font-bold text-[#C9A875] mb-2">5.0</div>
            <div className="text-[#8B6F6F] font-['Cormorant_Garamond'] tracking-wider">CALIFICACIÓN</div>
            <div className="absolute -top-2 -left-2 text-[#E8B4B8] text-2xl">❦</div>
          </div>
          <div className="text-center relative">
            <div className="text-5xl font-['Playfair_Display'] font-bold text-[#C9A875] mb-2">500+</div>
            <div className="text-[#8B6F6F] font-['Cormorant_Garamond'] tracking-wider">RESEÑAS</div>
            <div className="absolute -top-2 -left-2 text-[#E8B4B8] text-2xl">✦</div>
          </div>
        </div>
      </div>
    </section>
  );
};
