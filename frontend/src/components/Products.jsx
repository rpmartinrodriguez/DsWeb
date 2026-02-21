import React, { useState } from 'react';
import { products } from '../data/mock';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    toast.success(`${product.name} agregado al carrito`, {
      description: `Precio: $${product.price.toLocaleString('es-CO')}`,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="productos" className="py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium mb-4">
            Nuestros Productos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delicias Artesanales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              className={`rounded-full ${
                selectedCategory === category
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'border-rose-200 text-gray-700 hover:bg-rose-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Badge className="absolute top-4 right-4 bg-rose-500 text-white border-0">
                  {product.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-600">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    size="sm"
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ordenar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
