'use client'

import { useState } from 'react'
import ProductGrid from '@/components/products/ProductGrid'
import { Product } from '@/types/product'

// Filter the products that are marked as new arrivals
const newArrivalsProducts: Product[] = [
  {
    id: '6',
    name: 'Superfood Berry Blend',
    price: 18.99,
    image: '/products/6.jpg',
    category: 'Berries',
    rating: 4.9,
    reviews: 32,
    stock: 20,
    new: true,
    description: 'A delicious blend of superfoods and berries.'
  },
  {
    id: '7',
    name: 'Crispy Vegetable Chips',
    price: 8.99,
    image: '/products/7.jpg',
    category: 'Snacks',
    rating: 4.8,
    reviews: 17,
    stock: 25,
    new: true,
    description: 'Crunchy vegetable chips made from premium vegetables.'
  },
  {
    id: '8',
    name: 'Mixed Tropical Fruits',
    price: 12.99,
    image: '/products/8.jpg',
    category: 'Exotics',
    rating: 4.7,
    reviews: 23,
    stock: 30,
    new: true,
    description: 'A mix of tropical fruits for a burst of flavor.'
  },
  {
    id: '9',
    name: 'Premium Dried Mango',
    price: 9.99,
    image: '/products/9.jpg',
    category: 'Fruits',
    rating: 4.9,
    reviews: 8,
    stock: 15,
    new: true,
    description: 'Dried mango for a sweet and healthy snack.'
  },
  {
    id: '10',
    name: 'Organic Root Vegetables',
    price: 11.99,
    image: '/products/10.jpg',
    category: 'Vegetables',
    rating: 5.0,
    reviews: 12,
    stock: 18,
    new: true,
    description: 'Organic root vegetables for a nutritious meal.'
  },
  {
    id: '11',
    name: 'Healthy Snack Pack',
    price: 15.99,
    image: '/products/11.jpg',
    category: 'Snacks',
    rating: 4.6,
    reviews: 19,
    stock: 22,
    new: true,
    description: 'A healthy snack pack with a variety of nutritious ingredients.'
  }
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
]

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState('featured')
  
  const sortedProducts = [...newArrivalsProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair mb-2">New Arrivals</h1>
          <p className="text-gray-600">Discover our latest products, fresh from nature to your table.</p>
        </header>
        
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">Showing {sortedProducts.length} products</p>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  )
}
