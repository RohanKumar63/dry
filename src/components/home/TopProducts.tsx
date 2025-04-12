'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'

// This would normally come from your data source
const featuredProducts = [
  {
    id: '1',
    name: 'Dried Amla',
    price: 12.99,
    image: '/products/1.jpg', // Static image path
    category: 'Fruits',
    rating: 4.8,
    reviews: 124,
    bestseller: true
  },
  {
    id: '2',
    name: 'Organic Wheatgrass',
    price: 14.99,
    image: '/products/2.jpg', // Static image path
    category: 'Vegetables',
    rating: 4.7,
    reviews: 89,
    bestseller: false
  },
  {
    id: '3',
    name: 'Red Dehydated Onion Flakes',
    price: 9.99,
    image: '/products/3.jpg', // Static image path
    category: 'Snacks',
    rating: 4.9,
    reviews: 56,
    bestseller: true
  },
  {
    id: '4',
    name: 'Dried Amla Granules',
    price: 17.99,
    image: '/products/4.jpg', // Static image path
    category: 'Berries',
    rating: 4.6,
    reviews: 72,
    bestseller: false
  },
  
]

const categories = ['All', 'Fruits', 'Vegetables', 'Snacks', 'Berries', 'Exotics']

export default function TopProducts() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const filteredProducts = activeCategory === 'All' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory)
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">Top Rated Products</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Our most loved products, backed by customer reviews and exceptional quality.
        </p>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-full">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-amber-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-full transition-colors font-medium"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
