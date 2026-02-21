import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { MapPin, Phone, Mail, Clock, Instagram, Send } from 'lucide-react';
import { contactInfo } from '../data/mock';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast.success('¡Mensaje enviado!', {
      description: 'Nos pondremos en contacto contigo pronto.',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-[#F5EDE0] to-[#EDE0D4]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#E8B4B8]/30 border-2 border-[#E8B4B8] text-[#5c3a3a] mb-6 relative">
            <span className="font-['Cormorant_Garamond'] text-sm font-semibold tracking-[0.3em]">CONTÁCTANOS</span>
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
            Hablemos de Tu Próximo Evento
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
            <span className="text-[#C9A875] text-2xl">❦</span>
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
          </div>
          <p className="text-xl text-[#8B6F6F] max-w-2xl mx-auto font-['Cormorant_Garamond'] italic">
            Estamos listos para hacer realidad tus ideas más dulces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Cards - Vintage Style */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] transition-colors bg-[#F5EDE0] relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-[#8B6F6F]" />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2 text-lg">Teléfono</h3>
                <a href={`tel:${contactInfo.phone}`} className="text-[#8B6F6F] hover:text-[#E8B4B8] transition-colors font-['Cormorant_Garamond']">
                  {contactInfo.phone}
                </a>
              </CardContent>
            </Card>

            <Card className="border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] transition-colors bg-[#F5EDE0] relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-[#8B6F6F]" />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2 text-lg">Email</h3>
                <a href={`mailto:${contactInfo.email}`} className="text-[#8B6F6F] hover:text-[#E8B4B8] transition-colors break-all font-['Cormorant_Garamond']">
                  {contactInfo.email}
                </a>
              </CardContent>
            </Card>

            <Card className="border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] transition-colors bg-[#F5EDE0] relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-[#8B6F6F]" />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2 text-lg">Ubicación</h3>
                <p className="text-[#8B6F6F] font-['Cormorant_Garamond']">{contactInfo.address}</p>
              </CardContent>
            </Card>

            <Card className="border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] transition-colors bg-[#F5EDE0] relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-[#8B6F6F]" />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2 text-lg">Horario</h3>
                <p className="text-[#8B6F6F] text-sm leading-relaxed font-['Cormorant_Garamond']">{contactInfo.hours}</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-rose-100 shadow-xl bg-white">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+57 300 123 4567"
                      required
                      className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu evento o el producto que deseas..."
                      rows={6}
                      required
                      className="border-gray-300 focus:border-rose-500 focus:ring-rose-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">O síguenos en nuestras redes</p>
                  <div className="flex justify-center gap-4">
                    <a
                      href={contactInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-rose-100 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <Instagram className="w-6 h-6 text-rose-600 group-hover:text-white transition-colors" />
                    </a>
                    <a
                      href={contactInfo.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-rose-100 hover:bg-rose-500 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <Phone className="w-6 h-6 text-rose-600 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
