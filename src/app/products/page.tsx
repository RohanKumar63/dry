'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/products/ProductGrid'

const allProducts = [
  {
    "id": "1",
    "name": "Dried Amla",
    "price": 12.99,
    "image": "/products/1.jpg",
    "category": "Fruits",
    "rating": 4.8,
    "reviews": 124,
    "stock": 25,
    "bestseller": true
  },
  {
    "id": "2",
    "name": "Organic Wheatgrass",
    "price": 14.99,
    "image": "/products/2.jpg",
    "category": "Superfoods",
    "rating": 4.7,
    "reviews": 98,
    "stock": 30,
    "bestseller": true
  },
  {
    "id": "3",
    "name": "Red Dehydrated Onion Flakes",
    "price": 9.49,
    "image": "/products/3.jpg",
    "category": "Spices & Herbs",
    "rating": 4.6,
    "reviews": 87,
    "stock": 40,
    "bestseller": false
  },
  {
    "id": "4",
    "name": "Dried Amla Granules",
    "price": 11.49,
    "image": "/products/4.jpg",
    "category": "Fruits",
    "rating": 4.8,
    "reviews": 110,
    "stock": 35,
    "bestseller": true
  },
  {
    "id": "5",
    "name": "Dried Broccoli (Green Gobhi)",
    "price": 13.99,
    "image": "/products/5.jpg",
    "category": "Vegetables",
    "rating": 4.5,
    "reviews": 76,
    "stock": 28,
    "bestseller": false
  },
  {
    "id": "6",
    "name": "Dried Kasuri Methi (Fenugreek)",
    "price": 7.99,
    "image": "/products/6.jpg",
    "category": "Spices & Herbs",
    "rating": 4.7,
    "reviews": 95,
    "stock": 50,
    "bestseller": true
  },
  {
    "id": "7",
    "name": "Dried Dill Leaves (Soya Leaves)",
    "price": 6.99,
    "image": "/products/7.jpg",
    "category": "Spices & Herbs",
    "rating": 4.6,
    "reviews": 81,
    "stock": 40,
    "bestseller": false
  },
  {
    "id": "8",
    "name": "Dehydrated Spinach (Palak Leaves)",
    "price": 5.49,
    "image": "/products/8.jpg",
    "category": "Vegetables",
    "rating": 4.7,
    "reviews": 96,
    "stock": 45,
    "bestseller": false
  },
  {
    "id": "9",
    "name": "Dehydrated Bittergourd (Karela Flakes)",
    "price": 4.99,
    "image": "/products/9.jpg",
    "category": "Vegetables",
    "rating": 4.5,
    "reviews": 78,
    "stock": 60,
    "bestseller": false
  },
  {
    "id": "10",
    "name": "Dehydrated Carrot (Cubes/Flakes)",
    "price": 3.99,
    "image": "/products/10.jpg",
    "category": "Vegetables",
    "rating": 4.8,
    "reviews": 112,
    "stock": 85,
    "bestseller": true
  },
  {
    "id": "11",
    "name": "Dehydrated Ginger Flakes",
    "price": 6.49,
    "image": "/products/11.jpg",
    "category": "Spices & Herbs",
    "rating": 4.9,
    "reviews": 145,
    "stock": 50,
    "bestseller": true
  },
  {
    "id": "12",
    "name": "Dehydrated Raw Banana Flakes",
    "price": 4.29,
    "image": "/products/12.jpg",
    "category": "Fruits",
    "rating": 4.6,
    "reviews": 88,
    "stock": 70,
    "bestseller": false
  },
  {
    "id": "13",
    "name": "Dehydrated Beet Root Flakes",
    "price": 19.99,
    "image": "/products/13.jpg",
    "category": "Vegetables",
    "rating": 4.9,
    "reviews": 42,
    "stock": 15,
    "bestseller": false
  },
  {
    "id": "14",
    "name": "Dehydrated Green Coriander Leaf",
    "price": 3.99,
    "image": "/products/14.jpg",
    "category": "Herbs & Spices",
    "rating": 4.5,
    "reviews": 92,
    "stock": 55,
    "bestseller": false
  },
  {
    "id": "15",
    "name": "Dried Rose Petals",
    "price": 5.99,
    "image": "/products/15.jpg",
    "category": "Herbs & Floral",
    "rating": 4.8,
    "reviews": 120,
    "stock": 35,
    "bestseller": true
  },
  {
    "id": "16",
    "name": "Dehydrated Lemon Leaf",
    "price": 4.49,
    "image": "/products/16.jpg",
    "category": "Herbs & Tea",
    "rating": 4.4,
    "reviews": 68,
    "stock": 42,
    "bestseller": false
  },
  {
    "id": "17",
    "name": "Dried Fresh Raw Root Turmeric (Kacchi Haldi)",
    "price": 8.99,
    "image": "/products/17.jpg",
    "category": "Spices & Herbs",
    "rating": 4.9,
    "reviews": 150,
    "stock": 30,
    "bestseller": true
  },
  {
    "id": "18",
    "name": "Dehydrated Green Chilli Flakes",
    "price": 4.99,
    "image": "/products/18.jpg",
    "category": "Spices & Seasonings",
    "rating": 4.6,
    "reviews": 105,
    "stock": 60,
    "bestseller": true
  },
  {
    "id": "19",
    "name": "Nutrient-Dense Veggie Mix",
    "price": 12.49,
    "image": "/products/19.jpg",
    "category": "Vegetables",
    "rating": 4.8,
    "reviews": 33,
    "stock": 24,
    "bestseller": false
  }
]

const categories = ['All', 'Fruits', 'Vegetables', 'Spices & Herbs', 'Superfoods', 'Herbs & Floral', 'Herbs & Tea', 'Spices & Seasonings']
const sortOptions = [
  { value: 'featured', label: 'Featured' },
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
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && priceMatch
  })
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default: // 'featured'
        if (a.bestseller && !b.bestseller) return -1
        if (!a.bestseller && b.bestseller) return 1
        return b.rating - a.rating
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