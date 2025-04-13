'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/products/ProductGrid'
import Link from 'next/link'

// Using the same product data as the products page
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [sortBy, setSortBy] = useState('featured')
  
  const [searchResults, setSearchResults] = useState([])
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ]
  
  useEffect(() => {
    if (query) {
      // Simple search implementation - in a real app, this would be done on the server
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query])
  
  // Sort search results
  const sortedResults = [...searchResults].sort((a, b) => {
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
  
  const categories = ['Fruits', 'Vegetables', 'Snacks', 'Berries', 'Exotics', 'Nuts']
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair mb-2">Search Results</h1>
          {query ? (
            <p className="text-gray-600">
              {searchResults.length} results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <p className="text-gray-600">
              Please enter a search term to find products
            </p>
          )}
        </header>
        
        {searchResults.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">Showing {sortedResults.length} products</p>
              
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
            
            <ProductGrid products={sortedResults} />
          </>
        ) : query ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-medium text-gray-900">No results found</h2>
            <p className="mt-2 text-gray-600 max-w-md mx-auto mb-6">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try different keywords or browse our categories.
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Browse Categories</h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                {categories.map(category => (
                  <Link 
                    key={category}
                    href={`/products?category=${category}`} 
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
                <Link href="/products" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors">
                  All Products
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="mt-4 text-xl font-medium text-gray-900">Search for products</h2>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              Enter a search term in the search box above to find products from our collection of premium dehydrated fruits and vegetables.
            </p>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Popular Searches</h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                <Link href="/search?q=amla" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors">
                  Amla
                </Link>
                <Link href="/search?q=leaf" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors">
                  Leaf
                </Link>
                <Link href="/search?q=flakes" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors">
                  Flakes
                </Link>
                <Link href="/search?q=dried" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors">
                  Dried
                </Link>
                <Link href="/search?q=dehydrated" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition-colors">
                  Dehydrated
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
