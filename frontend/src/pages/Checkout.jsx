import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react';
import { createOrder } from '../services/api';
import { toast } from 'sonner';

export const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    notes: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order items
      const items = cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity
      }));

      // Create order
      const order = await createOrder({
        ...formData,
        items
      });

      setOrderNumber(order.order_number);
      setOrderComplete(true);
      clearCart();
      
      toast.success('¡Pedido realizado con éxito!', {
        description: `Número de orden: ${order.order_number}`,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al procesar el pedido', {
        description: 'Por favor, intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-24 h-24 text-[#C9A5A5] mx-auto mb-6" />
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-xl text-[#8B6F6F] font-['Cormorant_Garamond'] mb-8">
              Agrega productos para continuar con tu pedido
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a la tienda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0] relative">
              <div className="absolute top-3 left-3 w-8 h-8 border-t-3 border-l-3 border-[#C9A875]"></div>
              <div className="absolute top-3 right-3 w-8 h-8 border-t-3 border-r-3 border-[#C9A875]"></div>
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-3 border-l-3 border-[#C9A875]"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-3 border-r-3 border-[#C9A875]"></div>
              
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-[#E8B4B8] border-4 border-[#C9A5A5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-[#5c3a3a]" />
                </div>
                <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
                  ¡Pedido Confirmado!
                </h2>
                <div className="w-32 h-0.5 bg-[#C9A875] mx-auto mb-6"></div>
                <p className="text-xl text-[#8B6F6F] font-['Cormorant_Garamond'] mb-6">
                  Gracias por tu pedido. Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.
                </p>
                <div className="bg-[#E8B4B8]/20 border-2 border-[#E8B4B8] p-6 mb-8">
                  <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond'] mb-2">
                    Número de Orden
                  </p>
                  <p className="text-2xl font-['Playfair_Display'] font-bold text-[#C9A875]">
                    {orderNumber}
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5] px-8"
                >
                  Volver al Inicio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EDE0] py-24">
      <div className="container mx-auto px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#8B6F6F] hover:text-[#E8B4B8] font-['Cormorant_Garamond'] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a la tienda
        </button>

        <h1 className="text-5xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-8 text-center">
          Finalizar Pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Form */}
          <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0] relative">
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A875]"></div>
            
            <CardContent className="p-8">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-6">
                Información de Entrega
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                    NOMBRE COMPLETO *
                  </label>
                  <Input
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] bg-[#F5EDE0] font-['Cormorant_Garamond']"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                    EMAIL *
                  </label>
                  <Input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                    className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] bg-[#F5EDE0] font-['Cormorant_Garamond']"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                    TELÉFONO *
                  </label>
                  <Input
                    type="tel"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    required
                    className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] bg-[#F5EDE0] font-['Cormorant_Garamond']"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                    DIRECCIÓN DE ENTREGA *
                  </label>
                  <Textarea
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] bg-[#F5EDE0] font-['Cormorant_Garamond'] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2 tracking-wider">
                    NOTAS ADICIONALES
                  </label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Instrucciones especiales, alergias, etc."
                    className="border-2 border-[#E8B4B8] focus:border-[#C9A5A5] bg-[#F5EDE0] font-['Cormorant_Garamond'] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] py-6 font-['Cormorant_Garamond'] font-bold text-lg border-4 border-[#C9A5A5] shadow-lg"
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0] h-fit relative">
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A875]"></div>
            
            <CardContent className="p-8">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-6">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-[#E8B4B8]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover border-2 border-[#C9A5A5]"
                    />
                    <div className="flex-1">
                      <h3 className="font-['Playfair_Display'] font-semibold text-[#5c3a3a]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="font-['Playfair_Display'] font-bold text-[#C9A875]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-[#E8B4B8]">
                <div className="flex justify-between text-lg">
                  <span className="font-['Cormorant_Garamond'] text-[#8B6F6F]">Subtotal:</span>
                  <span className="font-['Playfair_Display'] font-semibold text-[#5c3a3a]">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                <div className="flex justify-between text-xl pt-3 border-t border-[#E8B4B8]">
                  <span className="font-['Playfair_Display'] font-bold text-[#5c3a3a]">Total:</span>
                  <span className="font-['Playfair_Display'] font-bold text-[#C9A875] text-2xl">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
