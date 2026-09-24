import { 
  Category, 
  NearbyShop, 
  Product, 
  Address, 
  Coupon, 
  Order, 
  RewardVoucher, 
  SuperCoinTransaction, 
  UserProfile 
} from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Cpu',
    slug: 'electronics',
    itemCount: 420,
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras', 'TVs', 'Gaming', 'Accessories'],
    bannerImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#6366f1'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'Shirt',
    slug: 'fashion',
    itemCount: 850,
    subcategories: ['Men', 'Women', 'Kids', 'Shoes', 'Watches', 'Bags', 'Accessories', 'Clothing'],
    bannerImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ec4899'
  },
  {
    id: 'food',
    name: 'Food & Grocery',
    icon: 'Apple',
    slug: 'food',
    itemCount: 610,
    subcategories: ['Groceries', 'Snacks', 'Beverages', 'Fresh Food', 'Packaged Food', 'Dairy & Eggs'],
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#10b981'
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    icon: 'Sparkles',
    slug: 'beauty',
    itemCount: 340,
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Personal Care', 'Men Grooming'],
    bannerImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#f43f5e'
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    icon: 'Home',
    slug: 'home',
    itemCount: 490,
    subcategories: ['Decor', 'Kitchen', 'Storage', 'Lighting', 'Bedding', 'Cleaning'],
    bannerImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#eab308'
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: 'Zap',
    slug: 'appliances',
    itemCount: 180,
    subcategories: ['Refrigerators', 'Washing Machines', 'Air Conditioners', 'Microwaves', 'Small Appliances'],
    bannerImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#3b82f6'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: 'Activity',
    slug: 'sports',
    itemCount: 290,
    subcategories: ['Fitness', 'Running', 'Cricket', 'Football', 'Cycling', 'Outdoor'],
    bannerImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#14b8a6'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: 'Armchair',
    slug: 'furniture',
    itemCount: 210,
    subcategories: ['Sofa', 'Beds', 'Tables', 'Chairs', 'Office Furniture', 'Storage'],
    bannerImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#8b5cf6'
  },
  {
    id: 'toys',
    name: 'Toys & Gaming',
    icon: 'Gamepad2',
    slug: 'toys',
    itemCount: 260,
    subcategories: ['Educational', 'Games', 'Action Figures', 'Outdoor Toys', 'Baby Toys', 'Puzzles'],
    bannerImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#f97316'
  },
  {
    id: 'books',
    name: 'Books & Media',
    icon: 'BookOpen',
    slug: 'books',
    itemCount: 530,
    subcategories: ['Fiction', 'Non-fiction', 'Education', 'Business', 'Technology', 'Children Books'],
    bannerImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#06b6d4'
  }
];

export const nearbyShops: NearbyShop[] = [
  {
    id: 'shop-freshmart',
    name: 'FreshMart Supermarket',
    category: 'Food & Grocery',
    rating: 4.9,
    reviewCount: 1420,
    distanceKm: 0.8,
    etaMinutes: 8,
    isOpen: true,
    minOrder: 150,
    deliveryFee: 0,
    address: '100 Feet Rd, Indiranagar, Bengaluru',
    phone: '+91 80 4123 4567',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=160&q=80',
    banner: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    inStockProductsCount: 1840,
    deliveryRadiusKm: 4.5,
    lat: 12.9716,
    lng: 77.6412
  },
  {
    id: 'shop-techzone',
    name: 'TechZone Experience Hub',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 980,
    distanceKm: 1.4,
    etaMinutes: 12,
    isOpen: true,
    minOrder: 299,
    deliveryFee: 0,
    address: '12th Main, HAL 2nd Stage, Indiranagar',
    phone: '+91 80 4987 6543',
    logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=160&q=80',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    inStockProductsCount: 750,
    deliveryRadiusKm: 6.0,
    lat: 12.9784,
    lng: 77.6445
  },
  {
    id: 'shop-beautyhub',
    name: 'Beauty Hub & Apothecary',
    category: 'Beauty & Care',
    rating: 4.9,
    reviewCount: 630,
    distanceKm: 1.1,
    etaMinutes: 10,
    isOpen: true,
    minOrder: 199,
    deliveryFee: 19,
    address: 'CMH Road, Metro Pillar 42, Indiranagar',
    phone: '+91 80 2521 8899',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=160&q=80',
    banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    inStockProductsCount: 520,
    deliveryRadiusKm: 5.0,
    lat: 12.9792,
    lng: 77.6380
  },
  {
    id: 'shop-dailybake',
    name: 'DailyBake Artisan Deli',
    category: 'Food & Bakery',
    rating: 4.8,
    reviewCount: 1120,
    distanceKm: 0.5,
    etaMinutes: 6,
    isOpen: true,
    minOrder: 99,
    deliveryFee: 0,
    address: '80 Feet Road, 4th Block, Koramangala',
    phone: '+91 80 4110 3344',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=160&q=80',
    banner: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
    inStockProductsCount: 310,
    deliveryRadiusKm: 3.5,
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: 'shop-soundwave',
    name: 'SoundWave Studio Audio',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 490,
    distanceKm: 2.1,
    etaMinutes: 18,
    isOpen: true,
    minOrder: 499,
    deliveryFee: 25,
    address: 'Old Airport Road, Kodihalli',
    phone: '+91 80 4155 7788',
    logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=160&q=80',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    inStockProductsCount: 420,
    deliveryRadiusKm: 7.0,
    lat: 12.9592,
    lng: 77.6530
  },
  {
    id: 'shop-urbanfit',
    name: 'UrbanFit Sports Gear',
    category: 'Sports & Fitness',
    rating: 4.7,
    reviewCount: 380,
    distanceKm: 2.4,
    etaMinutes: 20,
    isOpen: true,
    minOrder: 350,
    deliveryFee: 29,
    address: 'Domlur Intermediate Ring Rd, Domlur',
    phone: '+91 80 4166 9900',
    logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=160&q=80',
    banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    inStockProductsCount: 640,
    deliveryRadiusKm: 8.0,
    lat: 12.9609,
    lng: 77.6387
  }
];

