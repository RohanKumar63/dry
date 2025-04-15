'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Product type definition
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

// Indian cities for locations
const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal'
]

// Indian names
const indianNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 
  'Reyansh', 'Ayaan', 'Atharva', 'Krishna', 'Ishaan',
  'Shaurya', 'Advait', 'Dhruv', 'Kabir', 'Ritvik'
]

// Product data with placeholder images
const products = [
  {
    id: "1",
    name: "Dried Amla",
    price: 12.99,
    image: "/api/placeholder/400/400", // Using placeholder images for testing
    category: "Fruits"
  },
  {
    id: "2",
    name: "Organic Wheatgrass",
    price: 14.99,
    image: "/api/placeholder/400/400",
    category: "Superfoods"
  },
  {
    id: "3",
    name: "Red Dehydrated Onion Flakes",
    price: 9.49,
    image: "/api/placeholder/400/400",
    category: "Spices & Herbs"
  },
  {
    id: "4",
    name: "Dried Amla Granules",
    price: 11.49,
    image: "/api/placeholder/400/400",
    category: "Fruits"
  },
  {
    id: "5",
    name: "Dried Broccoli",
    price: 13.99,
    image: "/api/placeholder/400/400",
    category: "Vegetables"
  }
]

// Function to get a random time string
const getRandomTime = () => {
  const times = [
    'just now', '1 minute ago', '2 minutes ago', '5 minutes ago',
    '10 minutes ago', '15 minutes ago', '30 minutes ago', 'an hour ago'
  ]
  return times[Math.floor(Math.random() * times.length)]
}

export default function RecentPurchaseNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [purchase, setPurchase] = useState<{
    product: Product;
    person: string;
    location: string;
    time: string;
  } | null>(null)

  // Check for localStorage only in client-side
  const checkLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hideRecentPurchases') === 'true'
    }
    return false
  }

  // Debug function to log status
  const logStatus = (message: string) => {
    console.log(`RecentPurchaseNotification: ${message}`)
  }

  useEffect(() => {
    logStatus('Component mounted')
    
    // Check if user has opted out of notifications
    if (checkLocalStorage()) {
      logStatus('Notifications are disabled via localStorage')
      return
    }
    
    // Function to show a new purchase notification
    const showPurchase = () => {
      // Get random product, name, and location
      const randomProduct = products[Math.floor(Math.random() * products.length)]
      const randomName = indianNames[Math.floor(Math.random() * indianNames.length)]
      const randomLocation = indianCities[Math.floor(Math.random() * indianCities.length)]
      const randomTime = getRandomTime()
      
      // Set the purchase data
      setPurchase({
        product: randomProduct,
        person: randomName,
        location: randomLocation,
        time: randomTime
      })
      
      // Show the notification
      setIsVisible(true)
      logStatus('Showing notification')
      
      // Hide the notification after 5 seconds
      setTimeout(() => {
        setIsVisible(false)
        logStatus('Hiding notification after timeout')
      }, 5000)
    }
    
    // Shorter initial delay for testing (2 seconds)
    const initialDelay = setTimeout(() => {
      showPurchase()
      logStatus('First notification triggered')
      
      // Set interval for recurring notifications (shorter interval for testing)
      const interval = setInterval(() => {
        showPurchase()
        logStatus('Interval notification triggered')
      }, 15000) // Show every 15 seconds for testing
      
      return () => clearInterval(interval)
    }, 2000) // First notification after 2 seconds
    
    return () => clearTimeout(initialDelay)
  }, [])
  
  return (
    <>
      {/* Hidden debug element to verify component is rendering */}
      <div className="hidden">RecentPurchaseNotification mounted</div>
      
      <AnimatePresence>
        {isVisible && purchase && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 9999 }} // Ensure it's above everything
          >
            <div className="p-4">
              <div className="flex items-start">
                {/* Product image */}
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image
                    src={purchase.product.image}
                    alt={purchase.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Purchase information */}
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {purchase.person} from {purchase.location}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    purchased <span className="font-medium">{purchase.product.name}</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {purchase.time}
                  </p>
                  
                  {/* View product link */}
                  <div className="mt-2">
                    <a 
                      href={`/products/${purchase.product.id}`}
                      className="text-xs font-medium text-amber-600 hover:text-amber-800"
                    >
                      View Product →
                    </a>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => {
                    setIsVisible(false)
                    logStatus('Notification closed by user')
                  }}
                  className="ml-4 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Progress bar for automatic closing */}
            <div className="bg-gray-100 h-1 w-full">
              <motion.div
                className="bg-amber-500 h-1"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
            
            {/* Don't show again option */}
            <div className="border-t border-gray-100 px-4 py-2">
              <button 
                onClick={() => {
                  setIsVisible(false)
                  logStatus('User opted out of notifications')
                  // Set a localStorage flag to remember user preference
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('hideRecentPurchases', 'true')
                  }
                }}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Don't show these notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}