import { Address, Order, ParcelCheckpoint, RiderInfo } from '../types';

export interface DeliverySpeedMetrics {
  tier: 'hyperlocal_10m' | 'hyperlocal_30m' | 'interstate_24h' | 'city_standard';
  timeEstimate: string; // e.g., '10 - 12 Mins' or '24 Hours Guaranteed'
  speedBadge: string; // e.g., '⚡ 10-12 MINS' or '✈️ 24 HOURS EXPRESS'
  shortEta: string; // '10-12 Mins' / '24 Hours'
  fullRoute: string; // 'Delhi Central Air Cargo Hub ➔ Raipur Airport Cargo Terminal, Chhattisgarh'
  originHub: string; // 'Delhi Central Air Logistics Terminal (DEL)'
  destinationHub: string; // 'Raipur Swami Vivekananda Air Terminal, Chhattisgarh (RPR)'
  courierType: string; // 'Electric 2-Wheeler Instant Rider' | 'Local Express Van' | 'Boeing 737 Express Air Cargo'
  distanceKm: number;
  isInterstate: boolean;
  transitSpeedKmh: number;
  transportIcon: 'zap' | 'truck' | 'plane';
  guaranteeNote: string;
  checkpoints: ParcelCheckpoint[];
  sampleRider?: RiderInfo;
}

