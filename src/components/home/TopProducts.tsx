'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/types' // Import the Product type

export default function TopProductsSlider() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  
  // Fetch bestseller products from API
  useEffect(() => {
    const fetchBestsellers = async () => {
      if (retryCount > 2) {
        // Fall back to static data after 3 retries
        setProducts(getFallbackProducts());
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        // Add cache busting to prevent stale responses
        const cacheBuster = new Date().getTime();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout
        
        const response = await fetch(`/api/products?bestseller=true&limit=8&cacheBust=${cacheBuster}`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('Failed to fetch bestseller products');
        }
        
        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
          setError(null);
        } else {
          // If no products returned, use fallback data
          setProducts(getFallbackProducts());
        }
      } catch (err) {
        console.error('Error fetching bestseller products:', err);
        
        // Check specifically for timeout/abort errors
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('Request timed out. Loading limited product selection.');
            setRetryCount(prev => prev + 1);
            
            // After first timeout, use fallback data but keep trying in background
            setProducts(getFallbackProducts());
          } else {
            setError('Failed to load bestseller products');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
  }, [retryCount]);
  
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory)
  
  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setShowLeftButton(scrollLeft > 0)
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }
    
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      checkScrollButtons()
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [])
  
  // Scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
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
  
  // Fallback products in case of API failure
  const getFallbackProducts = (): Product[] => {
    return [
      {
        id: '1',
        name: 'Dried Amla',
        description: 'Premium quality dried amla with natural goodness.',
        price: 12.99,
        image: '/products/1.jpg',
        category: 'Fruits',
        rating: 4.5,
        reviews: 24,
        bestseller: true,
        stock: 15
      },
      {
        id: '2',
        name: 'Organic Wheatgrass',
        description: 'Pure organic wheatgrass packed with nutrients.',
        price: 14.99,
        image: '/products/2.jpg',
        category: 'Superfoods',
        rating: 4.8,
        reviews: 32,
        bestseller: true,
        stock: 20
      },
      {
        id: '3',
        name: 'Dehydrated Red Onion Flakes',
        description: 'Conveniently sliced and dehydrated red onion flakes.',
        price: 9.49,
        image: '/products/3.jpg',
        category: 'Vegetables',
        rating: 4.2,
        reviews: 18,
        bestseller: true,
        stock: 25
      }
    ];
  };
  
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">Bestsellers</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Our most popular products that customers love.
          </p>
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bestsellers...</p>
        </div>
      </section>
    )
  }
  
  if (error && filteredProducts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">Bestsellers</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-4">
            Our most popular products that customers love.
          </p>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => setRetryCount(prev => prev + 1)} 
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
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
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
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
        
        {/* Error notification if using fallback data */}
        {error && (
          <div className="mb-6 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm text-center">
            {error}
          </div>
        )}
        
        {/* Product slider */}
        <div className="relative" ref={sliderRef}>
          {/* Left scroll button */}
          {showLeftButton && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-amber-600 border border-gray-200 -ml-5 focus:outline-none focus:ring-2 focus:ring-amber-500 hidden md:flex"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {filteredProducts.map(product => (
              <div key={product.id} className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* Right scroll button */}
          {showRightButton && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-amber-600 border border-gray-200 -mr-5 focus:outline-none focus:ring-2 focus:ring-amber-500 hidden md:flex"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-8">
          <Link href="/products" className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors inline-flex items-center space-x-2">
            <span>View All Bestsellers</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
