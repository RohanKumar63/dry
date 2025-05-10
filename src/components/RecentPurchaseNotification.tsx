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

const products = [
  {
    id: "1",
    name: "Dried Amla",
    price: 12.99,
    image: "/products/1.jpg",
    category: "Fruits"
  },
  {
    id: "2",
    name: "Organic Wheatgrass",
    price: 14.99,
    image: "/products/2.jpg",
    category: "Superfoods"
  },
  {
    id: "3",
    name: "Red Dehydrated Onion Flakes",
    price: 9.49,
    image: "/products/3.jpg",
    category: "Spices & Herbs"
  },
  {
    id: "4",
    name: "Dried Amla Granules",
    price: 11.49,
    image: "/products/4.jpg",
    category: "Fruits"
  },
  {
    id: "5",
    name: "Dried Broccoli (Green Gobhi)",
    price: 13.99,
    image: "/products/5.jpg",
    category: "Vegetables"
  },
  {
    id: "6",
    name: "Dried Kasuri Methi (Fenugreek)",
    price: 7.99,
    image: "/products/6.jpg",
    category: "Spices & Herbs"
  },
  {
    id: "7",
    name: "Dried Dill Leaves (Soya Leaves)",
    price: 6.99,
    image: "/products/7.jpg",
    category: "Spices & Herbs"
  },
  {
    id: "8",
    name: "Dehydrated Spinach (Palak Leaves)",
    price: 5.49,
    image: "/products/8.jpg",
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
    
    // Initial delay of 9 seconds before showing first notification
    const initialDelay = setTimeout(() => {
      showPurchase()
      logStatus('First notification triggered')
      
      // Set interval for recurring notifications (every 2 minutes)
      const interval = setInterval(() => {
        showPurchase()
        logStatus('Interval notification triggered')
      }, 120000) // Show every 2 minutes (120,000 ms)
      
      return () => clearInterval(interval)
    }, 9000) // First notification after 9 seconds
    
    return () => clearTimeout(initialDelay)
  }, [])
  
  return (
    <>
      {/* Hidden debug element to verify component is rendering */}
      <div className="hidden">RecentPurchaseNotification mounted</div>
      
      <AnimatePresence>
        {isVisible && purchase && (
          <motion.div
            className="fixed bottom-4 z-50 overflow-hidden bg-white rounded-lg shadow-lg
                       sm:right-4 sm:max-w-xs sm:w-auto 
                       right-2 w-[calc(100%-1rem)] max-w-full"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 9999 }} // Ensure it's above everything
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                {/* Product image - smaller on mobile */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image
                    src={purchase.product.image}
                    alt={purchase.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Purchase information - adjust text size for mobile */}
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {purchase.person} from {purchase.location}
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 truncate">
                    purchased <span className="font-medium">{purchase.product.name}</span>
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-xs text-gray-400">
                    {purchase.time}
                  </p>
                  
                  {/* View product link */}
                  <div className="mt-1 sm:mt-2">
                    <a 
                      href={`/products/${purchase.product.id}`}
                      className="text-xs font-medium text-amber-600 hover:text-amber-800"
                    >
                      View Product →
                    </a>
                  </div>
                </div>
                
                {/* Close button - slightly smaller on mobile */}
                <button
                  onClick={() => {
                    setIsVisible(false)
                    logStatus('Notification closed by user')
                  }}
                  className="text-gray-400 hover:text-gray-500 flex-shrink-0 ml-1"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Progress bar for automatic closing */}
            <motion.div
              className="bg-amber-500 h-1"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
            
            {/* Don't show again option */}
            <div className="border-t border-gray-100 px-3 py-1.5 sm:px-4 sm:py-2">
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
                Don&apos;t show these notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}