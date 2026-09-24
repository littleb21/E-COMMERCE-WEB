import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Address, 
  Coupon, 
  Order, 
  OrderStatus, 
  UserProfile, 
  FilterState, 
  PortalMode, 
  Language, 
  Theme, 
  ToastMessage, 
  NearbyShop 
} from '../types';
import { 
  products as initialProducts, 
  nearbyShops as initialNearbyShops, 
  sampleAddresses, 
  sampleCoupons, 
  initialOrders, 
  sampleUser 
} from '../data/mockData';
import confetti from 'canvas-confetti';
import { calculateDeliveryMetrics, DeliverySpeedMetrics } from '../utils/deliveryCalculator';

interface StoreContextType {
  // App navigation & mode
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  
  // Theme & Language
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Products & Catalogs
  productsList: Product[];
  nearbyShopsList: NearbyShop[];
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  updateProductInList: (product: Product) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string, selectedStorage?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartCouponDiscount: number;
  cartDeliveryFee: number;
  cartTax: number;
  cartTotal: number;

  // Coupons & Super Coins
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  coinsToRedeem: number;
  setCoinsToRedeem: (coins: number) => void;
  claimDailyStreak: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  moveToCartFromWishlist: (productId: string) => void;

  // Location & Addresses
  currentAddress: Address;
  addresses: Address[];
  setCurrentAddress: (addr: Address) => void;
  addNewAddress: (addr: Omit<Address, 'id'>) => void;
  currentDeliveryMetrics: DeliverySpeedMetrics;
  getDeliveryMetricsForAddress: (addr: Address) => DeliverySpeedMetrics;

