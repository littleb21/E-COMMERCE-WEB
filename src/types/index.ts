export type PortalMode = 'customer' | 'seller' | 'admin';

export type Language = 'en' | 'hi' | 'mr' | 'bn' | 'ta';

export type Theme = 'dark' | 'light';

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  itemCount: number;
  subcategories: string[];
  bannerImage: string;
  accentColor: string;
}

export interface ProductVariant {
  id: string;
  type: 'color' | 'size' | 'storage';
  label: string;
  value: string;
  priceDelta: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  photos?: string[];
  verifiedPurchase: boolean;
  helpfulVotes: number;
}

export interface NearbyShop {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  etaMinutes: number;
  isOpen: boolean;
  minOrder: number;
  deliveryFee: number;
  address: string;
  phone: string;
  logo: string;
  banner: string;
  inStockProductsCount: number;
  deliveryRadiusKm: number;
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  title: string;
  name?: string;
  brand: string;
  categoryId: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  whatsIncluded: string[];
  warranty: string;
  returnPolicy: string;
  inStock: boolean;
  stockCount: number;
  superCoinsReward: number;
  deliveryEstimateMinutes: number;
  isNearbyAvailable: boolean;
  nearbyShopId?: string;
  tags: string[];
  variants?: {
    colors?: ProductVariant[];
    sizes?: ProductVariant[];
    storage?: ProductVariant[];
  };
  reviews: Review[];
  isHotDeal?: boolean;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  specSections?: {
    category: string;
    details: { name: string; value: string }[];
  }[];
  bankOffers?: string[];
  emiStartsAt?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedStorage?: string;
  unitPrice: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  instructions?: string;
  distanceKm?: number;
  speedTag?: string;
  isInterstate?: boolean;
  hubRoute?: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

export type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'packed' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface RiderInfo {
  name: string;
  phone: string;
  photo: string;
  vehicle: string;
  vehicleNumber: string;
  rating: number;
  etaMinutes: number;
  currentLocationName: string;
  lat: number;
  lng: number;
}

export interface ParcelCheckpoint {
  name: string;
  location: string;
  status: 'completed' | 'in_transit' | 'pending';
  time: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  coinsUsed: number;
  deliveryFee: number;
  tax: number;
  total: number;
  address: Address;
  deliveryOption: 'instant' | 'express' | 'standard';
  deliveryEta: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'paylater';
  status: OrderStatus;
  riderInfo?: RiderInfo;
  trackingUpdates: { time: string; text: string; status: OrderStatus }[];
  isInterstate?: boolean;
  originHub?: string;
  destinationHub?: string;
  transitSpeed?: string;
  flightOrVehicleNumber?: string;
  airwayBillNumber?: string;
  parcelCheckpoints?: ParcelCheckpoint[];
}

export interface SuperCoinTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed';
  amount: number;
  reason: string;
  orderId?: string;
}

export interface RewardVoucher {
  id: string;
  title: string;
  description: string;
  coinsCost: number;
  discountValue: number;
  code: string;
  expiryDate: string;
  category: string;
  unlocked: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
  superCoins: number;
  streakDays: number;
  lastCheckInDate?: string;
}

export interface FilterState {
  category: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  nearbyOnly: boolean;
  maxDeliveryTime: number; // in mins
  brand: string[];
  inStockOnly: boolean;
  sortBy: 'relevance' | 'popularity' | 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'discount' | 'delivery_speed';
  searchQuery: string;
  viewMode: 'grid' | 'list';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}