export function calculateDeliveryMetrics(address: Address): DeliverySpeedMetrics {
  const city = (address.city || '').toLowerCase();
  const state = (address.state || '').toLowerCase();
  const pincode = address.pincode || '';

  // Check if destination is Chhattisgarh (Raipur, Bilaspur, Bhilai, Durg, etc.)
  const isChhattisgarh = 
    state.includes('chhattisgarh') || 
    city.includes('raipur') || 
    city.includes('bilaspur') || 
    city.includes('bhilai') || 
    city.includes('durg') || 
    pincode.startsWith('492') || 
    pincode.startsWith('495') || 
    pincode.startsWith('490') || 
    pincode.startsWith('491') || 
    pincode.startsWith('493') || 
    pincode.startsWith('494');

  // Check if destination is Delhi or from Delhi
  const isDelhi = city.includes('delhi') || state.includes('delhi') || pincode.startsWith('110');

  // Check distance if specified or calculate based on locality
  const explicitDistance = address.distanceKm;

  if (isChhattisgarh) {
    // Interstate Express Air Cargo route: Delhi to Chhattisgarh (Raipur / Bilaspur)
    const destCity = city.includes('bilaspur') ? 'Bilaspur' : 'Raipur';
    return {
      tier: 'interstate_24h',
      timeEstimate: 'Guaranteed 24 Hours Express Air Cargo',
      speedBadge: '✈️ 24 HOURS EXPRESS AIR CARGO',
      shortEta: '24 Hours',
      fullRoute: `Delhi Central Air Logistics Hub (DEL) ➔ Nagpur Cargo Transit ➔ ${destCity} Air Hub, Chhattisgarh`,
      originHub: 'Delhi Central Air Cargo Terminal (DEL)',
      destinationHub: `${destCity} Air Logistics Hub, Chhattisgarh`,
      courierType: 'Flowstate Express Air Cargo Flight (Boeing 737 P2F) + Express EV Van',
      distanceKm: explicitDistance || 1240,
      isInterstate: true,
      transitSpeedKmh: 740,
      transportIcon: 'plane',
      guaranteeNote: 'No Delay Guarantee: Flown via dedicated air cargo express directly from Delhi to Chhattisgarh within 24 hours.',
      checkpoints: [
        {
          name: 'Package Cleared & Scanned',
          location: 'Delhi Central Fulfillment Hub, IGI Airport Cargo Complex (DEL)',
          status: 'completed',
          time: '10:00 AM'
        },
        {
          name: 'Loaded on Air Cargo Flight',
          location: 'Flight FS-CARGO 902 (Delhi ➔ Raipur, Chhattisgarh)',
          status: 'in_transit',
          time: '02:30 PM'
        },
        {
          name: 'Airport Cargo Terminal Clearance',
          location: `${destCity} Swami Vivekananda Airport Cargo Terminal`,
          status: 'pending',
          time: '08:00 PM'
        },
        {
          name: 'Local Distribution Hub Sorting',
          location: `Flowstate ${destCity} Hub, Chhattisgarh`,
          status: 'pending',
          time: '04:00 AM Tomorrow'
        },
        {
          name: 'Out for Doorstep Handover',
          location: `${address.landmark || address.addressLine1}, ${destCity}`,
          status: 'pending',
          time: 'Within 24 Hours Guaranteed'
        }
      ]
    };
  }

  // Check under 5 km (Hyperlocal instant rider: 10-12 min)
  const isUnder5Km = 
    (explicitDistance !== undefined && explicitDistance <= 5) ||
    pincode === '560038' || // Indiranagar
    pincode === '560034' || // Koramangala
    pincode === '560008' || // Ulsoor
    city.includes('indiranagar') ||
    address.addressLine1.toLowerCase().includes('indiranagar') ||
    address.addressLine2.toLowerCase().includes('indiranagar');

  if (isUnder5Km) {
    return {
      tier: 'hyperlocal_10m',
      timeEstimate: '10 - 12 Minutes Instant Delivery',
      speedBadge: '⚡ 10-12 MINS INSTANT',
      shortEta: '10-12 Mins',
      fullRoute: `Local Micro-Store (${address.city}) ➔ GPS Direct ➔ Your Doorstep`,
      originHub: 'Certified Local Micro-Fulfillment Store',
      destinationHub: address.addressLine1 || 'Your Address',
      courierType: 'Electric Vida 2-Wheeler Instant Courier',
      distanceKm: explicitDistance || 1.8,
      isInterstate: false,
      transitSpeedKmh: 32,
      transportIcon: 'zap',
      guaranteeNote: 'Hyperlocal 10-12 Min Guarantee: Packed in 2 minutes, dispatched instantly with live electric scooter GPS telemetry.',
      checkpoints: [
        {
          name: 'Order Placed & Verified',
          location: 'Flowstate Digital Checkout',
          status: 'completed',
          time: 'Just now'
        },
        {
          name: 'Packed & Barcode Scanned',
          location: 'Neighborhood Micro-Store',
          status: 'completed',
          time: '1 min ago'
        },
        {
          name: 'Dispatched on Electric Scooter',
          location: 'Rider Ramesh Kumar picked up package',
          status: 'in_transit',
          time: 'In transit'
        },
        {
          name: 'Delivered to Doorstep',
          location: address.addressLine1,
          status: 'pending',
          time: 'Arriving in 10-12 Mins'
        }
      ],
      sampleRider: {
        name: 'Ramesh Kumar',
        phone: '+91 98450 12345',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        vehicle: 'Electric Hero Vida Scooter',
        vehicleNumber: 'KA 03 EV 4821',
        rating: 4.9,
        etaMinutes: 11,
        currentLocationName: `${address.landmark || address.city} Main Road Signal`,
        lat: 12.9735,
        lng: 77.6420
      }
    };
  }

  // Check 5 to 10 km (Local Hub Express: 15-30 min)
  const is5to10Km = 
    (explicitDistance !== undefined && explicitDistance > 5 && explicitDistance <= 10) ||
    pincode === '560066' || // Whitefield
    pincode === '560100' || // Electronic City
    pincode === '560037' || // Marathahalli
    pincode === '560102' || // HSR
    address.addressLine1.toLowerCase().includes('whitefield') ||
    address.addressLine2.toLowerCase().includes('whitefield') ||
    address.addressLine1.toLowerCase().includes('electronic');

  if (is5to10Km) {
    return {
      tier: 'hyperlocal_30m',
      timeEstimate: '15 - 30 Minutes Express Delivery',
      speedBadge: '⚡ 15-30 MINS EXPRESS',
      shortEta: '15-30 Mins',
      fullRoute: `Regional City Hub ➔ Express Green Corridor ➔ ${address.city}`,
      originHub: 'East City Rapid Consolidation Hub',
      destinationHub: address.addressLine1 || 'Your Address',
      courierType: 'Flowstate Express Electric Rapid Cargo Courier',
      distanceKm: explicitDistance || 7.8,
      isInterstate: false,
      transitSpeedKmh: 45,
      transportIcon: 'zap',
      guaranteeNote: 'Express 15-30 Min Guarantee: Under 10km direct transit without transit hub delays.',
      checkpoints: [
        {
          name: 'Order Placed & Routed',
          location: 'Flowstate High-Speed Routing Engine',
          status: 'completed',
          time: 'Just now'
        },
        {
          name: 'Dispatched from Hub',
          location: 'Regional City Rapid Hub',
          status: 'in_transit',
          time: '3 mins ago'
        },
        {
          name: 'On Express Green Corridor',
          location: 'Main Arterial Flyover',
          status: 'in_transit',
          time: 'In transit'
        },
        {
          name: 'Delivered to Doorstep',
          location: address.addressLine1,
          status: 'pending',
          time: 'Arriving in 15-30 Mins'
        }
      ],
      sampleRider: {
        name: 'Vikas Sharma',
        phone: '+91 98110 56789',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        vehicle: 'Ather 450X Gen 3',
        vehicleNumber: 'KA 01 EK 9102',
        rating: 4.8,
        etaMinutes: 22,
        currentLocationName: 'Ring Road Junction',
        lat: 12.9600,
        lng: 77.6500
      }
    };
  }

  // Default City / Standard Transit (10-35km)
  return {
    tier: 'city_standard',
    timeEstimate: '45 - 60 Minutes Rapid Transit',
    speedBadge: '🚀 45-60 MINS RAPID',
    shortEta: '45-60 Mins',
    fullRoute: `Metro Hub ➔ City Van Transit ➔ ${address.city}`,
    originHub: 'Central Metro Fulfillment Center',
    destinationHub: address.addressLine1 || 'Your Address',
    courierType: 'Flowstate City Express Courier',
    distanceKm: explicitDistance || 18.5,
    isInterstate: false,
    transitSpeedKmh: 40,
    transportIcon: 'truck',
    guaranteeNote: 'Rapid City Delivery: Same-day delivery with real-time transit telemetry.',
    checkpoints: [
      {
        name: 'Order Placed',
        location: 'Flowstate Central Portal',
        status: 'completed',
        time: 'Just now'
      },
      {
        name: 'Sorting & Packaging',
        location: 'Central Metro Hub',
        status: 'in_transit',
        time: '5 mins ago'
      },
      {
        name: 'Dispatched in Express Delivery Van',
        location: 'Metro City Van #48',
        status: 'pending',
        time: 'In transit'
      },
      {
        name: 'Doorstep Handover',
        location: address.addressLine1,
        status: 'pending',
        time: 'Arriving within 45-60 mins'
      }
    ]
  };
}
