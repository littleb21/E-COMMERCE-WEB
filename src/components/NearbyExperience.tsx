import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Zap, 
  MapPin, 
  Navigation, 
  Store, 
  Star, 
  Clock, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  Filter
} from 'lucide-react';
import { NearbyShop } from '../types';

export const NearbyExperience: React.FC = () => {
  const { 
    nearbyShopsList, 
    currentAddress, 
    setIsLocationModalOpen,
    setActiveTab,
    setFilterState,
    productsList,
    openProductDetail
  } = useStore();

  const [selectedEtaFilter, setSelectedEtaFilter] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeShopPin, setActiveShopPin] = useState<NearbyShop | null>(nearbyShopsList[0]);

  // Filter nearby shops
  const filteredShops = nearbyShopsList.filter(shop => {
    if (selectedEtaFilter !== 'all' && shop.etaMinutes > selectedEtaFilter) return false;
    if (selectedCategory !== 'all' && !shop.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
    return true;
  });

  // Nearby instant products (products with isNearbyAvailable = true)
  const nearbyProducts = productsList.filter(p => p.isNearbyAvailable).slice(0, 4);

  return (
    <section style={{ padding: '2.5rem 0', background: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-emerald">
                <Zap size={12} /> HYPERLOCAL NETWORK
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Within {currentAddress.city} Delivery Zone
              </span>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              FLOWSTATE NEARBY — In Your Neighborhood
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-sub)' }}>
              Order genuine electronics, fresh food, or essentials and have them delivered in 8 to 20 minutes.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <MapPin size={15} color="var(--brand-emerald)" />
              <span>Change Address ({currentAddress.type})</span>
            </button>
          </div>
        </div>

        {/* Filter Pills for ETA & Category */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          background: 'var(--bg-app)',
          padding: '0.85rem 1.25rem',
          borderRadius: '1.25rem',
          border: '1px solid var(--border-subtle)'
        }}>
          {/* Speed Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
              SPEED:
            </span>

            {[
              { label: 'All Nearby', value: 'all' as const },
              { label: '⚡ Under 10 min', value: 10 },
              { label: '⚡ Under 15 min', value: 15 },
              { label: '⚡ Under 20 min', value: 20 }
            ].map(item => (
              <button
                key={String(item.value)}
                onClick={() => setSelectedEtaFilter(item.value)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: selectedEtaFilter === item.value ? 700 : 500,
                  color: selectedEtaFilter === item.value ? '#ffffff' : 'var(--text-sub)',
                  background: selectedEtaFilter === item.value ? 'var(--brand-emerald)' : 'var(--bg-surface)',
                  border: '1px solid',
                  borderColor: selectedEtaFilter === item.value ? 'var(--brand-emerald)' : 'var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Category Quick Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              STORE TYPE:
            </span>
            {['All', 'Grocery', 'Electronics', 'Beauty', 'Sports'].map(cat => {
              const catKey = cat === 'All' ? 'all' : cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(catKey)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: selectedCategory === catKey ? 700 : 500,
                    color: selectedCategory === catKey ? 'var(--brand-primary)' : 'var(--text-sub)',
                    background: selectedCategory === catKey ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    border: '1px solid',
                    borderColor: selectedCategory === catKey ? 'var(--brand-primary)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hyperlocal Grid: Left Interactive SVG Radar Map, Right Store Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Radar Map Visualizer */}
          <div style={{
            background: 'var(--bg-app)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-highlight)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: '80px'
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Navigation size={16} color="var(--brand-emerald)" />
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Live Delivery Radar</span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                {filteredShops.length} Stores In Range
              </span>
            </div>

            {/* Interactive SVG Radar Map */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              background: 'radial-gradient(circle at center, #0f172a 0%, #030712 100%)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Radar Grid Circles */}
              <div style={{ position: 'absolute', width: '260px', height: '260px', borderRadius: '50%', border: '1px dashed rgba(16, 185, 129, 0.2)' }} />
              <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(16, 185, 129, 0.25)' }} />
              <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(16, 185, 129, 0.35)' }} />

              {/* Radar Sweep Effect */}
              <div style={{
                position: 'absolute',
                width: '130px',
                height: '130px',
                top: '50%',
                left: '50%',
                transformOrigin: 'top left',
                background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.3) 0deg, transparent 60deg)',
                animation: 'radarSpin 4s linear infinite',
                pointerEvents: 'none'
              }} />

              {/* Center User Location Pin */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 15px var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <MapPin size={14} />
                </div>
                <div style={{
                  marginTop: '4px',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  You ({currentAddress.type})
                </div>
              </div>

              {/* Interactive Store Pins placed relative to center */}
              {filteredShops.map((shop, idx) => {
                // Computed positions based on index for aesthetic scatter
                const angles = [45, 160, 240, 310, 85, 200];
                const angle = angles[idx % angles.length] * (Math.PI / 180);
                const radius = 55 + (idx * 22);
                const topOffset = Math.sin(angle) * radius;
                const leftOffset = Math.cos(angle) * radius;

                const isSelected = activeShopPin?.id === shop.id;

                return (
                  <button
                    key={shop.id}
                    onClick={() => setActiveShopPin(shop)}
                    style={{
                      position: 'absolute',
                      transform: `translate(${leftOffset}px, ${topOffset}px)`,
                      zIndex: isSelected ? 30 : 15,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none'
                    }}
                    title={shop.name}
                  >
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      background: isSelected ? 'var(--brand-emerald)' : 'rgba(16, 22, 38, 0.9)',
                      border: `1.5px solid ${isSelected ? '#ffffff' : 'var(--brand-emerald)'}`,
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: isSelected ? '0 0 12px var(--brand-emerald)' : 'none',
                      transition: 'all 0.2s ease'
                    }}>
                      <Store size={12} />
                      <span>{shop.etaMinutes}m</span>
                    </div>
                  </button>
                );
              })}

              <style>{`
                @keyframes radarSpin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>

            {/* Selected Pin Details Box */}
            {activeShopPin && (
              <div style={{ padding: '1rem', background: 'var(--bg-surface-elevated)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--text-main)' }}>
                    {activeShopPin.name}
                  </div>
                  <span className="badge badge-emerald">⚡ {activeShopPin.etaMinutes} min away</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '0.75rem' }}>
                  {activeShopPin.address} • {activeShopPin.distanceKm} km away
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setFilterState(prev => ({
                        ...prev,
                        searchQuery: activeShopPin.category.split(' ')[0],
                        nearbyOnly: true
                      }));
                      setActiveTab('products');
                    }}
                    className="btn btn-emerald btn-sm"
                    style={{ flex: 1, borderRadius: '8px' }}
                  >
                    <span>Browse {activeShopPin.inStockProductsCount} Products</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: List of Nearby Shops */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredShops.map(shop => {
              const isSelected = activeShopPin?.id === shop.id;

              return (
                <div
                  key={shop.id}
                  onClick={() => setActiveShopPin(shop)}
                  className="flow-card"
                  style={{
                    padding: '1.25rem',
                    borderColor: isSelected ? 'var(--brand-emerald)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    
                    {/* Shop Logo */}
                    <img
                      src={shop.logo}
                      alt={shop.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '1rem',
                        objectFit: 'cover',
                        border: '1px solid var(--border-subtle)',
                        flexShrink: 0
                      }}
                    />

                    {/* Shop Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                          {shop.name}
                        </div>
                        <span className="badge badge-emerald">
                          ⚡ {shop.etaMinutes} min
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{shop.category}</span>
                        <span>•</span>
                        <span>{shop.distanceKm} km away</span>
                        <span>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--brand-amber)', fontWeight: 700 }}>
                          <Star size={13} fill="var(--brand-amber)" />
                          <span>{shop.rating}</span>
                          <span style={{ color: 'var(--text-muted)' }}>({shop.reviewCount})</span>
                        </div>
                      </div>

                      {/* Store meta stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <span>Delivery: {shop.deliveryFee === 0 ? <strong style={{ color: 'var(--brand-emerald)' }}>FREE</strong> : `₹${shop.deliveryFee}`}</span>
                        <span>Min Order: ₹{shop.minOrder}</span>
                        <span>Radius: {shop.deliveryRadiusKm} km</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--brand-emerald)' }}>
                          <CheckCircle2 size={13} /> {shop.inStockProductsCount} In Stock
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setFilterState(prev => ({ ...prev, searchQuery: shop.category.split(' ')[0], nearbyOnly: true }));
                            setActiveTab('products');
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ borderRadius: '8px' }}
                        >
                          Order in {shop.etaMinutes} mins
                        </button>

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setFilterState(prev => ({ ...prev, searchQuery: '', nearbyOnly: true }));
                            setActiveTab('products');
                          }}
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--brand-primary)', fontWeight: 600 }}
                        >
                          Browse Catalog
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
