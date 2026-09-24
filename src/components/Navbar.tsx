import React from 'react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/mockData';
import { 
  Zap, 
  Flame, 
  Coins, 
  Store, 
  Navigation, 
  Sparkles,
  ShoppingBag,
  ListFilter,
  Film,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedCategoryId, 
    setSelectedCategoryId,
    setFilterState,
    activeTrackingOrder,
    openOrderTracking,
    setPortalMode
  } = useStore();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryId(catId);
    setFilterState(prev => ({ ...prev, category: catId, subcategory: 'all', searchQuery: '' }));
    setActiveTab('products');
  };

  return (
    <nav style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
      zIndex: 40
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        overflowX: 'auto',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        scrollbarWidth: 'none'
      }}>
        {/* Navigation Quick Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          
          <button
            onClick={() => { setSelectedCategoryId(null); setActiveTab('home'); }}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'home' && !selectedCategoryId ? 700 : 500,
              color: activeTab === 'home' && !selectedCategoryId ? 'var(--brand-primary)' : 'var(--text-sub)',
              background: activeTab === 'home' && !selectedCategoryId ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: activeTab === 'home' && !selectedCategoryId ? '1px solid var(--brand-primary)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={15} /> All Store
          </button>

          <button
            onClick={() => setActiveTab('nearby')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--brand-emerald)',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <Zap size={15} /> Nearby in 10-15m
          </button>

          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, category: 'all', minDiscount: 20 }));
              setActiveTab('products');
            }}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--brand-rose)',
              background: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <Flame size={15} /> Flash Sale
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--brand-amber)',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <Coins size={15} /> Super Coins
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                document.getElementById('video-advertisements')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#a5b4fc',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <Film size={15} /> Video Ads (1080p)
          </button>

          <button
            onClick={() => {
              setPortalMode('admin');
              setActiveTab('admin');
            }}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#818cf8',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={15} /> Admin Portal
          </button>

          {activeTrackingOrder && (
            <button
              onClick={() => openOrderTracking(activeTrackingOrder)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ffffff',
                background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-emerald))',
                boxShadow: 'var(--shadow-emerald)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer'
              }}
            >
              <Navigation size={15} /> Live Delivery (7m away)
            </button>
          )}

        </div>

        {/* Categories Strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.25rem' }}>
            Departments:
          </span>

          {categories.map(cat => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.825rem',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'var(--brand-primary)' : 'var(--text-sub)',
                  background: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                  border: isSelected ? '1px solid var(--border-highlight)' : '1px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

      </div>
    </nav>
  );
};
