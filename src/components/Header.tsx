import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { translations } from '../translations';
import { 
  Search, 
  MapPin, 
  Mic, 
  ShoppingCart, 
  Heart, 
  Sun, 
  Moon, 
  Globe, 
  Coins, 
  Bell, 
  Store, 
  ShieldCheck, 
  ChevronDown,
  Clock,
  Sparkles,
  ShoppingBag,
  Plane,
  Zap
} from 'lucide-react';
import { Language } from '../types';

export const Header: React.FC = () => {
  const {
    portalMode,
    setPortalMode,
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    language,
    setLanguage,
    currentAddress,
    currentDeliveryMetrics,
    setIsLocationModalOpen,
    setIsVoiceSearchModalOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    wishlist,
    user,
    productsList,
    openProductDetail,
    setFilterState
  } = useStore();

  const t = translations[language];

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for search suggestion
  const matchedProducts = searchQuery.trim() === '' 
    ? [] 
    : productsList.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  const recentSearches = ['Sony WH-1000XM5', 'Organic Avocados', 'Nike Air Max', 'Philips Airfryer'];

  const handleSearchSubmit = (queryToSearch: string) => {
    setFilterState(prev => ({
      ...prev,
      searchQuery: queryToSearch,
      category: 'all'
    }));
    setActiveTab('products');
    setIsSearchFocused(false);
  };

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header-sticky" style={{ width: '100%' }}>
      {/* Top Banner: Portal Switcher & Express info */}
      <div style={{
        background: 'linear-gradient(90deg, #4f46e5 0%, #10b981 100%)',
        color: '#ffffff',
        fontSize: '0.8rem',
        fontWeight: 600,
        padding: '0.35rem 1rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontSize: '0.7rem' }}>
              ⚡ HYPERLOCAL ACTIVE
            </span>
            <span>Instant 10-15 minute delivery available in your zone: {currentAddress.city}</span>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ opacity: 0.85 }}>Switch View:</span>
            <button
              onClick={() => { setPortalMode('customer'); setActiveTab('home'); }}
              style={{
                background: portalMode === 'customer' ? '#ffffff' : 'rgba(255,255,255,0.2)',
                color: portalMode === 'customer' ? '#4f46e5' : '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ShoppingBag size={12} /> {t.customerStore}
            </button>
            <button
              onClick={() => { setPortalMode('seller'); setActiveTab('seller'); }}
              style={{
                background: portalMode === 'seller' ? '#ffffff' : 'rgba(255,255,255,0.2)',
                color: portalMode === 'seller' ? '#059669' : '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Store size={12} /> {t.sellerPortal}
            </button>
            <button
              onClick={() => { setPortalMode('admin'); setActiveTab('admin'); }}
              style={{
                background: portalMode === 'admin' ? '#ffffff' : 'rgba(255,255,255,0.2)',
                color: portalMode === 'admin' ? '#1e1b4b' : '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ShieldCheck size={12} /> {t.adminPortal}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div style={{ padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => { setActiveTab('home'); setPortalMode('customer'); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-emerald))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-brand)',
              position: 'relative'
            }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem' }}>F</span>
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--brand-emerald)',
                border: '2px solid var(--bg-surface)'
              }} />
            </div>

            <div style={{ display: 'block' }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.45rem',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, var(--text-main) 30%, var(--brand-primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                FLOWSTATE
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Closer, faster, smarter.
              </div>
            </div>
          </div>

          {/* Location Selector Pill */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              padding: '0.5rem 0.9rem',
              maxWidth: '240px',
              cursor: 'pointer',
              transition: 'var(--transition-normal)'
            }}
            aria-label="Select delivery location"
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: currentDeliveryMetrics?.isInterstate ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {currentDeliveryMetrics?.isInterstate ? (
                <Plane size={15} color="var(--brand-primary)" />
              ) : (
                <MapPin size={15} color="var(--brand-emerald)" />
              )}
            </div>
            <div style={{ textAlign: 'left', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>
                {t.deliverTo} • <span style={{ color: currentDeliveryMetrics?.isInterstate ? 'var(--brand-primary)' : 'var(--brand-emerald)', fontWeight: 700 }}>
                  {currentDeliveryMetrics?.shortEta || '10-12m'}
                </span>
              </div>
              <div style={{
                fontSize: '0.825rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {currentAddress.landmark || currentAddress.addressLine1.slice(0, 18)}, {currentAddress.city}
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {/* Omnibox Search Bar */}
          <div ref={searchRef} style={{ flex: 1, maxWidth: '580px', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-input)',
              border: `1.5px solid ${isSearchFocused ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
              borderRadius: '9999px',
              padding: '0.35rem 0.5rem 0.35rem 1.15rem',
              boxShadow: isSearchFocused ? 'var(--shadow-brand)' : 'none',
              transition: 'var(--transition-normal)'
            }}>
              <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(searchQuery);
                  }
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem'
                }}
              />
              {/* Voice Search Simulator Button */}
              <button
                onClick={() => setIsVoiceSearchModalOpen(true)}
                title="Search with Voice"
                style={{
                  padding: '0.4rem',
                  borderRadius: '50%',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.25rem'
                }}
              >
                <Mic size={18} />
              </button>

              <button
                onClick={() => handleSearchSubmit(searchQuery)}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '9999px', padding: '0.45rem 1rem' }}
              >
                Search
              </button>
            </div>

            {/* Smart Search Dropdown Popover */}
            {isSearchFocused && (
              <div className="search-dropdown" style={{ padding: '1rem' }}>
                {searchQuery.trim() === '' ? (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={13} /> RECENT SEARCHES
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      {recentSearches.map(term => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            handleSearchSubmit(term);
                          }}
                          style={{
                            background: 'var(--bg-surface-elevated)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            color: 'var(--text-sub)',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>

                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Sparkles size={13} /> POPULAR CATEGORIES
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                      {['⚡ Nearby Electronics in 15m', '🥑 Fresh Organics in 8m', '🎧 Noise Cancelling Audio', '👟 Running Sneakers'].map(cat => (
                        <div
                          key={cat}
                          onClick={() => {
                            handleSearchSubmit(cat.split(' ')[1] || cat);
                          }}
                          style={{
                            padding: '0.4rem 0.6rem',
                            borderRadius: '8px',
                            background: 'var(--bg-input)',
                            fontSize: '0.825rem',
                            cursor: 'pointer',
                            color: 'var(--text-main)'
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      MATCHING PRODUCTS ({matchedProducts.length})
                    </div>
                    {matchedProducts.length === 0 ? (
                      <div style={{ padding: '0.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        No direct product matches. Press Enter to search all departments.
                      </div>
                    ) : (
                      matchedProducts.map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            openProductDetail(prod);
                            setIsSearchFocused(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'var(--transition-fast)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {prod.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 600 }}>
                              ⚡ {prod.deliveryEstimateMinutes} min delivery • ₹{prod.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            
            {/* Super Coins Wallet Pill */}
            <button
              onClick={() => setActiveTab('rewards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '0.45rem 0.8rem',
                borderRadius: '9999px',
                color: 'var(--brand-amber)',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="FLOWSTATE Super Coins Hub"
            >
              <Coins size={16} />
              <span>{user.superCoins.toLocaleString()}</span>
            </button>

            {/* Language Selector */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  color: 'var(--text-sub)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Select Language"
              >
                <Globe size={20} />
              </button>

              {isLangOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-highlight)',
                  borderRadius: '1rem',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.5rem',
                  zIndex: 200,
                  minWidth: '150px'
                }}>
                  {languagesList.map(item => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.85rem',
                        fontWeight: language === item.code ? 700 : 500,
                        color: language === item.code ? 'var(--brand-primary)' : 'var(--text-main)',
                        background: language === item.code ? 'var(--bg-surface-elevated)' : 'transparent',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{item.native}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.5rem',
                borderRadius: '50%',
                color: 'var(--text-sub)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications Popover */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  color: 'var(--text-sub)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                title="Notifications"
              >
                <Bell size={20} />
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--brand-rose)'
                }} />
              </button>

              {isNotificationsOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-highlight)',
                  borderRadius: '1.25rem',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '1rem',
                  zIndex: 200,
                  width: '320px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Alerts</div>
                    <span className="badge badge-emerald">Online</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ padding: '0.5rem', background: 'var(--bg-surface-elevated)', borderRadius: '8px', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--brand-emerald)' }}>⚡ Delivery Approaching</div>
                      <div style={{ color: 'var(--text-sub)' }}>Ramesh Kumar is 7 minutes away with your Sony Headphones!</div>
                    </div>
                    <div style={{ padding: '0.5rem', background: 'var(--bg-surface-elevated)', borderRadius: '8px', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--brand-amber)' }}>🪙 Daily Streak Active</div>
                      <div style={{ color: 'var(--text-sub)' }}>Claim your day 4 login streak now for +25 Super Coins!</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                padding: '0.5rem',
                borderRadius: '50%',
                color: wishlist.length > 0 ? 'var(--brand-rose)' : 'var(--text-sub)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              title="My Wishlist"
            >
              <Heart size={20} fill={wishlist.length > 0 ? 'var(--brand-rose)' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--brand-rose)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-primary"
              style={{
                padding: '0.5rem 0.95rem',
                fontSize: '0.875rem',
                position: 'relative',
                boxShadow: 'var(--shadow-brand)'
              }}
              title="Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span style={{ display: 'inline', fontWeight: 700 }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              {totalCartItems > 0 && (
                <span style={{
                  background: 'var(--brand-emerald)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  marginLeft: '0.2rem'
                }}>
                  {totalCartItems}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
