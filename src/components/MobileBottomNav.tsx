import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Home, 
  Grid, 
  Zap, 
  Package, 
  User, 
  ShoppingCart 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsCartOpen, 
    cart, 
    setPortalMode 
  } = useStore();

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="mobile-nav-dock" aria-label="Mobile Navigation">
      <button
        onClick={() => { setPortalMode('customer'); setActiveTab('home'); }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeTab === 'home' ? 'var(--brand-primary)' : 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'home' ? 700 : 500
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        onClick={() => { setPortalMode('customer'); setActiveTab('products'); }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeTab === 'products' ? 'var(--brand-primary)' : 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'products' ? 700 : 500
        }}
      >
        <Grid size={20} />
        <span>Catalog</span>
      </button>

      {/* Center Highlighted Nearby Button */}
      <button
        onClick={() => { setPortalMode('customer'); setActiveTab('nearby'); }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeTab === 'nearby' ? 'var(--brand-emerald)' : 'var(--text-sub)',
          fontSize: '0.7rem',
          fontWeight: 700
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1.5px solid var(--brand-emerald)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--brand-emerald)',
          marginTop: '-12px',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
        }}>
          <Zap size={20} />
        </div>
        <span>Nearby</span>
      </button>

      <button
        onClick={() => { setPortalMode('customer'); setActiveTab('account'); }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeTab === 'account' ? 'var(--brand-primary)' : 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'account' ? 700 : 500
        }}
      >
        <Package size={20} />
        <span>Orders</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          position: 'relative'
        }}
      >
        <ShoppingCart size={20} />
        <span>Cart</span>
        {totalItems > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '4px',
            background: 'var(--brand-emerald)',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 800,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  );
};
