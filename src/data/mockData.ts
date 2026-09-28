import { Product, FarmLocation, SeoSettings, SiteContentSettings } from '../types';

export const INITIAL_SITE_CONTENT: SiteContentSettings = {
  announcementTextEn: 'Same-day local delivery across Green Valley on orders before 2:00 PM',
  announcementTextBn: 'গ্রিন ভ্যালিতে দুপুর ২টার মধ্যে অর্ডারে একই দিনে দ্রুত ডেলিভারি',
  heroHeadlineEn: 'Farm-Fresh Local Organic Food in Green Valley',
  heroHeadlineBn: 'তাজা অর্গানিক খাবার, সরাসরি কৃষকের জমি থেকে',
  heroSubtitleEn: '100% pesticide-free, nutrient-dense vegetables, raw unfiltered honey, and wood-pressed oils. Harvested at sunrise from family-owned regional acreage.',
  heroSubtitleBn: 'কীটনাশক, প্রিজারভেটিভ ও কৃত্রিম রাসায়নিকমুক্ত ১০০% অর্গানিক শাকসবজি, ঘানি ভাঙা সরিষার তেল এবং খাঁটি মধু। একই দিনে সংগ্রহ ও স্থানীয় ডেলিভারি।',
  heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
  deliveryFee: 4.50,
  freeDeliveryThreshold: 35.00,
  bannerDiscountTextEn: 'Free Delivery on Orders Over $35',
  bannerDiscountTextBn: '$৩৫ বা তার বেশি অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি'
};

