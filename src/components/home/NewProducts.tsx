'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/types' // Import the Product type

export default function NewProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const [products, setProducts] = useState<Product[]>([]) // Add type annotation
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // Add type annotation
  
  // Fetch new arrivals (featured products) from API
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/products?featured=true&limit=6');
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error fetching new arrivals:', err);
        setError('Failed to load new arrivals');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);
  
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
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === 'left' ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }
  
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading new arrivals...</p>
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
  
  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-playfair mb-2">New Arrivals</h2>
              <p className="text-gray-600 font-serif">The latest additions to our collection</p>
            </div>
          </div>
          <p className="text-center text-gray-500">No new arrivals found at the moment.</p>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-playfair mb-2">New Arrivals</h2>
            <p className="text-gray-600 font-serif">The latest additions to our collection</p>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className={`p-2 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors ${!showLeftButton ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Scroll left"
              disabled={!showLeftButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`p-2 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors ${!showRightButton ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Scroll right"
              disabled={!showRightButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="relative">
          {/* Left shadow gradient for scroll indication */}
          {showLeftButton && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          )}
          
          {/* Right shadow gradient for scroll indication */}
          {showRightButton && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map(product => (
              <div key={product.id} className="min-w-[280px] max-w-[280px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* Mobile scroll indicators */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex space-x-1">
              {products.map((_, index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-amber-600 focus:bg-amber-600"
                  aria-label={`Scroll to product ${index + 1}`}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const cardWidth = 280 + 24; // card width + gap
                      scrollContainerRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/products/new" 
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors font-medium"
          >
            View All New Arrivals
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}