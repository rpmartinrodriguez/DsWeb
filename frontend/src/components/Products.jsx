import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="productos" className="py-24 bg-gradient-to-b from-[#F5EDE0] to-[#EDE0D4] relative">
      {/* Vintage Corner Ornaments */}
      <div className="absolute top-10 left-10 text-[#C9A875] text-4xl opacity-20 select-none">✦</div>
      <div className="absolute top-10 right-10 text-[#C9A875] text-4xl opacity-20 select-none">✦</div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#E8B4B8]/30 border-2 border-[#E8B4B8] text-[#5c3a3a] mb-6 relative">
            <span className="font-['Cormorant_Garamond'] text-sm font-semibold tracking-[0.3em]">NUESTROS PRODUCTOS</span>
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#C9A875]"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#C9A875]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-4">
            Delicias Artesanales
          </h2>
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
            <span className="text-[#C9A875] text-2xl">❦</span>
            <div className="w-20 h-0.5 bg-[#C9A875]"></div>
          </div>
          <p className="text-xl text-[#8B6F6F] max-w-2xl mx-auto font-['Cormorant_Garamond'] italic">
            Cada producto es elaborado con ingredientes premium y mucho amor
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`font-['Cormorant_Garamond'] font-semibold border-2 transition-all ${
                selectedCategory === category
                  ? 'bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] border-[#C9A5A5] shadow-md'
                  : 'border-[#E8B4B8] text-[#5c3a3a] hover:bg-[#E8B4B8]/20 bg-[#F5EDE0]'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#E8B4B8] border-t-transparent"></div>
              <p className="mt-4 text-xl font-['Cormorant_Garamond'] text-[#8B6F6F]">Cargando productos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-xl font-['Cormorant_Garamond'] text-[#8B6F6F]">
                No hay productos disponibles en esta categoría
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-4 border-[#E8B4B8]/30 hover:border-[#E8B4B8] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-[#F5EDE0] relative"
            >
              {/* Vintage Corner Decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A875] opacity-50 z-10"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A875] opacity-50 z-10"></div>
              
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 sepia-[0.15]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5c3a3a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Badge className="absolute top-4 right-4 bg-[#E8B4B8]/95 text-[#5c3a3a] border-2 border-[#C9A5A5] font-['Cormorant_Garamond'] font-semibold shadow-lg">
                  {product.category}
                </Badge>
              </div>
              <CardContent className="p-6 bg-[#F5EDE0]">
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#5c3a3a] mb-2 group-hover:text-[#8B6F6F] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#8B6F6F] mb-4 line-clamp-2 font-['Cormorant_Garamond']">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-['Playfair_Display'] font-bold text-[#C9A875]">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#E8B4B8] hover:bg-[#D8A7A7] text-[#5c3a3a] font-['Cormorant_Garamond'] font-semibold border-2 border-[#C9A5A5]"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ordenar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </div>
    </section>
  );
};