export const INITIAL_SEO_SETTINGS: SeoSettings = {
  businessName: 'Organic Food',
  tagline: '100% Certified Farm-Fresh Local Organic Food',
  city: 'Green Valley',
  region: 'California (CA)',
  country: 'United States',
  targetKeywords: [
    'organic food near me',
    'local organic produce delivery',
    'farm fresh vegetables',
    'cold pressed mustard oil',
    'raw unpasteurized wildflower honey',
    'grass fed organic ghee',
    'chemical free heirloom tomatoes',
    'certified organic farm pickup'
  ],
  contactPhone: '+1 (800) 555-0199',
  contactEmail: 'contact@organicfood.local',
  streetAddress: '742 Evergreen Farm Road',
  postalCode: '94952',
  siteUrl: 'https://organicfood.local',
  defaultMetaDescription: 'Order 100% certified organic food, farm-fresh vegetables, and artisanal goods from local sustainable farms. Same-day local delivery & farm pickup.'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic Heirloom Vine Tomatoes',
    bnName: 'অর্গানিক হাইব্রিড মুক্ত টমেটো',
    slug: 'organic-heirloom-vine-tomatoes',
    category: 'vegetables',
    price: 4.80,
    unit: '1 kg',
    bnUnit: '১ কেজি',
    inStock: true,
    stockCount: 45,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    description: 'Sun-ripened on organic soil without synthetic pesticides or chemical fertilizers. Rich in lycopene, deeply aromatic with natural sweetness.',
    bnDescription: 'কীটনাশক ও রাসায়নিক সার মুক্ত প্রাকৃতিকভাবে পাকা মিষ্টি ও সুস্বাদু দেশি টমেটো।',
    farmOrigin: 'Valley Sun Organic Ranch',
    harvestDate: 'Harvested Today Morning (6:30 AM)',
    certification: 'USDA & CCOF Certified Organic',
    caloriesPer100g: 18,
    organicFeatures: ['100% Pesticide Free', 'Non-GMO Heirloom Seed', 'Zero Wax Coating', 'Compost Fertilized'],
    localKeywords: ['fresh organic tomatoes green valley', 'farm picked tomatoes near me']
  },
  {
    id: 'prod-2',
    name: 'Wildflower Pure Raw Honey',
    bnName: 'প্রাকৃতিক বুনো ফুলের খাঁটি মধু',
    slug: 'wildflower-pure-raw-honey',
    category: 'dairy-honey',
    price: 14.50,
    unit: '500 g jar',
    bnUnit: '৫০০ গ্রাম জার',
    inStock: true,
    stockCount: 28,
    rating: 5.0,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    description: 'Raw, unheated, and unfiltered honey extracted from ethical hives in organic clover and wildflower fields. Loaded with active pollen and enzymes.',
    bnDescription: 'সম্পূর্ণ প্রক্রিয়াবিহীন খাঁটি চাকের মধু। কোন প্রকার চিনি বা ভেজাল মেশানো হয় না।',
    farmOrigin: 'Meadow Bloom Apiaries',
    harvestDate: 'Current Season Extraction (Sept 2026)',
    certification: '100% Pure Natural Lab Tested',
    caloriesPer100g: 304,
    organicFeatures: ['Unfiltered & Raw', 'Never Heat Pasteurized', 'Ethical Bee Care', 'Rich in Bee Pollen'],
    localKeywords: ['raw local honey near me', 'pure organic honey green valley']
  },
  {
    id: 'prod-3',
    name: 'Traditional Cold-Pressed Mustard Oil',
    bnName: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
    slug: 'cold-pressed-mustard-oil',
    category: 'oils-grains',
    price: 11.20,
    unit: '1 Litre',
    bnUnit: '১ লিটার',
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    description: 'Cold-pressed in traditional wooden Ghani at slow speeds under 38°C to preserve natural antioxidants, pungency, and vital Omega-3 fatty acids.',
    bnDescription: 'কাঠের ঘানিতে ভাঙা খাঁটি দেশি সরিষার ঝাঁঝালো তেল। কোন প্রকার কেমিক্যাল ও ফিল্টার ছাড়া তৈরি।',
    farmOrigin: 'Heritage Seed Mill Co.',
    harvestDate: 'Freshly Pressed Yesterday',
    certification: 'Certified Cold-Extracted Food Grade',
    caloriesPer100g: 884,
    organicFeatures: ['Wood Ghani Pressed', 'No Solvents Used', 'Unrefined & Pungent', 'Zero Trans Fats'],
    localKeywords: ['cold pressed mustard oil local', 'traditional wooden ghani oil']
  },
  {
    id: 'prod-4',
    name: 'Organic Crisp Baby Spinach',
    bnName: 'তাজা অর্গানিক কচি পালং শাক',
    slug: 'organic-crisp-baby-spinach',
    category: 'vegetables',
    price: 3.50,
    unit: '300 g bag',
    bnUnit: '৩০০ গ্রাম ব্যাগ',
    inStock: true,
    stockCount: 50,
    rating: 4.9,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    description: 'Tender baby leaves hydro-washed with pure deep-well water. Grown in certified organic nitrogen-rich living soil.',
    bnDescription: 'সরাসরি জমি থেকে সংগ্রহ করা সতেজ ও নরম কচি পালং শাক।',
    farmOrigin: 'Riverbank Greenhouses',
    harvestDate: 'Harvested Today at Dawn',
    certification: 'USDA Certified Organic',
    caloriesPer100g: 23,
    organicFeatures: ['Triple Washed in Spring Water', 'High Dietary Iron', '0 Days in Cold Storage', 'Plastic-Free Recyclable Bag'],
    localKeywords: ['organic fresh spinach delivery', 'farm fresh greens near me']
  },
  {
    id: 'prod-5',
    name: 'Pasture-Raised Grass-Fed Desi Ghee',
    bnName: 'খাঁটি গাওয়া দেশি ঘি (ঘাস খাওয়া গাভী)',
    slug: 'grass-fed-desi-ghee',
    category: 'dairy-honey',
    price: 19.90,
    unit: '450 g glass jar',
    bnUnit: '৪৫০ গ্রাম কাচের বয়াম',
    inStock: true,
    stockCount: 22,
    rating: 5.0,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    description: 'Prepared using traditional Bilona method from curd of free-grazing, pasture-fed cows. Golden, aromatic, and rich in natural butyric acid.',
    bnDescription: 'বিলোনা পদ্ধতিতে তৈরি খাঁটি দানাদার গাওয়া ঘি। কোনো কৃত্রিম সুবাস বা প্রিজারভেটিভ নেই।',
    farmOrigin: 'Green Meadow Dairy Farm',
    harvestDate: 'Cultured & Clarified 3 Days Ago',
    certification: 'A2 Grass-Fed Dairy Certified',
    caloriesPer100g: 900,
    organicFeatures: ['100% Grass Fed Cows', 'Bilona Churned Method', 'Naturally Lactose Free', 'Glass Jar Packaging'],
    localKeywords: ['pure grass fed ghee local delivery', 'bilona desi ghee near me']
  },
  {
    id: 'prod-6',
    name: 'Local Hass Avocados (Organic Tree-Ripened)',
    bnName: 'স্থানীয় অর্গানিক হাস অ্যাভোকাডো',
    slug: 'local-organic-hass-avocado',
    category: 'fruits',
    price: 6.20,
    unit: 'Pack of 3',
    bnUnit: '৩ পিসের প্যাক',
    inStock: true,
    stockCount: 35,
    rating: 4.7,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    description: 'Creamy, rich in heart-healthy monounsaturated fats. Picked from local certified orchard groves with minimal food miles.',
    bnDescription: 'গাছে পাকা সুস্বাদু ও পুষ্টিকর তাজা অ্যাভোকাডো।',
    farmOrigin: 'Sunny Ridge Organic Orchards',
    harvestDate: 'Handpicked 2 Days Ago',
    certification: 'CCOF Certified Organic',
    caloriesPer100g: 160,
    organicFeatures: ['Tree Ripened', 'Zero Post-Harvest Fungicide', 'Rich in Potassium', 'Sustainable Water Drip Grown'],
    localKeywords: ['organic fresh avocados green valley', 'local avocado delivery']
  },
  {
    id: 'prod-7',
    name: 'Unpolished Brown Aromatic Basmati Rice',
    bnName: 'ঢেঁকি ছাঁটা সুগন্ধি ব্রাউন বাসমতী চাল',
    slug: 'unpolished-aromatic-brown-basmati-rice',
    category: 'oils-grains',
    price: 8.90,
    unit: '2 kg sack',
    bnUnit: '২ কেজি ব্যাগ',
    inStock: true,
    stockCount: 40,
    rating: 4.8,
    reviewsCount: 26,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'Retains wholesome bran and germ layers. Naturally fragrant long grain rice grown in heirloom soil with zero synthetic pest control.',
    bnDescription: 'লাল চালের মতো কুঁড়া বজায় রাখা স্বাস্থ্যকর ঢেকিশাঁটা সুগন্ধি চাল। ফাইবার ও খনিজে ভরপুর।',
    farmOrigin: 'Heritage Grain Co-op',
    harvestDate: 'Autumn Harvest 2026 Batch',
    certification: 'Fair-Trade Organic Certified',
    caloriesPer100g: 111,
    organicFeatures: ['Unpolished Whole Grain', 'Low Glycemic Index', 'Heirloom Seed Stock', '100% Jute Sack Packaging'],
    localKeywords: ['unpolished brown rice local delivery', 'organic basmati rice farm direct']
  },
  {
    id: 'prod-8',
    name: 'Fresh Organic Mint & Holy Basil (Tulsi)',
    bnName: 'তাজা পুদিনা ও তুলসী পাতা',
    slug: 'fresh-organic-mint-holy-basil',
    category: 'herbs',
    price: 2.50,
    unit: '150 g bunch',
    bnUnit: '১৫০ গ্রাম আঁটি',
    inStock: true,
    stockCount: 60,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
    description: 'Intensely fragrant culinary and medicinal herbs cut fresh on order. High essential oil concentration for teas and fresh dishes.',
    bnDescription: 'সতেজ সুগন্ধি তুলসী ও পুদিনা পাতা। সকালের কাঁচা চা এবং খাবারের স্বাদ বাড়াতে দারুণ।',
    farmOrigin: 'Aroma Botanical Sanctuary',
    harvestDate: 'Cut Fresh Today at 7:00 AM',
    certification: 'Biodynamic Organic Demeter',
    caloriesPer100g: 44,
    organicFeatures: ['Pesticide Free', 'Biodynamically Farmed', 'Cut on Day of Dispatch', 'Zero Chemical Wash'],
    localKeywords: ['fresh herbs delivery near me', 'organic holy basil green valley']
  }
];

