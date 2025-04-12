'use client'
import HeroSection from '@/components/home/HeroSection'
import TopProducts from '@/components/home/TopProducts'
import NewProducts from '@/components/home/NewProducts'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-4">Our Collections</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Discover our carefully curated collections designed to enhance your lifestyle with premium quality and timeless design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title="Audio" 
              image="/products/headphones.jpg" 
              href="/products?category=audio"
            />
            <CategoryCard 
              title="Wearables" 
              image="/products/smartwatch.jpg" 
              href="/products?category=wearables"
            />
            <CategoryCard 
              title="Apparel" 
              image="/products/jacket.jpg" 
              href="/products?category=apparel"
            />
            <CategoryCard 
              title="Home" 
              image="/products/coffeemaker.jpg" 
              href="/products?category=home"
            />
          </div>
        </div>
      </section>
      
      <TopProducts />
      
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-playfair mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2024, TheNutriDry was born from a passion for healthy, convenient nutrition. We believe that nutritious food should be accessible, delicious, and free from artificial additives, while maintaining a long shelf life.
              </p>
              <p className="text-gray-700 mb-6">
                Our team of food specialists and nutritionists works directly with farmers to source the freshest produce, which we transform into premium dehydrated fruits and vegetables that retain their natural flavors and nutrients.
              </p>
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors font-medium"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image 
                  src="/bg1.jpg"
                  alt="TheNutriDry premium dehydrated products"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NewProducts />
      
      {/* Simple Certification Badges Slider */}
      <CertificationSlider />
      
      <section className="py-16 bg-amber-600 text-white">
  <div className="container mx-auto px-4 md:px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-playfair mb-4">Join Our Community</h2>
    <p className="max-w-2xl mx-auto mb-8">
      Subscribe to our newsletter for exclusive offers, new product announcements, and lifestyle inspiration.
    </p>
    <form className="max-w-md mx-auto">
      <div className="flex rounded-full overflow-hidden border-2 border-white shadow-lg">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-grow px-6 py-3 text-gray-900 focus:outline-none w-full"
          required
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white transition-colors font-medium whitespace-nowrap"
        >
          Subscribe
        </button>
      </div>
      <p className="text-xs mt-3 text-white/80">
        By subscribing, you agree to receive marketing communications from us.
      </p>
    </form>
  </div>
</section>
    </div>
  )
}

function CategoryCard({ title, image, href }: { title: string, image: string, href: string }) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-80 rounded-lg overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-xl font-medium text-white mb-1">{title}</h3>
            <span className="text-amber-300 flex items-center text-sm font-medium">
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Simple Horizontal Certification Slider
function CertificationSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const certifications = [
    { id: 1, name: "100% Pure", image: "/slider1.jpg", description: "All our products are 100% pure with no fillers or additives" },
    { id: 2, name: "100% Vegan", image: "/slider2.jpg", description: "Completely plant-based and vegan-friendly products" },
    { id: 3, name: "Gluten Free", image: "/slider3.jpg", description: "Safe for those with gluten sensitivities or celiac disease" },
    { id: 4, name: "Halal", image: "/slider4.jpg", description: "Certified Halal products suitable for Muslim consumers" },
    { id: 5, name: "No Additives", image: "/slider5.jpg", description: "Free from artificial colors, flavors, and preservatives" },
    { id: 6, name: "No Preservatives", image: "/slider6.jpg", description: "Natural preservation through dehydration only" }
  ];
  
  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % certifications.length);
        
        // Scroll to the current item
        if (scrollContainerRef.current) {
          const itemWidth = scrollContainerRef.current.scrollWidth / (certifications.length * 2);
          scrollContainerRef.current.scrollTo({
            left: (currentIndex + 1) % certifications.length * itemWidth,
            behavior: 'smooth'
          });
        }
      }, 3000);
    };
    
    startAutoScroll();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, certifications.length]);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair mb-3">Our Quality Commitments</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take pride in our product certifications that ensure the highest standards of quality and purity.
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation arrows */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length)}
            aria-label="Previous certification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % certifications.length)}
            aria-label="Next certification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          {/* Slider container */}
          <div 
            className="overflow-hidden mx-10"
            ref={scrollContainerRef}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / certifications.length)}%)` }}
            >
              {/* Double the items for infinite scrolling effect */}
              {[...certifications, ...certifications].map((cert, index) => (
                <div 
                  key={`${cert.id}-${index}`} 
                  className="flex-shrink-0 w-full md:w-1/3 lg:w-1/6 px-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 md:w-28 md:h-28">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center font-medium mt-3 text-sm">{cert.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-6 space-x-1">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-amber-600 w-5' : 'bg-gray-300'
              }`}
              aria-label={`Go to certification ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
