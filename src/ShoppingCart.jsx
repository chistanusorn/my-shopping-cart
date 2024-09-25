'use client'

import React, { useState } from 'react';
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, Search, Heart, Menu } from 'lucide-react';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";

const products = [
  { id: 1, name: "Premium Laptop", price: 1299, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Electronics" },
  { id: 2, name: "Smartphone Pro", price: 899, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Electronics" },
  { id: 3, name: "Wireless Noise-Canceling Headphones", price: 249, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Audio" },
  { id: 4, name: "4K Ultra HD Smart TV", price: 799, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Electronics" },
  { id: 5, name: "Smartwatch Series 5", price: 399, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Wearables" },
  { id: 6, name: "Professional DSLR Camera", price: 1499, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Photography" },
  { id: 7, name: "Next-Gen Gaming Console", price: 499, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Gaming" },
  { id: 8, name: "True Wireless Earbuds", price: 179, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Audio" },
  { id: 9, name: "Advanced Fitness Tracker", price: 129, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Wearables" },
  { id: 10, name: "Portable Power Bank", price: 59, image: "https://hilight.kapook.com/img_cms2/user/surauch/2024/News1/khamoo2.jpg?height=300&width=300", category: "Accessories" },
];

export default function EnhancedEcommerceShoppingCart() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10);
    } else if (couponCode === 'DISCOUNT20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping - discount;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-4 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <a href="#" className="text-2xl font-bold text-gray-800">TechStore</a>
          </div>
          <div className="flex items-center">
            <div className="relative mx-4 lg:mx-0 hidden lg:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-500" />
              </span>
              <Input
                className="w-full border rounded-md pl-10 pr-4 py-2"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" className="flex items-center">
              <Heart className="h-6 w-6 text-gray-600" />
            </Button>
            <Button variant="ghost" className="flex items-center ml-4">
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <Button className="mt-2" onClick={() => addToCart(product)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart */}
        {cart.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus /></Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus /></Button>
                  <Button onClick={() => removeFromCart(item.id)}><Trash2 /></Button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="text-lg font-semibold">Shipping: ${shipping.toFixed(2)}</p>
              <p className="text-lg font-semibold">Discount: ${discount.toFixed(2)}</p>
              <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            </div>
            <div className="mt-4">
              <Input
                className="border rounded-md pl-2 pr-4 py-2"
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button className="ml-2" onClick={applyCoupon}>Apply</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
