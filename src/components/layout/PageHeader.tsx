'use client'

import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  image?: string
}

export default function PageHeader({ title, subtitle, image = '/images/header-bg.jpg' }: PageHeaderProps) {
  return (
    <div 
      className="relative bg-gray-900 py-16 md:py-24 text-center mb-6"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl text-white font-playfair">{title}</h1>
        {subtitle && (
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  )
} 