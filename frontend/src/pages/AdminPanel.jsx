import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getProducts, createProduct, updateProduct, deleteProduct, getOrders, getTestimonials, approveTestimonial, updateOrderStatus, uploadImage } from '../services/api';
import { toast } from 'sonner';
import { Package, ShoppingBag, Star, Plus, Edit, Trash2, Check, LogOut, MessageCircle, Upload, Image } from 'lucide-react';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const fileInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Tortas',
    description: '',
    price: 0,
    image: '',
    active: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, ordersData, testimonialsData] = await Promise.all([
        getProducts(false), // Get all products including inactive
        getOrders(),
        getTestimonials(false) // Get all testimonials
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productForm);
        toast.success('Producto actualizado');
      } else {
        await createProduct(productForm);
        toast.success('Producto creado');
      }
      resetProductForm();
      loadData();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Error al guardar producto');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        toast.success('Producto eliminado');
        loadData();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Error al eliminar producto');
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de archivo no permitido. Usar JPG, PNG, GIF o WebP');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('El archivo es muy grande. Máximo 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const result = await uploadImage(file);
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const fullUrl = `${BACKEND_URL}${result.url}`;
      setProductForm({ ...productForm, image: fullUrl });
      toast.success('Imagen subida correctamente');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleApproveTestimonial = async (id) => {
    try {
      await approveTestimonial(id);
      toast.success('Testimonio aprobado');
      loadData();
    } catch (error) {
      console.error('Error approving testimonial:', error);
      toast.error('Error al aprobar testimonio');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('Estado del pedido actualizado');
      loadData();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error al actualizar estado');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Sesión cerrada');
  };

  // WhatsApp number for notifications
  const WHATSAPP_NUMBER = '5493446410814';

  const sendOrderToWhatsApp = (order) => {
    const statusLabels = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      preparing: 'Preparando',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };

    const itemsList = order.items.map(item => 
      `• ${item.product_name} x${item.quantity} - ${formatPrice(item.subtotal)}`
    ).join('\n');

    const message = `🧁 *NUEVO PEDIDO - Dulcesal Pastelería*

📋 *Pedido:* #${order.order_number}
📅 *Fecha:* ${new Date(order.created_at).toLocaleString('es-ES')}
📌 *Estado:* ${statusLabels[order.status]}

👤 *Cliente:*
• Nombre: ${order.customer_name}
• Email: ${order.customer_email}
• Teléfono: ${order.customer_phone}

📍 *Dirección de entrega:*
${order.delivery_address}

🛒 *Productos:*
${itemsList}

💰 *TOTAL: ${formatPrice(order.total)}*

${order.notes ? `📝 *Notas:* ${order.notes}` : ''}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const contactCustomerWhatsApp = (order) => {
    // Remove non-numeric characters from phone
    const customerPhone = order.customer_phone.replace(/\D/g, '');
    
    const message = `¡Hola ${order.customer_name}! 👋

Somos *Dulcesal Pastelería* 🧁

Hemos recibido tu pedido #${order.order_number} por un total de ${formatPrice(order.total)}.

