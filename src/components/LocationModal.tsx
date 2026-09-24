import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MapPin, 
  Navigation, 
  Check, 
  Search, 
  Building, 
  Home, 
  Zap, 
  Plane, 
  Truck, 
  Clock, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { Address } from '../types';
import { calculateDeliveryMetrics } from '../utils/deliveryCalculator';

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    currentAddress,
    setCurrentAddress,
    addresses,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'hyperlocal' | 'interstate'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const quickLocalities = [
    { 
      type: 'hyperlocal',
      category: 'under_5km',
      city: 'Bengaluru', 
      state: 'Karnataka',
      area: 'Indiranagar 100ft Road', 
      pincode: '560038', 
      distanceKm: 1.8,
      speed: '10–12 min',
      badge: '⚡ 10-12 MINS (<5 KM)',
      hub: 'Indiranagar Local Dark Store'
    },
    { 
      type: 'hyperlocal',
      category: 'under_5km',
      city: 'Bengaluru', 
      state: 'Karnataka',
      area: 'Koramangala 4th Block', 
      pincode: '560034', 
      distanceKm: 4.1,
      speed: '10–12 min',
      badge: '⚡ 10-12 MINS (<5 KM)',
      hub: 'Koramangala Micro Store'
    },
    { 
      type: 'hyperlocal',
      category: '5_to_10km',
      city: 'Bengaluru', 
      state: 'Karnataka',
      area: 'Whitefield Tech Corridor', 
      pincode: '560066', 
      distanceKm: 8.4,
      speed: '15–30 min',
      badge: '⚡ 15-30 MINS (5-10 KM)',
      hub: 'East Bengaluru Express Hub'
    },
    { 
      type: 'hyperlocal',
      category: '5_to_10km',
      city: 'Bengaluru', 
      state: 'Karnataka',
      area: 'Electronic City Phase 1', 
      pincode: '560100', 
      distanceKm: 9.6,
      speed: '15–30 min',
      badge: '⚡ 15-30 MINS (5-10 KM)',
      hub: 'South Metro Consolidation Hub'
    },
    { 
      type: 'interstate',
      category: 'interstate_24h',
      city: 'Raipur', 
      state: 'Chhattisgarh',
      area: 'VIP Road & Telibandha', 
      pincode: '492001', 
      distanceKm: 1240,
      speed: '24 Hours Express Air Cargo',
      badge: '✈️ 24 HOURS AIR CARGO',
      hub: 'Delhi Hub ➔ Raipur Cargo Terminal, CG'
    },
    { 
      type: 'interstate',
      category: 'interstate_24h',
      city: 'Bilaspur', 
      state: 'Chhattisgarh',
      area: 'Vyapar Vihar Commercial Hub', 
      pincode: '495001', 
      distanceKm: 1310,
      speed: '24 Hours Express Air Cargo',
      badge: '✈️ 24 HOURS AIR CARGO',
      hub: 'Delhi Hub ➔ Bilaspur Express Hub, CG'
    },
    { 
      type: 'interstate',
      category: 'interstate_24h',
      city: 'Bhilai / Durg', 
      state: 'Chhattisgarh',
      area: 'Civic Center & Nehru Nagar', 
      pincode: '490006', 
      distanceKm: 1260,
      speed: '24 Hours Express Air Cargo',
      badge: '✈️ 24 HOURS AIR CARGO',
      hub: 'Delhi Hub ➔ Durg/Bhilai Express Hub, CG'
    },
    { 
      type: 'hyperlocal',
      category: 'under_5km',
      city: 'New Delhi', 
      state: 'Delhi',
      area: 'Connaught Place Central', 
      pincode: '110001', 
      distanceKm: 3.2,
      speed: '10–15 min',
      badge: '⚡ 10-15 MINS (DELHI HUB)',
      hub: 'Delhi Central Distribution Hub'
    }
  ];

  const filteredLocalities = quickLocalities.filter(loc => {
    if (activeTab === 'hyperlocal' && loc.type !== 'hyperlocal') return false;
    if (activeTab === 'interstate' && loc.type !== 'interstate') return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      loc.city.toLowerCase().includes(q) ||
      loc.state.toLowerCase().includes(q) ||
      loc.area.toLowerCase().includes(q) ||
      loc.pincode.includes(q) ||
      loc.hub.toLowerCase().includes(q)
    );
  });

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setIsDetecting(false);
      const detectedAddr: Address = {
        id: 'addr-detected',
        type: 'Home',
        name: 'Amreshwar Maravi',
        phone: '+91 98765 43210',
        addressLine1: 'GPS Verified: 100ft Road, Near Metro Station',
        addressLine2: 'Indiranagar 1st Stage',
        landmark: 'Near Toit Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        isDefault: false,
        distanceKm: 1.6,
        speedTag: '⚡ 10-12 Mins Instant Delivery'
      };
      setCurrentAddress(detectedAddr);
      addToast('GPS Pinpointed 📍', 'Set to Indiranagar, Bengaluru — Instant 10-12 Min delivery active!', 'success');
      setIsLocationModalOpen(false);
    }, 1000);
  };

  const handleSelectLocality = (loc: typeof quickLocalities[0]) => {
    const isCG = loc.state.toLowerCase().includes('chhattisgarh');
    const newLocAddr: Address = {
      id: 'addr-loc-' + loc.pincode,
      type: 'Other',
      name: 'Amreshwar Maravi',
      phone: '+91 98765 43210',
      addressLine1: loc.area,
      addressLine2: `${loc.city}, ${loc.state}`,
      landmark: loc.area,
      city: loc.city,
      state: loc.state,
      pincode: loc.pincode,
      isDefault: false,
      distanceKm: loc.distanceKm,
      isInterstate: isCG,
      speedTag: loc.badge,
      hubRoute: loc.hub
    };
    setCurrentAddress(newLocAddr);
    addToast(
      isCG ? 'Interstate Air Route Selected ✈️' : 'Local Delivery Set ⚡',
      `Delivering to ${loc.area}, ${loc.city} (${loc.speed})`,
      'success'
    );
    setIsLocationModalOpen(false);
  };

  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase();
    const isCG = q.includes('chhattisgarh') || q.includes('raipur') || q.includes('bilaspur') || q.includes('bhilai') || q.includes('durg') || q.startsWith('492') || q.startsWith('495');

    const customAddr: Address = {
      id: 'addr-custom-' + Date.now(),
      type: 'Other',
      name: 'Amreshwar Maravi',
      phone: '+91 98765 43210',
      addressLine1: searchQuery,
      addressLine2: isCG ? 'Chhattisgarh Destination Hub' : 'Custom Delivery Hub',
      landmark: searchQuery,
      city: isCG ? (q.includes('bilaspur') ? 'Bilaspur' : 'Raipur') : 'Bengaluru',
      state: isCG ? 'Chhattisgarh' : 'Karnataka',
      pincode: isCG ? (q.includes('bilaspur') ? '495001' : '492001') : '560038',
      isDefault: false,
      isInterstate: isCG,
      distanceKm: isCG ? 1240 : 2.5
    };

    setCurrentAddress(customAddr);
    addToast(
      isCG ? 'Delhi ➔ Chhattisgarh Air Express ✈️' : 'Delivery Address Set ⚡',
      `Configured destination: ${searchQuery}`,
      'success'
    );
    setIsLocationModalOpen(false);
  };

  const metrics = calculateDeliveryMetrics(currentAddress);

  return (
    <div className="modal-overlay" onClick={() => setIsLocationModalOpen(false)}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: '1.75rem',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Select Delivery Address & Parcel Route
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              ⚡ 10–12 min local orders (&lt;5km) • ⚡ 15–30 min (5–10km) • ✈️ 24h Express Air Cargo (Delhi to Chhattisgarh)
            </p>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            style={{ padding: '0.4rem', borderRadius: '50%', color: 'var(--text-sub)', cursor: 'pointer', background: 'var(--bg-surface-elevated)', border: 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Active Location Banner */}
        <div style={{
          background: metrics.isInterstate ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)' : 'rgba(16, 185, 129, 0.1)',
          border: `1.5px solid ${metrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)'}`,
          borderRadius: '1rem',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: metrics.isInterstate ? 'rgba(99, 102, 241, 0.25)' : 'rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: metrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)',
              flexShrink: 0
            }}>
              {metrics.isInterstate ? <Plane size={22} /> : <Zap size={22} />}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: metrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)' }}>
                CURRENT ACTIVE ROUTE: {metrics.speedBadge}
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                {currentAddress.landmark || currentAddress.addressLine1}, {currentAddress.city} ({currentAddress.pincode})
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.15rem' }}>
                Transit: {metrics.fullRoute}
              </div>
            </div>
          </div>
          <span className="badge badge-emerald" style={{ whiteSpace: 'nowrap', fontSize: '0.7rem' }}>
            Active
          </span>
        </div>

        {/* GPS Auto-detect button */}
        <button
          onClick={handleDetectLocation}
          className="btn btn-emerald"
          style={{ width: '100%', borderRadius: '0.85rem', padding: '0.85rem', marginBottom: '1.25rem' }}
          disabled={isDetecting}
        >
          <Navigation size={18} className={isDetecting ? 'radar-ping' : ''} />
          <span>{isDetecting ? 'Pinpointing Coordinates via GPS...' : 'Auto-Detect Nearby Location (⚡ 10-12 Mins)'}</span>
        </button>

        {/* Pincode & City Search Form */}
        <form onSubmit={handleCustomSearchSubmit} style={{ marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.85rem',
            padding: '0.4rem 0.85rem',
            gap: '0.5rem'
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search pincode or city (e.g. 492001, Raipur, Chhattisgarh, 560038)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', fontSize: '0.85rem', color: 'var(--text-main)', outline: 'none' }}
            />
            {searchQuery && (
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '0.5rem', padding: '0.3rem 0.75rem' }}
              >
                Set
              </button>
            )}
          </div>
        </form>

        {/* Filter Tabs for Locality Tiers */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem'
        }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'all' ? 'var(--brand-primary)' : 'var(--bg-surface-elevated)',
              color: activeTab === 'all' ? '#ffffff' : 'var(--text-sub)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            All Destinations
          </button>
          <button
            onClick={() => setActiveTab('hyperlocal')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'hyperlocal' ? 'var(--brand-emerald)' : 'var(--bg-surface-elevated)',
              color: activeTab === 'hyperlocal' ? '#ffffff' : 'var(--text-sub)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Zap size={13} />
            <span>Hyperlocal (10–12m & 15–30m)</span>
          </button>
          <button
            onClick={() => setActiveTab('interstate')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'interstate' ? 'var(--brand-indigo)' : 'var(--bg-surface-elevated)',
              color: activeTab === 'interstate' ? '#ffffff' : 'var(--text-sub)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Plane size={13} />
            <span>Delhi ➔ Chhattisgarh (24h Air)</span>
          </button>
        </div>

        {/* Saved Addresses */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            YOUR SAVED DELIVERY ADDRESSES
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {addresses.map(addr => {
              const isSelected = currentAddress.id === addr.id;
              const addrMetrics = calculateDeliveryMetrics(addr);

              return (
                <div
                  key={addr.id}
                  onClick={() => {
                    setCurrentAddress(addr);
                    addToast('Address Updated', `Delivering to ${addr.landmark || addr.addressLine1}, ${addr.city} (${addrMetrics.speedBadge})`, 'success');
                    setIsLocationModalOpen(false);
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '0.85rem',
                    background: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-surface-elevated)',
                    border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: addrMetrics.isInterstate ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: addrMetrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)',
                      flexShrink: 0
                    }}>
                      {addrMetrics.isInterstate ? <Plane size={18} /> : addr.type === 'Home' ? <Home size={18} /> : <Building size={18} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>{addr.name}</span>
                        <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{addr.type}</span>
                        {addrMetrics.isInterstate && (
                          <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                            ✈️ 24h Air Express
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                        {addr.landmark || addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: addrMetrics.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)', fontWeight: 700, marginTop: '0.15rem' }}>
                        Speed: {addrMetrics.speedBadge} • {addrMetrics.shortEta}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check size={18} color="var(--brand-primary)" style={{ flexShrink: 0 }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Route Localities Grid */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            POPULAR HUBS & SPEED TIERS
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
            {filteredLocalities.map(loc => (
              <div
                key={loc.pincode + loc.area}
                onClick={() => handleSelectLocality(loc)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.85rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                className="hover-lift"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.825rem', color: 'var(--text-main)' }}>
                    {loc.city} ({loc.pincode})
                  </span>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: loc.type === 'interstate' ? 'var(--brand-primary)' : 'var(--brand-emerald)',
                    background: loc.type === 'interstate' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px'
                  }}>
                    {loc.badge}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>
                  {loc.area}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  📍 {loc.hub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
