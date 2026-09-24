import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HotDeals } from './components/HotDeals';
import { VideoAdvertisementSection } from './components/VideoAdvertisementSection';
import { NearbyExperience } from './components/NearbyExperience';
import { ProductListing } from './components/ProductListing';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SuperCoinsRewards } from './components/SuperCoinsRewards';
import { WishlistPage } from './components/WishlistPage';
import { AccountDashboard } from './components/AccountDashboard';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LocationModal } from './components/LocationModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { HelpCenterModal } from './components/HelpCenterModal';
import { PrivacyCenterModal } from './components/PrivacyCenterModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { 
  Sparkles, 
  Coins, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Award,
  Star
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    portalMode, 
    activeTab, 
    setActiveTab, 
    productsList, 
    setFilterState 
  } = useStore();

  // If in merchant or admin portal
  if (portalMode === 'seller') {
    return <SellerDashboard />;
  }

  if (portalMode === 'admin') {
    return <AdminDashboard />;
  }

  // Customer marketplace routing
  if (activeTab === 'nearby') {
    return <NearbyExperience />;
  }

  if (activeTab === 'products') {
    return <ProductListing />;
  }

  if (activeTab === 'rewards') {
    return <SuperCoinsRewards />;
  }

  if (activeTab === 'wishlist') {
    return <WishlistPage />;
  }

  if (activeTab === 'account') {
    return <AccountDashboard />;
  }

  // Default: Homepage
  const trendingProducts = productsList.filter(p => p.rating >= 4.7).slice(0, 4);
  const bestSellers = productsList.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <main>
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Hot Deals & Flash Sales with Countdown */}
      <HotDeals />

      {/* 3. FLOWSTATE Commercials & Video Advertisement Spotlight */}
      <VideoAdvertisementSection />

      {/* 4. FLOWSTATE NEARBY Hyperlocal Radar Map & Local Shops */}
      <NearbyExperience />

      {/* 4. Trending & Recommended Section */}
      <section style={{ padding: '2.5rem 0', background: 'var(--bg-app)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-indigo">
                  <TrendingUp size={12} /> POPULAR NOW
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top Rated by Customers</span>
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Trending Across All Departments
              </h2>
            </div>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'all', sortBy: 'rating' }));
                setActiveTab('products');
              }}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '9999px' }}
            >
              <span>Explore All Top Rated</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            {trendingProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FLOWSTATE Super Coins Rewards Highlight Banner */}
      <section style={{ padding: '1.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '1.5rem',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '1.25rem',
                background: 'var(--brand-amber)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
                flexShrink: 0
              }}>
                <Coins size={32} />
              </div>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.35rem' }}>EXCLUSIVE LOYALTY CLUB</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Shop Near You & Earn 2x FLOWSTATE Super Coins
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                  Redeem coins for instant cart discounts on electronics, groceries, and fashion with no minimum threshold.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('rewards')}
              className="btn btn-primary"
              style={{ borderRadius: '9999px', padding: '0.75rem 1.5rem' }}
            >
              <span>Explore Super Coins Hub</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Section */}
      <section style={{ padding: '2.5rem 0', background: 'var(--bg-app)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-amber">
                  <Award size={12} /> MOST PURCHASED
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Best-Sellers</span>
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Customer Favorites & Essentials
              </h2>
            </div>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'all', sortBy: 'popularity' }));
                setActiveTab('products');
              }}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '9999px' }}
            >
              <span>View All Best Sellers</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            {bestSellers.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* App Header & Navigation */}
        <Header />
        <Navbar />

        {/* Dynamic Route View */}
        <div style={{ flex: 1 }}>
          <MainContent />
        </div>

        {/* Global Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderTrackingModal />
        <LocationModal />
        <VoiceSearchModal />
        <HelpCenterModal />
        <PrivacyCenterModal />

        {/* Toast Notification Container */}
        <ToastContainer />

        {/* Mobile Fixed Bottom Dock */}
        <MobileBottomNav />

        {/* Comprehensive Marketplace Footer */}
        <Footer />
      </div>
    </StoreProvider>
  );
};

export default App;
