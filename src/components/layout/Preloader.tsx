// src/components/layout/Preloader.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading time or wait for actual loading to complete
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3500) // 3.5 seconds animation
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, delay: 0.2 }
          }}
        >
          <div className="flex flex-col items-center">
            <TreeGrowthAnimation />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TreeGrowthAnimation() {
  return (
    <div className="w-72 h-72 relative flex flex-col items-center">
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Ground/soil */}
        <motion.path
          d="M150 350 C150,350 250,350 250,350"
          stroke="#5D4037"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Tree trunk */}
        <motion.path
          d="M200 350 L200 250 L190 210 L200 180 L190 150 L200 120"
          stroke="#5D4037"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
        />
        
        {/* Tree branches - right side */}
        <motion.path
          d="M200 250 L240 230 M200 210 L250 190 M200 180 L235 160 M200 150 L245 140 M200 120 L230 110"
          stroke="#795548"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
        />
        
        {/* Tree branches - left side */}
        <motion.path
          d="M200 250 L160 230 M200 210 L150 190 M200 180 L165 160 M200 150 L155 140 M200 120 L170 110"
          stroke="#795548"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
        />
        
        {/* Leaves - first batch (dark green) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <ellipse cx="240" cy="230" rx="20" ry="18" fill="#1E9A63" />
          <ellipse cx="250" cy="190" rx="20" ry="18" fill="#1E9A63" />
          <ellipse cx="235" cy="160" rx="20" ry="18" fill="#1E9A63" />
          <ellipse cx="245" cy="140" rx="20" ry="18" fill="#1E9A63" />
        </motion.g>
        
        {/* Leaves - second batch (light green) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          <ellipse cx="160" cy="230" rx="20" ry="18" fill="#6DC067" />
          <ellipse cx="150" cy="190" rx="20" ry="18" fill="#6DC067" />
          <ellipse cx="165" cy="160" rx="20" ry="18" fill="#6DC067" />
          <ellipse cx="155" cy="140" rx="20" ry="18" fill="#6DC067" />
        </motion.g>
        
        {/* Top leaves */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <ellipse cx="200" cy="100" rx="25" ry="22" fill="#1E9A63" />
          <ellipse cx="230" cy="110" rx="20" ry="18" fill="#6DC067" />
          <ellipse cx="170" cy="110" rx="20" ry="18" fill="#6DC067" />
        </motion.g>
        
        {/* Fruits/Lemons - appear with a staggered effect */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: 2.4,
            staggerChildren: 0.1
          }}
        >
          <motion.circle 
            cx="225" cy="225" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2.4 }}
          />
          <motion.circle 
            cx="240" cy="180" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2.5 }}
          />
          <motion.circle 
            cx="225" cy="150" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2.6 }}
          />
          <motion.circle 
            cx="175" cy="225" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2.7 }}
          />
          <motion.circle 
            cx="160" cy="180" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2.8 }}
          />
          <motion.circle 
            cx="175" cy="150" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2.9 }}
          />
          <motion.circle 
            cx="200" cy="90" r="10" fill="#E6B731"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 3.0 }}
          />
        </motion.g>
        
        {/* Lemon details - add slices to some fruits */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.1 }}
        >
          <path d="M225 225 L225 225 M225 225 L230 220 M225 225 L220 220" stroke="#FFD54F" strokeWidth="1.5" />
          <path d="M240 180 L240 180 M240 180 L245 175 M240 180 L235 175" stroke="#FFD54F" strokeWidth="1.5" />
          <path d="M175 150 L175 150 M175 150 L180 145 M175 150 L170 145" stroke="#FFD54F" strokeWidth="1.5" />
          <path d="M200 90 L200 90 M200 90 L205 85 M200 90 L195 85" stroke="#FFD54F" strokeWidth="1.5" />
        </motion.g>
      </motion.svg>
      
      {/* Company name animation */}
      <motion.div
        className="text-center text-3xl font-bold mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 2.8, duration: 0.8 }
        }}
      >
        <span className="text-[#1E9A63]">THE</span>
        <span className="text-[#6DC067] font-semibold">Nutri</span>
        <span className="text-[#E6B731] font-semibold">Dry</span>
      </motion.div>
    </div>
  )
}
