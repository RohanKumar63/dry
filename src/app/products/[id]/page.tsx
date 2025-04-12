// app/products/[id]/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-hot-toast'

// Product data (this would come from your API in a real application)
const allProducts = [
  {
    id: '1',
    name: 'Dried Amla',
    price: 12.99,
    image: '/products/1.jpg',
    category: 'Fruits',
    rating: 4.8,
    reviews: 124,
    stock: 25,
    bestseller: true,
    description: 'Our premium selection of dried fruits offers a delicious and nutritious snack option. Perfect for on-the-go energy or adding to your favorite recipes.',
    longDescription: 'Amla, also known as Indian Gooseberry, is renowned for its exceptional nutritional profile and health benefits. Our premium dried Amla is carefully harvested at peak ripeness and gently dried to preserve its natural goodness. Rich in Vitamin C and antioxidants, it supports immune function, promotes healthy skin, and aids digestion. Enjoy this superfood as a nutritious snack, add to smoothies, or use in traditional recipes.',
    benefits: [
      'Rich in Vitamin C - supports immune system',
      'High in antioxidants - fights free radicals',
      'Supports digestive health',
      'Promotes healthy skin and hair',
      'Natural energy booster'
    ],
    nutritionalInfo: {
      'Serving Size': '30g',
      'Calories': '120',
      'Total Fat': '0.5g',
      'Sodium': '5mg',
      'Total Carbohydrates': '28g',
      'Dietary Fiber': '4g',
      'Sugars': '22g',
      'Protein': '1g',
      'Vitamin C': '200% DV'
    },
    features: [
      '100% natural ingredients',
      'No added sugars or preservatives',
      'High in fiber and antioxidants',
      'Resealable packaging for freshness',
      'Sustainably sourced from local farms'
    ],
    specs: {
      'Weight': '250g',
      'Ingredients': 'Dried amla (Indian Gooseberry)',
      'Storage': 'Store in a cool, dry place',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Enjoy as a nutritious snack',
      'Add to smoothies or juices',
      'Mix into yogurt or oatmeal',
      'Use in traditional recipes',
      'Brew as a tea for immune support'
    ]
  },
  // Add more products as needed
];

export default function ProductPage() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { addToCart } = useCart()
  
  // Find the product by ID
  const product = allProducts.find(p => p.id === id) || allProducts[0]
  
  // Define styles
  const primaryColor = '#2b9348'
  const primaryDark = '#1e6b33'
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  
  // Direct contact via WhatsApp
  const handleContactNow = () => {
    const message = `Hello! I'm interested in purchasing: *${product.name}* - Price: $${product.price.toFixed(2)}. Quantity: ${quantity}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/919984001117?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
  
  // Add to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
    
    toast.success(`Added ${quantity} ${product.name} to cart`);
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-amber-600 transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
        </div>
        
        {/* Product Main Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative aspect-square">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            {product.bestseller && (
              <div 
                className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Bestseller
              </div>
            )}
            
            <h1 className="text-3xl font-playfair mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            <div className="text-2xl font-medium mb-4">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className={`${
                  product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {product.stock > 10 
                    ? '✓ In Stock' 
                    : product.stock > 0 
                      ? `Only ${product.stock} left` 
                      : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="font-medium mr-4">Quantity</span>
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-l-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), product.stock))}
                    className="w-14 h-10 border-x border-gray-300 text-center focus:outline-none focus:ring-0 bg-white"
                  />
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-r-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Dual Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button 
                className="px-6 py-3 text-white rounded-md flex items-center justify-center"
                style={{ 
                  backgroundColor: primaryColor,
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                onClick={handleContactNow}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>
                Contact Now
              </button>
              <button 
                className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition-colors flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
            
            {/* Product Specs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">WEIGHT</h3>
                  <p className="mt-1">{product.specs.Weight}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">SHELF LIFE</h3>
                  <p className="mt-1">{product.specs['Shelf Life']}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ORIGIN</h3>
                  <p className="mt-1">{product.specs['Country of Origin']}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">STORAGE</h3>
                  <p className="mt-1">{product.specs.Storage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${
                  activeTab === 'description' 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${
                  activeTab === 'benefits' 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('nutritional')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${
                  activeTab === 'nutritional' 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Nutritional Info
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${
                  activeTab === 'usage' 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-4 px-6 font-medium whitespace-nowrap ${
                  activeTab === 'specs' 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Specifications
              </button>
            </div>
          </div>
          
          <div className="p-6 md:p-10">
            {activeTab === 'description' && (
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.longDescription}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Product Details</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="font-medium text-gray-700 w-1/3">{key}:</span>
                          <span className="text-gray-600 w-2/3">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'benefits' && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Health Benefits</h2>
                <div className="prose prose-amber max-w-none">
                  <p className="mb-6">
                    Our {product.name} is packed with essential nutrients and offers numerous health benefits:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <div className="bg-amber-100 p-2 rounded-full mr-3 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'nutritional' && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Nutritional Information</h2>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
                    <h3 className="font-bold">Nutrition Facts</h3>
                  </div>
                  <div className="p-4">
                    <div className="border-b border-gray-200 pb-2 mb-2">
                      <div className="font-bold">{product.nutritionalInfo?.['Serving Size'] || '30g'}</div>
                    </div>
                    
                    <div className="space-y-2">
                      {Object.entries(product.nutritionalInfo || {})
                        .filter(([key]) => key !== 'Serving Size')
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span>{key}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'usage' && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">How to Use</h2>
                <div className="prose prose-amber max-w-none">
                  <p className="mb-6">
                    Our {product.name} is incredibly versatile and can be used in many different ways:
                  </p>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {product.usageSuggestions.map((usage, index) => (
                      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                        <div className="p-5">
                          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-amber-600 font-bold">{index + 1}</span>
                          </div>
                          <p className="font-medium">{usage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 border-b border-gray-200 font-medium">{key}</td>
                          <td className="py-3 px-4 border-b border-gray-200">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-playfair mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Link key={index} href={`/products/${index + 2}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
                  <div className="relative aspect-square">
                    <Image 
                      src={`/products/${(index + 2)}.jpg`} 
                      alt="Related Product"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                  {["Dried Spinach", "Amla Powder", "Dried Beetroot", "Dried Carrot"][index]}
                </h3>
                <p className="text-amber-600 font-medium mt-1">
                  ${(9.99 + index * 2).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}