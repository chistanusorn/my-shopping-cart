'use client'
import React from 'react';
import { useState } from 'react'
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from "./components/ui/button.tsx"
import { Input } from "./components/ui/input.tsx"
import { Badge } from "./components/ui/badge.tsx"
// Product type definition
type Product = {
  id: number
  name: string
  price: number
  image: string
}

// CartItem type definition
type CartItem = Product & {
  quantity: number
}

// Sample product data
const products: Product[] = [
  { id: 1, name: "Laptop", price: 999, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Smartphone", price: 699, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Headphones", price: 199, image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Tablet", price: 499, image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Smartwatch", price: 299, image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Camera", price: 799, image: "/placeholder.svg?height=100&width=100" },
  { id: 7, name: "Gaming Console", price: 399, image: "/placeholder.svg?height=100&width=100" },
  { id: 8, name: "Wireless Earbuds", price: 159, image: "/placeholder.svg?height=100&width=100" },
  { id: 9, name: "Fitness Tracker", price: 99, image: "/placeholder.svg?height=100&width=100" },
  { id: 10, name: "Portable Charger", price: 49, image: "/placeholder.svg?height=100&width=100" },
]

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const applyCoupon = () => {
    // Simple coupon logic - you can expand this as needed
    if (couponCode === 'DISCOUNT10') {
      setDiscount(10)
    } else if (couponCode === 'DISCOUNT20') {
      setDiscount(20)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 100
  const total = subtotal + shipping - discount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border p-4 rounded-lg">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <Button onClick={() => addToCart(product)} className="mt-2 w-full">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="small" onClick={() => removeFromCart(item.id)} className="ml-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="mr-2"
                  />
                  <Button onClick={applyCoupon}>Apply</Button>
                </div>
                {discount > 0 && (
                  <Badge variant="secondary" className="mt-2">
                    Discount applied: ${discount}
                  </Badge>
                )}
              </div>
              
              <div className="mt-4">
                <p>Subtotal: ${subtotal}</p>
                <p>Shipping: ${shipping}</p>
                <p>Discount: ${discount}</p>
                <p className="font-bold text-lg">Total: ${total}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
