/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
// Commented out unused imports
// import Image from 'next/image'
// import Link from 'next/link'

// At the top of your file, add this type check for environment variables
if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
  throw new Error('Missing EmailJS environment variables');
}

const glowAnimation = `
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px #E6C077;
    }
    50% {
      box-shadow: 0 0 20px #E6C077, 0 0 30px #E6C077;
    }
    100% {
      box-shadow: 0 0 5px #E6C077;
    }
  }
`

export default function ContactPage() {
  // Initialize EmailJS with your public key in useEffect
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
  }, [])

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const templateParams = {
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        subject: formState.subject,
        message: formState.message,
        to_name: "Admin",
      }

      console.log('Sending email with params:', templateParams)

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      console.log('EmailJS Response:', result) // Debug log

      if (result.status === 200) {
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setFormStatus('success')
        
        setTimeout(() => {
          setFormStatus(null)
        }, 5000)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error: any) {
      // Better error logging
      console.error('Error sending email:', {
        error: error,
        errorMessage: error?.message || 'Unknown error',
        errorDetails: error?.text || 'No details available',
        errorStatus: error?.status || 'No status available'
      })
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or want to place a bulk order? We&apos;d love to hear from you. Reach out using any of the methods below.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <h2 className="text-2xl font-playfair mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600">
                        <a href="tel:+919984001117" className="hover:text-amber-600">+91 9984001117</a>
                      </p>
                      <p className="text-gray-600">
                        <a href="tel:+919984001113" className="hover:text-amber-600">+91 9984001113</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">
                      <a href="mailto:info.nutridry@gmail.com" className="hover:text-amber-600">info.nutridry@gmail.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                    <p className="mt-1 text-gray-600">
                    122/3, Awadh Vihar Colony,<br />
                    Near Amausi Intl. Airport,<br />
                    Kanpur Road, Lucknow, 226023
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/share/1UT7Jq47Lq/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 
                      hover:bg-[#E6C077] hover:text-white hover:scale-110 
                      transition-all duration-300 ease-in-out transform shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/thenutridry?igsh=MTZqY2lsb3A2MHZocA==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 
                      hover:bg-[#E6C077] hover:text-white hover:scale-110 
                      transition-all duration-300 ease-in-out transform shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://wa.me/919984001117" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 
                      hover:bg-[#E6C077] hover:text-white hover:scale-110 
                      transition-all duration-300 ease-in-out transform shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-playfair mb-6">Send Us a Message</h2>
              
              {formStatus === 'success' && (
                <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
                  There was an error sending your message. Please try again later.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md 
                        focus:ring-2 focus:ring-[#E6C077] focus:border-[#E6C077] 
                        hover:border-[#E6C077] transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md 
                        focus:ring-2 focus:ring-[#E6C077] focus:border-[#E6C077] 
                        hover:border-[#E6C077] transition-colors duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md 
                        focus:ring-2 focus:ring-[#E6C077] focus:border-[#E6C077] 
                        hover:border-[#E6C077] transition-colors duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md 
                        focus:ring-2 focus:ring-[#E6C077] focus:border-[#E6C077] 
                        hover:border-[#E6C077] transition-colors duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="bulk-order">Bulk Order</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md 
                      focus:ring-2 focus:ring-[#E6C077] focus:border-[#E6C077] 
                      hover:border-[#E6C077] transition-colors duration-300"
                  ></textarea>
                </div>
                
                <div className="flex items-center group">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-5 w-5 text-[#E6C077] focus:ring-[#E6C077] border-gray-300 rounded 
                      transition-all duration-300 cursor-pointer hover:border-[#E6C077]"
                  />
                  <label 
                    htmlFor="privacy" 
                    className="ml-3 block text-sm text-gray-700 cursor-pointer
                      group-hover:text-[#E6C077] transition-colors duration-300"
                  >
                    I agree to the <a href="#" className="text-[#E6C077] hover:text-[#d4ad62] underline">privacy policy</a> and consent to being contacted regarding my inquiry.
                  </label>
                </div>
                
                <div>
                  <style jsx>{glowAnimation}</style>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full md:w-auto px-8 py-4 bg-[#e79c12] text-white font-medium rounded-md
                      transition-all duration-300 transform hover:scale-105
                      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#d4ad62] hover:shadow-lg'}
                      ${formState.name && formState.email && formState.subject && formState.message ? 
                        'animate-[glow_2s_ease-in-out_infinite]' : ''}
                    `}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg overflow-hidden h-96 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9048741847673!2d80.88594307549115!3d26.82210007681714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfda9edc259d1%3A0x3b2b44cd948c56bc!2sAwadh%20Vihar%20Colony%2C%20Sarojini%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226023%2C%20India!5e0!3m2!1sen!2sus!4v1713010142112!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            aria-hidden="false"
            tabIndex={0}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Find answers to common questions about our products, ordering process, and more.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How long do your products stay fresh?</h3>
              <p className="text-gray-600">
                Our dehydrated products typically have a shelf life of 12 months when stored in a cool, dry place in their original sealed packaging.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600">
                Yes, we ship to select international destinations. Shipping rates and delivery times vary by location. Please contact us for specific details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Are your products organic?</h3>
              <p className="text-gray-600">
                Many of our products are certified organic. Each product description specifies whether it&apos;s organic or conventionally grown.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer wholesale pricing?</h3>
              <p className="text-gray-600">
                Yes, we offer wholesale pricing for bulk orders. Please contact us directly at info.nutridry@gmail.com for wholesale inquiries.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 text-center">
          <p>We&apos;ll send your order details via WhatsApp for confirmation and payment processing.</p>
        </div>
      </div>
    </div>
  )
}