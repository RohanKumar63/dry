'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    image: "/bg1.jpg",
    alt: "Slide 1"
  },
  {
    id: 2,
    image: "/bg2.jpg",
    alt: "Slide 2"
  },
  {
    id: 3,
    image: "/bg3.jpg",
    alt: "Slide 3"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Handle automatic slide transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [])

  // Define styles
  const primaryColor = '#2b9348'
  const primaryDark = '#1e6b33'
  
  // Function to handle manual navigation - fixed TypeScript error by adding type
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }
  
  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }
  
  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }
  
  return (
    <section 
      className="relative h-[85vh] min-h-[600px] bg-gray-900 overflow-hidden" 
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0">
            <Image 
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8' : 'w-3'
            }`}
            style={{ 
              backgroundColor: index === currentSlide ? primaryColor : 'rgba(255, 255, 255, 0.5)',
            }}
            onMouseOver={(e) => {
              if (index !== currentSlide) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              }
            }}
            onMouseOut={(e) => {
              if (index !== currentSlide) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