export const products: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 'prod-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 26990,
    originalPrice: 34990,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Industry-leading noise cancellation optimized with two processors and 8 microphones. Magnificent sound quality engineered with the new Integrated Processor V1, up to 30-hour battery life, and crystal-clear hands-free calling with 4 beamforming microphones.',
    features: [
      'Auto NC Optimizer dynamically adapts noise cancellation',
      'Crystal-clear hands-free calling with 4 beamforming mics',
      'Up to 30 hours of battery life with quick charging (3 min for 3 hours)',
      'Ultra-comfortable lightweight design with soft-fit leather',
      'Multipoint connection allows swift switching between 2 devices'
    ],
    specs: {
      'Headphone Type': 'Over-Ear Closed Dynamic',
      'Driver Unit': '30mm Carbon Fiber Composite',
      'Frequency Response': '4 Hz - 40,000 Hz',
      'Battery Life': '30 hours (NC ON), 40 hours (NC OFF)',
      'Connectivity': 'Bluetooth 5.2, LDAC, 3.5mm Aux',
      'Weight': '250 grams'
    },
    whatsIncluded: [
      'Sony WH-1000XM5 Headphones',
      'Collapsible Premium Carrying Case',
      'Headphone Cable (1.2m)',
      'USB-C Charging Cable',
      'Reference Guide'
    ],
    warranty: '1 Year Manufacturer Domestic Warranty',
    returnPolicy: '7 Days Replacement for Technical Defects',
    inStock: true,
    stockCount: 14,
    superCoinsReward: 540,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Flagship', 'Noise Cancelling', 'Hot Deal', 'Audiophile'],
    isHotDeal: true,
    isBestSeller: true,
    variants: {
      colors: [
        { id: 'c-black', type: 'color', label: 'Matte Black', value: '#1a1a1a', priceDelta: 0, inStock: true },
        { id: 'c-silver', type: 'color', label: 'Platinum Silver', value: '#d4d4d8', priceDelta: 0, inStock: true },
        { id: 'c-blue', type: 'color', label: 'Midnight Blue', value: '#1e3a8a', priceDelta: 500, inStock: true }
      ]
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Aarav Mehta',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '3 days ago',
        title: 'Absolute game changer for office & flights!',
        comment: 'The noise cancellation is terrifyingly good. Put these on in a busy cafe and silence washed over. Battery lasts nearly all week. Delivered to my doorstep in 12 minutes flat!',
        verifiedPurchase: true,
        helpfulVotes: 48
      },
      {
        id: 'rev-2',
        author: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '1 week ago',
        title: 'Comfortable for 8+ hour stretches',
        comment: 'So lightweight on the skull, no ear fatigue. Soundstage is rich, warm, and detailed. Super coins reward was an awesome bonus!',
        verifiedPurchase: true,
        helpfulVotes: 32
      }
    ]
  },
  {
    id: 'prod-macbook-air-m3',
    title: 'Apple MacBook Air 15" M3 Chip (16GB Unified Memory, Liquid Retina)',
    brand: 'Apple',
    categoryId: 'electronics',
    subcategory: 'Laptops',
    price: 124990,
    originalPrice: 134900,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 890,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Impossibly thin and lightning fast. Powered by the next-gen M3 chip, MacBook Air 15-inch effortlessly blazes through work and play with up to 18 hours of battery life and an expansive Liquid Retina display.',
    features: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      '15.3-inch Liquid Retina display with True Tone and 500 nits brightness',
      'Fanless design for completely silent operation',
      '1080p FaceTime HD camera with three-mic array',
      'Six-speaker sound system with Spatial Audio'
    ],
    specs: {
      'Processor': 'Apple M3 Chip (8-Core CPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB High Speed NVMe SSD',
      'Display': '15.3" Liquid Retina (2880 x 1864)',
      'Battery': 'Up to 18 hours wireless web',
      'Weight': '1.51 kg'
    },
    whatsIncluded: ['15-inch MacBook Air', '35W Dual USB-C Port Compact Power Adapter', 'USB-C to MagSafe 3 Cable (2 m)'],
    warranty: '1 Year Apple International Limited Warranty',
    returnPolicy: '7 Days Replacement Guarantee',
    inStock: true,
    stockCount: 6,
    superCoinsReward: 2500,
    deliveryEstimateMinutes: 15,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Apple', 'M3', 'Ultrabook', 'Premium'],
    isBestSeller: true,
    variants: {
      colors: [
        { id: 'c-midnight', type: 'color', label: 'Midnight', value: '#1e293b', priceDelta: 0, inStock: true },
        { id: 'c-starlight', type: 'color', label: 'Starlight', value: '#fef08a', priceDelta: 0, inStock: true },
        { id: 'c-spacegray', type: 'color', label: 'Space Grey', value: '#4b5563', priceDelta: 0, inStock: true }
      ],
      storage: [
        { id: 's-512', type: 'storage', label: '512GB SSD', value: '512gb', priceDelta: 0, inStock: true },
        { id: 's-1tb', type: 'storage', label: '1TB SSD', value: '1tb', priceDelta: 18000, inStock: true }
      ]
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Vikram Sen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '2 weeks ago',
        title: 'The best productivity machine money can buy',
        comment: 'Keyboard is phenomenal, trackpad is unmatched, battery lasts almost two entire working days without plugging in.',
        verifiedPurchase: true,
        helpfulVotes: 76
      }
    ]
  },
  {
    id: 'prod-nothing-phone2a',
    title: 'Nothing Phone (2a) Plus 5G (Metallic Grey, 256GB / 12GB RAM)',
    brand: 'Nothing',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 23999,
    originalPrice: 29999,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 3420,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Iconic transparent design with Glyph Interface. Powered by MediaTek Dimensity 7350 Pro 5G, dual 50MP studio camera system, and an ultra-smooth 120Hz flexible AMOLED display.',
    features: [
      'Custom Dimensity 7350 Pro 5G Processor',
      'Signature Glyph Interface lighting notifications',
      'Dual 50MP Sony Flagship Cameras with 4K recording',
      '5000 mAh battery with 50W fast charging',
      'Nothing OS 2.6 with zero bloatware'
    ],
    specs: {
      'RAM & Storage': '12GB LPDDR5 + 256GB UFS 2.2',
      'Display': '6.7" 120Hz Flexible AMOLED (1300 nits)',
      'Rear Cameras': '50MP Main OIS + 50MP Ultra-Wide',
      'Front Camera': '50MP 4K Selfie',
      'Battery': '5000mAh with 50W Quick Charge'
    },
    whatsIncluded: ['Nothing Phone (2a) Plus', 'Type-C to Type-C Cable', 'Pre-applied Screen Protector', 'SIM Tray Ejector'],
    warranty: '1 Year Brand Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 22,
    superCoinsReward: 480,
    deliveryEstimateMinutes: 14,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['5G', 'Glyph', 'Trending', 'Hot Deal'],
    isHotDeal: true,
    variants: {
      colors: [
        { id: 'c-grey', type: 'color', label: 'Metallic Grey', value: '#475569', priceDelta: 0, inStock: true },
        { id: 'c-black', type: 'color', label: 'Obsidian Black', value: '#0f172a', priceDelta: 0, inStock: true }
      ]
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Rohan Deshmukh',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '5 days ago',
        title: 'Glyph interface is super useful!',
        comment: 'Love the timer and notification light indicators. The camera captures vivid colors with natural tone.',
        verifiedPurchase: true,
        helpfulVotes: 19
      }
    ]
  },
  {
    id: 'prod-boat-airdopes141',
    title: 'boAt Airdopes 141 ANC TWS Earbuds with 42H Playtime',
    brand: 'boAt',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 1499,
    originalPrice: 4490,
    discountPercent: 67,
    rating: 4.4,
    reviewCount: 14200,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Up to 32dB Active Noise Cancellation, Quad Mics with ENx Tech for crystal clear calls, ASAP Charge delivering 75 mins in 5 mins.',
    features: [
      '32dB Hybrid Active Noise Cancellation',
      '42 Hours Total Playback',
      'BEAST Mode 50ms Low Latency Gaming',
      'IPX5 Water & Sweat Resistance'
    ],
    specs: {
      'Bluetooth': 'v5.3',
      'Driver': '10mm Bass Boost Drivers',
      'Battery': '42 Hours with Case',
      'Charging': 'Type-C Fast Charge'
    },
    whatsIncluded: ['Airdopes 141 ANC', 'Extra Eartips', 'Type-C Cable', 'User Manual'],
    warranty: '1 Year Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 85,
    superCoinsReward: 30,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Bestseller', 'Flash Sale', 'Budget King'],
    isFlashSale: true,
    reviews: []
  },

  // --- FASHION ---
  {
    id: 'prod-nike-airmax270',
    title: 'Nike Air Max 270 React Breathable Running Sneakers',
    brand: 'Nike',
    categoryId: 'fashion',
    subcategory: 'Shoes',
    price: 8995,
    originalPrice: 13995,
    discountPercent: 36,
    rating: 4.7,
    reviewCount: 2120,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Nike Air Max 270 is inspired by two icons of big Air: the Air Max 180 and Air Max 93. It features Nike biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.',
    features: [
      'Nike biggest heel Air unit provides ultra-cushioned bounce',
      'Knit fabric on the upper provides a lightweight fit and airy feel',
      'Stretchy inner sleeve creates a personalized, sock-like fit',
      'Rubber on the outsole adds traction and durability'
    ],
    specs: {
      'Upper Material': 'Engineered Mesh & Synthetic Overlays',
      'Sole Material': 'Nike Air Cushion & Dual-Density Foam',
      'Closure': 'Lace-Up',
      'Ideal For': 'Casual Wear, Training, Daily Run',
      'Weight': '320 grams (per shoe)'
    },
    whatsIncluded: ['1 Pair Nike Air Max 270 Shoes', 'Original Nike Box'],
    warranty: '3 Months Brand Manufacturing Warranty',
    returnPolicy: '10 Days Return & Size Exchange',
    inStock: true,
    stockCount: 18,
    superCoinsReward: 180,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-urbanfit',
    tags: ['Sneakers', 'Streetwear', 'Nike', 'Hot Deal'],
    isHotDeal: true,
    isBestSeller: true,
    variants: {
      sizes: [
        { id: 'sz-7', type: 'size', label: 'UK 7', value: '7', priceDelta: 0, inStock: true },
        { id: 'sz-8', type: 'size', label: 'UK 8', value: '8', priceDelta: 0, inStock: true },
        { id: 'sz-9', type: 'size', label: 'UK 9', value: '9', priceDelta: 0, inStock: true },
        { id: 'sz-10', type: 'size', label: 'UK 10', value: '10', priceDelta: 0, inStock: true }
      ],
      colors: [
        { id: 'c-redblack', type: 'color', label: 'Crimson Red / Black', value: '#dc2626', priceDelta: 0, inStock: true },
        { id: 'c-tripleblack', type: 'color', label: 'Triple Black', value: '#0f172a', priceDelta: 500, inStock: true }
      ]
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Kabir Varma',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
        rating: 5,
        date: '4 days ago',
        title: 'Walk on clouds!',
        comment: 'The cushion on the heel is huge and incredibly responsive. Looks fire with both joggers and denim.',
        verifiedPurchase: true,
        helpfulVotes: 44
      }
    ]
  },
  {
    id: 'prod-fossil-gen6',
    title: 'Fossil Gen 6 Wellness Edition Touchscreen Smartwatch',
    brand: 'Fossil',
    categoryId: 'fashion',
    subcategory: 'Watches',
    price: 14995,
    originalPrice: 24995,
    discountPercent: 40,
    rating: 4.4,
    reviewCount: 880,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Powered by Snapdragon Wear 4100+ platform. Tracks SpO2, heart rate zones, sleep quality, and VO2 Max with an always-on crisp AMOLED display.',
    features: [
      'Snapdragon Wear 4100+ high efficiency processor',
      'Continuous heart rate, SpO2, and sleep tracking',
      'Fast charging to 80% in just 30 minutes',
      'Water resistant up to 3 ATM'
    ],
    specs: {
      'Case Size': '44mm Stainless Steel',
      'Display': '1.28" Color AMOLED 416 x 416',
      'Compatibility': 'Android & iOS',
      'Sensors': 'Accelerometer, Compass, PPG Heart Rate, SpO2'
    },
    whatsIncluded: ['Fossil Smartwatch', 'Magnetic USB Rapid Charger', 'Quick Start Guide'],
    warranty: '2 Years Manufacturer Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 9,
    superCoinsReward: 300,
    deliveryEstimateMinutes: 14,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Smartwatch', 'Fitness', 'Fossil'],
    reviews: []
  },
  {
    id: 'prod-rayban-aviator',
    title: 'Ray-Ban Classic Polarized Aviator Sunglasses (Gold Frame)',
    brand: 'Ray-Ban',
    categoryId: 'fashion',
    subcategory: 'Accessories',
    price: 7490,
    originalPrice: 9990,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 1450,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Timeless style meets 100% UV polarized protection. High grade crystal green lenses encased in polished golden metal frames.',
    features: [
      'Polarized G-15 crystal green lenses',
      '100% UV400 protection against harmful rays',
      'Lightweight durable metal alloy frame'
    ],
    specs: {
      'Frame Material': 'Polished Metal Gold',
      'Lens Color': 'G-15 Green Polarized',
      'Bridge Width': '14mm',
      'Lens Size': '58mm Standard'
    },
    whatsIncluded: ['Ray-Ban Aviators', 'Leather Hard Case', 'Microfiber Cleaning Cloth', 'Authenticity Booklet'],
    warranty: '2 Years Brand Warranty',
    returnPolicy: '10 Days Return & Exchange',
    inStock: true,
    stockCount: 15,
    superCoinsReward: 150,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-beautyhub',
    tags: ['Classics', 'Summer Essentials'],
    reviews: []
  },

  // --- FOOD & GROCERY ---
  {
    id: 'prod-hass-avocados',
    title: 'Fresh Hass Avocados (Box of 4, Ready to Eat & Ripe)',
    brand: 'FarmDirect',
    categoryId: 'food',
    subcategory: 'Fresh Food',
    price: 349,
    originalPrice: 499,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: 1450,
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Creamy, buttery Hass avocados sourced directly from organic orchards. Perfectly ripe and nutrient-packed with healthy monounsaturated fats, fiber, and potassium.',
    features: [
      'Hand-picked for optimum ripeness and creamy texture',
      'Zero artificial ripening chemicals or carbide',
      'Perfect for keto guacamole, morning toast, and salads'
    ],
    specs: {
      'Origin': 'Organic Certified Farms',
      'Package': 'Pack of 4 Avocados',
      'Shelf Life': '3 - 5 days refrigerated'
    },
    whatsIncluded: ['4x Hass Avocados in eco-cushioned box'],
    warranty: '100% Quality & Freshness Guarantee',
    returnPolicy: 'Instant Refund if unsatisfied upon delivery',
    inStock: true,
    stockCount: 45,
    superCoinsReward: 10,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Fresh', 'Organic', 'Hyperlocal 8m', 'Keto'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-olive-oil',
    title: 'Borges Extra Virgin Olive Oil Cold-Pressed 1 Litre',
    brand: 'Borges',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 899,
    originalPrice: 1299,
    discountPercent: 31,
    rating: 4.7,
    reviewCount: 2100,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Extracted from the highest quality Mediterranean olives using traditional cold extraction methods to maintain natural antioxidants, aroma, and delicate flavor.',
    features: [
      '100% First Cold Pressed Extra Virgin',
      'Rich in Polyphenols and Vitamin E',
      'Ideal for raw dressing, dips, and sauteing'
    ],
    specs: {
      'Volume': '1 Litre Glass Bottle',
      'Acidity': '< 0.5%',
      'Origin': 'Spain'
    },
    whatsIncluded: ['1L Olive Oil Bottle'],
    warranty: 'Freshness Guarantee',
    returnPolicy: 'Replacement on transit damage',
    inStock: true,
    stockCount: 30,
    superCoinsReward: 25,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Pantry', 'Healthy Living'],
    reviews: []
  },
  {
    id: 'prod-blue-tokai-coffee',
    title: 'Blue Tokai Vienna Roast Arabica Whole Beans 250g',
    brand: 'Blue Tokai',
    categoryId: 'food',
    subcategory: 'Beverages',
    price: 470,
    originalPrice: 550,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 3800,
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Dark roasted with tasting notes of cocoa, toasted oak, and bitter-sweet chocolate. Roasted weekly to order for supreme freshness.',
    features: [
      '100% Specialty Grade Arabica',
      'Tasting Notes: Dark Chocolate, Roasted Walnut',
      'Ideal for French Press, Espresso, and Moka Pot'
    ],
    specs: {
      'Roast Level': 'Dark (Vienna Roast)',
      'Net Weight': '250 grams',
      'Altitude': '1100m - 1400m MSL'
    },
    whatsIncluded: ['Degassing Valve Sealed Coffee Pouch 250g'],
    warranty: 'Fresh Roast Guarantee',
    returnPolicy: 'Perishable - Non Returnable',
    inStock: true,
    stockCount: 28,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 6,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-dailybake',
    tags: ['Coffee', 'Artisan', 'Hyperlocal 6m'],
    isHotDeal: true,
    reviews: []
  },

  // --- BEAUTY & CARE ---
  {
    id: 'prod-minimalist-niacinamide',
    title: 'Minimalist 10% Niacinamide + Zinc Serum for Blemish Control 30ml',
    brand: 'Minimalist',
    categoryId: 'beauty',
    subcategory: 'Skincare',
    price: 569,
    originalPrice: 599,
    discountPercent: 5,
    rating: 4.8,
    reviewCount: 8900,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Nourishing daily serum clinically proven to fade dark spots, balance sebum production, and strengthen the epidermal moisture barrier with pure Grade-A Vitamin B3 and Zinc PCA.',
    features: [
      'Pure 10% Niacinamide with 1% Zinc PCA',
      'Fragrance-Free, Essential Oil-Free, Non-Comedogenic',
      'Formulated with soothing Aloe Juice base'
    ],
    specs: {
      'Skin Type': 'All Skin Types, Oily/Acne-Prone',
      'Net Volume': '30 ml Glass Dropper Bottle',
      'pH Level': '5.5 - 6.5'
    },
    whatsIncluded: ['30ml Serum Bottle with Dropper'],
    warranty: 'Dermatologically Tested',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 60,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-beautyhub',
    tags: ['Skincare', 'Clean Beauty', 'Hyperlocal 10m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-dyson-hairdryer',
    title: 'Dyson Supersonic Hair Dryer (Iron/Fuchsia with 5 Styling Attachments)',
    brand: 'Dyson',
    categoryId: 'beauty',
    subcategory: 'Haircare',
    price: 34900,
    originalPrice: 39900,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 1800,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Engineered for fast drying with no extreme heat damage. Intelligent heat control measures air temperature over 40 times a second to protect hair shine and natural moisture.',
    features: [
      'Dyson V9 digital motor spins up to 110,000rpm',
      'Air Multiplier technology produces a high-velocity jet of controlled air',
      'Includes Flyaway attachment, Styling concentrator, Diffuser, Gentle air attachment, and Wide-tooth comb'
    ],
    specs: {
      'Power': '1600 Watts',
      'Weight': '659 grams',
      'Cable Length': '2.8 meters',
      'Settings': '3 Speed, 4 Precise Heat Settings (up to 100°C)'
    },
    whatsIncluded: ['Dyson Supersonic Dryer', '5 Magnetic Styling Attachments', 'Storage Case'],
    warranty: '2 Years Dyson Warranty with Free In-Home Service',
    returnPolicy: '7 Days Replacement for Technical Defects',
    inStock: true,
    stockCount: 5,
    superCoinsReward: 700,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-beautyhub',
    tags: ['Dyson', 'Luxury Care', 'High Tech'],
    reviews: []
  },

  // --- HOME & APPLIANCES ---
  {
    id: 'prod-philips-airfryer',
    title: 'Philips Digital Airfryer HD9252 with Rapid Air Tech (4.1L Capacity)',
    brand: 'Philips',
    categoryId: 'appliances',
    subcategory: 'Small Appliances',
    price: 6499,
    originalPrice: 11995,
    discountPercent: 46,
    rating: 4.7,
    reviewCount: 4900,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Fry with up to 90% less fat. Patented Rapid Air technology swirls hot air around food to create delicious meals that are crispy on the outside and tender on the inside.',
    features: [
      '7 Preset Touchscreen Cooking Modes',
      'Keep Warm function keeps meals ready for up to 30 mins',
      'QuickClean basket with non-stick coating and dishwasher safe parts',
      'NutriU recipe app with 500+ healthy curated recipes'
    ],
    specs: {
      'Capacity': '4.1 Litres (0.8 kg fry capacity)',
      'Power': '1400 Watts',
      'Timer': 'Up to 60 minutes',
      'Temperature': '80°C - 200°C'
    },
    whatsIncluded: ['Philips Airfryer HD9252', 'Recipe Booklet', 'User Manual'],
    warranty: '2 Years Worldwide Guarantee',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 16,
    superCoinsReward: 130,
    deliveryEstimateMinutes: 15,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Kitchen', 'Healthy Eating', 'Flash Deal'],
    isFlashSale: true,
    reviews: []
  },
  {
    id: 'prod-marshall-emberton',
    title: 'Marshall Emberton II Portable Bluetooth Speaker (Black & Brass)',
    brand: 'Marshall',
    categoryId: 'home',
    subcategory: 'Decor',
    price: 14999,
    originalPrice: 19999,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 1780,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Rich, clear, and loud 360-degree True Stereophonic sound with 30+ hours of portable playtime on a single charge and rugged IP67 dust/water resistance.',
    features: [
      'True Stereophonic multi-directional 360° sound',
      '30+ hours of portable playtime',
      'IP67 dust and waterproof rating',
      'Stack Mode lets you connect to other Emberton II speakers'
    ],
    specs: {
      'Drivers': 'Two 2" 10W Full Range + Two Passive Radiators',
      'Amplifiers': 'Two 10W Class D Amplifiers',
      'Bluetooth': 'v5.1 with 10m range',
      'Weight': '0.7 kg'
    },
    whatsIncluded: ['Emberton II Speaker', 'USB-C Charging Cable', 'User Guide'],
    warranty: '1 Year Brand Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 11,
    superCoinsReward: 300,
    deliveryEstimateMinutes: 18,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-soundwave',
    tags: ['Marshall', 'Audio', 'Portable'],
    reviews: []
  },

  // --- SPORTS & FITNESS ---
  {
    id: 'prod-domyos-dumbbells',
    title: 'Domyos Hexagonal Rubber Dumbbells 10kg Pair with Ergonomic Chrome Grip',
    brand: 'Domyos',
    categoryId: 'sports',
    subcategory: 'Fitness',
    price: 2499,
    originalPrice: 3499,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 3200,
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Commercial grade hex rubber dumbbells designed for heavy strength training, functional HIIT workouts, and home gyms. Hexagon shape prevents rolling on floors.',
    features: [
      'Heavy-duty cast iron encased in virgin shock-absorbent rubber',
      'Ergonomically contoured knurled chrome handles for slip-free grip',
      'Quiet drop and floor-friendly protective coating'
    ],
    specs: {
      'Weight': '10 kg x 2 (Total 20 kg)',
      'Material': 'High Density Rubber & Steel',
      'Shape': 'Anti-Roll Hexagonal'
    },
    whatsIncluded: ['2x 10kg Hex Dumbbells'],
    warranty: '2 Years Decathlon Warranty',
    returnPolicy: '10 Days Return',
    inStock: true,
    stockCount: 20,
    superCoinsReward: 50,
    deliveryEstimateMinutes: 20,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-urbanfit',
    tags: ['Fitness', 'Gym', 'Strength'],
    reviews: []
  },

  // --- FURNITURE ---
  {
    id: 'prod-ergo-chair',
    title: 'Ergonomic High-Back Executive Mesh Office Chair with Lumbar Support',
    brand: 'Green Soul',
    categoryId: 'furniture',
    subcategory: 'Office Furniture',
    price: 8990,
    originalPrice: 16990,
    discountPercent: 47,
    rating: 4.6,
    reviewCount: 1890,
    images: [
      'https://images.unsplash.com/photo-1580481077195-c507c3905470?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Engineered for long 12+ hour work days. Features 3D adjustable armrests, adaptive dynamic lumbar support, breathable Korean mesh, and Class 4 hydraulic gas lift.',
    features: [
      'Smart adaptive lumbar pillow aligns with spine curvature',
      'Heavy-duty nylon wheelbase tested up to 135 kg weight capacity',
      'Reclining lock mechanism from 90° to 135° with tension knob'
    ],
    specs: {
      'Upholstery': 'Breathable Tensile Mesh',
      'Gas Lift': 'Class 4 BIFMA Certified',
      'Base': 'Heavy Duty 5-Star Nylon Base',
      'Max Load': '135 kg'
    },
    whatsIncluded: ['Chair Components', 'Allen Key & Assembly Screws', 'Step-by-step Assembly Manual'],
    warranty: '3 Years Comprehensive Manufacturer Warranty',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 12,
    superCoinsReward: 200,
    deliveryEstimateMinutes: 30,
    isNearbyAvailable: false,
    tags: ['Work from Home', 'Ergonomic', 'Furniture'],
    reviews: []
  },

  // --- TOYS & GAMING ---
  {
    id: 'prod-lego-porsche',
    title: 'LEGO Technic Porsche 911 GT3 RS Collector Display Model (1,580 Pieces)',
    brand: 'LEGO',
    categoryId: 'toys',
    subcategory: 'Games',
    price: 14999,
    originalPrice: 18999,
    discountPercent: 21,
    rating: 4.9,
    reviewCount: 890,
    images: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Celebrate aerodynamic design and automotive excellence. Features authentic orange bodywork, working 4-speed gearbox, 6-cylinder engine with moving pistons, and red suspension springs.',
    features: [
      'Authentic opening doors, hood, and rear trunk',
      'Detailed dashboard, steering wheel, and racing bucket seats',
      'Exclusive collector booklet documenting Porsche RS history'
    ],
    specs: {
      'Piece Count': '1,580 pieces',
      'Scale': '1:8 Authentic Replica',
      'Age': '16+ Years'
    },
    whatsIncluded: ['All LEGO Bricks & Elements', 'Special Collector Box', 'Full Color Instruction Manual'],
    warranty: 'LEGO Quality Guarantee (Missing piece replacement)',
    returnPolicy: '7 Days Return unopened',
    inStock: true,
    stockCount: 8,
    superCoinsReward: 350,
    deliveryEstimateMinutes: 20,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['LEGO', 'Collector', 'Gifts'],
    reviews: []
  },

  // --- BOOKS ---
  {
    id: 'prod-atomic-habits',
    title: 'Atomic Habits: Tiny Changes, Remarkable Results by James Clear',
    brand: 'Penguin Random House',
    categoryId: 'books',
    subcategory: 'Non-fiction',
    price: 499,
    originalPrice: 799,
    discountPercent: 38,
    rating: 4.9,
    reviewCount: 28000,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The definitive guide on how small changes can lead to extraordinary transformations. Learn practical strategies to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    features: [
      '#1 New York Times & Wall Street Journal Bestseller',
      'Actionable framework based on biology, psychology, and neuroscience',
      'Over 15 million copies sold globally'
    ],
    specs: {
      'Format': 'Hardcover Collector Edition',
      'Pages': '320 pages',
      'Language': 'English',
      'Publisher': 'Random House Business'
    },
    whatsIncluded: ['Atomic Habits Hardcover Book with Satin Ribbon Bookmark'],
    warranty: 'Genuine Original Book Guarantee',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 70,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Bestseller', 'Self Help', 'Hyperlocal 8m'],
    isBestSeller: true,
    reviews: []
  },

  // ==========================================
  // --- ORIGINAL PHONES & FLAGSHIP MOBILES ---
  // ==========================================
  {
    id: 'prod-iphone-16-pro-max',
    title: 'Apple iPhone 16 Pro Max 256GB (Natural Titanium, A18 Pro Chip)',
    brand: 'Apple',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 144900,
    originalPrice: 144900,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 4200,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 6999,
    bankOffers: [
      'Bank Offer: Flat ₹4,000 Instant Discount on HDFC & ICICI Bank Credit Cards',
      'Special Price: Extra ₹5,000 off on Exchange of old iPhone',
      'No Cost EMI: Available up to 24 Months starting at ₹6,999/month',
      'Partner Offer: Free 3 Months Apple Music & iCloud+ with this purchase'
    ],
    specSections: [
      {
        category: 'General Information',
        details: [
          { name: 'In The Box', value: 'iPhone 16 Pro Max, USB-C Charge Cable (1m), Documentation' },
          { name: 'Model Name', value: 'iPhone 16 Pro Max' },
          { name: 'Color', value: 'Natural Titanium' },
          { name: 'SIM Type', value: 'Dual SIM (nano-SIM and eSIM)' },
          { name: 'Quick Charging', value: 'Yes, 50% in 30 mins with 30W adapter' }
        ]
      },
      {
        category: 'Display & Visual',
        details: [
          { name: 'Display Size', value: '6.9 inch (17.53 cm)' },
          { name: 'Resolution', value: '2868 x 1320 Pixels Super Retina XDR' },
          { name: 'Display Type', value: 'All-Screen OLED with ProMotion 120Hz' },
          { name: 'Brightness', value: '2000 nits Outdoor Peak, 1 nit Minimum' }
        ]
      },
      {
        category: 'Processor & Operating System',
        details: [
          { name: 'Operating System', value: 'iOS 18 (Apple Intelligence Built-in)' },
          { name: 'Processor Chip', value: 'A18 Pro Chip (6-Core CPU, 6-Core GPU)' },
          { name: 'Internal Storage', value: '256 GB NVMe High Speed' },
          { name: 'Neural Engine', value: '16-Core Next-Generation Engine' }
        ]
      },
      {
        category: 'Camera & Video',
        details: [
          { name: 'Primary Camera', value: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto' },
          { name: 'Optical Zoom', value: '5x Optical Zoom In, 2x Optical Zoom Out, 10x Total' },
          { name: 'Video Recording', value: '4K Dolby Vision at 24/25/30/60/120 fps' },
          { name: 'Front Camera', value: '12MP TrueDepth Camera with Autofocus' }
        ]
      },
      {
        category: 'Connectivity & Dimensions',
        details: [
          { name: 'Network Type', value: '5G, 4G LTE, 3G, 2G' },
          { name: 'Wi-Fi & Bluetooth', value: 'Wi-Fi 7 (802.11be), Bluetooth 5.3' },
          { name: 'Dimensions', value: '163 mm x 77.6 mm x 8.25 mm' },
          { name: 'Weight', value: '227 grams' }
        ]
      },
      {
        category: 'Warranty & Service',
        details: [
          { name: 'Warranty Summary', value: '1 Year Apple Manufacturer Domestic Warranty' },
          { name: 'Covered in Warranty', value: 'Manufacturing defects and hardware failures' },
          { name: 'Service Type', value: 'Carry-In to any Apple Authorized Service Center' }
        ]
      }
    ],
    description: 'The pinnacle of smartphone innovation. Grade 5 Titanium design with thinner borders, A18 Pro chip, 48MP Fusion camera with 5x Telephoto optical zoom, and groundbreaking battery life.',
    features: [
      'Super Retina XDR display with ProMotion up to 120Hz and Always-On',
      'Camera Control button for instant zoom and focus adjustment',
      'A18 Pro chip with 6-core GPU offering console-level gaming',
      '4K 120 fps Dolby Vision recording for cinema-grade videography',
      'Ceramic Shield front that is 2x tougher than any other smartphone glass'
    ],
    specs: {
      'Display': '6.9" Super Retina XDR OLED ProMotion (2868 x 1320)',
      'Processor': 'Apple A18 Pro Chip (3nm)',
      'Storage': '256GB NVMe',
      'Rear Camera': '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
      'Front Camera': '12MP TrueDepth with Autofocus',
      'Build': 'Grade 5 Titanium with Textured Matte Glass'
    },
    whatsIncluded: ['iPhone 16 Pro Max', 'USB-C Charge Cable (1m)', 'Documentation'],
    warranty: '1 Year Apple International Warranty',
    returnPolicy: '7 Days Replacement for Hardware Defects',
    inStock: true,
    stockCount: 12,
    superCoinsReward: 2890,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Apple', 'iPhone', 'Titanium', 'Flagship', 'Hot Deal'],
    isHotDeal: true,
    isBestSeller: true,
    variants: {
      colors: [
        { id: 'c-natural', type: 'color', label: 'Natural Titanium', value: '#9a948d', priceDelta: 0, inStock: true },
        { id: 'c-desert', type: 'color', label: 'Desert Titanium', value: '#c7b299', priceDelta: 0, inStock: true },
        { id: 'c-black', type: 'color', label: 'Black Titanium', value: '#242426', priceDelta: 0, inStock: true }
      ],
      storage: [
        { id: 's-256', type: 'storage', label: '256GB', value: '256gb', priceDelta: 0, inStock: true },
        { id: 's-512', type: 'storage', label: '512GB', value: '512gb', priceDelta: 20000, inStock: true }
      ]
    },
    reviews: []
  },
  {
    id: 'prod-samsung-s24-ultra',
    title: 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 512GB, Titanium Gray, S-Pen)',
    brand: 'Samsung',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 134999,
    originalPrice: 144999,
    discountPercent: 7,
    rating: 4.8,
    reviewCount: 3100,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 6499,
    bankOffers: [
      'Bank Offer: ₹5,000 Instant Discount on HDFC, Axis & SBI Credit Cards',
      'Special Price: Get Extra ₹6,000 Off on Exchange of old flagship smartphone',
      'No Cost EMI: Available up to 24 Months starting at ₹6,499/month',
      'Combo Offer: Buy Galaxy Buds 3 Pro at 50% Off with S24 Ultra'
    ],
    specSections: [
      {
        category: 'General Information',
        details: [
          { name: 'Model Name', value: 'Galaxy S24 Ultra 5G' },
          { name: 'Color', value: 'Titanium Gray' },
          { name: 'In The Box', value: 'Handset, Built-in S-Pen, Type-C to Type-C Cable, Ejection Pin' },
          { name: 'SIM Type', value: 'Dual SIM (nano-SIM and eSIM)' }
        ]
      },
      {
        category: 'Display & Glass',
        details: [
          { name: 'Display Size', value: '6.8 inch (17.27 cm)' },
          { name: 'Resolution', value: 'QHD+ (3120 x 1440 Pixels) Dynamic AMOLED 2X' },
          { name: 'Peak Brightness', value: '2600 nits with Vision Booster' },
          { name: 'Glass Protection', value: 'Corning Gorilla Armor (Anti-Reflective)' }
        ]
      },
      {
        category: 'Processor & AI Hardware',
        details: [
          { name: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy (4nm Octa-Core)' },
          { name: 'RAM & Storage', value: '12 GB LPDDR5X RAM + 512 GB UFS 4.0' },
          { name: 'AI Features', value: 'Circle to Search, Live Call Translate, Note Assist, Photo Remaster' }
        ]
      },
      {
        category: 'Camera System',
        details: [
          { name: 'Rear Camera', value: '200MP Main OIS + 50MP 5x Telephoto + 12MP Ultra-Wide + 10MP 3x Telephoto' },
          { name: 'Space Zoom', value: '100x Digital Space Zoom with ProVisual Engine' },
          { name: 'Front Camera', value: '12MP Dual Pixel AF with 4K 60fps' }
        ]
      },
      {
        category: 'Battery & Durability',
        details: [
          { name: 'Battery Capacity', value: '5000 mAh' },
          { name: 'Charging', value: '45W Super Fast Charging 2.0 + 15W Fast Wireless' },
          { name: 'Water Resistance', value: 'IP68 Certified Water & Dust Resistant' }
        ]
      }
    ],
    description: 'Galaxy AI is here. Epic 200MP camera with Quad Telephoto system, titanium exterior shield, Corning Gorilla Armor anti-reflective glass, and built-in Bluetooth S-Pen.',
    features: [
      'Circle to Search with Google, Live Translate, and Note Assist',
      '200MP Main Camera with AI ProVisual Engine',
      'Snapdragon 8 Gen 3 for Galaxy with enlarged vapor cooling chamber',
      'Built-in S-Pen for sketching, taking notes, and remote shutter'
    ],
    specs: {
      'Display': '6.8" Dynamic AMOLED 2X, QHD+ (3120 x 1440), 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'RAM & Storage': '12GB LPDDR5X + 512GB UFS 4.0',
      'Battery': '5000 mAh with 45W Super Fast Charging'
    },
    whatsIncluded: ['Galaxy S24 Ultra', 'Built-in S-Pen', 'Type-C to Type-C Cable', 'SIM Ejector'],
    warranty: '1 Year Samsung India Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 15,
    superCoinsReward: 2700,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Samsung', 'Galaxy AI', 'S-Pen', '200MP'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-iphone-15',
    title: 'Apple iPhone 15 128GB (Blue, Dynamic Island & USB-C)',
    brand: 'Apple',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 64999,
    originalPrice: 69900,
    discountPercent: 7,
    rating: 4.8,
    reviewCount: 8900,
    images: [
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 3150,
    bankOffers: [
      'Bank Offer: Flat ₹3,000 Instant Discount on ICICI Bank and SBI Cards',
      'No Cost EMI: Starting from ₹3,150/month on major credit cards',
      'Special Price: Flat ₹4,901 Discount already applied at checkout'
    ],
    description: 'Dynamic Island bubbles up alerts and Live Activities. 48MP Main camera with 2x Telephoto, color-infused durable glass and aluminum design, and USB-C connectivity.',
    features: [
      'Dynamic Island shows alerts so you do not miss anything',
      'Super-high-resolution 48MP photos with next-gen portraits',
      'A16 Bionic chip powers advanced computational photography',
      'All-day battery life with up to 20 hours video playback'
    ],
    specs: {
      'Display': '6.1" Super Retina XDR OLED (2556 x 1179)',
      'Processor': 'A16 Bionic chip',
      'Cameras': '48MP Main + 12MP Ultra-Wide',
      'Connector': 'USB-C Port'
    },
    whatsIncluded: ['iPhone 15', 'USB-C Woven Cable', 'Documentation'],
    warranty: '1 Year Apple India Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 20,
    superCoinsReward: 1300,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Apple', 'iPhone', 'Popular'],
    reviews: []
  },
  {
    id: 'prod-oneplus-12',
    title: 'OnePlus 12 5G (16GB RAM, 512GB Storage, Flowy Emerald)',
    brand: 'OnePlus',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 64999,
    originalPrice: 69999,
    discountPercent: 7,
    rating: 4.7,
    reviewCount: 2800,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 3150,
    bankOffers: [
      'Bank Offer: ₹3,000 Instant Discount on ICICI & OneCard Credit Cards',
      'No Cost EMI: Available up to 12 Months starting at ₹3,150/month',
      'Free Gift: OnePlus SuperVOOC 100W Dual-port Charger in box'
    ],
    description: 'Apex of performance. 4th Gen Hasselblad camera system with 64MP periscope telephoto, Snapdragon 8 Gen 3, and ultra-fast 100W wired + 50W wireless charging.',
    features: [
      'ProXDR 2K 120Hz display with 4,500 nits peak brightness',
      '100W SUPERVOOC charging (1% to 100% in 26 minutes)',
      '5400 mAh Dual-cell battery that lasts over 2 full days',
      'Sony LYT-808 flagship primary camera sensor'
    ],
    specs: {
      'RAM & Storage': '16GB LPDDR5X + 512GB UFS 4.0',
      'Display': '6.82" 2K 120Hz ProXDR AMOLED',
      'Cameras': '50MP Sony LYT-808 + 64MP Periscope + 48MP Ultra-wide',
      'Charging': '100W Flash Charge + 50W AirVOOC'
    },
    whatsIncluded: ['OnePlus 12', '100W SUPERVOOC Power Adapter', 'Type-A to Type-C Cable', 'Protective Case'],
    warranty: '1 Year Brand Domestic Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 16,
    superCoinsReward: 1290,
    deliveryEstimateMinutes: 14,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['OnePlus', '100W Fast Charge', 'Hasselblad'],
    reviews: []
  },
  {
    id: 'prod-google-pixel-9-pro',
    title: 'Google Pixel 9 Pro 5G (16GB RAM, 256GB, Hazel, Gemini AI Built-in)',
    brand: 'Google',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 109999,
    originalPrice: 119999,
    discountPercent: 8,
    rating: 4.8,
    reviewCount: 1650,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The most powerful Pixel yet with Google Tensor G4 and pro-level triple camera system. Built-in Gemini AI assists in real-time writing, planning, photo reimagining, and live multimodal voice conversations.',
    features: [
      'Google Tensor G4 processor engineered specifically for Google AI workloads',
      'Super Actua LTPO OLED display with up to 3,000 nits peak outdoor brightness',
      'Pro Triple Camera: 50MP Wide + 48MP 5x Telephoto with 30x Super Res Zoom',
      '7 years of guaranteed OS updates, security patches, and Pixel Feature Drops',
      'Thermometer sensor for measuring temperatures of objects and liquids'
    ],
    specs: {
      'Display': '6.3" Super Actua LTPO OLED (1280 x 2856), 1-120Hz, 3000 nits',
      'Processor': 'Google Tensor G4 with Titan M2 security coprocessor',
      'Memory & Storage': '16GB LPDDR5X RAM + 256GB UFS 3.1',
      'Cameras': '50MP Main OIS + 48MP Ultrawide + 48MP 5x Telephoto + 42MP Selfie',
      'Battery': '4,700 mAh with 27W Fast Wired + Fast Wireless Charging'
    },
    whatsIncluded: ['Google Pixel 9 Pro', '1m USB-C to USB-C Cable (USB 2.0)', 'Quick Switch Adapter', 'SIM Tool'],
    warranty: '1 Year Google India Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 11,
    superCoinsReward: 2200,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Google', 'Pixel', 'Gemini AI', 'Tensor G4', 'Flagship'],
    isBestSeller: true,
    variants: {
      colors: [
        { id: 'c-hazel', type: 'color', label: 'Hazel', value: '#5b645d', priceDelta: 0, inStock: true },
        { id: 'c-porcelain', type: 'color', label: 'Porcelain', value: '#f5f5f0', priceDelta: 0, inStock: true },
        { id: 'c-obsidian', type: 'color', label: 'Obsidian', value: '#1a1a1a', priceDelta: 0, inStock: true }
      ]
    },
    reviews: []
  },
  {
    id: 'prod-samsung-zfold-6',
    title: 'Samsung Galaxy Z Fold 6 5G (12GB RAM, 512GB, Silver Shadow, Dual Displays)',
    brand: 'Samsung',
    categoryId: 'electronics',
    subcategory: 'Smartphones',
    price: 176999,
    originalPrice: 189999,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 1240,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ultra-slim, lighter, and more durable than ever. Unfold an expansive 7.6-inch tablet-grade screen powered by Snapdragon 8 Gen 3 for Galaxy and revolutionary Galaxy AI dual-screen Interpreter mode.',
    features: [
      'Dual Dynamic AMOLED 2X displays with 2,600 nits peak brightness',
      'Enhanced Armor Aluminum frame with IP48 water resistance rating',
      'Galaxy AI Circle to Search, Note Assist, and dual-screen live translation',
      'S-Pen Fold Edition support for precision multi-tasking across 3 open apps'
    ],
    specs: {
      'Main Display': '7.6" Dynamic AMOLED 2X QXGA+ (2160 x 1856), 1-120Hz',
      'Cover Display': '6.3" Dynamic AMOLED 2X (2376 x 968), 1-120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'Cameras': '50MP OIS Wide + 12MP Ultra-wide + 10MP 3x Telephoto',
      'Weight': '239 grams'
    },
    whatsIncluded: ['Galaxy Z Fold 6', 'USB-C to USB-C Data Cable', 'Ejection Pin', 'Quick Start Guide'],
    warranty: '1 Year Samsung India Warranty + 1 Year Samsung Care+ Screen Protection',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 8,
    superCoinsReward: 3500,
    deliveryEstimateMinutes: 15,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Samsung', 'Foldable', 'Z Fold 6', 'Luxury Tech'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-ipad-pro-m4',
    title: 'Apple iPad Pro 11" M4 Chip (Wi-Fi 256GB, Space Black, Tandem OLED)',
    brand: 'Apple',
    categoryId: 'electronics',
    subcategory: 'Tablets',
    price: 99900,
    originalPrice: 99900,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 2200,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The thinnest Apple product ever made at just 5.3mm. Breakthrough Ultra Retina XDR display with state-of-the-art tandem OLED technology, astronomical contrast, and monstrous M4 performance.',
    features: [
      'Apple M4 chip with hardware-accelerated ray tracing and Neural Engine',
      'Ultra Retina XDR Tandem OLED with 1000 nits full-screen brightness',
      'Compatible with Apple Pencil Pro with haptic feedback and barrel roll',
      'Four-speaker audio system with studio-quality four-microphone array',
      'Landscape 12MP Center Stage Ultra-Wide front camera'
    ],
    specs: {
      'Display': '11-inch Ultra Retina XDR Tandem OLED (2420 x 1668)',
      'Processor': 'Apple M4 Chip (9-Core CPU / 10-Core GPU)',
      'Thickness': '5.3 mm Ultra-thin',
      'Weight': '444 grams',
      'Connectivity': 'Thunderbolt / USB 4, Wi-Fi 6E, Bluetooth 5.3'
    },
    whatsIncluded: ['11-inch iPad Pro M4', 'USB-C Charge Cable (1 m)', '20W USB-C Power Adapter'],
    warranty: '1 Year Apple Limited Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 14,
    superCoinsReward: 2000,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Apple', 'iPad Pro', 'M4', 'OLED', 'Pro Tablet'],
    isBestSeller: true,
    variants: {
      colors: [
        { id: 'c-spaceblack', type: 'color', label: 'Space Black', value: '#1c1b1f', priceDelta: 0, inStock: true },
        { id: 'c-silver', type: 'color', label: 'Silver', value: '#e3e4e6', priceDelta: 0, inStock: true }
      ]
    },
    reviews: []
  },
  {
    id: 'prod-apple-watch-ultra-2',
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm (Titanium Case with Orange Ocean Band)',
    brand: 'Apple',
    categoryId: 'electronics',
    subcategory: 'Accessories',
    price: 89900,
    originalPrice: 89900,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 1850,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The ultimate sports and adventure watch. Powered by S9 SiP with Double Tap gesture, an ultra-bright 3000-nit display, precision dual-frequency GPS, and up to 72 hours of battery life.',
    features: [
      '49mm aerospace-grade titanium case with raised edges to protect sapphire crystal',
      '3,000 nits Always-On Retina display with Night Mode on Modular Ultra face',
      'Precision dual-frequency GPS (L1 and L5) for pinpoint distance and pace',
      'Water resistant to 100 meters, EN13319 certified for scuba diving to 40 meters',
      'Customizable Action button for immediate workout start or compass waypoint'
    ],
    specs: {
      'Case Size': '49mm Titanium',
      'Display': '3,000 nits Sapphire Crystal OLED',
      'Battery Life': '36 hours regular use / 72 hours Low Power Mode',
      'Sensors': 'Depth gauge, water temperature, ECG, Blood Oxygen, Skin Temperature',
      'Connectivity': 'LTE & UMTS, Wi-Fi 4, Bluetooth 5.3, Ultra Wideband 2nd Gen'
    },
    whatsIncluded: ['Titanium Case 49mm', 'Ocean Band with Titanium Buckle', 'Magnetic Fast Charger to USB-C Cable (1m)'],
    warranty: '1 Year Apple Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 9,
    superCoinsReward: 1800,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Apple Watch', 'Ultra 2', 'Titanium', 'Adventure', 'Hyperlocal 10m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-sony-a7-iv',
    title: 'Sony Alpha 7 IV Full-Frame Hybrid Mirrorless Camera (with 28-70mm Zoom Lens Kit)',
    brand: 'Sony',
    categoryId: 'electronics',
    subcategory: 'Cameras',
    price: 219990,
    originalPrice: 242990,
    discountPercent: 9,
    rating: 4.9,
    reviewCount: 780,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Beyond basic. The hybrid camera benchmark. 33MP Exmor R back-illuminated CMOS sensor, BIONZ XR processing engine, 4K 60p 10-bit 4:2:2 movie recording, and AI-based real-time tracking autofocus.',
    features: [
      '33 Megapixel full-frame back-illuminated Exmor R CMOS sensor',
      'BIONZ XR processor with 8x more processing power',
      '4K 60p video in Super 35mm format, 4K 30p oversampled from 7K full-frame',
      'Real-time Eye AF for Humans, Animals, and Birds in both photo and video modes',
      '5.5-step 5-axis in-body optical image stabilization (IBIS)'
    ],
    specs: {
      'Sensor': '33.0 MP 35mm Full-Frame Exmor R CMOS',
      'ISO Range': '100-51200 (expandable to 50-204800)',
      'Autofocus Points': '759 phase-detection points covering 94% of sensor',
      'Viewfinder': '3.68 million-dot Quad-VGA OLED electronic viewfinder',
      'Lens Included': 'Sony FE 28-70mm F3.5-5.6 OSS Zoom Lens'
    },
    whatsIncluded: ['Sony Alpha 7 IV Camera Body', 'FE 28-70mm Zoom Lens', 'NP-FZ100 Rechargeable Battery', 'Shoulder Strap', 'Body Cap', 'Accessory Shoe Cap'],
    warranty: '2 Years Sony India Domestic Warranty',
    returnPolicy: '7 Days Replacement for Technical Faults',
    inStock: true,
    stockCount: 5,
    superCoinsReward: 4400,
    deliveryEstimateMinutes: 20,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Sony', 'Alpha', 'Full Frame', 'Mirrorless', '4K Video'],
    reviews: []
  },

  // ==========================================
  // --- ORIGINAL EARPHONES & HEADPHONES ---
  // ==========================================
  {
    id: 'prod-airpods-pro-2',
    title: 'Apple AirPods Pro (2nd Generation with MagSafe Case USB-C)',
    brand: 'Apple',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 21990,
    originalPrice: 24900,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 18900,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 1065,
    bankOffers: [
      'Bank Offer: ₹2,000 Instant Discount on HDFC & ICICI Credit Cards',
      'No Cost EMI: Starting from ₹1,065/month',
      'Combo Savings: Get ₹500 off when purchased with iPhone'
    ],
    description: 'Up to 2x more Active Noise Cancellation. Adaptive Audio dynamically tailors noise control to your environment. Personalized Spatial Audio with dynamic head tracking.',
    features: [
      'Apple H2 headphone chip delivers smarter noise cancellation and 3D sound',
      'Transparency mode lets outside sound in so you can hear what is around you',
      'Up to 6 hours of listening time with ANC enabled (30 hours total with case)',
      'Precision Finding with U1 chip in the MagSafe charging case',
      'IP54 dust, sweat, and water resistance for AirPods and case'
    ],
    specs: {
      'Chip': 'Apple H2 chip (AirPods), Apple U1 chip (Case)',
      'Battery': 'Up to 30 hours total with Case',
      'Charging': 'USB-C, MagSafe, Apple Watch Charger, Qi',
      'Sensors': 'Dual beamforming mics, inward-facing mic, skin-detect sensor'
    },
    whatsIncluded: ['AirPods Pro (2nd Gen)', 'MagSafe Case (USB-C) with speaker loop', 'Silicone Ear Tips (XS, S, M, L)', 'USB-C Charge Cable'],
    warranty: '1 Year Apple Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 40,
    superCoinsReward: 440,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Apple', 'AirPods', 'ANC', 'Bestseller', 'Hyperlocal 8m'],
    isBestSeller: true,
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-bose-qc-ultra',
    title: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones (Black)',
    brand: 'Bose',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 34900,
    originalPrice: 39900,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 3400,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 1690,
    bankOffers: [
      'Bank Offer: Flat ₹2,500 Instant Discount on Axis & ICICI Cards',
      'No Cost EMI: Available up to 12 Months starting at ₹1,690/month'
    ],
    description: 'World-class noise cancellation quieter than ever before. Breakthrough spatialized Bose Immersive Audio brings what you are hearing out of your head and onto a wider soundstage.',
    features: [
      'CustomTune technology analyzes your ears to adapt sound and noise cancellation',
      'Quiet, Aware, and Immersion modes for tailored listening',
      'Up to 24 hours of battery life on a single charge (18 hours with Immersive Audio)',
      'Luxurious protein leather ear cushions and lightweight aluminum headband'
    ],
    specs: {
      'Bluetooth': 'v5.3 with Snapdragon Sound aptX Adaptive',
      'Battery Life': '24 Hours Playback',
      'Weight': '252 grams',
      'Controls': 'Touch volume strip, physical multi-function button'
    },
    whatsIncluded: ['Bose QC Ultra Headphones', 'Protective Carry Case', '3.5mm Audio Cable', 'USB-C Cable'],
    warranty: '1 Year Brand Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 14,
    superCoinsReward: 700,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-soundwave',
    tags: ['Bose', 'Luxury Audio', 'Noise Cancelling'],
    reviews: []
  },
  {
    id: 'prod-sennheiser-momentum-4',
    title: 'Sennheiser Momentum 4 Wireless Audiophile Headphones (60-Hour Battery)',
    brand: 'Sennheiser',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 24990,
    originalPrice: 34990,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 2100,
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 1210,
    bankOffers: [
      'Bank Offer: Flat ₹2,000 Instant Discount on HDFC Credit Cards',
      'No Cost EMI: Available up to 12 Months starting at ₹1,210/month'
    ],
    description: 'Audiophile-inspired 42mm dynamic transducer system. Industry-dominating 60 hours of continuous wireless playback on a single charge with Adaptive Noise Cancellation.',
    features: [
      'Unsurpassed 60-hour battery life with fast charging (10 min for 6 hours)',
      'Adaptive Hybrid Noise Cancellation and Transparency Mode',
      'Customizable sound with built-in EQ, Sound Personalization, and Bass Boost',
      'Smart Pause stops playback when taken off and resumes when put on'
    ],
    specs: {
      'Transducer': '42mm Dynamic Audiophile Driver',
      'Frequency Range': '6 Hz to 22,000 Hz',
      'Codecs': 'aptX, aptX adaptive, AAC, SBC',
      'Battery': '60 Hours ANC ON'
    },
    whatsIncluded: ['Momentum 4 Headphones', 'Hard Shell Travel Case', 'USB-C Charging Cable', 'Airplane Adapter'],
    warranty: '2 Years International Sennheiser Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 10,
    superCoinsReward: 500,
    deliveryEstimateMinutes: 15,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-soundwave',
    tags: ['Sennheiser', 'Audiophile', '60H Battery'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-boat-nirvana-ion',
    title: 'boAt Nirvana Ion ANC True Wireless Earbuds (32dB ANC, 120H Playtime)',
    brand: 'boAt',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 2499,
    originalPrice: 9990,
    discountPercent: 75,
    rating: 4.5,
    reviewCount: 24000,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Massive 120 hours of total playtime. 32dB Active Noise Cancellation, HiFi DSP audio, dual EQ modes, and quad microphones with ENx tech for studio-grade call clarity.',
    features: [
      'Up to 32dB Hybrid Active Noise Cancellation',
      'Industry-first 120 hours total battery (24h in earbuds alone)',
      'Crystal Bionic Sound powered by HiFi DSP',
      'BEAST Mode 60ms ultra-low latency gaming'
    ],
    specs: {
      'Playback': '120 Hours Total',
      'Drivers': '10mm Dual Drivers',
      'Water Resistance': 'IPX4 Sweat Proof',
      'Bluetooth': 'v5.2 with In-Ear Detection'
    },
    whatsIncluded: ['Nirvana Ion ANC Earbuds', 'Charging Case', 'Extra Ear Tips', 'Type-C Cable'],
    warranty: '1 Year boAt Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 50,
    superCoinsReward: 50,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['boAt', 'Super Deal', '120H Playtime'],
    isFlashSale: true,
    reviews: []
  },
  {
    id: 'prod-marshall-major-iv',
    title: 'Marshall Major IV Wireless Bluetooth On-Ear Headphones (80+ Hours Playtime, Black)',
    brand: 'Marshall',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 11999,
    originalPrice: 14999,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 3800,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Iconic Marshall design with 80+ solid hours of wireless playtime. Custom-tuned dynamic drivers deliver roaring bass, smooth mids, and brilliant treble for an unforgettable sound you will never want to turn off.',
    features: [
      '80+ solid hours of wireless playtime with quick-charging capability (15 min for 15 hours)',
      'Custom-tuned 40mm dynamic drivers produce legendary Marshall signature sound',
      'Multi-directional control knob allows you to play, pause, skip, and adjust volume',
      'Wireless Qi charging support for hassle-free cord-free powering',
      'Rugged collapsible design with textured black vinyl and brass script logo'
    ],
    specs: {
      'Driver Type': '40mm Dynamic Drivers',
      'Frequency Response': '20 Hz – 20,000 Hz',
      'Battery Life': '80+ Hours Playback',
      'Connectivity': 'Bluetooth 5.0 + 3.5mm Aux Audio Sharing Socket',
      'Weight': '165 grams'
    },
    whatsIncluded: ['Marshall Major IV Headphones', '3.5 mm Audio Cable', 'USB-C Charging Cable', 'User Manual'],
    warranty: '1 Year Brand Domestic Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 18,
    superCoinsReward: 240,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-soundwave',
    tags: ['Marshall', 'Retro Rock', '80H Battery', 'Wireless Charging', 'Hyperlocal 10m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-galaxy-buds-3-pro',
    title: 'Samsung Galaxy Buds 3 Pro ANC True Wireless Earbuds (Blade Lights, 24-bit Hi-Fi, Silver)',
    brand: 'Samsung',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 19999,
    originalPrice: 22999,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 2900,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A design revolution meets studio audio. Futuristic blade design with signature Blade Lights, enhanced dual amplifiers, planar tweeters, and real-time Adaptive Noise Control with Voice and Siren Detect.',
    features: [
      'Dual Amplifier system with Planar Tweeter and Dynamic Woofer for high-res sound',
      'Signature Blade Lights with intuitive pinch and swipe touch controls',
      'Up to 24-bit / 96kHz Samsung Seamless Codec (SSC) ultra-high-fidelity streaming',
      'Adaptive Noise Control automatically lowers ANC and lets voices through when you speak',
      'IP57 water and dust resistance for rigorous workouts'
    ],
    specs: {
      'Speakers': 'Enhanced 2-Way (10.5mm Dynamic + 6.1mm Planar Tweeter)',
      'Audio Quality': '24-bit / 96kHz Hi-Fi SSC',
      'Microphones': '3 High-SNR Mics + VPU (Voice Pickup Unit)',
      'Battery': 'Up to 30 hours with charging case (ANC off)',
      'Water Resistance': 'IP57'
    },
    whatsIncluded: ['Galaxy Buds 3 Pro Earbuds', 'Transparent Lid Wireless Charging Case', 'Ear Tips (S, M, L)', 'USB-C Cable'],
    warranty: '1 Year Samsung India Domestic Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 25,
    superCoinsReward: 400,
    deliveryEstimateMinutes: 10,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-soundwave',
    tags: ['Samsung', 'Galaxy Buds', '24-bit Hi-Fi', 'Blade Lights', 'ANC'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-sony-wf1000xm5',
    title: 'Sony WF-1000XM5 Truly Wireless Noise Cancelling Earbuds (Dual Feedback Mics, LDAC)',
    brand: 'Sony',
    categoryId: 'electronics',
    subcategory: 'Headphones',
    price: 21990,
    originalPrice: 29990,
    discountPercent: 27,
    rating: 4.8,
    reviewCount: 3100,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The best truly wireless noise cancellation on the market. Powered by Sony Integrated Processor V2 and HD Noise Cancelling Processor QN2e, with Dynamic Driver X for wide frequency reproduction and sparkling vocals.',
    features: [
      'Specially designed Dynamic Driver X for deep bass and crystal clear details',
      'Dual feedback microphones and noise isolation earbud tips cut down ambient roar',
      'Bone conduction sensors and AI noise-reduction filter for pristine phone calls',
      'Multipoint connection connects to two Bluetooth devices simultaneously',
      'Qi wireless charging and 3-minute quick charging for 60 minutes playtime'
    ],
    specs: {
      'Driver Unit': '8.4 mm Dynamic Driver X',
      'Bluetooth': 'v5.3 with LDAC, LC3, AAC, SBC',
      'Battery': '8 hours (Earbuds) + 16 hours (Case) with ANC ON',
      'Water Protection': 'IPX4 Water Resistant'
    },
    whatsIncluded: ['WF-1000XM5 Earbuds', 'Wireless Charging Case', 'Noise Isolation Earbud Tips (SS, S, M, L)', 'Reference Guide'],
    warranty: '1 Year Sony India Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 16,
    superCoinsReward: 440,
    deliveryEstimateMinutes: 12,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-soundwave',
    tags: ['Sony', 'ANC Earbuds', 'LDAC', 'Audiophile', 'Hyperlocal 12m'],
    reviews: []
  },
  {
    id: 'prod-jbl-flip-6',
    title: 'JBL Flip 6 Waterproof Portable Bluetooth Speaker with Bold JBL Original Pro Sound (Black)',
    brand: 'JBL',
    categoryId: 'electronics',
    subcategory: 'Accessories',
    price: 9999,
    originalPrice: 13999,
    discountPercent: 29,
    rating: 4.7,
    reviewCount: 8400,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Bold sound for every adventure. 2-way speaker system engineered to deliver loud, crystal clear, powerful sound. Up to 12 hours of playtime and IP67 waterproof and dustproof protection.',
    features: [
      '2-way speaker system with racetrack-shaped woofer and separate tweeter',
      'IP67 waterproof and dustproof - take it anywhere from pool parties to trails',
      '12 hours of playtime on a single charge with USB-C protection alert',
      'PartyBoost allows you to pair two JBL PartyBoost-compatible speakers together'
    ],
    specs: {
      'Output Power': '20W RMS (Woofer) + 10W RMS (Tweeter)',
      'Battery Life': '12 Hours Continuous Playback',
      'Bluetooth': 'v5.1 with A2DP 1.3',
      'Weight': '550 grams'
    },
    whatsIncluded: ['JBL Flip 6 Speaker', 'Type C USB Cable', 'Quick Start Guide', 'Safety Sheet'],
    warranty: '1 Year Harman India Brand Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 30,
    superCoinsReward: 200,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['JBL', 'Bluetooth Speaker', 'Waterproof', 'IP67', 'Hyperlocal 8m'],
    isBestSeller: true,
    reviews: []
  },

  // ==========================================
  // --- ORIGINAL TELEVISIONS (SONY, SAMSUNG, LG) ---
  // ==========================================
  {
    id: 'prod-sony-bravia-65-oled',
    title: 'Sony Bravia XR 65" 4K HDR Google OLED TV (XR-65A80L)',
    brand: 'Sony',
    categoryId: 'electronics',
    subcategory: 'TVs',
    price: 189990,
    originalPrice: 249900,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 820,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 9190,
    bankOffers: [
      'Bank Offer: Flat ₹7,500 Instant Discount on HDFC Bank Credit Cards',
      'No Cost EMI: Available up to 24 Months starting at ₹9,190/month',
      'Installation: Free Standard Wall-Mount Installation by Sony Engineer within 24h'
    ],
    description: 'Cognitive Processor XR brings pure OLED contrast and lifelike depth. Acoustic Surface Audio+ turns the entire screen into a speaker, creating sound that directly matches the action.',
    features: [
      'Pure OLED blacks and vibrant brightness powered by Cognitive Processor XR',
      'Acoustic Surface Audio+ with dual subwoofers for cinematic Dolby Atmos sound',
      'Perfect for PlayStation 5 with Auto HDR Tone Mapping & 4K 120Hz HDMI 2.1',
      'Google TV with hands-free voice control and BRAVIA CORE streaming'
    ],
    specs: {
      'Screen Size': '65 Inch (164 cm)',
      'Display Tech': 'Self-Illuminating OLED (3840 x 2160)',
      'Refresh Rate': '120 Hz Variable (VRR, ALLM)',
      'Audio Output': '50 Watts (Acoustic Surface Audio+)',
      'Connectivity': '4x HDMI 2.1, 2x USB, Wi-Fi 6, eARC'
    },
    whatsIncluded: ['Sony 65" OLED TV', 'Voice Remote with Backlight', 'Table-Top Stand', 'Power Cord', 'Wall Mount Bracket'],
    warranty: '2 Years Comprehensive Sony India Warranty',
    returnPolicy: '10 Days Replacement for Transit Damage or Defect',
    inStock: true,
    stockCount: 6,
    superCoinsReward: 3800,
    deliveryEstimateMinutes: 30,
    isNearbyAvailable: false,
    tags: ['Sony', 'Bravia', 'OLED', '4K TV', 'PS5 Ready'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-samsung-55-qled',
    title: 'Samsung 55" Neo QLED 4K Smart TV (QA55QN85D with Dolby Atmos)',
    brand: 'Samsung',
    categoryId: 'electronics',
    subcategory: 'TVs',
    price: 89990,
    originalPrice: 134900,
    discountPercent: 33,
    rating: 4.7,
    reviewCount: 1200,
    images: [
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 4350,
    bankOffers: [
      'Bank Offer: Flat ₹5,000 Instant Discount on ICICI & SBI Cards',
      'No Cost EMI: Available up to 18 Months starting at ₹4,350/month',
      'Brand Warranty: 1 Year Standard + 1 Year Additional on Quantum Mini LED Panel'
    ],
    description: 'Quantum Matrix Technology with Mini LEDs delivers ultra-fine light control. NQ4 AI Gen2 Processor upscales everything you watch into crisp 4K with Dolby Atmos surround sound.',
    features: [
      'Quantum Mini LED backlight with Neo Quantum HDR',
      'NQ4 AI Gen2 Processor with 20 AI neural networks',
      'Object Tracking Sound (OTS) with Dolby Atmos',
      'Samsung Gaming Hub for cloud gaming without a console'
    ],
    specs: {
      'Screen Size': '55 Inch (138 cm)',
      'Resolution': '4K Ultra HD (3840 x 2160)',
      'Processor': 'NQ4 AI Gen2 Processor',
      'Audio': '60W 2.2.2 Channel Dolby Atmos'
    },
    whatsIncluded: ['Samsung 55" Neo QLED TV', 'SolarCell Remote', 'Slim Fit Stand', 'Power Cable'],
    warranty: '1 Year Standard + 1 Year Additional Panel Warranty',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 9,
    superCoinsReward: 1800,
    deliveryEstimateMinutes: 25,
    isNearbyAvailable: false,
    tags: ['Samsung', 'Neo QLED', 'Mini LED', 'Dolby Atmos'],
    reviews: []
  },
  {
    id: 'prod-lg-55-c3-oled',
    title: 'LG 55" 4K OLED evo Smart TV (OLED55C3PSA, α9 Gen6 AI Processor)',
    brand: 'LG',
    categoryId: 'electronics',
    subcategory: 'TVs',
    price: 119990,
    originalPrice: 169990,
    discountPercent: 29,
    rating: 4.9,
    reviewCount: 940,
    images: [
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 5800,
    bankOffers: [
      'Bank Offer: Flat ₹6,000 Instant Discount on Axis Bank Credit Cards',
      'No Cost EMI: Available up to 24 Months starting at ₹5,800/month',
      'Gaming Perk: Free 3 Months Xbox Game Pass Ultimate included'
    ],
    description: 'Light up your world with self-lit pixels. Brightness Booster delivers up to 20% brighter picture, 0.1ms ultra-fast response time, 4x HDMI 2.1 with G-Sync & FreeSync support.',
    features: [
      'Brightness Booster powered by α9 AI Processor Gen6',
      'Infinite contrast with 100% color volume and fidelity',
      'G-Sync, FreeSync, and 4K 120Hz for elite gaming',
      'Ultra Slim Design with barely-there bezels'
    ],
    specs: {
      'Display': '55" OLED evo 4K (3840 x 2160)',
      'HDR': 'Dolby Vision / HDR10 / HLG / Filmmaker Mode',
      'OS': 'webOS 23 with ThinQ AI',
      'Audio': '40W 2.2 Ch with AI Sound Pro 9.1.2 Virtual Up-mix'
    },
    whatsIncluded: ['LG 55" C3 OLED TV', 'Magic Remote Control with Batteries', 'Stand Base', 'User Guide'],
    warranty: '3 Years Comprehensive LG Warranty',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 7,
    superCoinsReward: 2400,
    deliveryEstimateMinutes: 25,
    isNearbyAvailable: false,
    tags: ['LG', 'OLED evo', 'Gaming TV', 'Dolby Vision'],
    reviews: []
  },
  {
    id: 'prod-xiaomi-55-qled',
    title: 'Xiaomi 55" Smart QLED TV 4K Ultra HD (Dolby Vision IQ, 30W Sound, Google TV)',
    brand: 'Xiaomi',
    categoryId: 'electronics',
    subcategory: 'TVs',
    price: 42999,
    originalPrice: 59999,
    discountPercent: 28,
    rating: 4.6,
    reviewCount: 4200,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 2080,
    bankOffers: [
      'Bank Offer: Flat ₹2,000 Instant Discount on all major credit cards',
      'No Cost EMI: Starting from ₹2,080/month'
    ],
    description: 'Quantum Dot display technology delivers over 1 billion vivid colors. Equipped with Dolby Vision IQ, HDR10+, a 30W 6-speaker acoustic sound system, and Google TV with PatchWall.',
    features: [
      'Quantum Dot nanocrystal layer produces exceptional color saturation and contrast',
      'Dolby Vision IQ dynamically optimizes picture quality based on ambient room light',
      '30W high-fidelity acoustic setup with 4 full-range drivers and 2 tweeters',
      'PatchWall+ integration gives direct access to 300+ live free television channels'
    ],
    specs: {
      'Screen Size': '55 Inch (138.8 cm)',
      'Resolution': '4K Ultra HD (3840 x 2160) Quantum Dot',
      'Audio': '30 Watts with Dolby Audio and DTS-HD',
      'Memory': '2GB RAM + 32GB Storage for endless streaming apps'
    },
    whatsIncluded: ['Xiaomi 55" QLED TV', 'Bluetooth Voice Remote', 'Tabletop Stands (Pair)', 'Power Cable', 'AAA Batteries'],
    warranty: '1 Year Comprehensive + 2 Years on QLED Panel',
    returnPolicy: '10 Days Replacement for Transit Damage',
    inStock: true,
    stockCount: 14,
    superCoinsReward: 860,
    deliveryEstimateMinutes: 25,
    isNearbyAvailable: false,
    tags: ['Xiaomi', 'QLED', 'Dolby Vision', 'Budget Flagship TV'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-tcl-65-qled-4k',
    title: 'TCL 65" 4K Google TV C645 QLED (120Hz DLG, Dolby Vision & Atmos, Hands-Free Voice)',
    brand: 'TCL',
    categoryId: 'electronics',
    subcategory: 'TVs',
    price: 58990,
    originalPrice: 89990,
    discountPercent: 34,
    rating: 4.7,
    reviewCount: 1850,
    images: [
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 2850,
    bankOffers: [
      'Bank Offer: Flat ₹3,000 Instant Discount on ICICI Bank Cards',
      'No Cost EMI: Available up to 12 Months starting at ₹2,850/month'
    ],
    description: 'Endless entertainment in stunning QLED quality. Dual Line Gate (DLG) technology boosts refresh rate to 120Hz for lag-free gaming. Dolby Atmos and ONKYO soundbar-grade tuning for pure auditory immersion.',
    features: [
      'Quantum Dot display covering 93% of the DCI-P3 cinematic color spectrum',
      '120Hz DLG (Dual Line Gate) and Game Master mode with AMD FreeSync',
      'ONKYO 2.1 premium sound system with rich built-in subwoofer bass',
      'Hands-Free Voice Control with built-in far-field microphones'
    ],
    specs: {
      'Screen Size': '65 Inch (164 cm)',
      'Display': 'QLED 4K UHD (3840 x 2160) with HDR10+ and Dolby Vision',
      'Audio Output': '40W ONKYO 2.1 HiFi Sound System with Subwoofer',
      'Ports': '3x HDMI 2.1, 1x USB 3.0, eARC, Optical Out'
    },
    whatsIncluded: ['TCL 65" QLED TV', 'Voice Smart Remote', 'Two-Way Adjustable Stand', 'Wall Mount Kit', 'User Guide'],
    warranty: '2 Years Comprehensive TCL Brand Warranty',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 8,
    superCoinsReward: 1180,
    deliveryEstimateMinutes: 30,
    isNearbyAvailable: false,
    tags: ['TCL', '65 Inch', 'QLED', '120Hz Gaming', 'Dolby Atmos'],
    isBestSeller: true,
    reviews: []
  },

  // ==========================================
  // --- ORIGINAL GROCERY & STAPLES (AMUL, TATA, NESTLE, FORTUNE) ---
  // ==========================================
  {
    id: 'prod-amul-butter',
    title: 'Amul Pasteurised Butter 500g Pack (Utterly Butterly Delicious)',
    brand: 'Amul',
    categoryId: 'food',
    subcategory: 'Dairy & Eggs',
    price: 285,
    originalPrice: 295,
    discountPercent: 3,
    rating: 4.9,
    reviewCount: 45000,
    images: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The golden standard of pure butter. Made from fresh cream, Amul Butter delivers unbeatable rich flavor and smooth spreadability for morning toast, parathas, and gourmet baking.',
    features: [
      'Made from pure pasteurised milk cream',
      'Zero preservatives or artificial colors',
      'Kept chilled and delivered in thermal cool-pouches within 8 minutes'
    ],
    specs: {
      'Net Weight': '500 grams',
      'Fat Content': '80% minimum',
      'Storage': 'Keep refrigerated below 4°C',
      'Shelf Life': '12 Months'
    },
    whatsIncluded: ['500g Amul Butter Pack'],
    warranty: 'Fresh Cold-Chain Guarantee',
    returnPolicy: 'Instant Refund if packaging is compromised',
    inStock: true,
    stockCount: 120,
    superCoinsReward: 10,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Amul', 'Butter', 'Dairy', 'Hyperlocal 8m', 'Bestseller'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-aashirvaad-atta',
    title: 'Aashirvaad Superior MP Shudh Chakki Whole Wheat Atta 10kg',
    brand: 'Aashirvaad',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 475,
    originalPrice: 525,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 38000,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80'
    ],
    description: '100% pure whole wheat grain sourced directly from the fields of Madhya Pradesh. Traditional 3-step stone chakki grinding locks in natural dietary fiber and aroma.',
    features: [
      '0% Maida - 100% Pure Whole Wheat Chakki Atta',
      'Rotis stay soft, fluffy, and tender for up to 6 hours',
      'High dietary fiber promotes gut health and steady energy'
    ],
    specs: {
      'Weight': '10 kg Polybag',
      'Wheat Origin': 'Sehore & Malwa, Madhya Pradesh',
      'Shelf Life': '6 Months'
    },
    whatsIncluded: ['10kg Aashirvaad Atta Bag'],
    warranty: 'Quality Assured by ITC Limited',
    returnPolicy: 'Replacement on transit damage',
    inStock: true,
    stockCount: 80,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Aashirvaad', 'Atta', 'Staples', 'Hyperlocal 8m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-fortune-oil',
    title: 'Fortune Sunlite Refined Sunflower Oil 5 Litre Jar',
    brand: 'Fortune',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 749,
    originalPrice: 950,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 21000,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Light, healthy, and easy to digest cooking oil. Enriched with natural Vitamin E and fortified with Vitamins A & D for heart health and daily family wellness.',
    features: [
      'Low Absorption Technology keeps food light and crispy',
      'Rich in natural polyunsaturated fatty acids (PUFA)',
      'High smoke point ideal for frying, curries, and tadka'
    ],
    specs: {
      'Volume': '5 Litres in Sturdy Food-grade Handle Jar',
      'Fortification': 'Vitamins A, D, and Natural Vitamin E'
    },
    whatsIncluded: ['5L Fortune Sunflower Oil Can'],
    warranty: '100% Purity Guarantee by Adani Wilmar',
    returnPolicy: 'Replacement on seal defect',
    inStock: true,
    stockCount: 50,
    superCoinsReward: 20,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Fortune', 'Cooking Oil', 'Kitchen Staples'],
    reviews: []
  },
  {
    id: 'prod-tata-tea-gold',
    title: 'Tata Tea Gold Fragrant Long Leaves Blend 1kg Pack',
    brand: 'Tata Tea',
    categoryId: 'food',
    subcategory: 'Beverages',
    price: 540,
    originalPrice: 650,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 18500,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Exquisite balance of strength and rich aroma. Made with 85% premium Assam CTC granules and 15% gently rolled fragrant Orthodox long leaves.',
    features: [
      'Unmatched aroma that fills the kitchen when boiled',
      'Assam CTC delivers robust full-bodied color and taste',
      'Vacuum-sealed foil pouch retains tea leaf freshness'
    ],
    specs: {
      'Weight': '1 kg Pack',
      'Blend': '85% CTC + 15% Orthodox Long Leaf',
      'Origin': 'Assam Tea Estates'
    },
    whatsIncluded: ['1kg Tata Tea Gold Foil Pack'],
    warranty: 'Genuine Tata Consumer Products Guarantee',
    returnPolicy: 'Non-returnable consumable',
    inStock: true,
    stockCount: 65,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Tata', 'Chai', 'Tea', 'Morning Essentials'],
    reviews: []
  },
  {
    id: 'prod-maggi-noodles',
    title: 'Nestle Maggi 2-Minute Masala Instant Noodles (Family Saver Pack of 12)',
    brand: 'Nestle',
    categoryId: 'food',
    subcategory: 'Snacks',
    price: 168,
    originalPrice: 180,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 52000,
    images: [
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'India\'s most loved quick snack. Made with choicest roasted spices and fortified with Iron to give you 15% of your daily iron requirement in every serve.',
    features: [
      'Authentic signature blend of 10 roasted aromatic spices',
      'Ready in just 2 minutes',
      'Fortified with Vitamin A, Iron, and Iodine'
    ],
    specs: {
      'Pack Contents': '12 Individual Packs (840g total)',
      'Flavor': 'Classic Authentic Masala',
      'Cooking Time': '2 Minutes'
    },
    whatsIncluded: ['Pack of 12 Maggi Noodles with Tastemaker sachets'],
    warranty: 'Nestle Quality Assurance',
    returnPolicy: 'Instant Replacement on transit damage',
    inStock: true,
    stockCount: 140,
    superCoinsReward: 10,
    deliveryEstimateMinutes: 6,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Maggi', 'Nestle', 'Snacks', 'Instant 6m', 'Bestseller'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-cadbury-silk-celebrations',
    title: 'Cadbury Celebrations Premium Rich Dry Fruit Gift Box 450g',
    brand: 'Cadbury',
    categoryId: 'food',
    subcategory: 'Snacks',
    price: 599,
    originalPrice: 750,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 14200,
    images: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Celebrate special moments with premium chocolate bliss. Almonds, cashews, and golden raisins smothered in luscious Cadbury Dairy Milk chocolate.',
    features: [
      'Assortment of chocolate enrobed almonds, cashews, and raisins',
      'Presented in a premium embossed royal gold gift box',
      'Ideal for festive gifting, birthdays, and anniversaries'
    ],
    specs: {
      'Net Weight': '450 grams',
      'Chocolate Type': 'Milk Chocolate with Whole Roasted Nuts',
      'Shelf Life': '9 Months'
    },
    whatsIncluded: ['450g Cadbury Celebrations Gift Tin'],
    warranty: 'Mondelez India Authenticity Guarantee',
    returnPolicy: 'Replacement on melting in transit',
    inStock: true,
    stockCount: 45,
    superCoinsReward: 25,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-dailybake',
    tags: ['Cadbury', 'Chocolate', 'Gifts', 'Festive'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-tata-salt',
    title: 'Tata Salt Vacuum Evaporated Pure Iodised Salt 1kg Pack',
    brand: 'Tata Salt',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 28,
    originalPrice: 30,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 89000,
    images: [
      'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Desh Ka Namak. Pure vacuum evaporated salt untouched by human hands. Contains the exact required levels of iodine for mental development and family health.',
    features: [
      'Vacuum evaporated for unmatched purity and zero grit',
      'Contains optimal iodine (minimum 15 ppm)',
      'Free-flowing crystal white salt'
    ],
    specs: {
      'Weight': '1 kg Moisture-proof Pouch',
      'Purity': '99.9% Pure Sodium Chloride'
    },
    whatsIncluded: ['1kg Tata Salt Pouch'],
    warranty: 'Tata Consumer Trust Seal',
    returnPolicy: 'Consumable - non-returnable',
    inStock: true,
    stockCount: 200,
    superCoinsReward: 5,
    deliveryEstimateMinutes: 6,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Tata', 'Salt', 'Daily Essential', 'Hyperlocal 6m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-nescafe-classic',
    title: 'Nescafe Classic 100% Pure Instant Coffee Glass Jar 200g',
    brand: 'Nescafe',
    categoryId: 'food',
    subcategory: 'Beverages',
    price: 499,
    originalPrice: 599,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 24000,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Start your mornings with the unmistakably rich taste of Nescafe Classic. Made from slow-roasted medium-dark Robusta beans for bold flavor and aroma.',
    features: [
      '100% pure instant coffee granules',
      'Signature aroma locked in an airtight glass jar',
      'Great for rich hot coffee or frothy iced cold coffee'
    ],
    specs: {
      'Weight': '200 grams in reusable Glass Jar',
      'Roast': 'Medium-Dark Roast'
    },
    whatsIncluded: ['200g Nescafe Classic Jar'],
    warranty: 'Nestle Seal of Quality',
    returnPolicy: 'Replacement on breakages',
    inStock: true,
    stockCount: 60,
    superCoinsReward: 20,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Nescafe', 'Coffee', 'Morning Fuel'],
    reviews: []
  },
  {
    id: 'prod-kelloggs-cornflakes',
    title: 'Kellogg\'s Real Almond & Organic Honey Crunchy Corn Flakes 1kg',
    brand: 'Kellogg\'s',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 449,
    originalPrice: 575,
    discountPercent: 22,
    rating: 4.7,
    reviewCount: 16000,
    images: [
      'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Golden crispy corn flakes enriched with real sliced Californian almonds and pure organic honey. Packed with 8 essential vitamins and minerals for an energetic start.',
    features: [
      'Loaded with real almond slices and natural honey drizzle',
      'Source of Iron, Vitamin C, and B-Group Vitamins',
      'Naturally cholesterol free'
    ],
    specs: {
      'Net Weight': '1 kg Family Saver Pack',
      'Serving Size': '30g with 200ml milk'
    },
    whatsIncluded: ['1kg Kellogg\'s Almond Honey Corn Flakes Box'],
    warranty: 'Kellogg Quality Guarantee',
    returnPolicy: 'Replacement on transit damage',
    inStock: true,
    stockCount: 40,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Kelloggs', 'Breakfast', 'Healthy Start'],
    reviews: []
  },
  {
    id: 'prod-alphonso-mangoes',
    title: 'Farm Fresh Ratnagiri Alphonso Mangoes Grade-A (Box of 6, Naturally Ripened)',
    brand: 'FarmDirect',
    categoryId: 'food',
    subcategory: 'Fresh Food',
    price: 799,
    originalPrice: 1199,
    discountPercent: 33,
    rating: 4.9,
    reviewCount: 6800,
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The King of Fruits. Direct from Ratnagiri coastal orchards. Hand-picked at mature green stage and naturally ripened in hay with zero carbide.',
    features: [
      '100% Genuine GI-Tagged Ratnagiri Hapus',
      'Golden saffron pulp with sweet aromatic bouquet',
      'Delivered in ventilated cushioned safety box'
    ],
    specs: {
      'Package': 'Box of 6 Mangoes (Approx 1.5 kg total)',
      'Grade': 'Grade-A Export Quality'
    },
    whatsIncluded: ['6x Ratnagiri Alphonso Mangoes in hay-cushioned box'],
    warranty: '100% Carbide-Free & Natural Taste Guarantee',
    returnPolicy: 'Instant Refund on any spoilt fruit',
    inStock: true,
    stockCount: 35,
    superCoinsReward: 30,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Fresh Fruit', 'Alphonso', 'Ratnagiri', 'Organic', 'Hyperlocal 8m'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-daawat-basmati-rice',
    title: 'Daawat Rozana Super Basmati Rice 5kg (Rich Aroma, Extra Long Grains)',
    brand: 'Daawat',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 485,
    originalPrice: 580,
    discountPercent: 16,
    rating: 4.8,
    reviewCount: 31000,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Everyday basmati perfection. Naturally aged grains that elongate to more than double their size on cooking without breaking. Imparts an authentic floral basmati aroma to pulao, biryani, and daily meals.',
    features: [
      'Naturally aged for 1+ years to ensure non-sticky fluffy separation',
      'Slender, pearlescent white extra-long grains',
      'Tested and certified 100% adulteration-free'
    ],
    specs: {
      'Net Weight': '5 kg Heavy-Duty Polybag',
      'Grain Type': 'Rozana Super Basmati (Semi-polished)',
      'Origin': 'Foothills of the Himalayas'
    },
    whatsIncluded: ['5kg Daawat Rozana Super Basmati Rice Bag'],
    warranty: 'LT Foods Quality Promise',
    returnPolicy: 'Replacement on bag seal breakage',
    inStock: true,
    stockCount: 75,
    superCoinsReward: 20,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Daawat', 'Basmati Rice', 'Staples', 'Biryani Rice', 'Hyperlocal 8m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-amul-taaza-milk',
    title: 'Amul Taaza Homogenised Toned Long Life Milk 1L (Pack of 6 Tetra Paks)',
    brand: 'Amul',
    categoryId: 'food',
    subcategory: 'Dairy & Eggs',
    price: 420,
    originalPrice: 450,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 28000,
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Fresh milk that requires no boiling. UHT (Ultra High Temperature) treated and sealed in sterile aseptic 6-layer packaging to lock in nutrients for up to 180 days at room temperature.',
    features: [
      'No boiling needed — open and drink directly',
      'Homogenised toned milk with 3.0% fat and 8.5% SNF',
      'Zero preservatives, zero chemicals, 100% wholesome cow and buffalo milk'
    ],
    specs: {
      'Volume': 'Pack of 6 x 1 Litre Tetra Paks (6 Litres total)',
      'Fat': '3.0% Min, SNF: 8.5% Min',
      'Shelf Life': '180 Days from manufacture'
    },
    whatsIncluded: ['Carton of 6x 1L Amul Taaza Tetra Paks'],
    warranty: 'Guaranteed Pure by GCMMF (Amul)',
    returnPolicy: 'Instant Refund on any damaged carton',
    inStock: true,
    stockCount: 90,
    superCoinsReward: 15,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Amul', 'Taaza Milk', 'Dairy', 'Tetra Pak', 'Hyperlocal 8m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-britannia-goodday',
    title: 'Britannia Good Day Rich Butter & Cashew Cookies 600g (Family Saver Pack)',
    brand: 'Britannia',
    categoryId: 'food',
    subcategory: 'Snacks',
    price: 125,
    originalPrice: 150,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 39000,
    images: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Filled with the abundance of roasted cashews, butter, and a pleasant crunch. Designed with smiles on each biscuit to deliver joyful chai-time snacking.',
    features: [
      'Abundant hand-picked roasted cashews in every single bite',
      'Mouth-melting rich butter cookie dough',
      'Family saver box containing 4 individually sealed moisture-proof packs'
    ],
    specs: {
      'Weight': '600 grams (4 inner packs of 150g each)',
      'Flavor': 'Butter Cashew Delight',
      'Vegetarian': '100% Pure Vegetarian Green Dot'
    },
    whatsIncluded: ['600g Britannia Good Day Family Saver Pack'],
    warranty: 'Britannia Quality Seal',
    returnPolicy: 'Replacement on transit damage',
    inStock: true,
    stockCount: 110,
    superCoinsReward: 8,
    deliveryEstimateMinutes: 6,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-dailybake',
    tags: ['Britannia', 'Good Day', 'Biscuits', 'Tea Time Snack', 'Instant 6m'],
    reviews: []
  },
  {
    id: 'prod-haldirams-aloo-bhujia',
    title: 'Haldiram\'s Nagpur Famous Crunchy Spicy Aloo Bhujia 1kg Pouch',
    brand: 'Haldiram\'s',
    categoryId: 'food',
    subcategory: 'Snacks',
    price: 260,
    originalPrice: 290,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 47000,
    images: [
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'India\'s quintessential crunchy treat. Delicious blend of spiced potato flakes, chickpea flour strands, fresh mint, red chilli, and tangy amchoor spices.',
    features: [
      'Irresistibly crispy potato and gram flour sev noodles',
      'Zesty spice blend with authentic mint and mango powder punch',
      'Resealable zip-lock pouch maintains peak crunchiness'
    ],
    specs: {
      'Net Weight': '1 kg Nitrogen-flushed Foil Pouch',
      'Shelf Life': '6 Months',
      'Origin': 'Nagpur, Maharashtra'
    },
    whatsIncluded: ['1kg Haldiram\'s Aloo Bhujia Pouch'],
    warranty: 'Haldiram\'s Authentic Freshness Guarantee',
    returnPolicy: 'Replacement on damaged seal',
    inStock: true,
    stockCount: 85,
    superCoinsReward: 12,
    deliveryEstimateMinutes: 6,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-dailybake',
    tags: ['Haldirams', 'Aloo Bhujia', 'Namkeen', 'Snack', 'Hyperlocal 6m'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-tropicana-orange',
    title: 'Tropicana 100% Real Orange Juice 1L Tetra Pak (No Added Sugar)',
    brand: 'Tropicana',
    categoryId: 'food',
    subcategory: 'Beverages',
    price: 145,
    originalPrice: 165,
    discountPercent: 12,
    rating: 4.7,
    reviewCount: 15400,
    images: [
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Pure sunshine in a glass. 100% orange juice squeezed from premium sun-drenched grove oranges. No added sugar, no artificial color, and no preservatives.',
    features: [
      '100% Pure Orange Juice with zero added sugar',
      'Natural source of Vitamin C and potassium to support daily immunity',
      'Best served chilled for breakfast and post-workout hydration'
    ],
    specs: {
      'Volume': '1 Litre Tetra Pak',
      'Added Sugar': '0% (Contains only naturally occurring fruit sugars)',
      'Storage': 'Refrigerate after opening and consume within 5 days'
    },
    whatsIncluded: ['1L Tropicana 100% Orange Juice Tetra Pak'],
    warranty: 'PepsiCo Quality Pledge',
    returnPolicy: 'Replacement on transit damage',
    inStock: true,
    stockCount: 60,
    superCoinsReward: 10,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Tropicana', 'Juice', 'Orange Juice', 'Zero Sugar', 'Breakfast'],
    reviews: []
  },
  {
    id: 'prod-catch-spices-duo',
    title: 'Catch Tabletop Seasoning Duo (Black Pepper Ceramic Grinder 100g + Pink Rock Salt 200g)',
    brand: 'Catch',
    categoryId: 'food',
    subcategory: 'Groceries',
    price: 299,
    originalPrice: 380,
    discountPercent: 21,
    rating: 4.8,
    reviewCount: 9200,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Elevate gourmet home dining. Whole Malabar black peppercorns in an adjustable coarse-to-fine ceramic grinder paired with unrefined mineral-rich Himalayan pink crystal salt.',
    features: [
      'Adjustable ceramic grinding mechanism for custom particle size',
      'Whole Tellicherry black peppercorns retain essential spicy oils until cracked',
      'Pure Himalayan pink rock salt rich in 84 natural trace minerals'
    ],
    specs: {
      'Contents': '1x 100g Ceramic Pepper Grinder Bottle + 1x 200g Pink Salt Shaker',
      'Purity': '100% Natural with zero anti-caking chemical additives'
    },
    whatsIncluded: ['100g Catch Black Pepper Grinder Bottle', '200g Catch Himalayan Pink Salt Shaker'],
    warranty: 'Catch Spices Purity Seal',
    returnPolicy: 'Replacement on bottle breakage',
    inStock: true,
    stockCount: 45,
    superCoinsReward: 12,
    deliveryEstimateMinutes: 8,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-freshmart',
    tags: ['Catch', 'Pepper Grinder', 'Pink Salt', 'Gourmet Spices'],
    reviews: []
  },

  // ==========================================
  // --- GAMING & HIGH-TECH APPLIANCES ---
  // ==========================================
  {
    id: 'prod-sony-ps5-slim',
    title: 'Sony PlayStation 5 Slim Console 1TB SSD (Disc Edition with DualSense)',
    brand: 'Sony',
    categoryId: 'electronics',
    subcategory: 'Gaming',
    price: 54990,
    originalPrice: 54990,
    discountPercent: 0,
    rating: 4.9,
    reviewCount: 5400,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 2650,
    bankOffers: [
      'Bank Offer: Flat ₹3,000 Instant Discount on ICICI & HDFC Credit Cards',
      'No Cost EMI: Available up to 24 Months starting at ₹2,650/month',
      'Bundle Offer: Get 2nd DualSense controller at ₹1,000 off'
    ],
    description: 'Play Has No Limits. Slim design packed with powerful gaming technology. Lightning speed 1TB SSD, haptic feedback and adaptive triggers on DualSense, and Ray Tracing at up to 120fps with 4K output.',
    features: [
      'Ultra-high speed 1TB SSD maximizes your play sessions with near-instant load times',
      'Integrated I/O custom architecture lets creators design games in unprecedented ways',
      'Ray Tracing brings new levels of realism with individually simulated rays of light',
      'Tempest 3D AudioTech immerses you in soundscapes where sound comes from every direction'
    ],
    specs: {
      'Storage': '1TB Custom Ultra-High Speed NVMe SSD',
      'Graphics': 'AMD Radeon RDNA 2-based graphics engine with Ray Tracing',
      'Processor': 'x86-64-AMD Ryzen Zen 2 (8 Cores / 16 Threads)',
      'Optical Drive': 'Ultra HD Blu-ray Disc Drive'
    },
    whatsIncluded: ['PS5 Slim Disc Console', 'DualSense Wireless Controller', 'HDMI 2.1 Cable', 'AC Power Cord', 'USB Cable', '2x Horizontal Stand Feet'],
    warranty: '1 Year Sony India Warranty',
    returnPolicy: '7 Days Replacement for Hardware Faults',
    inStock: true,
    stockCount: 8,
    superCoinsReward: 1100,
    deliveryEstimateMinutes: 20,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Sony', 'PlayStation', 'PS5', 'Gaming', 'Flagship'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-lg-ai-washing-machine',
    title: 'LG 8 Kg 5 Star AI Direct Drive Front Load Washing Machine with Steam',
    brand: 'LG',
    categoryId: 'appliances',
    subcategory: 'Washing Machines',
    price: 36990,
    originalPrice: 49990,
    discountPercent: 26,
    rating: 4.8,
    reviewCount: 4100,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 1790,
    bankOffers: [
      'Bank Offer: Flat ₹2,500 Instant Discount on SBI & HDFC Credit Cards',
      'No Cost EMI: Available up to 18 Months starting at ₹1,790/month',
      'Free Demo: Complimentary in-home installation and pipe fitting by LG technician'
    ],
    description: 'AI Direct Drive detects not only the weight of laundry but also senses softness of fabric and chooses optimal wash motions. Allergy Care steam removes 99.9% of dust mites and allergens.',
    features: [
      'AI DD intelligent care with 18% more fabric protection',
      'Steam wash removes 99.9% allergens and bacteria',
      'TurboWash cleans clothes thoroughly in just 59 minutes',
      'ThinQ Wi-Fi allows remote operation from your smartphone'
    ],
    specs: {
      'Capacity': '8 Kg (Ideal for families of 4-5)',
      'Energy Rating': '5 Star Energy Rating',
      'Spin Speed': '1400 RPM for faster drying',
      'Motor': 'Inverter Direct Drive with 10-Year Warranty'
    },
    whatsIncluded: ['Washing Machine', 'Inlet Pipe', 'Drain Hose', 'User Manual', 'Transit Bolt Spanner'],
    warranty: '2 Years Comprehensive + 10 Years on Motor by LG India',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 11,
    superCoinsReward: 740,
    deliveryEstimateMinutes: 35,
    isNearbyAvailable: false,
    tags: ['LG', 'Washing Machine', 'AI Direct Drive', 'Appliances'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-samsung-refrigerator',
    title: 'Samsung 253L 3-Star Double Door Convertible Inverter Refrigerator (Elegant Inox)',
    brand: 'Samsung',
    categoryId: 'appliances',
    subcategory: 'Refrigerators',
    price: 25990,
    originalPrice: 35990,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 6200,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80'
    ],
    emiStartsAt: 1260,
    bankOffers: [
      'Bank Offer: Flat ₹2,000 Instant Discount on ICICI Bank Cards',
      'No Cost EMI: Available up to 12 Months starting at ₹1,260/month'
    ],
    description: 'Digital Inverter Compressor with 20-year warranty automatically adjusts cooling speed in response to cooling demand. Convertible 3-in-1 allows converting freezer to fridge for 88L extra storage.',
    features: [
      'Convertible 3-in-1 mode allows converting freezer into fridge space',
      'All-around cooling cools each compartment evenly from corner to corner',
      'MoistFresh Zone regulates humidity for longer vegetable freshness',
      'Stabilizer-free operation runs steadily between 100V to 300V'
    ],
    specs: {
      'Capacity': '253 Litres (Freezer: 69L, Fresh Food: 184L)',
      'Energy Rating': '3 Star BEE Efficiency',
      'Defrosting': 'Frost Free Auto Defrost',
      'Compressor': 'Digital Inverter with 20-Year Warranty'
    },
    whatsIncluded: ['Samsung Refrigerator', 'Toughened Glass Shelves', 'Egg Tray', 'Ice Maker Tray', 'User Guide'],
    warranty: '1 Year Comprehensive + 20 Years on Digital Inverter Compressor',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 8,
    superCoinsReward: 520,
    deliveryEstimateMinutes: 30,
    isNearbyAvailable: false,
    tags: ['Samsung', 'Refrigerator', 'Inverter', 'Appliances'],
    reviews: []
  },
  {
    id: 'prod-dyson-v12-vacuum',
    title: 'Dyson V12 Detect Slim Total Clean Cordless Vacuum (Laser Dust Detection)',
    brand: 'Dyson',
    categoryId: 'appliances',
    subcategory: 'Small Appliances',
    price: 47900,
    originalPrice: 55900,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 2900,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Dyson most powerful lightweight cordless vacuum. Precisely angled illumination beam reveals invisible dust on hard floors. Piezo sensor counts and measures the size of dust particles.',
    features: [
      'Illumination reveals microscopic particles you can not normally see',
      'Piezo sensor continuously sizes and counts dust particles, automatically increasing suction',
      'LCD screen shows scientific proof of a deep clean in real time',
      'Up to 60 minutes of run time with click-in swappable battery'
    ],
    specs: {
      'Weight': '2.2 kg Lightweight Body',
      'Suction Power': '150 Air Watts (Hyperdymium motor spins up to 125,000rpm)',
      'Bin Volume': '0.35 Litres with point-and-shoot hygienic ejection',
      'Filtration': 'Fully sealed whole-machine filtration captures 99.99% of particles down to 0.3 microns'
    },
    whatsIncluded: ['Dyson V12 Vacuum', 'Fluffy Optic Cleaner Head', 'Motorbar Cleaner Head', 'Hair Screw Tool', 'Combination Tool', 'Crevice Tool', 'Wall Dok Station'],
    warranty: '2 Years Dyson In-Home Warranty & Support',
    returnPolicy: '7 Days Replacement for Defects',
    inStock: true,
    stockCount: 7,
    superCoinsReward: 960,
    deliveryEstimateMinutes: 15,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Dyson', 'Vacuum', 'Cordless', 'High Tech'],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-philips-airfryer-xxl',
    title: 'Philips Digital Airfryer XXL 7.2L with Rapid CombiAir Technology (HD9880/90)',
    brand: 'Philips',
    categoryId: 'appliances',
    subcategory: 'Small Appliances',
    price: 17990,
    originalPrice: 24995,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 7800,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Crispy taste with up to 90% less fat. Rapid CombiAir technology dynamically adjusts cooking airflow and temperature. Massive 7.2L capacity cooks for up to 7 people with food thermometer probe integration.',
    features: [
      'Rapid CombiAir cooks food evenly with hot air instead of oil',
      'Integrated food probe meat thermometer guarantees exact doneness',
      'Connected to NutriU app for step-by-step chef recipes and guidance',
      'QuickClean basket with non-stick coating cleans up in 90 seconds'
    ],
    specs: {
      'Capacity': '7.2 Litres (1.4 kg fries / whole chicken)',
      'Power': '2000 Watts Rapid Heating',
      'Programs': '22 Cooking Functions (Fry, Roast, Grill, Bake, Reheat, Dehydrate)',
      'Display': 'Intuitive Digital Display with QuickControl Dial'
    },
    whatsIncluded: ['Philips XXL Airfryer', 'Integrated Core Temperature Food Probe', 'Removable Mesh Basket', 'User Guide'],
    warranty: '2 Years Philips India Warranty',
    returnPolicy: '7 Days Replacement',
    inStock: true,
    stockCount: 12,
    superCoinsReward: 360,
    deliveryEstimateMinutes: 20,
    isNearbyAvailable: true,
    nearbyShopId: 'shop-techzone',
    tags: ['Philips', 'Airfryer XXL', 'Healthy Cooking', 'Appliances'],
    isHotDeal: true,
    reviews: []
  },
  {
    id: 'prod-panasonic-microwave',
    title: 'Panasonic 27L Convection Microwave Oven (NN-CT645BFDG with 360° Heat Wrap)',
    brand: 'Panasonic',
    categoryId: 'appliances',
    subcategory: 'Microwaves',
    price: 13990,
    originalPrice: 18990,
    discountPercent: 26,
    rating: 4.7,
    reviewCount: 3900,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'All-in-one culinary powerhouse. Replaces your tandoor, oven, grill, and microwave. Magic Grill technology crisps food from both top and bottom with 101 pre-programmed auto-cook Indian menus.',
    features: [
      '101 Auto Cook Menus including 64 authentic Indian curries, rotis, and desserts',
      '360 Degree Heat Wrap ensures uniform browning and baking without cold spots',
      'Stainless steel cavity for high durability and easy oil wipe-down',
      'Zero oil cooking feature promotes heart-healthy family cooking'
    ],
    specs: {
      'Capacity': '27 Litres Convection',
      'Cavity': 'Food-Grade Antibacterial Stainless Steel',
      'Turntable Size': '315 mm Glass Tray',
      'Safety': 'Child Safety Lock'
    },
    whatsIncluded: ['Panasonic Microwave Oven', 'Glass Turntable Tray', 'High/Low Metal Wire Rack', 'Starter Kit', 'Recipe Book'],
    warranty: '1 Year Comprehensive + 5 Years on Magnetron by Panasonic India',
    returnPolicy: '10 Days Replacement',
    inStock: true,
    stockCount: 9,
    superCoinsReward: 280,
    deliveryEstimateMinutes: 25,
    isNearbyAvailable: false,
    tags: ['Panasonic', 'Microwave', 'Convection', 'Kitchen Appliance'],
    isBestSeller: true,
    reviews: []
  }
];

export const sampleAddresses: Address[] = [
  {
    id: 'addr-home',
    type: 'Home',
    name: 'Amreshwar Maravi',
    phone: '+91 98765 43210',
    addressLine1: 'Flat 402, Sunshine Heights',
    addressLine2: '100 Feet Road, HAL 2nd Stage, Indiranagar',
    landmark: 'Opposite Toit Brewpub',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    isDefault: true,
    distanceKm: 1.8,
    speedTag: '⚡ 10-12 Mins Instant Delivery',
    instructions: 'Leave at front door with security if not answering.'
  },
  {
    id: 'addr-whitefield',
    type: 'Work',
    name: 'Amreshwar Maravi',
    phone: '+91 98765 43210',
    addressLine1: 'Tower B, Tech Park, ITPL Main Road',
    addressLine2: 'Whitefield',
    landmark: 'Near Hope Farm Junction',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    isDefault: false,
    distanceKm: 8.4,
    speedTag: '⚡ 15-30 Mins Local Hub Express',
    instructions: 'Deliver to 3rd floor reception.'
  },
  {
    id: 'addr-chhattisgarh-raipur',
    type: 'Home',
    name: 'Amreshwar Maravi (Raipur Home)',
    phone: '+91 98765 43210',
    addressLine1: 'Flat 502, Avinash Heights, VIP Road',
    addressLine2: 'Telibandha',
    landmark: 'Near Magneto The Mall',
    city: 'Raipur',
    state: 'Chhattisgarh',
    pincode: '492001',
    isDefault: false,
    isInterstate: true,
    distanceKm: 1240,
    speedTag: '✈️ 24 Hours Express Air Cargo (Delhi ➔ CG)',
    hubRoute: 'Delhi Air Cargo Hub ➔ Raipur Airport Cargo Terminal, Chhattisgarh',
    instructions: 'Ring bell twice upon arrival.'
  },
  {
    id: 'addr-chhattisgarh-bilaspur',
    type: 'Other',
    name: 'Amreshwar Maravi (Bilaspur)',
    phone: '+91 98765 11223',
    addressLine1: 'Plot 48, Commercial Estate, Vyapar Vihar',
    addressLine2: 'Near Bilaspur Junction Terminal',
    landmark: 'Opposite City Center Mall',
    city: 'Bilaspur',
    state: 'Chhattisgarh',
    pincode: '495001',
    isDefault: false,
    isInterstate: true,
    distanceKm: 1310,
    speedTag: '✈️ 24 Hours Express Air Cargo (Delhi ➔ Bilaspur)',
    hubRoute: 'Delhi Air Cargo Terminal ➔ Bilaspur Air Transit Hub, Chhattisgarh',
    instructions: 'Call recipient on arrival.'
  },
  {
    id: 'addr-delhi-hub',
    type: 'Work',
    name: 'Amreshwar Maravi (Delhi Hub)',
    phone: '+91 98765 43210',
    addressLine1: 'Flat 12, Barakhamba Road, Connaught Place',
    addressLine2: 'Central District',
    landmark: 'Near Rajiv Chowk Metro Gate 3',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    isDefault: false,
    distanceKm: 4.2,
    speedTag: '⚡ 10-15 Mins Capital Hub',
    instructions: 'Leave at security reception desk.'
  }
];

export const sampleCoupons: Coupon[] = [
  {
    code: 'WELCOME100',
    title: '₹100 Instant Discount',
    description: 'Flat ₹100 off on your order above ₹499',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 499
  },
  {
    code: 'SUPERFLOW',
    title: '20% OFF Hyperlocal Order',
    description: 'Get 20% off up to ₹500 on all nearby orders',
    discountType: 'percent',
    discountValue: 20,
    minOrderValue: 999,
    maxDiscount: 500
  },
  {
    code: 'FREEDELIVERY',
    title: 'Zero Delivery Fee',
    description: 'Enjoy free instant delivery on any order today',
    discountType: 'fixed',
    discountValue: 40,
    minOrderValue: 299
  },
  {
    code: 'FESTIVE25',
    title: 'Festive 25% Savings',
    description: '25% discount up to ₹1,000 on electronics and fashion',
    discountType: 'percent',
    discountValue: 25,
    minOrderValue: 1999,
    maxDiscount: 1000
  }
];

export const sampleSuperCoinTransactions: SuperCoinTransaction[] = [
  {
    id: 'tx-1',
    date: 'Today, 10:15 AM',
    type: 'earned',
    amount: 140,
    reason: 'Earned on Order #FS-94281 (Sony Headphones)'
  },
  {
    id: 'tx-2',
    date: 'Yesterday, 04:30 PM',
    type: 'earned',
    amount: 25,
    reason: 'Daily Check-in Streak Day 4'
  },
  {
    id: 'tx-3',
    date: '20 Sep 2026',
    type: 'redeemed',
    amount: 200,
    reason: 'Applied at checkout for Order #FS-89102'
  },
  {
    id: 'tx-4',
    date: '18 Sep 2026',
    type: 'earned',
    amount: 50,
    reason: 'Verified photo review for Nike Air Max 270'
  }
];

export const sampleRewards: RewardVoucher[] = [
  {
    id: 'rew-1',
    title: '₹150 Flowstate Cash Voucher',
    description: 'Use on any order with no minimum limit',
    coinsCost: 300,
    discountValue: 150,
    code: 'FSCOIN150',
    expiryDate: '30 Oct 2026',
    category: 'Voucher',
    unlocked: true
  },
  {
    id: 'rew-2',
    title: '1 Month Free Express Pass',
    description: 'Unlimited 10-minute free delivery on all nearby shops',
    coinsCost: 500,
    discountValue: 299,
    code: 'EXPRESS30D',
    expiryDate: '15 Nov 2026',
    category: 'Subscription',
    unlocked: true
  },
  {
    id: 'rew-3',
    title: '₹500 Nike Brand Coupon',
    description: 'Flat ₹500 off on Nike official footwear and gear',
    coinsCost: 800,
    discountValue: 500,
    code: 'NIKECOIN500',
    expiryDate: '31 Dec 2026',
    category: 'Brand',
    unlocked: false
  },
  {
    id: 'rew-4',
    title: 'Apple 20W USB-C Adapter Gift',
    description: 'Redeem 100% free with coins at checkout',
    coinsCost: 1500,
    discountValue: 1900,
    code: 'APPLEADAPTERFREE',
    expiryDate: '31 Dec 2026',
    category: 'Gift',
    unlocked: false
  }
];

export const initialOrders: Order[] = [
  {
    id: 'FS-94281',
    date: '24 Sep 2026, 09:45 AM',
    items: [
      {
        id: 'ci-1',
        product: products[0], // Sony WH-1000XM5
        quantity: 1,
        selectedColor: 'Matte Black',
        unitPrice: 26990
      }
    ],
    subtotal: 26990,
    discount: 8000,
    couponDiscount: 500,
    coinsUsed: 100,
    deliveryFee: 0,
    tax: 485,
    total: 26875,
    address: sampleAddresses[0],
    deliveryOption: 'instant',
    deliveryEta: 'Arriving in 7 mins',
    paymentMethod: 'upi',
    status: 'out_for_delivery',
    riderInfo: {
      name: 'Ramesh Kumar',
      phone: '+91 98450 12345',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      vehicle: 'Electric Hero Vida Scooter',
      vehicleNumber: 'KA 03 EV 4821',
      rating: 4.9,
      etaMinutes: 7,
      currentLocationName: '100 Feet Road, Near CMH Signal',
      lat: 12.9735,
      lng: 77.6420
    },
    trackingUpdates: [
      { time: '09:45 AM', text: 'Order placed successfully via UPI (Transaction ID: #UPI9281729)', status: 'placed' },
      { time: '09:47 AM', text: 'Store confirmed order. Invoice generated.', status: 'confirmed' },
      { time: '09:50 AM', text: 'Items packed in tamper-proof thermal security bag.', status: 'packed' },
      { time: '09:52 AM', text: 'Rider Ramesh Kumar picked up package from TechZone Store.', status: 'shipped' },
      { time: '09:55 AM', text: 'Rider is out for delivery. Heading towards 100 Feet Road.', status: 'out_for_delivery' }
    ]
  },
  {
    id: 'FS-99104',
    date: '24 Sep 2026, 06:15 AM',
    items: [
      {
        id: 'ci-interstate-1',
        product: products[1], // Apple iPhone 16 Pro Max
        quantity: 1,
        selectedColor: 'Natural Titanium',
        selectedStorage: '256GB',
        unitPrice: 144900
      }
    ],
    subtotal: 144900,
    discount: 5000,
    couponDiscount: 1000,
    coinsUsed: 500,
    deliveryFee: 0,
    tax: 2608,
    total: 141008,
    address: sampleAddresses[2], // Raipur, Chhattisgarh
    deliveryOption: 'express',
    deliveryEta: 'Guaranteed 24-Hour Express Air Cargo (Delhi ➔ Chhattisgarh)',
    paymentMethod: 'upi',
    status: 'shipped',
    isInterstate: true,
    originHub: 'Delhi Central Air Logistics Terminal (DEL)',
    destinationHub: 'Raipur Swami Vivekananda Airport Cargo Terminal, Chhattisgarh (RPR)',
    transitSpeed: '740 km/h (Express Air Cargo Flight)',
    flightOrVehicleNumber: 'FS-CARGO 902 (Delhi ➔ Raipur)',
    airwayBillNumber: 'AWB-DEL-CG-849201',
    parcelCheckpoints: [
      {
        name: 'High-Value Security Cleared',
        location: 'Delhi Central Air Logistics Complex (IGI Airport Cargo Terminal)',
        status: 'completed',
        time: '06:45 AM'
      },
      {
        name: 'Loaded on Dedicated Express Cargo Flight',
        location: 'Flight FS-CARGO 902 (Boeing 737 P2F Freighter)',
        status: 'in_transit',
        time: '09:30 AM (In-Flight Telemetry Active)'
      },
      {
        name: 'Arrival at Raipur Air Cargo Terminal',
        location: 'Swami Vivekananda Airport, Raipur, Chhattisgarh',
        status: 'pending',
        time: 'Est. 01:15 PM'
      },
      {
        name: 'Express Hub Sorting & Local Dispatch',
        location: 'Flowstate Raipur Central Hub, Telibandha, CG',
        status: 'pending',
        time: 'Est. 03:00 PM'
      },
      {
        name: 'Handover at Doorstep',
        location: 'VIP Road, Raipur, Chhattisgarh',
        status: 'pending',
        time: 'Guaranteed Delivery within 24 Hours'
      }
    ],
    trackingUpdates: [
      { time: '06:15 AM', text: 'Order processed at Delhi Mega Fulfillment Center', status: 'placed' },
      { time: '06:45 AM', text: 'Customs and security scan verified for high-value cargo', status: 'confirmed' },
      { time: '07:30 AM', text: 'Package containerized in Air Cargo Unit ULD-8821', status: 'packed' },
      { time: '09:30 AM', text: 'Flight FS-CARGO 902 airborne from New Delhi (DEL) to Raipur, Chhattisgarh (RPR)', status: 'shipped' }
    ]
  },
  {
    id: 'FS-89102',
    date: '20 Sep 2026, 03:20 PM',
    items: [
      {
        id: 'ci-2',
        product: products[4], // Nike Shoes
        quantity: 1,
        selectedSize: 'UK 9',
        selectedColor: 'Crimson Red / Black',
        unitPrice: 8995
      },
      {
        id: 'ci-3',
        product: products[7], // Hass Avocados
        quantity: 2,
        unitPrice: 349
      }
    ],
    subtotal: 9693,
    discount: 5300,
    couponDiscount: 200,
    coinsUsed: 200,
    deliveryFee: 0,
    tax: 174,
    total: 9467,
    address: sampleAddresses[0],
    deliveryOption: 'instant',
    deliveryEta: 'Delivered on 20 Sep, 03:36 PM',
    paymentMethod: 'card',
    status: 'delivered',
    trackingUpdates: [
      { time: '03:20 PM', text: 'Order placed', status: 'placed' },
      { time: '03:23 PM', text: 'Confirmed by store', status: 'confirmed' },
      { time: '03:26 PM', text: 'Packed and verified', status: 'packed' },
      { time: '03:29 PM', text: 'Dispatched with express courier', status: 'shipped' },
      { time: '03:32 PM', text: 'Out for delivery', status: 'out_for_delivery' },
      { time: '03:36 PM', text: 'Handed over to customer. OTP verified.', status: 'delivered' }
    ]
  }
];

export const sampleUser: UserProfile = {
  id: 'usr-flowstate-1',
  name: 'Amreshwar Maravi',
  email: 'amreshwar.maravi@flowstate.in',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  addresses: sampleAddresses,
  superCoins: 1450,
  streakDays: 4,
  lastCheckInDate: '2026-09-23'
};
