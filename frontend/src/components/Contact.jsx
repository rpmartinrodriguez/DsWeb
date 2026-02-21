import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { MapPin, Phone, Mail, Clock, Instagram, Send } from 'lucide-react';
import { getSiteConfig, submitContact } from '../services/api';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const config = await getSiteConfig();
      setContactInfo(config);
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContact(formData);
      toast.success('¡Mensaje enviado!', {
        description: 'Nos pondremos en contacto contigo pronto.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact:', error);
      toast.error('Error al enviar el mensaje', {
        description: 'Por favor, intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!contactInfo) return null;

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

          {/* Contact Form - Vintage Style */}
          <div className="lg:col-span-2">
            <Card className="border-6 border-[#E8B4B8] shadow-2xl bg-[#F5EDE0] relative">
              {/* Vintage Corner Decorations */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-3 border-l-3 border-[#C9A875]"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t-3 border-r-3 border-[#C9A875]"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-3 border-l-3 border-[#C9A875]"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-3 border-r-3 border-[#C9A875]"></div>
              
              <CardContent className="p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                        NOMBRE COMPLETO *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] focus:ring-[#E8B4B8] bg-[#F5EDE0] font-['Cormorant_Garamond']"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                        EMAIL *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] focus:ring-[#E8B4B8] bg-[#F5EDE0] font-['Cormorant_Garamond']"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                      TELÉFONO *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+57 300 123 4567"
                      required
                      className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] focus:ring-[#E8B4B8] bg-[#F5EDE0] font-['Cormorant_Garamond']"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                      MENSAJE *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu evento o el producto que deseas..."
                      rows={6}
                      required
                      className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] focus:ring-[#E8B4B8] resize-none bg-[#F5EDE0] font-['Cormorant_Garamond']"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-bold text-lg border-4 border-[#C9A5A5] shadow-lg relative group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {loading ? 'Enviando...' : 'Enviar Mensaje'}
                    </span>
                    <div className="absolute inset-0 bg-[#C9A5A5] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Button>
                </form>

                {/* Social Links - Vintage Style */}
                <div className="mt-10 pt-10 border-t-2 border-[#E8B4B8]">
                  <p className="text-center text-[#8B6F6F] mb-6 font-['Cormorant_Garamond'] text-lg">O síguenos en nuestras redes</p>
                  <div className="flex justify-center gap-6">
                    <a
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] hover:bg-[#E8B4B8] flex items-center justify-center transition-colors group relative"
                    >
                      <Instagram className="w-7 h-7 text-[#8B6F6F] group-hover:text-[#F5EDE0] transition-colors" />
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875]"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C9A875]"></div>
                    </a>
                    <a
                      href={contactInfo.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-[#E8B4B8]/40 border-3 border-[#E8B4B8] hover:bg-[#E8B4B8] flex items-center justify-center transition-colors group relative"
                    >
                      <Phone className="w-7 h-7 text-[#8B6F6F] group-hover:text-[#F5EDE0] transition-colors" />
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#C9A875]"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#C9A875]"></div>
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