export const FARM_LOCATIONS: FarmLocation[] = [
  {
    id: 'loc-1',
    name: 'Organic Food Main Farm Stand & Greenhouse',
    bnName: 'অর্গানিক ফুড মূল ফার্ম ও গ্রিনহাউস',
    type: 'Farm & Greenhouse',
    address: '742 Evergreen Farm Road',
    city: 'Green Valley',
    state: 'CA',
    zip: '94952',
    phone: '+1 (800) 555-0199',
    email: 'farmstand@organicfood.local',
    lat: 37.7749,
    lng: -122.4194,
    hours: {
      weekdays: '7:30 AM – 7:00 PM',
      weekends: '8:00 AM – 8:00 PM'
    },
    // Real interactive Google Maps embed URL centered on the farm coordinates
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.5076402!3d37.757815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=37.7749,-122.4194'
  },
  {
    id: 'loc-2',
    name: 'Downtown Riverside Farmers Market Hub',
    bnName: 'ডাউনটাউন রিভারসাইড ফার্মার্স মার্কেট হাব',
    type: 'Farmers Market Stall',
    address: '120 Market Street, Pavilion 4',
    city: 'Riverside Center',
    state: 'CA',
    zip: '94954',
    phone: '+1 (800) 555-0188',
    email: 'riverside@greenrootorganics.local',
    lat: 37.7833,
    lng: -122.4167,
    hours: {
      weekdays: '9:00 AM – 6:00 PM',
      weekends: '7:00 AM – 5:00 PM'
    },
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086377708537!2d-122.4013444!3d37.7925184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806283d355dd%3A0xa6998e3b2e59d7b!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000001!5m2!1sen!2sus',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=37.7833,-122.4167'
  },
  {
    id: 'loc-3',
    name: 'Oakridge Cold-Storage & Rapid Express Depot',
    bnName: 'ওকরিজ কোল্ড স্টোরেজ ও এক্সপ্রেস পিকআপ ডিপো',
    type: 'Pickup Hub',
    address: '45 Orchard Lane, Suite B',
    city: 'Oakridge Hills',
    state: 'CA',
    zip: '94950',
    phone: '+1 (800) 555-0177',
    email: 'oakridge@greenrootorganics.local',
    lat: 37.7650,
    lng: -122.4300,
    hours: {
      weekdays: '8:00 AM – 8:00 PM',
      weekends: '8:00 AM – 6:00 PM'
    },
    embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7745778891557!2d-122.4350!3d37.7650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e27e85c13bb%3A0x6d9f7a5525bc8348!2sCastro%20District%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000002!5m2!1sen!2sus',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=37.7650,-122.4300'
  }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    location: 'Green Valley Resident (Verified Local Buyer)',
    rating: 5,
    date: 'September 24, 2026',
    comment: 'The heirloom tomatoes arrived still smelling like actual sunlit soil. Delivery arrived within 2 hours of placing the order. So grateful to have this authentic local farm right in our neighborhood!',
    product: 'Organic Heirloom Vine Tomatoes'
  },
  {
    id: 'rev-2',
    author: 'Rafiqul Islam',
    location: 'Oakridge Community Member',
    rating: 5,
    date: 'September 22, 2026',
    comment: 'ঘানি ভাঙা সরিষার তেল এবং খাঁটি মধুর কোয়ালিটি অবিশ্বাস্য! আজকাল আসল জৈব খাবার খুঁজে পাওয়া কঠিন, কিন্তু অর্গানিক ফুড প্রতিটি পণ্যে বিশ্বস্ততা প্রমাণ করেছে।',
    product: 'Traditional Cold-Pressed Mustard Oil'
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    location: 'Riverside Organic Chef',
    rating: 5,
    date: 'September 18, 2026',
    comment: 'We source baby spinach and herbs weekly for our farm-to-table cafe. The freshness is night and day compared to supermarket plastic clamshells.',
    product: 'Organic Crisp Baby Spinach'
  }
];

