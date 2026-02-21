import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const WHATSAPP_NUMBER = '5493446410814';

  const openWhatsApp = (message) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Options Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border-2 border-[#E8B4B8] overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-green-500 text-white p-4">
            <h3 className="font-['Playfair_Display'] font-bold text-lg">¡Hola! 👋</h3>
            <p className="text-sm opacity-90">¿Cómo podemos ayudarte?</p>
          </div>
          
          <div className="p-3 space-y-2">
            <button
              onClick={() => openWhatsApp('¡Hola! Me gustaría hacer un pedido 🧁')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#F5EDE0] transition-colors group"
            >
              <span className="font-semibold text-[#5c3a3a] group-hover:text-green-600">
                🛒 Hacer un pedido
              </span>
              <p className="text-xs text-[#8B6F6F] mt-1">Te ayudamos a elegir</p>
            </button>
            
            <button
              onClick={() => openWhatsApp('¡Hola! Quisiera información sobre tortas personalizadas 🎂')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#F5EDE0] transition-colors group"
            >
              <span className="font-semibold text-[#5c3a3a] group-hover:text-green-600">
                🎂 Tortas personalizadas
              </span>
              <p className="text-xs text-[#8B6F6F] mt-1">Cotiza tu torta ideal</p>
            </button>
            
            <button
              onClick={() => openWhatsApp('¡Hola! Tengo una consulta sobre un pedido 📦')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#F5EDE0] transition-colors group"
            >
              <span className="font-semibold text-[#5c3a3a] group-hover:text-green-600">
                📦 Consultar pedido
              </span>
              <p className="text-xs text-[#8B6F6F] mt-1">Estado de tu orden</p>
            </button>

            <button
              onClick={() => openWhatsApp('¡Hola! 🧁')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#F5EDE0] transition-colors group"
            >
              <span className="font-semibold text-[#5c3a3a] group-hover:text-green-600">
                💬 Otra consulta
              </span>
              <p className="text-xs text-[#8B6F6F] mt-1">Escríbenos libremente</p>
            </button>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        data-testid="whatsapp-float-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? 'bg-[#5c3a3a] rotate-90' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>
      )}
    </div>
  );
};
