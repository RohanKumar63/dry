'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair mb-4">Our Story</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Founded in 2024 with a passion for healthy, convenient nutrition and sustainable food practices.
          </p>
        </header>
        
        <div className="relative h-96 md:h-[500px] mb-16 rounded-xl overflow-hidden">
          <Image 
            src="/bg1.jpg"
            alt="TheNutriDry premium products"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-playfair mb-2">Innovating Since 2024</h2>
            <p className="text-gray-200">
              Transforming fresh, nutrient-rich foods into convenient, long-lasting dehydrated products without compromising on quality or taste.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At TheNutriDry, we believe that healthy eating shouldn&apos;t be complicated or time-consuming. Our mission is to provide premium quality dehydrated fruits and vegetables that retain their natural nutrients and flavors while offering unmatched convenience.
            </p>
            <p className="text-gray-700">
              We&apos;re committed to sustainable food practices, reducing food waste, and making nutritious options accessible to everyone. Each product is carefully crafted to ensure you get the best of nature in every bite, without any artificial additives or preservatives.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              Our dehydration process is both an art and a science. We source the freshest, highest quality produce and use advanced dehydration techniques that preserve essential nutrients, natural flavors, and vibrant colors.
            </p>
            <p className="text-gray-700">
              By removing water content while maintaining nutritional integrity, we create products with extended shelf life without the need for artificial preservatives. This approach not only delivers exceptional taste but also supports sustainable consumption by reducing food waste.
            </p>
          </div>
        </div>
        
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-playfair text-center mb-10">Why Choose TheNutriDry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              title="Premium Quality" 
              description="We use only the finest fruits and vegetables, carefully selected for optimal flavor, texture, and nutritional value."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              }
            />
            
            <ValueCard 
              title="100% Natural" 
              description="No additives, preservatives, or artificial ingredients. Just pure, natural goodness in every package."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              }
            />
            
            <ValueCard 
              title="Nutrient-Rich" 
              description="Our gentle dehydration process preserves vitamins, minerals, and antioxidants for maximum nutritional benefit."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              }
            />
          </div>
        </section>
        
        <section className="bg-gray-100 rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair mb-4">Our Process</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              How we transform fresh produce into premium dehydrated products while preserving nutrients and flavor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep 
              number="01"
              title="Selection"
              description="We carefully select fresh, ripe fruits and vegetables at their peak flavor and nutritional value."
            />
            <ProcessStep 
              number="02"
              title="Preparation"
              description="Each piece is washed, inspected, and precisely cut to ensure even dehydration."
            />
            <ProcessStep 
              number="03"
              title="Dehydration"
              description="Using controlled temperature and humidity, we gently remove water while preserving nutrients."
            />
            <ProcessStep 
              number="04"
              title="Quality Control"
              description="Every batch is tested for quality, flavor, and nutritional content before packaging."
            />
          </div>
        </section>
        
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair mb-4">Our Commitment to Sustainability</h2>
              <p className="text-gray-700 mb-4">
                At TheNutriDry, sustainability isn&apos;t just a buzzword—it&apos;s a core principle that guides everything we do. By extending the shelf life of seasonal produce through dehydration, we help reduce food waste throughout the supply chain.
              </p>
              <p className="text-gray-700 mb-4">
                Our packaging is designed with the environment in mind, using recyclable and biodegradable materials wherever possible. We&apos;re constantly researching new ways to minimize our ecological footprint.
              </p>
              <p className="text-gray-700">
                We partner with local farmers who share our commitment to sustainable agricultural practices, supporting communities while ensuring the highest quality ingredients for our products.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Image 
                src="/bg2.jpg"
                alt="Sustainable practices at TheNutriDry"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
        
        <section className="bg-amber-50 rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-playfair mb-4">Meet Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              The passionate individuals behind TheNutriDry&apos;s vision and products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Abdul Samad" 
              role="Founder & CEO"
              image="/bg1.jpg"
            />
            <TeamMember 
              name="Faisal Khan" 
              role="Head of Product Development"
              image="/bg1.jpg"
            />
            <TeamMember 
              name="Faisal Khan" 
              role="Quality Assurance Director"
              image="/bg1.jpg"
            />
            <TeamMember 
              name="Faisal Khan" 
              role="Sustainability Lead"
              image="/bg1.jpg"
            />
          </div>
        </section>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-playfair mb-6">Join Our Journey</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Experience the difference of premium dehydrated fruits and vegetables. Discover why customers across India are choosing TheNutriDry for healthy, convenient nutrition.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors font-medium"
            >
              Shop Our Products
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 rounded-full transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValueCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-600 text-white rounded-full text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TeamMember({ name, role, image }: { name: string, role: string, image: string }) {
  return (
    <div className="text-center">
      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
        <Image 
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-medium">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  )
}
