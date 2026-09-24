import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Zap, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Coins, 
  Clock, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { 
    currentAddress, 
    setActiveTab, 
    setFilterState, 
    productsList, 
    openProductDetail 
  } = useStore();

  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      badge: '⚡ HYPERLOCAL INSTANT DISPATCH',
      title: 'Get Premium Tech & Groceries at Your Doorstep in 10 Minutes',
      subtitle: `Dispatched directly from certified neighborhood stores in ${currentAddress.city}. Zero waiting, 100% genuine products.`,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Explore Nearby Tech',
      tag: 'TechZone Experience Hub (1.4 km)',
      targetCategory: 'electronics',
      productId: 'prod-sony-wh1000xm5'
    },
    {
      badge: '🥑 FARM TO FORK IN 8 MIN',
      title: 'Freshly Picked Organic Avocados & Daily Essentials',
      subtitle: 'Sourced daily from verified organic farms. Kept chilled and delivered in eco-friendly tamper-proof thermal packaging.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Shop Fresh Groceries',
      tag: 'FreshMart Supermarket (0.8 km)',
      targetCategory: 'food',
      productId: 'prod-hass-avocados'
    },
    {
      badge: '🔥 FESTIVAL DROPS & REWARDS',
      title: 'Earn 2x Super Coins on Every Purchase Today',
      subtitle: 'Redeem coins for instant cart discounts, free subscriptions, or luxury gift cards with zero caps.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Claim Your Coins',
      tag: 'UrbanFit Sports (2.4 km)',
      targetCategory: 'fashion',
      productId: 'prod-nike-airmax270'
    }
  ];

  // Auto rotate banner slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[activeSlide];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '1.5rem 0' }}>
      <div className="container">
        
        {/* Main Hero Card */}
        <div style={{
          position: 'relative',
          borderRadius: '1.75rem',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(15, 23, 42, 0.95))',
          border: '1px solid var(--border-highlight)',
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          
          {/* Background Image with Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.28,
            transition: 'opacity 0.7s ease-in-out'
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(8, 12, 20, 0.95) 0%, rgba(8, 12, 20, 0.8) 50%, rgba(8, 12, 20, 0.2) 100%)'
          }} />

          {/* Slide Content */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            padding: '2.5rem',
            maxWidth: '680px'
          }}>
            
            {/* Top location tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Zap size={13} /> {slide.badge}
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                color: '#cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <MapPin size={12} color="var(--brand-emerald)" /> {slide.tag}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              {slide.title}
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '1.75rem'
            }}>
              {slide.subtitle}
            </p>

            {/* Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const prod = productsList.find(p => p.id === slide.productId);
                  if (prod) {
                    openProductDetail(prod);
                  } else {
                    setFilterState(prev => ({ ...prev, category: slide.targetCategory }));
                    setActiveTab('products');
                  }
                }}
                className="btn btn-emerald btn-lg"
                style={{ borderRadius: '9999px' }}
              >
                <span>{slide.actionText}</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setActiveTab('nearby')}
                className="btn btn-secondary btn-lg"
                style={{ borderRadius: '9999px', background: 'rgba(255,255,255,0.08)' }}
              >
                <Clock size={18} color="var(--brand-emerald)" />
                <span>View Stores Near You</span>
              </button>
            </div>

          </div>

          {/* Slide Navigation Arrows */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '2rem',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => setActiveSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveSlide(prev => (prev + 1) % heroSlides.length)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '2.5rem',
            zIndex: 20,
            display: 'flex',
            gap: '0.4rem'
          }}>
            {heroSlides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveSlide(idx)}
                style={{
                  width: activeSlide === idx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeSlide === idx ? 'var(--brand-emerald)' : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

        </div>

        {/* 4 Value Pillars Bar below Hero */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginTop: '1.25rem'
        }}>
          
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-emerald)',
              flexShrink: 0
            }}>
              <Zap size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                10-15 Min Nearby Delivery
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Packed & dispatched from local stores
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-primary)',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                100% Genuine Certified
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direct manufacturer warranties & easy returns
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-amber)',
              flexShrink: 0
            }}>
              <Coins size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                Super Coins Rewards
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Earn coins on every order & redeem at checkout
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(244, 63, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-rose)',
              flexShrink: 0
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                Instant Price Drop Alerts
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Auto-apply best discount coupons
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
