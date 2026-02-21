import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartSidebar = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={toggleCart}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-[#F5EDE0] shadow-2xl z-50 flex flex-col border-l-4 border-[#E8B4B8]">
        {/* Header */}
        <div className="p-6 border-b-2 border-[#E8B4B8] bg-[#E8B4B8]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E8B4B8] border-3 border-[#C9A5A5] flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-[#5c3a3a]" />
              </div>
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#5c3a3a]">
                Tu Carrito
              </h2>
            </div>
            <button
              onClick={toggleCart}
              className="w-10 h-10 bg-[#E8B4B8] hover:bg-[#D8A7A7] border-2 border-[#C9A5A5] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-[#5c3a3a]" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-20 h-20 text-[#C9A5A5] mb-4" />
              <p className="text-xl font-['Cormorant_Garamond'] text-[#8B6F6F] mb-2">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-[#8B6F6F]">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F5EDE0] border-2 border-[#E8B4B8] p-4 relative"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover border-2 border-[#C9A5A5]"
                    />
                    <div className="flex-1">
                      <h3 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond'] mb-2">
                        {formatPrice(item.price)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-[#E8B4B8] hover:bg-[#D8A7A7] border-2 border-[#C9A5A5] flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 text-[#5c3a3a]" />
                        </button>
                        <span className="w-10 text-center font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-[#E8B4B8] hover:bg-[#D8A7A7] border-2 border-[#C9A5A5] flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 text-[#5c3a3a]" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-[#C9A5A5] hover:bg-[#B89090] border-2 border-[#8B6F6F] flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-[#F5EDE0]" />
                    </button>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="mt-2 pt-2 border-t border-[#E8B4B8] text-right">
                    <span className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">
                      Subtotal: 
                    </span>
                    <span className="ml-2 font-['Playfair_Display'] font-bold text-[#C9A875]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t-2 border-[#E8B4B8] bg-[#E8B4B8]/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-['Playfair_Display'] font-bold text-[#5c3a3a]">
                Total:
              </span>
              <span className="text-2xl font-['Playfair_Display'] font-bold text-[#C9A875]">
                {formatPrice(getCartTotal())}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] py-6 font-['Cormorant_Garamond'] font-bold text-lg border-4 border-[#C9A5A5] shadow-lg"
            >
              Proceder al Pago
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
