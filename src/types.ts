export interface Product {
  id: string;
  name: string;
  bnName: string;
  slug: string;
  category: 'vegetables' | 'fruits' | 'dairy-honey' | 'oils-grains' | 'herbs';
  price: number;
  unit: string;
  bnUnit: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  bnDescription: string;
  farmOrigin: string;
  harvestDate: string;
  certification: string;
  caloriesPer100g?: number;
  organicFeatures: string[];
  localKeywords: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FarmLocation {
  id: string;
  name: string;
  bnName: string;
  type: 'Farm & Greenhouse' | 'Farmers Market Stall' | 'Pickup Hub';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  hours: {
    weekdays: string;
    weekends: string;
  };
  embedMapUrl: string;
  directionsUrl: string;
}

export interface SiteContentSettings {
  announcementTextEn: string;
  announcementTextBn: string;
  heroHeadlineEn: string;
  heroHeadlineBn: string;
  heroSubtitleEn: string;
  heroSubtitleBn: string;
  heroImage: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  bannerDiscountTextEn: string;
  bannerDiscountTextBn: string;
}

export interface SeoSettings {
  businessName: string;
  tagline: string;
  city: string;
  region: string;
  country: string;
  targetKeywords: string[];
  contactPhone: string;
  contactEmail: string;
  streetAddress: string;
  postalCode: string;
  siteUrl: string;
  defaultMetaDescription: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'pickup' | 'local_delivery';
  pickupLocation?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  paymentMethod: 'cod' | 'bkash' | 'card';
  status: 'Confirmed' | 'Harvesting' | 'Out for Delivery' | 'Delivered';
}

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'farms'
  | 'about'
  | 'contact'
  | 'sitemap'
  | 'seo-hub'
  | 'cart'
  | 'checkout'
  | 'admin';