export const LOCAL_FAQS = [
  {
    question: 'How fast is local delivery to my home in Green Valley and nearby towns?',
    bnQuestion: 'গ্রিন ভ্যালি এবং পার্শ্ববর্তী এলাকায় ডেলিভারি কত দ্রুত পৌঁছায়?',
    answer: 'Orders placed before 2:00 PM are harvested that same morning and delivered to your doorstep within 3-4 hours across Green Valley, Oakridge, and Riverside. You can also pick up free at our 3 local farm hubs.'
  },
  {
    question: 'Are all products certified 100% organic without chemical residues?',
    bnQuestion: 'সব পণ্য কি শতভাগ রাসায়নিক মুক্ত ও সার্টিফাইড অর্গানিক?',
    answer: 'Yes! Every partner farm undergoes soil testing and adheres to USDA & biodynamic organic standards. We never use chemical insecticides, artificial ripening agents, or preservative waxes.'
  },
  {
    question: 'Can I visit the farm in person using the Google Maps directions?',
    bnQuestion: 'আমি কি গুগল ম্যাপের নির্দেশনা অনুসরণ করে সশরীরে ফার্মে আসতে পারি?',
    answer: 'Absolutely! Our main farm stand at 742 Evergreen Farm Rd is open 7 days a week. Use our interactive Contact Page map for real-time turn-by-turn driving directions.'
  },
  {
    question: 'How do you submit and maintain the XML sitemap for Google ranking?',
    bnQuestion: 'গুগলে র‍্যাংক করার জন্য এক্সএমএল সাইটম্যাপ কীভাবে তৈরি ও জমা দেওয়া হয়?',
    answer: 'Our website automatically generates an up-to-date sitemap.xml with semantic URLs, priority flags, and lastmod timestamps. You can view, copy, download, and ping Google directly from our integrated SEO Hub.'
  }
];
