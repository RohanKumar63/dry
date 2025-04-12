// src/components/products/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types' // Make sure to import the Product type

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleAddToCart = () => {
    // Format the message with product details
    const message = `Hello! I'm interested in purchasing: *${product.name}* (${product.category}) - Price: $${product.price.toFixed(2)}. Please provide more information.`;
    
    // Create the WhatsApp URL with the phone number and encoded message
    const whatsappUrl = `https://wa.me/919984001117?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  }
  
  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-64 bg-gray-100">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {product.bestseller && (
            <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              Bestseller
            </span>
          )}
          
          {product.new && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              New
            </span>
          )}
        </div>
        
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      
      <div className={`absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md transition-transform duration-300 ${
        isHovered ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <button 
          className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>
          Contact on WhatsApp
        </button>
      </div>
    </div>
  )
}