¡Gracias por tu preferencia! Te mantendremos informado sobre el estado de tu pedido.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${customerPhone}?text=${encodedMessage}`, '_blank');
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: 'Tortas',
      description: '',
      price: 0,
      image: '',
      active: true
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getOrderStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#E8B4B8] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EDE0] py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2">
              Panel de Administración
            </h1>
            <p className="text-[#8B6F6F] font-['Cormorant_Garamond']">
              Gestiona productos, pedidos y testimonios
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              data-testid="admin-home-btn"
              onClick={() => navigate('/')}
              className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5]"
            >
              Volver al Sitio
            </Button>
            <Button
              data-testid="admin-logout-btn"
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-[#C9A5A5] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold hover:bg-[#C9A5A5]/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">Total Productos</p>
                  <p className="text-3xl font-['Playfair_Display'] font-bold text-[#C9A875]">{products.length}</p>
                </div>
                <Package className="w-12 h-12 text-[#E8B4B8]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">Total Pedidos</p>
                  <p className="text-3xl font-['Playfair_Display'] font-bold text-[#C9A875]">{orders.length}</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-[#E8B4B8]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">Testimonios Pendientes</p>
                  <p className="text-3xl font-['Playfair_Display'] font-bold text-[#C9A875]">
                    {testimonials.filter(t => !t.approved).length}
                  </p>
                </div>
                <Star className="w-12 h-12 text-[#E8B4B8]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="bg-[#E8B4B8]/30 border-2 border-[#E8B4B8] mb-6">
            <TabsTrigger value="products" className="font-['Cormorant_Garamond'] font-semibold">
              Productos
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-['Cormorant_Garamond'] font-semibold">
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="font-['Cormorant_Garamond'] font-semibold">
              Testimonios
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowProductForm(!showProductForm)}
                  className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Button>
              </div>

              {showProductForm && (
                <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
                      {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2">
                            Nombre *
                          </label>
                          <Input
                            value={productForm.name}
                            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                            required
                            className="border-2 border-[#E8B4B8] bg-[#F5EDE0]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2">
                            Categoría *
                          </label>
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                            className="w-full border-2 border-[#E8B4B8] bg-[#F5EDE0] px-3 py-2 rounded-md font-['Cormorant_Garamond']"
                            required
                          >
                            <option value="Tortas">Tortas</option>
                            <option value="Panadería">Panadería</option>
                            <option value="Eventos">Eventos</option>
                            <option value="Postres">Postres</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2">
                            Precio *
                          </label>
                          <Input
                            type="number"
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                            required
                            className="border-2 border-[#E8B4B8] bg-[#F5EDE0]"
                          />
                        </div>
                      </div>

                      {/* Image Upload Section */}
                      <div className="space-y-3">
                        <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a]">
                          Imagen del Producto *
                        </label>
                        
                        {/* Image Preview */}
                        {productForm.image && (
                          <div className="relative w-full max-w-xs">
                            <img 
                              src={productForm.image} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-lg border-2 border-[#E8B4B8]"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setProductForm({...productForm, image: ''})}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <div className="flex gap-3">
                          {/* Upload Button */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                          />
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="bg-[#C9A875] hover:bg-[#B89764] text-white font-['Cormorant_Garamond'] font-semibold"
                          >
                            {uploadingImage ? (
                              <>
                                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                                Subiendo...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4 mr-2" />
                                Subir Imagen
                              </>
                            )}
                          </Button>

                          {/* Or URL input */}
                          <div className="flex-1">
                            <Input
                              value={productForm.image}
                              onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                              placeholder="O pegar URL de imagen..."
                              className="border-2 border-[#E8B4B8] bg-[#F5EDE0]"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-[#8B6F6F]">
                          Formatos: JPG, PNG, GIF, WebP. Máximo 5MB
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-['Cormorant_Garamond'] font-semibold text-[#5c3a3a] mb-2">
                          Descripción *
                        </label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          required
                          rows={3}
                          className="border-2 border-[#E8B4B8] bg-[#F5EDE0] resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={productForm.active}
                          onChange={(e) => setProductForm({...productForm, active: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label className="text-sm font-['Cormorant_Garamond'] text-[#5c3a3a]">
                          Producto activo
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5]"
                        >
                          {editingProduct ? 'Actualizar' : 'Crear'} Producto
                        </Button>
                        <Button
                          type="button"
                          onClick={resetProductForm}
                          variant="outline"
                          className="border-2 border-[#E8B4B8] text-[#5c3a3a] font-['Cormorant_Garamond']"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="border-4 border-[#E8B4B8] bg-[#F5EDE0] relative">
                    {!product.active && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                        Inactivo
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-[#8B6F6F] mb-2">{product.category}</p>
                      <p className="text-lg font-['Playfair_Display'] font-bold text-[#C9A875] mb-3">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 bg-[#C9A5A5] hover:bg-[#B89090] text-[#F5EDE0]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-4">
              {orders.length === 0 ? (
                <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
                  <CardContent className="p-8 text-center">
                    <p className="text-lg font-['Cormorant_Garamond'] text-[#8B6F6F]">
                      No hay pedidos aún
                    </p>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-['Playfair_Display'] font-bold text-[#5c3a3a]">
                            Pedido #{order.order_number}
                          </h4>
                          <p className="text-sm text-[#8B6F6F] font-['Cormorant_Garamond']">
                            {new Date(order.created_at).toLocaleString('es-ES')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-[#8B6F6F]">Cliente:</p>
                          <p className="font-semibold text-[#5c3a3a]">{order.customer_name}</p>
                          <p className="text-sm text-[#8B6F6F]">{order.customer_email}</p>
                          <p className="text-sm text-[#8B6F6F]">{order.customer_phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#8B6F6F]">Dirección:</p>
                          <p className="text-[#5c3a3a]">{order.delivery_address}</p>
                        </div>
                      </div>

                      <div className="border-t-2 border-[#E8B4B8] pt-4">
                        <p className="text-sm text-[#8B6F6F] mb-2">Productos:</p>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between mb-2">
                            <span className="text-[#5c3a3a]">
                              {item.product_name} x{item.quantity}
                            </span>
                            <span className="font-semibold text-[#C9A875]">
                              {formatPrice(item.subtotal)}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-lg font-bold border-t border-[#E8B4B8] pt-2">
                          <span className="text-[#5c3a3a]">Total:</span>
                          <span className="text-[#C9A875]">{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-4 bg-[#E8B4B8]/20 p-3 rounded">
                          <p className="text-sm text-[#8B6F6F]">Notas:</p>
                          <p className="text-[#5c3a3a]">{order.notes}</p>
                        </div>
                      )}

                      {/* Order Status Actions */}
                      <div className="mt-4 pt-4 border-t-2 border-[#E8B4B8]">
                        <p className="text-sm text-[#8B6F6F] mb-2">Cambiar estado:</p>
                        <div className="flex flex-wrap gap-2">
                          {['pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map((statusOption) => (
                            <Button
                              key={statusOption}
                              size="sm"
                              data-testid={`order-status-${statusOption}-btn`}
                              onClick={() => handleUpdateOrderStatus(order.id, statusOption)}
                              disabled={order.status === statusOption}
                              className={`text-xs ${
                                order.status === statusOption 
                                  ? 'bg-gray-300 cursor-not-allowed' 
                                  : getOrderStatusColor(statusOption) + ' hover:opacity-80'
                              }`}
                            >
                              {statusOption === 'pending' && 'Pendiente'}
                              {statusOption === 'confirmed' && 'Confirmado'}
                              {statusOption === 'preparing' && 'Preparando'}
                              {statusOption === 'completed' && 'Completado'}
                              {statusOption === 'cancelled' && 'Cancelado'}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* WhatsApp Actions */}
                      <div className="mt-4 pt-4 border-t-2 border-[#E8B4B8]">
                        <p className="text-sm text-[#8B6F6F] mb-2">Acciones WhatsApp:</p>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            data-testid="whatsapp-notify-btn"
                            onClick={() => sendOrderToWhatsApp(order)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Guardar Pedido
                          </Button>
                          <Button
                            size="sm"
                            data-testid="whatsapp-contact-btn"
                            onClick={() => contactCustomerWhatsApp(order)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contactar Cliente
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="space-y-4">
              {testimonials.length === 0 ? (
                <Card className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
                  <CardContent className="p-8 text-center">
                    <p className="text-lg font-['Cormorant_Garamond'] text-[#8B6F6F]">
                      No hay testimonios
                    </p>
                  </CardContent>
                </Card>
              ) : (
                testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-4 border-[#E8B4B8] bg-[#F5EDE0]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xl font-['Playfair_Display'] font-bold text-[#5c3a3a]">
                              {testimonial.name}
                            </h4>
                            {testimonial.approved ? (
                              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                                Aprobado
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">
                                Pendiente
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#C9A875] text-[#C9A875]" />
                            ))}
                          </div>
                          <p className="text-[#5c3a3a] font-['Cormorant_Garamond'] italic mb-2">
                            "{testimonial.comment}"
                          </p>
                          <p className="text-sm text-[#8B6F6F]">
                            {new Date(testimonial.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        {!testimonial.approved && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveTestimonial(testimonial.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Aprobar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