  // Orders & Tracking
  orders: Order[];
  activeTrackingOrder: Order | null;
  openOrderTracking: (order: Order) => void;
  closeOrderTracking: () => void;
  placeOrder: (deliveryOption: 'instant' | 'express' | 'standard', paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'paylater') => Order;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // User Profile
  user: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Search & Filter State
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Modals & Drawers state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isVoiceSearchModalOpen: boolean;
  setIsVoiceSearchModalOpen: (open: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;

  // Notifications / Toast
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const defaultFilterState: FilterState = {
  category: 'all',
  subcategory: 'all',
  minPrice: 0,
  maxPrice: 150000,
  minRating: 0,
  minDiscount: 0,
  nearbyOnly: false,
  maxDeliveryTime: 60,
  brand: [],
  inStockOnly: false,
  sortBy: 'relevance',
  searchQuery: '',
  viewMode: 'grid'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portalMode, setPortalMode] = useState<PortalMode>('customer');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Theme & Language
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');

  // Catalogs
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [nearbyShopsList, setNearbyShopsList] = useState<NearbyShop[]>(initialNearbyShops);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // User & Address
  const [user, setUser] = useState<UserProfile>(sampleUser);
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [currentAddress, setCurrentAddress] = useState<Address>(sampleAddresses[0]);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Discounts
  const [coupons] = useState<Coupon[]>(sampleCoupons);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [coinsToRedeem, setCoinsToRedeem] = useState<number>(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isVoiceSearchModalOpen, setIsVoiceSearchModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Filter
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply Theme to document root
  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type, duration: 4000 }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openProductDetail = (prod: Product) => {
    setSelectedProduct(prod);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const updateProductInList = (updated: Product) => {
    setProductsList(prev => prev.map(p => p.id === updated.id ? updated : p));
    addToast('Product Updated', `Saved changes for "${updated.title}"`, 'info');
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string, selectedStorage?: string) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize &&
        item.selectedStorage === selectedStorage
      );
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [
        ...prev,
        {
          id: 'ci-' + Math.random().toString(36).substring(2, 9),
          product,
          quantity,
          selectedColor,
          selectedSize,
          selectedStorage,
          unitPrice: product.price
        }
      ];
    });
    addToast('Added to Cart', `${product.title.slice(0, 30)}... added to your bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Removed from Cart', 'Item removed', 'info');
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: qty } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', 'Product removed from your saved items', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to Wishlist', 'Product added to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const moveToCartFromWishlist = (productId: string) => {
    const prod = productsList.find(p => p.id === productId);
    if (prod) {
      addToCart(prod, 1);
      toggleWishlist(productId);
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartDiscount = cart.reduce((sum, item) => {
    const originalPrice = item.product.originalPrice || item.unitPrice;
    return sum + (originalPrice - item.unitPrice) * item.quantity;
  }, 0);

  const cartCouponDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percent'
      ? Math.min((cartSubtotal * appliedCoupon.discountValue) / 100, appliedCoupon.maxDiscount || 99999)
      : appliedCoupon.discountValue
    : 0;

  const cartDeliveryFee = cartSubtotal > 499 || appliedCoupon?.code === 'FREEDELIVERY' || cart.length === 0 ? 0 : 49;
  const cartTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartTotal = Math.max(0, cartSubtotal - cartCouponDiscount - coinsToRedeem + cartDeliveryFee + cartTax);

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      addToast('Invalid Coupon', 'The promo code entered does not exist.', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrderValue) {
      addToast('Coupon Requirement', `Minimum order value for this coupon is ₹${found.minOrderValue}.`, 'warning');
      return false;
    }
    setAppliedCoupon(found);
    addToast('Coupon Applied!', `Saved with ${found.code}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Coupon discount cleared.', 'info');
  };

  const claimDailyStreak = () => {
    const rewardCoins = 25;
    setUser(prev => ({
      ...prev,
      superCoins: prev.superCoins + rewardCoins,
      streakDays: prev.streakDays + 1,
      lastCheckInDate: new Date().toISOString().split('T')[0]
    }));
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
    addToast('Daily Streak Claimed! 🔥', `Earned +${rewardCoins} Super Coins!`, 'success');
  };

  const addNewAddress = (addr: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addr,
      id: 'addr-' + Math.random().toString(36).substring(2, 9)
    };
    setAddresses(prev => [...prev, newAddress]);
    setCurrentAddress(newAddress);
    addToast('Address Added', 'New delivery address saved', 'success');
  };

  const currentDeliveryMetrics = calculateDeliveryMetrics(currentAddress);
  const getDeliveryMetricsForAddress = (addr: Address) => calculateDeliveryMetrics(addr);

  const placeOrder = (
    deliveryOption: 'instant' | 'express' | 'standard',
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'paylater'
  ) => {
    const metrics = calculateDeliveryMetrics(currentAddress);
    const orderId = 'FS-' + Math.floor(10000 + Math.random() * 90000);
    const earnedCoins = Math.round(cartSubtotal * 0.02); // 2% coins back

    let initialDeliveryEta = metrics.timeEstimate;
    if (metrics.isInterstate) {
      initialDeliveryEta = 'Guaranteed 24-Hour Express Air Cargo Delivery (Delhi ➔ Chhattisgarh)';
    } else if (metrics.tier === 'hyperlocal_10m') {
      initialDeliveryEta = deliveryOption === 'instant' ? 'Arriving in 10-12 mins' : 'Today within 1 hour';
    } else if (metrics.tier === 'hyperlocal_30m') {
      initialDeliveryEta = 'Arriving in 15-30 mins (Local Hub Express)';
    }

    const newOrder: Order = {
      id: orderId,
      date: 'Just now',
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponDiscount: cartCouponDiscount,
      coinsUsed: coinsToRedeem,
      deliveryFee: cartDeliveryFee,
      tax: cartTax,
      total: cartTotal,
      address: currentAddress,
      deliveryOption,
      deliveryEta: initialDeliveryEta,
      paymentMethod,
      status: 'confirmed',
      isInterstate: metrics.isInterstate,
      originHub: metrics.originHub,
      destinationHub: metrics.destinationHub,
      transitSpeed: `${metrics.transitSpeedKmh} km/h (${metrics.courierType})`,
      flightOrVehicleNumber: metrics.isInterstate ? 'FS-CARGO 902 (Boeing 737 P2F)' : 'KA 03 EV 4821',
      airwayBillNumber: metrics.isInterstate ? `AWB-DEL-${(currentAddress.city || 'CG').substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
      parcelCheckpoints: metrics.checkpoints,
      riderInfo: metrics.sampleRider || {
        name: 'Sunil Verma',
        phone: '+91 98111 23456',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        vehicle: 'Ather 450X EV Scooter',
        vehicleNumber: 'KA 01 EK 9081',
        rating: 4.95,
        etaMinutes: 12,
        currentLocationName: `${currentAddress.landmark || currentAddress.city} Fast Corridor`,
        lat: 12.9720,
        lng: 77.6405
      },
      trackingUpdates: metrics.isInterstate ? [
        { time: 'Just now', text: `Order confirmed via ${paymentMethod.toUpperCase()} (Delhi Central Mega Fulfillment Hub)`, status: 'confirmed' },
        { time: 'In progress', text: `Consolidating in Air Cargo Container for flight to ${currentAddress.city}, Chhattisgarh (24-Hour Guarantee)`, status: 'packed' }
      ] : [
        { time: 'Just now', text: `Order confirmed via ${paymentMethod.toUpperCase()}`, status: 'confirmed' },
        { time: 'In progress', text: 'Store is preparing your items', status: 'packed' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);

    // Update user coins
    setUser(prev => ({
      ...prev,
      superCoins: Math.max(0, prev.superCoins - coinsToRedeem + earnedCoins)
    }));

    clearCart();
    setAppliedCoupon(null);
    setCoinsToRedeem(0);
    setIsCheckoutModalOpen(false);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // safe
    }

    addToast('Order Placed Successfully! 🎉', `Order #${orderId} is being prepared. Earned +${earnedCoins} Super Coins!`, 'success');
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
    }
    addToast('Order Cancelled', `Order #${orderId} has been cancelled.`, 'warning');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder(prev => prev ? { ...prev, status } : null);
    }
    addToast('Order Status Updated', `Order #${orderId} marked as ${status.replace('_', ' ')}`, 'info');
  };

  const openOrderTracking = (order: Order) => {
    setActiveTrackingOrder(order);
  };

  const closeOrderTracking = () => {
    setActiveTrackingOrder(null);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }));
    addToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const resetFilters = () => {
    setFilterState(defaultFilterState);
  };

  return (
    <StoreContext.Provider
      value={{
        portalMode,
        setPortalMode,
        activeTab,
        setActiveTab,
        selectedCategoryId,
        setSelectedCategoryId,
        theme,
        toggleTheme,
        language,
        setLanguage,
        productsList,
        nearbyShopsList,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        updateProductInList,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartCouponDiscount,
        cartDeliveryFee,
        cartTax,
        cartTotal,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coinsToRedeem,
        setCoinsToRedeem,
        claimDailyStreak,
        wishlist,
        toggleWishlist,
        moveToCartFromWishlist,
        currentAddress,
        addresses,
        setCurrentAddress,
        addNewAddress,
        currentDeliveryMetrics,
        getDeliveryMetricsForAddress,
        orders,
        activeTrackingOrder,
        openOrderTracking,
        closeOrderTracking,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
        user,
        updateUserProfile,
        filterState,
        setFilterState,
        resetFilters,
        isCartOpen,
        setIsCartOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isVoiceSearchModalOpen,
        setIsVoiceSearchModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
