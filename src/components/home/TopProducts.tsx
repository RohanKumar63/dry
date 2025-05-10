'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/types' // Import the Product type

export default function TopProductsSlider() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Fetch bestseller products from API
  useEffect(() => {
    const fetchBestsellers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products?bestseller=true&limit=8');
        if (!response.ok) {
          throw new Error('Failed to fetch bestseller products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error fetching bestseller products:', err);
        setError('Failed to load bestseller products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
  }, []);
  
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory)
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setIsMobile(true)
      } else if (width < 768) {
        setIsMobile(false)
      } else if (width < 1024) {
        setIsMobile(false)
      } else {
        setIsMobile(false)
      }
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Function to check if scroll buttons should be shown
  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }
  
  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      // Initial check
      checkScrollButtons()
      
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, []) // Remove scrollContainerRef.current from dependencies
  
  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.querySelector('div')?.clientWidth || 0
      container.scrollBy({ left: -cardWidth * (isMobile ? 1 : 2), behavior: 'smooth' })
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.querySelector('div')?.clientWidth || 0
      container.scrollBy({ left: cardWidth * (isMobile ? 1 : 2), behavior: 'smooth' })
    }
  }
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // Swipe left
      scrollRight()
    }
    
    if (touchStart - touchEnd < -150) {
      // Swipe right
      scrollLeft()
    }
  }
  
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bestsellers...</p>
        </div>
      </section>
    )
  }
  
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    )
  }
  
  if (filteredProducts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">Bestsellers</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our most popular products that customers love.
          </p>
          <p className="text-center text-gray-500">No bestseller products found in this category.</p>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">Bestsellers</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Our most popular products that customers love.
        </p>
        
        {/* Category filters */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product slider */}
        <div className="relative" ref={sliderRef}>
          {/* Left scroll button */}
          {showLeftButton && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 md:p-3 focus:outline-none"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
          
          {/* Right scroll button */}
          {showRightButton && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 md:p-3 focus:outline-none"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
          
          {/* Products container */}
          <div 
            className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
            ref={scrollContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
