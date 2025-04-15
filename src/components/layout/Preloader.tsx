// src/components/layout/Preloader.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    // Function to handle video ended event
    const handleVideoEnded = () => {
      // Add a small delay before fading out
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
    
    // Setup video element
    const video = videoRef.current
    if (video) {
      // Add event listener for video ended
      video.addEventListener('ended', handleVideoEnded)
      
      // Start playing video
      video.play().catch(error => {
        console.error("Video playback failed:", error)
        // Fallback in case video can't play
        setTimeout(() => setLoading(false), 3500)
      })
    }
    
    // Safety fallback timer in case video doesn't load or end event doesn't fire
    const fallbackTimer = setTimeout(() => {
      setLoading(false)
    }, 5000)
    
    // Clean up event listeners and timers
    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnded)
      }
      clearTimeout(fallbackTimer)
    }
  }, [])
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8 }
          }}
        >
          <div className="flex flex-col items-center">
            <video 
              ref={videoRef}
              className="w-80 h-80 object-contain"
              src="/preloader.mp4"
              muted
              playsInline
              loop={false}
            />
            
          
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}