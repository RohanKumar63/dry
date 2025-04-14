'use client'

import { useState, useEffect, useRef } from 'react'
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
    stock: 25,
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
    stock: 18,
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
    stock: 32,
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
    stock: 15,
    bestseller: false
  },
]

const categories = ['All', 'Fruits', 'Vegetables', 'Snacks', 'Berries', 'Exotics']

export default function TopProductsSlider() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const primaryColor = '#f59e0b' // Amber-500 color
  
  const filteredProducts = activeCategory === 'All' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory)
  
  // Determine how many products to show per slide based on screen size
  const [productsPerSlide, setProductsPerSlide] = useState(4)
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setProductsPerSlide(1) // Mobile: 1 product per slide
        setIsMobile(true)
      } else if (width < 768) {
        setProductsPerSlide(2) // Small tablets: 2 products per slide
        setIsMobile(false)
      } else if (width < 1024) {
        setProductsPerSlide(3) // Large tablets: 3 products per slide
        setIsMobile(false)
      } else {
        setProductsPerSlide(4) // Desktop: 4 products per slide
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
  
  // Add scroll event listener for mobile
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container && isMobile) {
      container.addEventListener('scroll', checkScrollButtons)
      // Initial check
      checkScrollButtons()
      
      return () => container.removeEventListener('scroll', checkScrollButtons)
    }
  }, [isMobile])
  
  // Calculate total number of slides needed
  const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide)
  
  // Handle automatic slide transitions for desktop
  useEffect(() => {
    if (isMobile) return; // Don't auto-rotate on mobile
    
    const interval = setInterval(() => {
      if (totalSlides > 1) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }
    }, 6000)
    
    return () => clearInterval(interval)
  }, [totalSlides, isMobile])
  
  // Reset current slide when changing categories
  useEffect(() => {
    setCurrentSlide(0)
    
    // Reset scroll position on category change for mobile
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      checkScrollButtons();
    }
  }, [activeCategory])
  
  // Function to handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }
  
  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }
  
  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }
  
  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide()
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide()
    }
  }
  
  // Apply touch events only on desktop slider
  const touchProps = !isMobile ? {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  } : {}
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-playfair mb-2">Top Rated Products</h2>
            <p className="text-gray-600 font-serif">Our most loved products, backed by customer reviews.</p>
          </div>
          
          <div className="hidden md:flex space-x-2">
            {!isMobile && totalSlides > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="p-2 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-2 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-full">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-amber-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative">
          {/* Mobile Products Slider (exactly like NewProducts) */}
          {isMobile ? (
            <>
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
                {filteredProducts.map(product => (
                  <div key={product.id} className="min-w-[280px] max-w-[280px] flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* Mobile scroll indicators */}
              <div className="flex justify-center mt-4 md:hidden">
                <div className="flex space-x-1">
                  {filteredProducts.map((_, index) => (
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
            </>
          ) : (
            /* Desktop Products Slider (original behavior) */
            <>
              <div 
                className="overflow-hidden"
                ref={sliderRef}
                {...touchProps}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div 
                      key={slideIndex} 
                      className="min-w-full flex flex-nowrap gap-6"
                    >
                      {filteredProducts
                        .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
                        .map(product => (
                          <div key={product.id} className={`flex-1 min-w-0`}>
                            <ProductCard product={product} />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation arrows - only show if there are multiple slides */}
              {totalSlides > 1 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white/90 text-amber-600 p-2 rounded-full transition-all duration-300 shadow-md"
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white/90 text-amber-600 p-2 rounded-full transition-all duration-300 shadow-md"
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Indicators - only show if there are multiple slides */}
              {totalSlides > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'w-8' : 'w-2.5'
                      }`}
                      style={{ 
                        backgroundColor: index === currentSlide ? primaryColor : 'rgba(0, 0, 0, 0.2)',
                      }}
                      onMouseOver={(e) => {
                        if (index !== currentSlide) {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (index !== currentSlide) {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                        }
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-full transition-colors font-medium"
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
