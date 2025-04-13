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
  {
    id: '2',
    name: 'Organic Wheatgrass',
    price: 14.99,
    image: '/products/2.jpg',
    category: 'Superfoods',
    rating: 4.7,
    reviews: 98,
    stock: 30,
    bestseller: true,
    description: 'Experience the power of Organic Wheatgrass – a potent superfood known for its detoxifying and energizing properties. Perfect for health-conscious individuals seeking a daily wellness boost.',
    longDescription: 'Our Organic Wheatgrass is grown in nutrient-rich soil and harvested at peak freshness to retain its powerful health-promoting properties. This green superfood is packed with chlorophyll, essential vitamins, minerals, and antioxidants. Known for its detoxifying abilities, wheatgrass helps to cleanse the body, boost immunity, and improve energy levels. Ideal for adding to smoothies, juices, or consuming as a health shot for a revitalizing start to your day.',
    benefits: [
      'Rich in chlorophyll – supports natural detoxification',
      'Boosts immune system and energy levels',
      'Alkalizes the body and balances pH levels',
      'Promotes healthy digestion and metabolism',
      'Supports healthy skin and overall wellness'
    ],
    nutritionalInfo: {
      'Serving Size': '5g',
      'Calories': '20',
      'Total Fat': '0g',
      'Sodium': '2mg',
      'Total Carbohydrates': '4g',
      'Dietary Fiber': '2g',
      'Sugars': '0g',
      'Protein': '1g',
      'Vitamin A': '15% DV',
      'Iron': '10% DV',
      'Chlorophyll': '300mg'
    },
    features: [
      '100% certified organic',
      'No artificial additives or preservatives',
      'Gluten-free and non-GMO',
      'Easy to mix in water or smoothies',
      'Eco-friendly packaging'
    ],
    specs: {
      'Weight': '150g',
      'Ingredients': 'Organic wheatgrass powder',
      'Storage': 'Keep in a cool, dry place away from sunlight',
      'Shelf Life': '18 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Mix 1 tsp with water for a morning health shot',
      'Add to smoothies for a nutritious boost',
      'Blend into juices or detox drinks',
      'Combine with lemon and honey for a refreshing cleanse',
      'Use in salad dressings or healthy dips'
    ]
  },
  {
    id: '3',
    name: 'Red Dehydrated Onion Flakes',
    price: 9.49,
    image: '/products/3.jpg',
    category: 'Spices & Herbs',
    rating: 4.6,
    reviews: 87,
    stock: 40,
    bestseller: false,
    description: 'Convenient and flavorful, our Red Dehydrated Onion Flakes bring the bold taste of onion to your dishes without the mess or prep time.',
    longDescription: 'Our Red Dehydrated Onion Flakes are made from premium quality red onions, carefully sliced and dehydrated to lock in their rich flavor and aroma. Ideal for busy kitchens, they offer a time-saving alternative to fresh onions without sacrificing taste. These flakes rehydrate quickly and blend seamlessly into soups, stews, sauces, and dry rubs. A pantry essential for both home cooks and chefs, they provide consistent flavor and long shelf life.',
    benefits: [
      'Adds rich onion flavor without chopping',
      'Long shelf life – great for pantry storage',
      'Quick and easy to use in cooking',
      'No preservatives or artificial additives',
      'Low in calories, high in flavor'
    ],
    nutritionalInfo: {
      'Serving Size': '10g',
      'Calories': '32',
      'Total Fat': '0g',
      'Sodium': '3mg',
      'Total Carbohydrates': '7g',
      'Dietary Fiber': '1g',
      'Sugars': '3g',
      'Protein': '1g',
      'Vitamin C': '8% DV',
      'Iron': '2% DV'
    },
    features: [
      '100% pure red onion flakes',
      'No added colors or flavors',
      'Naturally dehydrated for extended freshness',
      'Perfect for seasoning and cooking',
      'Stored in resealable, moisture-proof packaging'
    ],
    specs: {
      'Weight': '200g',
      'Ingredients': 'Dehydrated red onion flakes',
      'Storage': 'Store in a cool, dry place in an airtight container',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Add to soups and stews for instant flavor',
      'Use in dry rubs or spice blends',
      'Sprinkle over pizza or pasta',
      'Mix into dips, dressings, or marinades',
      'Rehydrate in warm water and use as fresh onion substitute'
    ]
  },
  {
    id: '4',
    name: 'Dried Amla Granules',
    price: 11.49,
    image: '/products/4.jpg',
    category: 'Fruits',
    rating: 4.8,
    reviews: 110,
    stock: 35,
    bestseller: true,
    description: 'Enjoy the concentrated goodness of Amla in a convenient granule form – a perfect superfood for daily health and wellness.',
    longDescription: 'Our Dried Amla Granules are made from carefully selected Indian Gooseberries that are gently dried and crushed into small, easy-to-use granules. Packed with natural Vitamin C and antioxidants, these granules offer all the benefits of Amla in a versatile format. They are ideal for mixing into teas, smoothies, or simply consumed with warm water. A great daily supplement to boost immunity, improve digestion, and promote healthy skin and hair.',
    benefits: [
      'High in natural Vitamin C – boosts immunity',
      'Antioxidant-rich – fights free radicals',
      'Supports digestion and metabolism',
      'Promotes clear skin and strong hair',
      'Convenient granule form for easy use'
    ],
    nutritionalInfo: {
      'Serving Size': '10g',
      'Calories': '40',
      'Total Fat': '0g',
      'Sodium': '2mg',
      'Total Carbohydrates': '9g',
      'Dietary Fiber': '2g',
      'Sugars': '6g',
      'Protein': '0.5g',
      'Vitamin C': '150% DV'
    },
    features: [
      '100% natural and sun-dried',
      'No added sugar or preservatives',
      'Granule form for versatile use',
      'High in dietary fiber and Vitamin C',
      'Resealable pouch for long-lasting freshness'
    ],
    specs: {
      'Weight': '200g',
      'Ingredients': 'Dried amla granules (Indian Gooseberry)',
      'Storage': 'Keep in a cool, dry place away from moisture',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Mix with warm water for a daily health tonic',
      'Add to herbal teas or smoothies',
      'Blend into face masks for natural skincare',
      'Sprinkle on salads or yogurt',
      'Use in Ayurvedic or traditional health remedies'
    ]
  },
  {
    id: '5',
    name: 'Dried Broccoli (Green Gobhi)',
    price: 13.99,
    image: '/products/5.jpg',
    category: 'Vegetables',
    rating: 4.5,
    reviews: 76,
    stock: 28,
    bestseller: false,
    description: 'Nutritious and convenient, our Dried Broccoli retains the wholesome goodness of fresh green gobhi in a shelf-stable format – perfect for healthy meals anytime.',
    longDescription: 'Our Dried Broccoli (Green Gobhi) is made from carefully harvested broccoli florets that are gently dehydrated to preserve their nutritional content and fresh taste. Rich in dietary fiber, Vitamin C, and essential phytonutrients, it’s a perfect addition to soups, casseroles, noodles, or stir-fries. No chopping or spoilage – just rinse, rehydrate, and cook. A pantry staple for quick, healthy cooking with real vegetable power.',
    benefits: [
      'High in dietary fiber – supports digestion',
      'Rich in Vitamin C and antioxidants',
      'Low in calories – ideal for weight-conscious diets',
      'Supports immune health and detoxification',
      'Convenient and long-lasting alternative to fresh broccoli'
    ],
    nutritionalInfo: {
      'Serving Size': '15g',
      'Calories': '50',
      'Total Fat': '0.5g',
      'Sodium': '15mg',
      'Total Carbohydrates': '10g',
      'Dietary Fiber': '3g',
      'Sugars': '2g',
      'Protein': '3g',
      'Vitamin C': '90% DV',
      'Calcium': '6% DV',
      'Iron': '4% DV'
    },
    features: [
      '100% natural dried broccoli florets',
      'No additives or preservatives',
      'Retains natural flavor and nutrients',
      'Quick to rehydrate and cook',
      'Vacuum-packed for freshness'
    ],
    specs: {
      'Weight': '100g',
      'Ingredients': 'Dried broccoli (green gobhi)',
      'Storage': 'Store in a cool, dry place; reseal after opening',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Add to soups, curries, and stews',
      'Mix with pasta or stir-fry dishes',
      'Rehydrate and use in salads',
      'Blend into savory pancakes or fritters',
      'Crush into powder for green seasoning'
    ]
  },
  {
    id: '6',
    name: 'Dried Kasuri Methi (Fenugreek)',
    price: 7.99,
    image: '/products/6.jpg',
    category: 'Spices & Herbs',
    rating: 4.7,
    reviews: 95,
    stock: 50,
    bestseller: true,
    description: 'Enhance your dishes with the rich aroma and flavor of our premium Dried Kasuri Methi – a staple herb in Indian kitchens.',
    longDescription: 'NutriDry’s Dried Kasuri Methi (Fenugreek) is made from hand-picked fenugreek leaves, naturally dried to preserve their authentic flavor and nutritional value. Known for its distinct aroma and slightly bitter taste, Kasuri Methi is widely used in Indian cooking to add depth to curries, breads, and vegetable dishes. It is rich in iron, fiber, and essential phytonutrients, making it a healthy addition to your meals. Just crush and sprinkle for a burst of earthy flavor.',
    benefits: [
      'Enhances flavor of curries, dals, and sabzis',
      'Rich in iron and fiber',
      'Supports digestion and metabolism',
      'Natural and chemical-free',
      'Aromatic and flavorful – no need for artificial flavor enhancers'
    ],
    nutritionalInfo: {
      'Serving Size': '5g',
      'Calories': '14',
      'Total Fat': '0.2g',
      'Sodium': '5mg',
      'Total Carbohydrates': '2.8g',
      'Dietary Fiber': '1.2g',
      'Sugars': '0g',
      'Protein': '1g',
      'Iron': '20% DV',
      'Calcium': '5% DV'
    },
    features: [
      '100% natural dried fenugreek leaves',
      'No added preservatives or colors',
      'Strong aroma and earthy taste',
      'Packed in moisture-proof, resealable pouch',
      'Ideal for Indian, Middle Eastern, and fusion cuisine'
    ],
    specs: {
      'Weight': '46g',
      'Ingredients': 'Dried fenugreek leaves (Kasuri Methi)',
      'Storage': 'Keep in a cool, dry place away from moisture',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Crush and sprinkle into curries for added flavor',
      'Mix into dough for methi parathas or theplas',
      'Use in paneer, potato, or mushroom dishes',
      'Add to lentils or rice dishes',
      'Infuse in soups and stews for a herbal boost'
    ]
  },
  {
    id: '7',
    name: 'Dried Dill Leaves (Soya Leaves)',
    price: 6.99,
    image: '/products/7.jpg',
    category: 'Spices & Herbs',
    rating: 4.6,
    reviews: 81,
    stock: 40,
    bestseller: false,
    description: 'Aromatic and flavorful, our Dried Dill Leaves bring freshness and a delicate tang to your everyday cooking.',
    longDescription: 'NutriDry’s Dried Dill Leaves, also known as Soya Leaves, are harvested from premium-quality dill plants and carefully dried to retain their natural aroma, taste, and nutrients. Popular in Indian and Mediterranean cuisines, these leaves offer a unique citrusy flavor and are packed with antioxidants and vitamins. Perfect for enhancing dals, curries, parathas, and soups, they bring a fresh herbal touch without the hassle of chopping or washing.',
    benefits: [
      'Rich in antioxidants and essential oils',
      'Supports digestion and reduces bloating',
      'Enhances flavor with natural freshness',
      'Convenient dried format – no spoilage',
      'Low in calories, high in nutritional value'
    ],
    nutritionalInfo: {
      'Serving Size': '5g',
      'Calories': '10',
      'Total Fat': '0g',
      'Sodium': '3mg',
      'Total Carbohydrates': '2g',
      'Dietary Fiber': '1g',
      'Sugars': '0g',
      'Protein': '0.5g',
      'Vitamin A': '10% DV',
      'Iron': '8% DV'
    },
    features: [
      '100% natural dried dill leaves',
      'No added preservatives or artificial flavors',
      'Retains flavor and aroma for months',
      'Packed in resealable, moisture-proof pouch',
      'Sourced from organic farms'
    ],
    specs: {
      'Weight': '50g',
      'Ingredients': 'Dried dill leaves (soya leaves)',
      'Storage': 'Store in a cool, dry place away from moisture',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Add to lentils and soups for a herby aroma',
      'Mix into roti or paratha dough',
      'Sprinkle over curries and dry sabzis',
      'Use in dips or yogurt-based raitas',
      'Include in herbal teas or detox blends'
    ]
  },
  {
    id: '8',
    name: 'Dehydrated Spinach (Palak Leaves)',
    price: 5.49,
    image: '/products/8.jpg',
    category: 'Vegetables',
    rating: 4.7,
    reviews: 96,
    stock: 45,
    bestseller: false,
    description: 'Convenient and nutritious, our Dehydrated Spinach flakes are perfect for quick meals with all the benefits of fresh palak.',
    longDescription: 'NutriDry’s Dehydrated Spinach, also known as Palak Leaves, brings you the power of leafy greens in a convenient, shelf-stable form. These leaves are harvested fresh, then gently dried to preserve their nutrients and vibrant green color. Rich in iron, vitamins, and fiber, they are perfect for soups, dals, curries, smoothies, and even baking. A pantry essential for healthy cooking, even when fresh produce isn’t available.',
    benefits: [
      'Rich in iron and folate – supports healthy blood',
      'High in fiber – aids digestion',
      'Packed with vitamins A, C, and K',
      'Great for eye health and immunity',
      'Long shelf life – ideal for daily use'
    ],
    nutritionalInfo: {
      'Serving Size': '10g',
      'Calories': '35',
      'Total Fat': '0g',
      'Sodium': '20mg',
      'Total Carbohydrates': '6g',
      'Dietary Fiber': '2g',
      'Sugars': '1g',
      'Protein': '2g',
      'Iron': '20% DV',
      'Vitamin A': '50% DV',
      'Vitamin C': '15% DV'
    },
    features: [
      '100% natural dehydrated spinach',
      'No preservatives or additives',
      'Convenient flakes for cooking and blending',
      'Retains natural taste and nutrition',
      'Packed in moisture-resistant, resealable pouch'
    ],
    specs: {
      'Weight': '100g',
      'Ingredients': 'Dehydrated spinach (palak) leaves',
      'Storage': 'Keep in a cool, dry place away from direct sunlight',
      'Shelf Life': '12 months unopened',
      'Country of Origin': 'India'
    },
    usageSuggestions: [
      'Stir into soups, dals, or curries',
      'Blend into green smoothies',
      'Mix into doughs for rotis and parathas',
      'Sprinkle over pasta and rice dishes',
      'Rehydrate and sauté as a side dish'
    ]
  },
  {
    "id": "9",
    "name": "Dehydrated Bittergourd (Karela Flakes)",
    "price": 4.99,
    "image": "/products/9.jpg",
    "category": "Vegetables",
    "rating": 4.5,
    "reviews": 78,
    "stock": 60,
    "bestseller": false,
    "description": "NutriDry’s Dehydrated Bittergourd flakes offer the health benefits of fresh karela in a convenient, shelf-stable form, perfect for quick and nutritious meals.",
    "longDescription": "NutriDry’s Dehydrated Bittergourd, also known as Karela Flakes, provides all the nutritional benefits of fresh bittergourd without the hassle. These flakes are made from carefully selected bittergourds, which are washed, sliced, and gently dehydrated to retain their nutrients and distinct flavor. Rich in antioxidants, vitamins, and minerals, they are ideal for adding to curries, stir-fries, soups, and herbal teas. A great way to incorporate the health benefits of bittergourd into your diet, even when fresh produce isn’t available.",
    "benefits": [
      "Supports healthy blood sugar levels",
      "Rich in antioxidants – boosts immunity",
      "High in fiber – aids digestion",
      "Packed with vitamins A and C",
      "Long shelf life – convenient for daily use"
    ],
    "nutritionalInfo": {
      "Serving Size": "10g",
      "Calories": "30",
      "Total Fat": "0g",
      "Sodium": "10mg",
      "Total Carbohydrates": "7g",
      "Dietary Fiber": "3g",
      "Sugars": "2g",
      "Protein": "1g",
      "Iron": "10% DV",
      "Vitamin A": "30% DV",
      "Vitamin C": "20% DV"
    },
    "features": [
      "100% natural dehydrated bittergourd",
      "No preservatives or additives",
      "Convenient flakes for cooking and blending",
      "Retains natural taste and nutrition",
      "Packed in moisture-resistant, resealable pouch"
    ],
    "specs": {
      "Weight": "100g",
      "Ingredients": "Dehydrated bittergourd (karela) flakes",
      "Storage": "Keep in a cool, dry place away from direct sunlight",
      "Shelf Life": "12 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Add to curries and stir-fries",
      "Blend into herbal teas or detox drinks",
      "Mix into soups and stews",
      "Rehydrate and sauté as a side dish",
      "Sprinkle over salads for a bitter crunch"
    ]
  },
  {
    "id": "11",
    "name": "Dehydrated Carrot (Cubes/Flakes)",
    "price": 3.99,
    "image": "/products/11.jpg",
    "category": "Vegetables",
    "rating": 4.8,
    "reviews": 112,
    "stock": 85,
    "bestseller": true,
    "description": "NutriDry’s Dehydrated Carrot cubes/flakes offer the natural sweetness and nutrients of fresh carrots in a versatile, shelf-stable form—perfect for soups, stews, and snacks.",
    "longDescription": "NutriDry’s Dehydrated Carrots are made from sun-ripened carrots, carefully washed, diced, and gently dehydrated to lock in their vibrant color, natural sweetness, and nutrients. Rich in beta-carotene, fiber, and vitamins, these carrot cubes or flakes are ideal for enhancing soups, baby food, baked goods, and camping meals. A pantry staple for health-conscious cooks and busy households.",
    "benefits": [
      "High in beta-carotene – supports eye health",
      "Natural sweetness – no added sugar",
      "Rich in fiber – aids digestion",
      "Packed with vitamins A and K",
      "Long shelf life – great for emergencies"
    ],
    "nutritionalInfo": {
      "Serving Size": "10g",
      "Calories": "35",
      "Total Fat": "0g",
      "Sodium": "30mg",
      "Total Carbohydrates": "8g",
      "Dietary Fiber": "2g",
      "Sugars": "4g",
      "Protein": "1g",
      "Vitamin A": "300% DV",
      "Vitamin K": "10% DV"
    },
    "features": [
      "100% natural dehydrated carrots",
      "No preservatives or additives",
      "Available as cubes or flakes for versatility",
      "Retains color, flavor, and nutrients",
      "Resealable, moisture-proof packaging"
    ],
    "specs": {
      "Weight": "100g",
      "Ingredients": "Dehydrated carrots",
      "Storage": "Store in a cool, dry place away from sunlight",
      "Shelf Life": "18 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Rehydrate for soups, stews, and curries",
      "Blend into smoothies or baby food",
      "Bake into muffins or breads",
      "Add to rice or couscous for color",
      "Snack on flakes straight from the pouch"
    ]
  },
  {
    "id": "12",
    "name": "Dehydrated Ginger Flakes",
    "price": 6.49,
    "image": "/products/12.jpg",
    "category": "Spices & Herbs",
    "rating": 4.9,
    "reviews": 145,
    "stock": 50,
    "bestseller": true,
    "description": "NutriDry’s Dehydrated Ginger Flakes deliver the bold, warming flavor and health benefits of fresh ginger in a convenient, shelf-stable form—perfect for teas, curries, and remedies.",
    "longDescription": "NutriDry’s Dehydrated Ginger Flakes are made from premium ginger roots, carefully washed, sliced, and gently dried to preserve their potent aroma, spicy flavor, and active compounds like gingerol. Ideal for teas, Asian cuisine, baking, and natural remedies, these flakes offer a quick way to add digestive support, anti-inflammatory benefits, and immune-boosting properties to your diet. A must-have for holistic kitchens and on-the-go wellness.",
    "benefits": [
      "Supports digestion and reduces nausea",
      "Anti-inflammatory properties – eases joint pain",
      "Rich in antioxidants – boosts immunity",
      "Natural remedy for colds and sore throats",
      "Long shelf life – always ready to use"
    ],
    "nutritionalInfo": {
      "Serving Size": "5g",
      "Calories": "15",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "3g",
      "Dietary Fiber": "0.5g",
      "Sugars": "0g",
      "Protein": "0g",
      "Potassium": "2% DV"
    },
    "features": [
      "100% natural dehydrated ginger",
      "No preservatives or additives",
      "Intense flavor and aroma",
      "Easy to measure and store",
      "Resealable, moisture-proof packaging"
    ],
    "specs": {
      "Weight": "50g",
      "Ingredients": "Dehydrated ginger flakes",
      "Storage": "Store in a cool, dry place away from sunlight",
      "Shelf Life": "24 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Steep in hot water for ginger tea",
      "Add to curries, stir-fries, and soups",
      "Mix into smoothies or juices",
      "Bake into cookies or granola",
      "Chew a flake for quick nausea relief"
    ]
  },
  {
    "id": "13",
    "name": "Dehydrated Raw Banana Flakes",
    "price": 4.29,
    "image": "/products/13.jpg",
    "category": "Fruits",
    "rating": 4.6,
    "reviews": 88,
    "stock": 70,
    "bestseller": false,
    "description": "NutriDry’s Dehydrated Raw Banana Flakes provide the natural goodness of unripe bananas in a lightweight, shelf-stable form—ideal for smoothies, baking, and traditional dishes.",
    "longDescription": "NutriDry’s Dehydrated Raw Banana Flakes are made from carefully selected unripe bananas, peeled, sliced, and gently dried to preserve their resistant starch, potassium, and natural flavor. These flakes are a versatile ingredient for thickening soups, enhancing smoothies, or making traditional dishes like banana chips or porridge. A nutrient-dense pantry staple for gluten-free and energy-boosting recipes.",
    "benefits": [
      "High in resistant starch – supports gut health",
      "Rich in potassium – aids muscle function",
      "Naturally gluten-free and vegan",
      "Low glycemic index – blood sugar friendly",
      "Long shelf life – no refrigeration needed"
    ],
    "nutritionalInfo": {
      "Serving Size": "10g",
      "Calories": "40",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "10g",
      "Dietary Fiber": "3g",
      "Sugars": "2g",
      "Protein": "1g",
      "Potassium": "8% DV",
      "Vitamin B6": "10% DV"
    },
    "features": [
      "100% natural dehydrated raw bananas",
      "No added sugars or preservatives",
      "Retains natural nutrients and texture",
      "Quick to rehydrate or use as flakes",
      "Eco-friendly resealable packaging"
    ],
    "specs": {
      "Weight": "100g",
      "Ingredients": "Dehydrated raw banana flakes",
      "Storage": "Store in a cool, dry place away from sunlight",
      "Shelf Life": "12 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Blend into smoothies or shakes",
      "Thicken soups, stews, or porridge",
      "Bake into breads or energy bars",
      "Rehydrate for banana-based curries",
      "Sprinkle over yogurt or cereal"
    ]
  },
  {
    "id": "14",
    "name": "Dehydrated Gengeroot Flakes",
    "price": 7.99,
    "image": "/products/14.jpg",
    "category": "Spices & Herbs",
    "rating": 4.7,
    "reviews": 65,
    "stock": 40,
    "bestseller": false,
    "description": "NutriDry’s Dehydrated Gengeroot Flakes offer the earthy, aromatic flavor of fresh gengeroot in a convenient, shelf-stable form—perfect for teas, broths, and traditional remedies.",
    "longDescription": "NutriDry’s Dehydrated Gengeroot Flakes are made from premium gengeroot (also known as galangal), carefully washed, sliced, and gently dried to preserve its distinctive spicy-sweet flavor and bioactive compounds. A staple in Southeast Asian cuisine and herbal medicine, these flakes add depth to soups, curries, and teas while supporting digestion and immunity. Ideal for both culinary explorers and holistic health enthusiasts.",
    "benefits": [
      "Supports digestion and reduces bloating",
      "Anti-inflammatory properties",
      "Rich in antioxidants – boosts immunity",
      "Adds unique flavor to Asian dishes",
      "Long shelf life – retains potency"
    ],
    "nutritionalInfo": {
      "Serving Size": "5g",
      "Calories": "20",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "4g",
      "Dietary Fiber": "1g",
      "Sugars": "0g",
      "Protein": "0g",
      "Iron": "2% DV"
    },
    "features": [
      "100% natural dehydrated gengeroot",
      "No additives or preservatives",
      "Authentic Southeast Asian flavor",
      "Quick to rehydrate or use as flakes",
      "Resealable, moisture-proof packaging"
    ],
    "specs": {
      "Weight": "50g",
      "Ingredients": "Dehydrated gengeroot (galangal) flakes",
      "Storage": "Store in a cool, dry place away from sunlight",
      "Shelf Life": "18 months unopened",
      "Country of Origin": "Indonesia"
    },
    "usageSuggestions": [
      "Steep in hot water for herbal tea",
      "Add to Tom Yum soup or curries",
      "Infuse into broths or stews",
      "Grind into spice blends",
      "Chew a flake for digestive aid"
    ]
  },
  {
    "id": "15",
    "name": "Dehydrated Green Coriander Leaf",
    "price": 3.99,
    "image": "/products/15.jpg",
    "category": "Herbs & Spices",
    "rating": 4.5,
    "reviews": 92,
    "stock": 55,
    "bestseller": false,
    "description": "NutriDry’s Dehydrated Green Coriander Leaf retains the fresh, citrusy flavor of cilantro in a convenient, shelf-stable form—perfect for garnishing, cooking, and seasoning.",
    "longDescription": "NutriDry’s Dehydrated Green Coriander Leaf is made from freshly harvested cilantro leaves, carefully washed and gently dried to preserve their vibrant color and aromatic flavor. Ideal for adding a burst of freshness to curries, soups, salads, and marinades, these flakes are a kitchen essential when fresh cilantro isn’t available. Rich in antioxidants and vitamins, they offer both flavor and nutrition.",
    "benefits": [
      "Rich in antioxidants – supports detoxification",
      "Adds fresh flavor to dishes without spoilage",
      "Contains vitamins A, C, and K",
      "Convenient for quick meal preparation",
      "Long shelf life – no waste"
    ],
    "nutritionalInfo": {
      "Serving Size": "2g",
      "Calories": "5",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "1g",
      "Dietary Fiber": "0.5g",
      "Sugars": "0g",
      "Protein": "0g",
      "Vitamin A": "10% DV",
      "Vitamin C": "5% DV",
      "Vitamin K": "15% DV"
    },
    "features": [
      "100% natural dehydrated coriander leaves",
      "No additives or preservatives",
      "Retains fresh flavor and aroma",
      "Quick to rehydrate or use as flakes",
      "Resealable, moisture-proof packaging"
    ],
    "specs": {
      "Weight": "30g",
      "Ingredients": "Dehydrated green coriander leaf",
      "Storage": "Store in a cool, dry place away from sunlight",
      "Shelf Life": "12 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Sprinkle over curries and soups before serving",
      "Mix into marinades or salad dressings",
      "Add to rice or noodle dishes for freshness",
      "Blend into chutneys or dips",
      "Rehydrate for use in sauces"
    ]
  },
  {
    "id": "16",
    "name": "Dried Rose Petals",
    "price": 5.99,
    "image": "/products/16.jpg",
    "category": "Herbs & Floral",
    "rating": 4.8,
    "reviews": 120,
    "stock": 35,
    "bestseller": true,
    "description": "NutriDry’s Dried Rose Petals offer the delicate fragrance and subtle flavor of roses in a versatile, shelf-stable form—perfect for teas, desserts, and beauty rituals.",
    "longDescription": "NutriDry’s Dried Rose Petals are hand-harvested from pesticide-free roses, carefully dried to preserve their color, aroma, and natural benefits. These petals are culinary-grade, ideal for infusing teas, decorating cakes, or enhancing baths. Rich in antioxidants and known for their calming properties, they bridge the gap between gourmet cooking and holistic wellness.",
    "benefits": [
      "Calming properties – reduces stress",
      "Rich in antioxidants – supports skin health",
      "Adds floral elegance to dishes and drinks",
      "Versatile for culinary and cosmetic use",
      "Long shelf life – retains fragrance"
    ],
    "nutritionalInfo": {
      "Serving Size": "1g",
      "Calories": "3",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "0.5g",
      "Dietary Fiber": "0.3g",
      "Sugars": "0g",
      "Protein": "0g",
      "Vitamin C": "1% DV"
    },
    "features": [
      "100% natural dried rose petals",
      "No additives or preservatives",
      "Culinary-grade and cosmetic-safe",
      "Retains vibrant color and fragrance",
      "Resealable, UV-protected packaging"
    ],
    "specs": {
      "Weight": "20g",
      "Ingredients": "Dried rose petals (Rosa damascena)",
      "Storage": "Store in a cool, dark place to preserve color",
      "Shelf Life": "24 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Steep in hot water for floral tea",
      "Decorate cakes, chocolates, or salads",
      "Infuse into milk for desserts",
      "Add to bathwater for aromatherapy",
      "Make homemade rose water or potpourri"
    ]
  },
  {
    "id": "17",
    "name": "Dehydrated Lemon Leaf",
    "price": 4.49,
    "image": "/products/17.jpg",
    "category": "Herbs & Tea",
    "rating": 4.4,
    "reviews": 68,
    "stock": 42,
    "bestseller": false,
    "description": "NutriDry’s Dehydrated Lemon Leaf captures the bright, citrusy aroma of fresh lemon leaves in a shelf-stable form—perfect for teas, infusions, and culinary use.",
    "longDescription": "NutriDry’s Dehydrated Lemon Leaves are carefully handpicked and gently dried to preserve their refreshing citrus fragrance and natural oils. These leaves are ideal for brewing herbal teas, flavoring soups and sauces, or creating aromatic potpourri. With their soothing properties and vibrant flavor, they’re a versatile addition to both kitchen and wellness routines.",
    "benefits": [
      "Calming properties – aids relaxation",
      "Natural citrus flavor without acidity",
      "Rich in antioxidants",
      "Versatile for culinary and aromatic use",
      "Long shelf life – retains fragrance"
    ],
    "nutritionalInfo": {
      "Serving Size": "1g",
      "Calories": "2",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "0.5g",
      "Dietary Fiber": "0.3g",
      "Sugars": "0g",
      "Protein": "0g"
    },
    "features": [
      "100% natural dehydrated lemon leaves",
      "No additives or preservatives",
      "Retains natural citrus aroma",
      "Quick to infuse in hot liquids",
      "Resealable, moisture-proof packaging"
    ],
    "specs": {
      "Weight": "25g",
      "Ingredients": "Dehydrated lemon leaves (Citrus limon)",
      "Storage": "Store in a cool, dry place away from sunlight",
      "Shelf Life": "18 months unopened",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Steep in hot water for herbal tea",
      "Infuse into broths or soups",
      "Add to rice dishes for citrus notes",
      "Use in homemade potpourri",
      "Flavor homemade syrups or cocktails"
    ]
  },
  {
    "id": "18",
    "name": "Dried Fresh Raw Root Turmeric (Kacchi Haldi)",
    "price": 8.99,
    "image": "/products/18.jpg",
    "category": "Spices & Herbs",
    "rating": 4.9,
    "reviews": 150,
    "stock": 30,
    "bestseller": true,
    "description": "NutriDry’s Dried Fresh Raw Turmeric Root preserves the potent flavor and health benefits of kacchi haldi in a convenient, shelf-stable form—ideal for golden milk, curries, and remedies.",
    "longDescription": "NutriDry’s Dried Fresh Raw Turmeric Root (Kacchi Haldi) is made from unboiled, organically grown turmeric, carefully sliced and dried at low temperatures to retain its high curcumin content and vibrant orange color. Unlike processed turmeric powder, this raw form offers superior anti-inflammatory properties and earthy flavor. Perfect for traditional Ayurvedic remedies, gourmet cooking, and DIY beauty treatments.",
    "benefits": [
      "10x higher curcumin content than boiled turmeric",
      "Powerful anti-inflammatory and antioxidant properties",
      "Supports joint health and immunity",
      "Adds authentic flavor to Indian and Asian cuisine",
      "Versatile for culinary and medicinal use"
    ],
    "nutritionalInfo": {
      "Serving Size": "5g",
      "Calories": "18",
      "Total Fat": "0.2g",
      "Sodium": "2mg",
      "Total Carbohydrates": "3g",
      "Dietary Fiber": "1g",
      "Sugars": "0g",
      "Protein": "0.5g",
      "Iron": "5% DV",
      "Manganese": "15% DV"
    },
    "features": [
      "100% raw, unboiled turmeric (kacchi haldi)",
      "No additives, preservatives, or irradiation",
      "Retains maximum curcumin content (3-5%)",
      "Shelf-stable alternative to fresh root",
      "Ethically sourced from organic farms"
    ],
    "specs": {
      "Weight": "50g",
      "Ingredients": "Dried raw turmeric root (Curcuma longa)",
      "Storage": "Store in airtight container away from light",
      "Shelf Life": "24 months",
      "Curcumin Content": "≥3% (lab-tested)",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Grate into golden milk or teas",
      "Blend into fresh juices or smoothies",
      "Rehydrate for curries and pickles",
      "Make DIY face masks or anti-inflammatory paste",
      "Infuse in oils for massage blends"
    ],
    "certifications": [
      "Organic (certification details if applicable)",
      "Non-GMO",
      "Vegan"
    ]
  },
  {
    "id": "19",
    "name": "Dehydrated Green Chilli Flakes",
    "price": 4.99,
    "image": "/products/19.jpg",
    "category": "Spices & Seasonings",
    "rating": 4.6,
    "reviews": 105,
    "stock": 60,
    "bestseller": true,
    "description": "NutriDry’s Dehydrated Green Chilli Flakes deliver the vibrant heat and flavor of fresh green chillies in a shelf-stable form—perfect for spicing up any dish instantly.",
    "longDescription": "NutriDry’s Dehydrated Green Chilli Flakes are made from fresh, young green chillies that are carefully selected, sliced, and gently dried to preserve their bright color, medium heat level (5,000-15,000 SHU), and distinctive grassy flavor. These flakes are ideal for adding controlled heat to pizzas, curries, marinades, and snacks without the moisture of fresh chillies. A must-have for heat seekers and flavor enthusiasts alike.",
    "benefits": [
      "Retains capsaicinoids – supports metabolism",
      "Rich in vitamin C – boosts immunity",
      "Adds heat without altering texture",
      "Longer shelf life than fresh chillies",
      "Convenient portion-controlled spiciness"
    ],
    "nutritionalInfo": {
      "Serving Size": "1g",
      "Calories": "3",
      "Total Fat": "0g",
      "Sodium": "0mg",
      "Total Carbohydrates": "0.6g",
      "Dietary Fiber": "0.3g",
      "Sugars": "0.2g",
      "Protein": "0.1g",
      "Vitamin C": "10% DV",
      "Vitamin A": "2% DV"
    },
    "features": [
      "100% natural green chilli flakes",
      "No additives, preservatives, or artificial colors",
      "Retains natural Scoville heat level (5K-15K SHU)",
      "Vibrant green color preserved",
      "Resealable, UV-protected pouch"
    ],
    "specs": {
      "Weight": "50g",
      "Ingredients": "Dehydrated green chillies (Capsicum annuum)",
      "Heat Level": "Medium (5,000-15,000 Scoville units)",
      "Storage": "Store in a cool, dark place to preserve color",
      "Shelf Life": "18 months",
      "Country of Origin": "India"
    },
    "usageSuggestions": [
      "Sprinkle over pizzas and pasta",
      "Mix into dry rubs for meats",
      "Stir into oils for infused chili oil",
      "Add to popcorn or roasted nuts",
      "Blend into chutneys or hot sauces"
    ],
    "allergenInfo": "None",
    "pairings": [
      "Lemon zest for citrusy heat",
      "Garlic flakes for savory spice",
      "Dried cilantro for herbal notes"
    ]
  }
      
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