'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/products/ProductGrid'
import Image from 'next/image'

// Create a comprehensive product list using all 19 images
const allProducts = [
  {
    id: '1',
    name: 'Dried Amla',
    price: 12.99,
    image: '/products/1.jpg',
    category: 'Fruits',
    rating: 4.8,
    reviews: 124,
    stock: 25,
    bestseller: true
  },
  {
    id: '2',
    name: 'Organic Wheatgrass',
    price: 14.99,
    image: '/products/2.jpg',
    category: 'Vegetables',
    rating: 4.7,
    reviews: 89,
    stock: 18,
    bestseller: false
  },
  {
    id: '3',
    name: 'Red Dehydated Onion Flakes',
    price: 9.99,
    image: '/products/3.jpg',
    category: 'Snacks',
    rating: 4.9,
    reviews: 56,
    stock: 32,
    bestseller: true
  },
  {
    id: '4',
    name: 'Dried Amla Granules',
    price: 17.99,
    image: '/products/4.jpg',
    category: 'Berries',
    rating: 4.6,
    reviews: 72,
    stock: 15,
    bestseller: false
  },
  {
    id: '5',
    name: 'Dried Broccoli(Green Gobhi)',
    price: 15.99,
    image: '/products/5.jpg',
    category: 'Exotics',
    rating: 4.5,
    reviews: 43,
    stock: 20,
    bestseller: false
  },
  {
    id: '6',
    name: 'Dried Kasuri Methi(Fenugreek)',
    price: 18.99,
    image: '/products/6.jpg',
    category: 'Berries',
    rating: 4.9,
    reviews: 32,
    stock: 12,
    new: true
  },
  {
    id: '7',
    name: 'Dried Dill Leaves(Soya Leaves)',
    price: 8.99,
    image: '/products/7.jpg',
    category: 'Snacks',
    rating: 4.8,
    reviews: 17,
    stock: 40,
    new: true
  },
  {
    id: '8',
    name: 'Dehydrated Spinach(Palak Leaf)',
    price: 12.99,
    image: '/products/8.jpg',
    category: 'Exotics',
    rating: 4.7,
    reviews: 23,
    stock: 22,
    new: true
  },
  {
    id: '9',
    name: 'Dehydrated Bittergourd(Karela Flakes)',
    price: 9.99,
    image: '/products/9.jpg',
    category: 'Fruits',
    rating: 4.9,
    reviews: 28,
    stock: 35,
    new: true
  },
  {
    id: '10',
    name: 'Dehydrated Carrot(Cubes/Flakes)',
    price: 11.99,
    image: '/products/10.jpg',
    category: 'Vegetables',
    rating: 5.0,
    reviews: 12,
    stock: 18,
    new: true
  },
  {
    id: '11',
    name: 'Dehydrated Ginger Flakes',
    price: 15.99,
    image: '/products/11.jpg',
    category: 'Snacks',
    rating: 4.6,
    reviews: 19,
    stock: 28,
    new: true
  },
  {
    id: '12',
    name: 'Dehydrated Raw Banana Flakes',
    price: 7.99,
    image: '/products/12.jpg',
    category: 'Fruits',
    rating: 4.5,
    reviews: 37,
    stock: 45
  },
  {
    id: '13',
    name: 'Dehydrated Beet Root Flakes',
    price: 19.99,
    image: '/products/13.jpg',
    category: 'Berries',
    rating: 4.9,
    reviews: 42,
    stock: 15
  },
  {
    id: '14',
    name: 'Dehydrated Green Coriander Leaf',
    price: 13.99,
    image: '/products/14.jpg',
    category: 'Nuts',
    rating: 4.7,
    reviews: 31,
    stock: 25
  },
  {
    id: '15',
    name: 'Dry Rose Petals',
    price: 16.99,
    image: '/products/15.jpg',
    category: 'Exotics',
    rating: 4.8,
    reviews: 18,
    stock: 10
  },
  {
    id: '16',
    name: 'Dehydrated Lemon Leaf',
    price: 14.99,
    image: '/products/16.jpg',
    category: 'Vegetables',
    rating: 4.6,
    reviews: 24,
    stock: 30
  },
  {
    id: '17',
    name: 'Dried Fresh Raw Root Turmeric(Kacchi Haldi)',
    price: 13.99,
    image: '/products/17.jpg',
    category: 'Berries',
    rating: 4.7,
    reviews: 29,
    stock: 22
  },
  {
    id: '18',
    name: 'Dehydrated Green Chilli Flakes',
    price: 15.49,
    image: '/products/18.jpg',
    category: 'Exotics',
    rating: 4.6,
    reviews: 15,
    stock: 18
  },
  {
    id: '19',
    name: 'Nutrient-Dense Veggie Mix',
    price: 12.49,
    image: '/products/19.jpg',
    category: 'Vegetables',
    rating: 4.8,
    reviews: 33,
    stock: 24
  }
]

const categories = ['All', 'Fruits', 'Vegetables', 'Snacks', 'Berries', 'Exotics', 'Nuts']
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 25])
  const [filterOpen, setFilterOpen] = useState(false)
  
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])
  
  const filteredProducts = allProducts.filter(product => {
    if (activeCategory !== 'All' && product.category !== activeCategory) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    return true
  })
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return a.new ? -1 : b.new ? 1 : 0
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return a.bestseller ? -1 : b.bestseller ? 1 : 0
    }
  })
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair mb-2">Shop Our Collection</h1>
          <p className="text-gray-600">Discover our premium dehydrated fruits and vegetables designed for healthy living.</p>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-medium text-lg mb-4">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`text-sm ${
                          activeCategory === category 
                            ? 'text-amber-600 font-medium' 
                            : 'text-gray-700 hover:text-amber-600'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">${priceRange[0]}</span>
                  <span className="text-sm text-gray-600">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="1"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Product Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">New Arrivals</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">Best Sellers</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">On Sale</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors text-sm">
                Apply Filters
              </button>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center mb-4 sm:mb-0 lg:hidden px-4 py-2 border border-gray-300 rounded-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                Filters
              </button>
              
              <div className="flex items-center ml-auto">
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
            
            {/* Mobile Filters */}
            {filterOpen && (
              <div className="lg:hidden bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="mb-4">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          activeCategory === category 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
                
                <button 
                  className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors text-sm"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            )}
            
            <p className="text-sm text-gray-600 mb-6">Showing {sortedProducts.length} products</p>
            
            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}
