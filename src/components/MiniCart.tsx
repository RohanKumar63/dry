// components/MiniCart.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, cartCount, cartTotal, removeFromCart } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Hello! I would like to order the following items:\n\n";
    
    items.forEach(item => {
      message += `*${item.name}* - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total: $${cartTotal.toFixed(2)}*\n\nPlease provide payment and delivery information. Thank you!`;
    
    const whatsappUrl = `https://wa.me/919984001117?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Shopping cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="p-4 border-b">
            <h3 className="font-medium">Your Cart ({cartCount} items)</h3>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {items.map(item => (
                  <li key={item.id} className="flex p-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="/cart"
                className="text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm"
                onClick={() => setIsOpen(false)}
              >
                View Cart
              </Link>
              
              <button 
                onClick={handleWhatsAppCheckout}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm flex items-center justify-center"
                disabled={items.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
