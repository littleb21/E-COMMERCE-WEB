import { Language } from '../types';

export interface TranslationDictionary {
  tagline: string;
  searchPlaceholder: string;
  allCategories: string;
  nearbyInXMinutes: string;
  hotDeals: string;
  superCoins: string;
  cart: string;
  wishlist: string;
  account: string;
  nearbyStores: string;
  addToCart: string;
  buyNow: string;
  fastDelivery: string;
  reviews: string;
  filters: string;
  sortBy: string;
  proceedToCheckout: string;
  orderSummary: string;
  viewDetails: string;
  trackOrder: string;
  selectLocation: string;
  deliverTo: string;
  saveAddress: string;
  myOrders: string;
  rewards: string;
  customerService: string;
  liveChat: string;
  adminPortal: string;
  sellerPortal: string;
  customerStore: string;
  min: string;
  off: string;
  coinsEarned: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    tagline: 'Everything you need. Closer, faster, smarter.',
    searchPlaceholder: 'Search products, electronics, fresh groceries, nearby shops...',
    allCategories: 'All Categories',
    nearbyInXMinutes: 'Nearby in Minutes',
    hotDeals: 'Hot Deals & Flash Sales',
    superCoins: 'Super Coins',
    cart: 'Cart',
    wishlist: 'Wishlist',
    account: 'Account',
    nearbyStores: 'Nearby Local Stores',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    fastDelivery: 'Fast Delivery',
    reviews: 'Customer Reviews',
    filters: 'Filters',
    sortBy: 'Sort By',
    proceedToCheckout: 'Proceed to Checkout',
    orderSummary: 'Order Summary',
    viewDetails: 'View Details',
    trackOrder: 'Track Order',
    selectLocation: 'Select Delivery Location',
    deliverTo: 'Deliver to',
    saveAddress: 'Save Address',
    myOrders: 'My Orders',
    rewards: 'Rewards Hub',
    customerService: 'Help Center',
    liveChat: 'Live Support',
    adminPortal: 'Admin Console',
    sellerPortal: 'Shop Partner Portal',
    customerStore: 'Marketplace Store',
    min: 'min',
    off: 'OFF',
    coinsEarned: 'Super Coins',
  },
  hi: {
    tagline: 'आपकी हर ज़रूरत। और पास, और तेज़, और स्मार्ट।',
    searchPlaceholder: 'उत्पाद, इलेक्ट्रॉनिक्स, ताज़ा किराने का सामान, नजदीकी दुकानें खोजें...',
    allCategories: 'सभी श्रेणियां',
    nearbyInXMinutes: 'मिनटों में नजदीकी डिलीवरी',
    hotDeals: 'हॉट डील्स और फ्लैश सेल',
    superCoins: 'सुपर कॉइन्स',
    cart: 'कार्ट',
    wishlist: 'विशलिस्ट',
    account: 'खाता',
    nearbyStores: 'नजदीकी स्थानीय दुकानें',
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    fastDelivery: 'तेज़ डिलीवरी',
    reviews: 'ग्राहक समीक्षाएं',
    filters: 'फ़िल्टर',
    sortBy: 'क्रमबद्ध करें',
    proceedToCheckout: 'चेकआउट करें',
    orderSummary: 'ऑर्डर सारांश',
    viewDetails: 'विवरण देखें',
    trackOrder: 'ऑर्डर ट्रैक करें',
    selectLocation: 'डिलीवरी स्थान चुनें',
    deliverTo: 'डिलीवरी पता',
    saveAddress: 'पता सहेजें',
    myOrders: 'मेरे ऑर्डर्स',
    rewards: 'रिवार्ड्स हब',
    customerService: 'सहायता केंद्र',
    liveChat: 'लाइव चैट',
    adminPortal: 'एडमिन कंसोल',
    sellerPortal: 'दुकानदार पोर्टल',
    customerStore: 'मार्केटप्लेस स्टोर',
    min: 'मिनट',
    off: 'छूट',
    coinsEarned: 'सुपर कॉइन्स',
  },
  mr: {
    tagline: 'तुमच्या सर्व गरजा. जवळ, जलद आणि स्मार्ट.',
    searchPlaceholder: 'उत्पादने, इलेक्ट्रॉनिक्स, किराणा, जवळची दुकाने शोधा...',
    allCategories: 'सर्व श्रेणी',
    nearbyInXMinutes: 'काही मिनिटांत डिलिव्हरी',
    hotDeals: 'हॉट डील्स आणि सेल',
    superCoins: 'सुपर कॉइन्स',
    cart: 'कार्ट',
    wishlist: 'विशलिस्ट',
    account: 'खाते',
    nearbyStores: 'जवळची स्थानिक दुकाने',
    addToCart: 'कार्टमध्ये टाका',
    buyNow: 'आता खरेदी करा',
    fastDelivery: 'जलद डिलिव्हरी',
    reviews: 'ग्राहकांचे अभिप्राय',
    filters: 'फिल्टर',
    sortBy: 'क्रमवारी लावा',
    proceedToCheckout: 'चेकआऊट करा',
    orderSummary: 'ऑर्डर तपशील',
    viewDetails: 'तपशील पाहा',
    trackOrder: 'ऑर्डर ट्रॅक करा',
    selectLocation: 'डिलिव्हरी पत्ता निवडा',
    deliverTo: 'डिलिव्हरी पत्ता',
    saveAddress: 'पत्ता सेव्ह करा',
    myOrders: 'माझ्या ऑर्डर्स',
    rewards: 'रिवार्ड्स हब',
    customerService: 'मदत केंद्र',
    liveChat: 'लाईव्ह चॅट',
    adminPortal: 'अ‍ॅडमिन कन्सोल',
    sellerPortal: 'दुकानदार पोर्टल',
    customerStore: 'मार्केटप्लेस',
    min: 'मि',
    off: 'सूट',
    coinsEarned: 'सुपर कॉइन्स',
  },
  bn: {
    tagline: 'আপনার সব প্রয়োজন। কাছে, দ্রুত, আরও স্মার্ট।',
    searchPlaceholder: 'পণ্য, ইলেকট্রনিক্স, মুদি সামগ্রী, কাছের দোকান খুঁজুন...',
    allCategories: 'সমস্ত বিভাগ',
    nearbyInXMinutes: 'কয়েক মিনিটে ডেলিভারি',
    hotDeals: 'হট ডিল ও ফ্ল্যাশ সেল',
    superCoins: 'সুপার কয়েন',
    cart: 'কার্ট',
    wishlist: 'উইশলিস্ট',
    account: 'অ্যাকাউন্ট',
    nearbyStores: 'কাছের স্থানীয় দোকান',
    addToCart: 'কার্টে যোগ করুন',
    buyNow: 'এখনই কিনুন',
    fastDelivery: 'দ্রুত ডেলিভারি',
    reviews: 'গ্রাহক পর্যালোচনা',
    filters: 'ফিল্টার',
    sortBy: 'সাজান',
    proceedToCheckout: 'চেকআউট করুন',
    orderSummary: 'অর্ডারের সংক্ষিপ্ত বিবরণ',
    viewDetails: 'বিস্তারিত দেখুন',
    trackOrder: 'অর্ডার ট্র্যাক করুন',
    selectLocation: 'ডেলিভারির অবস্থান নির্বাচন করুন',
    deliverTo: 'ডেলিভারি ঠিকানা',
    saveAddress: 'ঠিকানা সংরক্ষণ করুন',
    myOrders: 'আমার অর্ডার',
    rewards: 'পুরস্কার হাব',
    customerService: 'সহায়তা কেন্দ্র',
    liveChat: 'লাইভ চ্যাট',
    adminPortal: 'অ্যাডমিন কনসোল',
    sellerPortal: 'বিক্রেতা পোর্টাল',
    customerStore: 'মার্কেটপ্লেস',
    min: 'মিনিট',
    off: 'ছাড়',
    coinsEarned: 'সুপার কয়েন',
  },
  ta: {
    tagline: 'உங்களுக்கு தேவையான அனைத்தும். அருகில், விரைவாக, புத்திசாலித்தனமாக.',
    searchPlaceholder: 'தயாரிப்புகள், மின்னணு சாதனங்கள், மளிகை பொருட்கள், அருகிலுள்ள கடைகளைத் தேடுங்கள்...',
    allCategories: 'அனைத்து பிரிவுகள்',
    nearbyInXMinutes: 'சில நிமிடங்களில் விநியோகம்',
    hotDeals: 'சிறப்பு சலுகைகள்',
    superCoins: 'சூப்பர் காயின்கள்',
    cart: 'கார்ட்',
    wishlist: 'விருப்பப்பட்டியல்',
    account: 'கணக்கு',
    nearbyStores: 'அருகிலுள்ள கடைகள்',
    addToCart: 'கார்ட்டில் சேர்',
    buyNow: 'இப்போதே வாங்கு',
    fastDelivery: 'வேகமான விநியோகம்',
    reviews: 'வாடிக்கையாளர் மதிப்பீடுகள்',
    filters: 'வடிகட்டிகள்',
    sortBy: 'வரிசைப்படுத்து',
    proceedToCheckout: 'பணம் செலுத்த தொடரவும்',
    orderSummary: 'ஆர்டர் சுருக்கம்',
    viewDetails: 'விவரங்களைப் பார்க்கவும்',
    trackOrder: 'ஆர்டரைக் கண்காணிக்கவும்',
    selectLocation: 'இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்',
    deliverTo: 'விநியோகிக்க வேண்டிய இடம்',
    saveAddress: 'முகவரியைச் சேமிக்கவும்',
    myOrders: 'என் ஆர்டர்கள்',
    rewards: 'வெகுமதி மையம்',
    customerService: 'உதவி மையம்',
    liveChat: 'நேரடி அரட்டை',
    adminPortal: 'நிர்வாக மையம்',
    sellerPortal: 'விற்பனையாளர் தளம்',
    customerStore: 'சந்தை தளம்',
    min: 'நிமி',
    off: 'தள்ளுபடி',
    coinsEarned: 'சூப்பர் காயின்கள்',
  }
};
